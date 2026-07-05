import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, AdminTextarea, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useAchievements } from '../../hooks/useAchievements';
import { createAchievement, updateAchievement, deleteAchievement } from '../../api/achievements.api';
import { useToast } from '../../context/ToastContext';
import type { ApiAchievement } from '../../types/api';

interface AchForm { title: string; description: string; date: string; }
const EMPTY: AchForm = { title: '', description: '', date: '' };

export default function AdminAchievements() {
  const { data: items = [], isLoading, isError, refetch } = useAchievements();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiAchievement | null>(null);
  const [form, setForm] = useState<AchForm>(EMPTY);

  const toDate = (d: string | null) => d ? new Date(d).toISOString().split('T')[0] : '';

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (a: ApiAchievement) => {
    setEditing(a);
    setForm({ title: a.title, description: a.description ?? '', date: toDate(a.date) });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: () => {
      const toISO = (d: string) => d ? new Date(d).toISOString() : undefined;
      const payload = {
        title: form.title,
        description: form.description || undefined,
        date: toISO(form.date),
      };
      return editing ? updateAchievement(editing.id, payload) : createAchievement(payload);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['achievements'] }); showToast(`Achievement ${editing ? 'updated' : 'created'}.`, 'success'); setOpen(false); },
    onError: (err: unknown) => {
      const errors = (err as { response?: { data?: { errors?: { fieldErrors?: Record<string, string[]> } } } })
        ?.response?.data?.errors?.fieldErrors;
      if (errors) {
        const first = Object.entries(errors)[0];
        showToast(`${first[0]}: ${first[1][0]}`, 'error');
      } else {
        showToast('Failed to save.', 'error');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAchievement(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['achievements'] }); showToast('Deleted.', 'success'); },
    onError: () => showToast('Failed to delete.', 'error'),
  });

  const set = (k: keyof AchForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader title="Achievements" description={`${items.length} achievements`}
        action={<button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"><Plus size={16} /> Add Achievement</button>}
      />
      <AdminTable data={items} keyExtractor={(a) => a.id} emptyMessage="No achievements yet."
        columns={[
          { key: 'title', label: 'Title', render: (a) => <span className="font-medium">{a.title}</span> },
          { key: 'description', label: 'Description', render: (a) => <span className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">{a.description ?? '—'}</span> },
          { key: 'date', label: 'Date', render: (a) => <span className="text-xs text-[var(--color-text-muted)]">{a.date ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}</span> },
          { key: 'actions', label: 'Actions', render: (a) => <ActionButtons onEdit={() => openEdit(a)} onDelete={() => { if (confirm(`Delete "${a.title}"?`)) deleteMutation.mutate(a.id); }} /> },
        ]}
      />
      <AdminModal open={open} title={editing ? 'Edit Achievement' : 'Add Achievement'} onClose={() => setOpen(false)}>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
          <FormField label="Title" required><AdminInput value={form.title} onChange={set('title')} required /></FormField>
          <FormField label="Description"><AdminTextarea rows={3} value={form.description} onChange={set('description')} /></FormField>
          <FormField label="Date"><AdminInput type="date" value={form.date} onChange={set('date')} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm hover:bg-white/8">Cancel</button>
            <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90 disabled:opacity-50">{saveMutation.isPending ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

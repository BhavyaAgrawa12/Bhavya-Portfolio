import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useTechnologies } from '../../hooks/useTechnologies';
import { createTechnology, updateTechnology, deleteTechnology } from '../../api/technologies.api';
import { useToast } from '../../context/ToastContext';
import type { ApiTechnology } from '../../types/api';

interface TechForm { name: string; iconName: string; }
const EMPTY: TechForm = { name: '', iconName: '' };

export default function AdminTechnologies() {
  const { data: techs = [], isLoading, isError, refetch } = useTechnologies();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiTechnology | null>(null);
  const [form, setForm] = useState<TechForm>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (t: ApiTechnology) => { setEditing(t); setForm({ name: t.name, iconName: t.iconName ?? '' }); setOpen(true); };

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = { name: form.name, iconName: form.iconName || null };
      return editing ? updateTechnology(editing.id, payload) : createTechnology(payload);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['technologies'] }); showToast(`Technology ${editing ? 'updated' : 'created'}.`, 'success'); setOpen(false); },
    onError: () => showToast('Failed to save technology.', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTechnology(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['technologies'] }); showToast('Technology deleted.', 'success'); },
    onError: () => showToast('Failed to delete.', 'error'),
  });

  const set = (key: keyof TechForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader title="Technologies" description={`${techs.length} technologies`}
        action={<button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"><Plus size={16} /> Add Technology</button>}
      />
      <AdminTable data={techs} keyExtractor={(t) => t.id} emptyMessage="No technologies yet."
        columns={[
          { key: 'name', label: 'Name', render: (t) => <span className="font-medium">{t.name}</span> },
          { key: 'icon', label: 'Icon Name', render: (t) => <span className="text-[var(--color-text-secondary)]">{t.iconName ?? '—'}</span> },
          { key: 'actions', label: 'Actions', render: (t) => <ActionButtons onEdit={() => openEdit(t)} onDelete={() => { if (confirm(`Delete "${t.name}"?`)) deleteMutation.mutate(t.id); }} /> },
        ]}
      />
      <AdminModal open={open} title={editing ? 'Edit Technology' : 'Add Technology'} onClose={() => setOpen(false)}>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
          <FormField label="Name" required><AdminInput value={form.name} onChange={set('name')} required /></FormField>
          <FormField label="Icon Name" hint="e.g. react, nodejs (optional)"><AdminInput value={form.iconName} onChange={set('iconName')} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm hover:bg-white/8">Cancel</button>
            <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90 disabled:opacity-50">
              {saveMutation.isPending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

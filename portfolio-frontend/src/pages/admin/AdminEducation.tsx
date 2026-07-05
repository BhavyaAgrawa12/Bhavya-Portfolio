import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, AdminTextarea, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useEducation } from '../../hooks/useEducation';
import { createEducation, updateEducation, deleteEducation } from '../../api/education.api';
import { useToast } from '../../context/ToastContext';
import type { ApiEducation } from '../../types/api';

interface EduForm { institution: string; degree: string; field: string; location: string; cgpa: string; description: string; startDate: string; endDate: string; }
const EMPTY: EduForm = { institution: '', degree: '', field: '', location: '', cgpa: '', description: '', startDate: '', endDate: '' };

export default function AdminEducation() {
  const { data: items = [], isLoading, isError, refetch } = useEducation();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiEducation | null>(null);
  const [form, setForm] = useState<EduForm>(EMPTY);

  const toDateInput = (d: string | null) => d ? new Date(d).toISOString().split('T')[0] : '';

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (e: ApiEducation) => {
    setEditing(e);
    setForm({ institution: e.institution, degree: e.degree, field: e.field ?? '', location: e.location ?? '', cgpa: e.cgpa ?? '', description: e.description ?? '', startDate: toDateInput(e.startDate), endDate: toDateInput(e.endDate) });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: () => {
      // Backend z.string().datetime() requires full ISO format, not just YYYY-MM-DD
      const toISO = (d: string) => d ? new Date(d).toISOString() : undefined;
      const payload = {
        institution: form.institution,
        degree: form.degree,
        field: form.field || undefined,
        location: form.location || undefined,
        cgpa: form.cgpa || undefined,
        description: form.description || undefined,
        startDate: toISO(form.startDate),
        endDate: toISO(form.endDate),
      };
      return editing ? updateEducation(editing.id, payload) : createEducation(payload);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['education'] }); showToast(`Education ${editing ? 'updated' : 'created'}.`, 'success'); setOpen(false); },
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
    mutationFn: (id: string) => deleteEducation(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['education'] }); showToast('Deleted.', 'success'); },
    onError: () => showToast('Failed to delete.', 'error'),
  });

  const set = (k: keyof EduForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader title="Education" description={`${items.length} entries`}
        action={<button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"><Plus size={16} /> Add Education</button>}
      />
      <AdminTable data={items} keyExtractor={(e) => e.id} emptyMessage="No education entries yet."
        columns={[
          { key: 'institution', label: 'Institution', render: (e) => <span className="font-medium">{e.institution}</span> },
          { key: 'degree', label: 'Degree', render: (e) => <span className="text-[var(--color-text-secondary)]">{e.degree}{e.field ? ` in ${e.field}` : ''}</span> },
          { key: 'dates', label: 'Dates', render: (e) => <span className="text-xs text-[var(--color-text-muted)]">{e.startDate ? new Date(e.startDate).getFullYear() : '?'} – {e.endDate ? new Date(e.endDate).getFullYear() : 'Present'}</span> },
          { key: 'actions', label: 'Actions', render: (e) => <ActionButtons onEdit={() => openEdit(e)} onDelete={() => { if (confirm(`Delete "${e.institution}"?`)) deleteMutation.mutate(e.id); }} /> },
        ]}
      />
      <AdminModal open={open} title={editing ? 'Edit Education' : 'Add Education'} onClose={() => setOpen(false)} size="lg">
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Institution" required><AdminInput value={form.institution} onChange={set('institution')} required /></FormField>
            <FormField label="Degree" required><AdminInput value={form.degree} onChange={set('degree')} required /></FormField>
            <FormField label="Field of Study"><AdminInput value={form.field} onChange={set('field')} /></FormField>
            <FormField label="Location"><AdminInput value={form.location} onChange={set('location')} /></FormField>
            <FormField label="CGPA / Grade"><AdminInput value={form.cgpa} onChange={set('cgpa')} /></FormField>
            <div />
            <FormField label="Start Date"><AdminInput type="date" value={form.startDate} onChange={set('startDate')} /></FormField>
            <FormField label="End Date"><AdminInput type="date" value={form.endDate} onChange={set('endDate')} /></FormField>
          </div>
          <FormField label="Description"><AdminTextarea rows={3} value={form.description} onChange={set('description')} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm hover:bg-white/8">Cancel</button>
            <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90 disabled:opacity-50">{saveMutation.isPending ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

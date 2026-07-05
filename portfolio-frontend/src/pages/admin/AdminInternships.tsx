import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, AdminTextarea, AdminSelect, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useInternships } from '../../hooks/useInternships';
import { createInternship, updateInternship, deleteInternship } from '../../api/internships.api';
import { useToast } from '../../context/ToastContext';
import type { ApiInternship, EmploymentType } from '../../types/api';

const EMP_OPTIONS = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'INTERNSHIP', label: 'Internship' },
  { value: 'FREELANCE', label: 'Freelance' },
];

interface InternForm { company: string; position: string; employmentType: EmploymentType; location: string; description: string; companyWebsite: string; startDate: string; endDate: string; }
const EMPTY: InternForm = { company: '', position: '', employmentType: 'INTERNSHIP', location: '', description: '', companyWebsite: '', startDate: '', endDate: '' };

export default function AdminInternships() {
  const { data: items = [], isLoading, isError, refetch } = useInternships();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiInternship | null>(null);
  const [form, setForm] = useState<InternForm>(EMPTY);

  const toDate = (d: string | null) => d ? new Date(d).toISOString().split('T')[0] : '';
  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (i: ApiInternship) => {
    setEditing(i);
    setForm({ company: i.company, position: i.position, employmentType: i.employmentType, location: i.location ?? '', description: i.description ?? '', companyWebsite: i.companyWebsite ?? '', startDate: toDate(i.startDate), endDate: toDate(i.endDate) });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: () => {
      const toISO = (d: string) => d ? new Date(d).toISOString() : undefined;
      const payload = {
        company: form.company,
        position: form.position,
        employmentType: form.employmentType,
        location: form.location || undefined,
        description: form.description || undefined,
        // companyWebsite must be a valid URL or omitted — never send empty string
        ...(form.companyWebsite.trim() && { companyWebsite: form.companyWebsite.trim() }),
        startDate: toISO(form.startDate),
        endDate: toISO(form.endDate),
      };
      return editing ? updateInternship(editing.id, payload) : createInternship(payload);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['internships'] }); showToast(`Internship ${editing ? 'updated' : 'created'}.`, 'success'); setOpen(false); },
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
    mutationFn: (id: string) => deleteInternship(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['internships'] }); showToast('Deleted.', 'success'); },
  });

  const set = (k: keyof InternForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const empLabel = (t: EmploymentType) => EMP_OPTIONS.find(o => o.value === t)?.label ?? t;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader title="Internships" description={`${items.length} entries`}
        action={<button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"><Plus size={16} /> Add Internship</button>}
      />
      <AdminTable data={items} keyExtractor={i => i.id} emptyMessage="No internships yet."
        columns={[
          { key: 'company', label: 'Company', render: i => <span className="font-medium">{i.company}</span> },
          { key: 'position', label: 'Position', render: i => <span className="text-[var(--color-text-secondary)]">{i.position}</span> },
          { key: 'type', label: 'Type', render: i => <span className="text-xs">{empLabel(i.employmentType)}</span> },
          { key: 'dates', label: 'Duration', render: i => <span className="text-xs text-[var(--color-text-muted)]">{i.startDate ? new Date(i.startDate).getFullYear() : '?'} – {i.endDate ? new Date(i.endDate).getFullYear() : 'Present'}</span> },
          { key: 'actions', label: 'Actions', render: i => <ActionButtons onEdit={() => openEdit(i)} onDelete={() => { if (confirm(`Delete "${i.company}"?`)) deleteMutation.mutate(i.id); }} /> },
        ]}
      />
      <AdminModal open={open} title={editing ? 'Edit Internship' : 'Add Internship'} onClose={() => setOpen(false)} size="lg">
        <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Company" required><AdminInput value={form.company} onChange={set('company')} required /></FormField>
            <FormField label="Position" required><AdminInput value={form.position} onChange={set('position')} required /></FormField>
            <FormField label="Employment Type" required>
              <AdminSelect value={form.employmentType} options={EMP_OPTIONS} onChange={v => setForm(p => ({ ...p, employmentType: v as EmploymentType }))} />
            </FormField>
            <FormField label="Location"><AdminInput value={form.location} onChange={set('location')} /></FormField>
            <FormField label="Company Website"><AdminInput value={form.companyWebsite} onChange={set('companyWebsite')} /></FormField>
            <div />
            <FormField label="Start Date"><AdminInput type="date" value={form.startDate} onChange={set('startDate')} /></FormField>
            <FormField label="End Date"><AdminInput type="date" value={form.endDate} onChange={set('endDate')} /></FormField>
          </div>
          <FormField label="Description" hint="Responsibilities, achievements (one per line recommended)">
            <AdminTextarea rows={4} value={form.description} onChange={set('description')} />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-[var(--color-glass-border)] px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition">Cancel</button>
            <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">{saveMutation.isPending ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

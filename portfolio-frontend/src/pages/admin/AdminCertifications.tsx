import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useCertifications } from '../../hooks/useCertifications';
import { createCertification, updateCertification, deleteCertification } from '../../api/certifications.api';
import { useToast } from '../../context/ToastContext';
import type { ApiCertification } from '../../types/api';

interface CertForm { title: string; issuer: string; credentialId: string; credentialUrl: string; issueDate: string; }
const EMPTY: CertForm = { title: '', issuer: '', credentialId: '', credentialUrl: '', issueDate: '' };

export default function AdminCertifications() {
  const { data: items = [], isLoading, isError, refetch } = useCertifications();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiCertification | null>(null);
  const [form, setForm] = useState<CertForm>(EMPTY);

  const toDate = (d: string | null) => d ? new Date(d).toISOString().split('T')[0] : '';

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (c: ApiCertification) => {
    setEditing(c);
    setForm({ title: c.title, issuer: c.issuer, credentialId: c.credentialId ?? '', credentialUrl: c.credentialUrl ?? '', issueDate: toDate(c.issueDate) });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: () => {
      const toISO = (d: string) => d ? new Date(d).toISOString() : undefined;
      const payload = {
        title: form.title,
        issuer: form.issuer,
        credentialId: form.credentialId || undefined,
        // credentialUrl must be valid URL or omitted — never empty string
        ...(form.credentialUrl.trim() && { credentialUrl: form.credentialUrl.trim() }),
        issueDate: toISO(form.issueDate),
      };
      return editing ? updateCertification(editing.id, payload) : createCertification(payload);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['certifications'] }); showToast(`Certification ${editing ? 'updated' : 'created'}.`, 'success'); setOpen(false); },
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
    mutationFn: (id: string) => deleteCertification(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['certifications'] }); showToast('Deleted.', 'success'); },
    onError: () => showToast('Failed to delete.', 'error'),
  });

  const set = (k: keyof CertForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader title="Certifications" description={`${items.length} certifications`}
        action={<button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"><Plus size={16} /> Add Certification</button>}
      />
      <AdminTable data={items} keyExtractor={(c) => c.id} emptyMessage="No certifications yet."
        columns={[
          { key: 'title', label: 'Title', render: (c) => <span className="font-medium">{c.title}</span> },
          { key: 'issuer', label: 'Issuer', render: (c) => <span className="text-[var(--color-text-secondary)]">{c.issuer}</span> },
          { key: 'date', label: 'Issue Date', render: (c) => <span className="text-xs text-[var(--color-text-muted)]">{c.issueDate ? new Date(c.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}</span> },
          { key: 'actions', label: 'Actions', render: (c) => <ActionButtons onEdit={() => openEdit(c)} onDelete={() => { if (confirm(`Delete "${c.title}"?`)) deleteMutation.mutate(c.id); }} /> },
        ]}
      />
      <AdminModal open={open} title={editing ? 'Edit Certification' : 'Add Certification'} onClose={() => setOpen(false)}>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
          <FormField label="Title" required><AdminInput value={form.title} onChange={set('title')} required /></FormField>
          <FormField label="Issuer" required><AdminInput value={form.issuer} onChange={set('issuer')} required /></FormField>
          <FormField label="Credential ID"><AdminInput value={form.credentialId} onChange={set('credentialId')} /></FormField>
          <FormField label="Credential URL"><AdminInput value={form.credentialUrl} onChange={set('credentialUrl')} /></FormField>
          <FormField label="Issue Date"><AdminInput type="date" value={form.issueDate} onChange={set('issueDate')} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm hover:bg-white/8">Cancel</button>
            <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90 disabled:opacity-50">{saveMutation.isPending ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

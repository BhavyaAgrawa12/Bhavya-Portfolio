import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, AdminSelect, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useSkills } from '../../hooks/useSkills';
import { createSkill, updateSkill, deleteSkill } from '../../api/skills.api';
import { useToast } from '../../context/ToastContext';
import type { ApiSkill, SkillCategory } from '../../types/api';

const CATEGORY_OPTIONS = [
  { value: 'FRONTEND', label: 'Frontend' },
  { value: 'BACKEND', label: 'Backend' },
  { value: 'DATABASE', label: 'Database' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'LANGUAGE', label: 'Language' },
  { value: 'TOOL', label: 'Tool' },
];

interface SkillForm { name: string; category: SkillCategory; proficiency: string; }
const EMPTY: SkillForm = { name: '', category: 'FRONTEND', proficiency: '' };

export default function AdminSkills() {
  const { data: skills = [], isLoading, isError, refetch } = useSkills();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiSkill | null>(null);
  const [form, setForm] = useState<SkillForm>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (s: ApiSkill) => { setEditing(s); setForm({ name: s.name, category: s.category, proficiency: s.proficiency?.toString() ?? '' }); setOpen(true); };

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = { name: form.name, category: form.category, proficiency: form.proficiency ? Number(form.proficiency) : null };
      return editing ? updateSkill(editing.id, payload) : createSkill(payload);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['skills'] }); showToast(`Skill ${editing ? 'updated' : 'created'}.`, 'success'); setOpen(false); },
    onError: () => showToast('Failed to save skill.', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['skills'] }); showToast('Skill deleted.', 'success'); },
  });

  const set = (key: keyof SkillForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const catLabel = (c: SkillCategory) => CATEGORY_OPTIONS.find(o => o.value === c)?.label ?? c;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader title="Skills" description={`${skills.length} skills`}
        action={<button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"><Plus size={16} /> Add Skill</button>}
      />
      <AdminTable data={skills} keyExtractor={s => s.id} emptyMessage="No skills yet."
        columns={[
          { key: 'name', label: 'Name', render: s => <span className="font-medium">{s.name}</span> },
          { key: 'category', label: 'Category', render: s => <span className="text-[var(--color-text-secondary)]">{catLabel(s.category)}</span> },
          { key: 'proficiency', label: 'Proficiency', render: s => s.proficiency != null ? <span>{s.proficiency}%</span> : <span className="text-[var(--color-text-muted)]">—</span> },
          { key: 'actions', label: 'Actions', render: s => <ActionButtons onEdit={() => openEdit(s)} onDelete={() => { if (confirm(`Delete "${s.name}"?`)) deleteMutation.mutate(s.id); }} /> },
        ]}
      />
      <AdminModal open={open} title={editing ? 'Edit Skill' : 'Add Skill'} onClose={() => setOpen(false)}>
        <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
          <FormField label="Name" required><AdminInput value={form.name} onChange={set('name')} required /></FormField>
          <FormField label="Category" required>
            <AdminSelect value={form.category} options={CATEGORY_OPTIONS} onChange={v => setForm(p => ({ ...p, category: v as SkillCategory }))} />
          </FormField>
          <FormField label="Proficiency %" hint="0–100, leave blank to hide">
            <AdminInput type="number" min="0" max="100" value={form.proficiency} onChange={set('proficiency')} />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-[var(--color-glass-border)] px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition">Cancel</button>
            <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
              {saveMutation.isPending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

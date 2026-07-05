import { useState, useRef } from 'react';
import { Plus, ImageIcon, X, Upload } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField, { AdminInput, AdminTextarea, AdminSelect, ActionButtons } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useProjects } from '../../hooks/useProjects';
import { useMedia } from '../../hooks/useMedia';
import { useTechnologies } from '../../hooks/useTechnologies';
import {
  createProject, updateProject, deleteProject,
  setProjectThumbnail, removeProjectThumbnail,
  addProjectGalleryImage, removeProjectGalleryImage,
} from '../../api/projects.api';
import { uploadMedia } from '../../api/media.api';
import { useToast } from '../../context/ToastContext';
import { mediaUrl } from '../../lib/mediaUrl';
import type { ApiProject, ApiMedia, ProjectCategory, ProjectStatus } from '../../types/api';

interface ProjectForm {
  title: string; category: ProjectCategory; status: ProjectStatus; featured: boolean;
  shortDescription: string; description: string; githubUrl: string; liveUrl: string;
  features: string; challenges: string; learnings: string; technologyIds: string[];
}
const EMPTY: ProjectForm = {
  title: '', category: 'FULL_STACK', status: 'IN_DEVELOPMENT', featured: false,
  shortDescription: '', description: '', githubUrl: '', liveUrl: '',
  features: '', challenges: '', learnings: '', technologyIds: [],
};
const CATEGORY_OPTIONS = [
  { value: 'FULL_STACK', label: 'Full Stack' }, { value: 'FRONTEND', label: 'Frontend' },
  { value: 'BACKEND', label: 'Backend' }, { value: 'ACADEMIC', label: 'Academic' }, { value: 'PERSONAL', label: 'Personal' },
];
const STATUS_OPTIONS = [
  { value: 'LIVE', label: 'Live' }, { value: 'IN_DEVELOPMENT', label: 'In Development' }, { value: 'ARCHIVED', label: 'Archived' },
];
const STATUS_COLORS: Record<ProjectStatus, string> = {
  LIVE: 'bg-emerald-500/10 text-emerald-400',
  IN_DEVELOPMENT: 'bg-amber-500/10 text-amber-400',
  ARCHIVED: 'bg-white/10 text-gray-400',
};
function parseLines(t: string) { return t.split('\n').map(s => s.trim()).filter(Boolean); }
function toLines(arr: string[] | null) { return (arr ?? []).join('\n'); }

/* ── Media Picker — supports single and multi-select + multi-upload */
function MediaPickerModal({
  open, onClose, onSelect, onSelectMany, title, multi = false,
}: {
  open: boolean; onClose: () => void;
  onSelect: (m: ApiMedia) => void;
  onSelectMany?: (items: ApiMedia[]) => void;
  title: string; multi?: boolean;
}) {
  const { data: allMedia = [], isLoading } = useMedia();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const images = allMedia.filter(m => m.type === 'IMAGE');

  const handleClose = () => { setSelected(new Set()); onClose(); };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    e.target.value = '';
    setUploading(true);
    const uploaded: ApiMedia[] = [];
    for (let i = 0; i < files.length; i++) {
      setUploadProgress(`Uploading ${i + 1}/${files.length}…`);
      try {
        const result = await uploadMedia(files[i], 'projects');
        uploaded.push(result);
      } catch { showToast(`Failed to upload ${files[i].name}`, 'error'); }
    }
    await qc.invalidateQueries({ queryKey: ['media'] });
    setUploading(false);
    setUploadProgress('');
    if (!uploaded.length) return;
    if (multi && onSelectMany) {
      showToast(`${uploaded.length} image${uploaded.length > 1 ? 's' : ''} uploaded and added.`, 'success');
      onSelectMany(uploaded);
      handleClose();
    } else {
      onSelect(uploaded[0]);
      handleClose();
      showToast('Image uploaded and selected.', 'success');
    }
  };

  const toggleSelect = (m: ApiMedia) => {
    if (!multi) { onSelect(m); handleClose(); return; }
    setSelected(prev => {
      const next = new Set(prev);
      next.has(m.id) ? next.delete(m.id) : next.add(m.id);
      return next;
    });
  };

  const confirmMulti = () => {
    if (!selected.size) return;
    const chosen = images.filter(m => selected.has(m.id));
    onSelectMany?.(chosen);
    handleClose();
  };

  return (
    <AdminModal open={open} title={title} onClose={handleClose} size="lg">
      {/* Upload row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input ref={fileRef} type="file" multiple
          accept="image/jpeg,image/png,image/jpg,image/webp"
          className="hidden" onChange={handleUpload}
        />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 rounded-xl border border-[var(--color-glass-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition disabled:opacity-50">
          <Upload size={14} />
          {uploading ? uploadProgress : 'Upload Images'}
        </button>
        <span className="text-xs text-[var(--color-text-muted)]">
          {multi ? 'Upload multiple at once, or click images below to select them.' : 'Or pick an existing image below.'}
        </span>
      </div>

      {isLoading ? <LoadingSpinner /> : images.length === 0 ? (
        <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">No images yet. Upload some above.</p>
      ) : (
        <div className="grid max-h-[52vh] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4">
          {images.map(m => {
            const url = mediaUrl(m.fileUrl);
            const isSelected = selected.has(m.id);
            return (
              <button key={m.id} type="button" onClick={() => toggleSelect(m)}
                className={`relative flex flex-col overflow-hidden rounded-xl transition-all ${
                  isSelected
                    ? 'ring-2 ring-[var(--color-accent-blue)] ring-offset-1 ring-offset-[var(--color-bg-elevated)] opacity-100'
                    : 'glass hover:border-[var(--color-accent-blue)]/60'
                }`}>
                <div className="aspect-square w-full bg-white/3">
                  {url && <img src={url} alt={m.fileName} className="h-full w-full object-cover" />}
                </div>
                {isSelected && (
                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-blue)] text-white text-[10px] font-bold shadow">✓</div>
                )}
                <p className="truncate px-2 py-1 text-left text-xs text-[var(--color-text-secondary)]">{m.fileName}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Multi-select confirm bar */}
      {multi && (
        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-glass-border)] pt-4">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {selected.size === 0 ? 'No images selected' : `${selected.size} image${selected.size > 1 ? 's' : ''} selected`}
          </span>
          <div className="flex gap-3">
            <button type="button" onClick={handleClose}
              className="rounded-xl border border-[var(--color-glass-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition">
              Cancel
            </button>
            <button type="button" onClick={confirmMulti} disabled={selected.size === 0}
              className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40">
              Add {selected.size > 0 ? `${selected.size} ` : ''}Selected
            </button>
          </div>
        </div>
      )}
    </AdminModal>
  );
}

/* ── Images Section ──────────────────────────────────────────────── */
function ProjectImagesSection({ project }: { project: ApiProject }) {
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [thumbPickerOpen, setThumbPickerOpen] = useState(false);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);
  const [working, setWorking] = useState(false);

  const invalidate = () => qc.invalidateQueries({ queryKey: ['projects'] });

  const handleSetThumbnail = async (media: ApiMedia) => {
    setWorking(true);
    try { await setProjectThumbnail(project.id, media.id); await invalidate(); showToast('Thumbnail set.', 'success'); }
    catch { showToast('Failed to set thumbnail.', 'error'); }
    finally { setWorking(false); }
  };

  const handleRemoveThumbnail = async () => {
    setWorking(true);
    try { await removeProjectThumbnail(project.id); await invalidate(); showToast('Thumbnail removed.', 'success'); }
    catch { showToast('Failed to remove thumbnail.', 'error'); }
    finally { setWorking(false); }
  };

  // Add multiple gallery images sequentially
  const handleAddGalleryMany = async (items: ApiMedia[]) => {
    setWorking(true);
    try {
      for (let i = 0; i < items.length; i++) {
        await addProjectGalleryImage(project.id, items[i].id, project.images.length + i);
      }
      await invalidate();
      showToast(`${items.length} image${items.length > 1 ? 's' : ''} added to gallery.`, 'success');
    } catch { showToast('Failed to add some images.', 'error'); }
    finally { setWorking(false); }
  };

  const handleRemoveGallery = async (imageId: string) => {
    setWorking(true);
    try { await removeProjectGalleryImage(project.id, imageId); await invalidate(); showToast('Image removed.', 'success'); }
    catch { showToast('Failed to remove image.', 'error'); }
    finally { setWorking(false); }
  };

  const thumbUrl = mediaUrl(project.thumbnail?.fileUrl);

  return (
    <div className="flex flex-col gap-6">
      {/* Thumbnail */}
      <div>
        <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">
          Thumbnail <span className="text-xs font-normal text-[var(--color-text-muted)]">(shown on project cards)</span>
        </p>
        <div className="flex items-start gap-4">
          <div className="glass flex h-28 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl">
            {thumbUrl
              ? <img src={thumbUrl} alt="thumbnail" className="h-full w-full object-cover" />
              : <div className="flex flex-col items-center gap-1 text-[var(--color-text-muted)]"><ImageIcon size={22} /><span className="text-xs">Not set</span></div>
            }
          </div>
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => setThumbPickerOpen(true)} disabled={working}
              className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
              {project.thumbnail ? 'Change Thumbnail' : 'Set Thumbnail'}
            </button>
            {project.thumbnail && (
              <button type="button" onClick={handleRemoveThumbnail} disabled={working}
                className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            Gallery <span className="text-xs font-normal text-[var(--color-text-muted)]">({project.images.length} images)</span>
          </p>
          <button type="button" onClick={() => setGalleryPickerOpen(true)} disabled={working}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--color-glass-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition disabled:opacity-50">
            <Plus size={13} /> Add Images
          </button>
        </div>
        {project.images.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {project.images.map(img => {
              const url = mediaUrl(img.media.fileUrl);
              return (
                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl">
                  {url && <img src={url} alt="" className="h-full w-full object-cover" />}
                  <button type="button" onClick={() => handleRemoveGallery(img.id)} disabled={working}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500">
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">No gallery images. Click "Add Images" above.</p>
        )}
      </div>

      {/* Pickers */}
      <MediaPickerModal open={thumbPickerOpen} title="Set Thumbnail"
        onClose={() => setThumbPickerOpen(false)} onSelect={handleSetThumbnail} />
      <MediaPickerModal open={galleryPickerOpen} title="Add Gallery Images" multi
        onClose={() => setGalleryPickerOpen(false)}
        onSelect={m => handleAddGalleryMany([m])}
        onSelectMany={handleAddGalleryMany} />
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function AdminProjects() {
  const { data: projects = [], isLoading, isError, refetch } = useProjects();
  const { data: technologies = [] } = useTechnologies();
  const { showToast } = useToast();
  const qc = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'images'>('details');
  const [editing, setEditing] = useState<ApiProject | null>(null);
  const [savedProject, setSavedProject] = useState<ApiProject | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY);

  const openCreate = () => {
    setEditing(null); setSavedProject(null); setForm(EMPTY); setActiveTab('details'); setModalOpen(true);
  };
  const openEdit = (p: ApiProject) => {
    setEditing(p); setSavedProject(p);
    setForm({
      title: p.title, category: p.category, status: p.status, featured: p.featured,
      shortDescription: p.shortDescription, description: p.description,
      githubUrl: p.githubUrl ?? '', liveUrl: p.liveUrl ?? '',
      features: toLines(p.features as string[] | null),
      challenges: toLines(p.challenges as string[] | null),
      learnings: toLines(p.learnings as string[] | null),
      technologyIds: p.technologies.map(t => t.technologyId),
    });
    setActiveTab('details'); setModalOpen(true);
  };

  const toggleTech = (id: string) =>
    setForm(prev => ({
      ...prev,
      technologyIds: prev.technologyIds.includes(id)
        ? prev.technologyIds.filter(t => t !== id)
        : [...prev.technologyIds, id],
    }));

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload: Record<string, unknown> = {
        title: form.title,
        category: form.category,
        status: form.status,
        featured: form.featured,
        shortDescription: form.shortDescription,
        description: form.description,
        features: parseLines(form.features),
        challenges: parseLines(form.challenges),
        learnings: parseLines(form.learnings),
        technologies: form.technologyIds,
      };
      // Only include URL fields when non-empty — Zod rejects null/empty strings
      // on z.string().url().optional() (it accepts undefined OR valid URL, not null/"")
      if (form.githubUrl.trim()) payload.githubUrl = form.githubUrl.trim();
      if (form.liveUrl.trim()) payload.liveUrl = form.liveUrl.trim();
      return editing ? updateProject(editing.id, payload) : createProject(payload);
    },
    onSuccess: (saved) => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      showToast(`Project ${editing ? 'updated' : 'created'}.`, 'success');
      setSavedProject(saved); setEditing(saved); setActiveTab('images');
    },
    onError: (err: unknown) => {
      const errors = (err as { response?: { data?: { errors?: { fieldErrors?: Record<string, string[]> } } } })
        ?.response?.data?.errors?.fieldErrors;
      if (errors) {
        const first = Object.entries(errors)[0];
        showToast(`${first[0]}: ${first[1][0]}`, 'error');
      } else {
        showToast('Failed to save project. Check all required fields.', 'error');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); showToast('Project deleted.', 'success'); },
  });

  const set = (key: keyof ProjectForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const latestSaved = savedProject ? projects.find(p => p.id === savedProject.id) ?? savedProject : null;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const catLabel = (c: ProjectCategory) => CATEGORY_OPTIONS.find(o => o.value === c)?.label ?? c;
  const statLabel = (s: ProjectStatus) => STATUS_OPTIONS.find(o => o.value === s)?.label ?? s;

  return (
    <div>
      <AdminPageHeader title="Projects" description={`${projects.length} project${projects.length !== 1 ? 's' : ''}`}
        action={
          <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90">
            <Plus size={16} /> Add Project
          </button>
        }
      />

      <AdminTable data={projects} keyExtractor={p => p.id} emptyMessage="No projects yet."
        columns={[
          { key: 'thumb', label: '', width: 'w-12', render: p => p.thumbnail
            ? <img src={mediaUrl(p.thumbnail.fileUrl)} alt={p.title} className="h-9 w-9 rounded-lg object-cover" />
            : <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5"><ImageIcon size={14} className="text-[var(--color-text-muted)]" /></div> },
          { key: 'title', label: 'Title', render: p => <span className="font-medium">{p.title}</span> },
          { key: 'category', label: 'Category', render: p => <span className="text-[var(--color-text-secondary)]">{catLabel(p.category)}</span> },
          { key: 'status', label: 'Status', render: p => <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[p.status]}`}>{statLabel(p.status)}</span> },
          { key: 'tech', label: 'Technologies', render: p => <span className="text-xs text-[var(--color-text-muted)]">{p.technologies.length > 0 ? p.technologies.map(t => t.technology.name).join(', ') : '—'}</span> },
          { key: 'featured', label: 'Featured', render: p => p.featured ? <span className="text-xs text-[var(--color-accent-blue)]">Yes</span> : <span className="text-xs text-[var(--color-text-muted)]">No</span> },
          { key: 'actions', label: 'Actions', render: p => <ActionButtons onEdit={() => openEdit(p)} onDelete={() => { if (confirm(`Delete "${p.title}"?`)) deleteMutation.mutate(p.id); }} /> },
        ]}
      />

      <AdminModal open={modalOpen} title={editing ? `Edit: ${editing.title}` : 'Add Project'} onClose={() => setModalOpen(false)} size="lg">
        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-bg-elevated)] p-1">
          <button type="button" onClick={() => setActiveTab('details')}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${activeTab === 'details' ? 'bg-[var(--color-accent-blue)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
            Details
          </button>
          <button type="button"
            onClick={() => { if (latestSaved) setActiveTab('images'); else showToast('Save the project first to manage images.', 'info'); }}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${activeTab === 'images' ? 'bg-[var(--color-accent-blue)] text-white' : latestSaved ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]' : 'cursor-not-allowed opacity-40 text-[var(--color-text-muted)]'}`}>
            Images {latestSaved && `(${(latestSaved.images?.length ?? 0) + (latestSaved.thumbnail ? 1 : 0)})`}
          </button>
        </div>

        {/* Details tab */}
        {activeTab === 'details' && (
          <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Title" required><AdminInput value={form.title} onChange={set('title')} required /></FormField>
              <FormField label="Category" required>
                <AdminSelect value={form.category} options={CATEGORY_OPTIONS} onChange={v => setForm(p => ({ ...p, category: v as ProjectCategory }))} />
              </FormField>
              <FormField label="Status" required>
                <AdminSelect value={form.status} options={STATUS_OPTIONS} onChange={v => setForm(p => ({ ...p, status: v as ProjectStatus }))} />
              </FormField>
              <FormField label="Featured">
                <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
                  Show in featured section
                </label>
              </FormField>
              <FormField label="GitHub URL"><AdminInput value={form.githubUrl} onChange={set('githubUrl')} placeholder="https://github.com/…" /></FormField>
              <FormField label="Live URL"><AdminInput value={form.liveUrl} onChange={set('liveUrl')} placeholder="https://…" /></FormField>
            </div>
            <FormField label="Short Description" required hint="Min 10 characters">
              <AdminInput value={form.shortDescription} onChange={set('shortDescription')} required />
            </FormField>
            <FormField label="Description" required hint="Min 20 characters">
              <AdminTextarea rows={4} value={form.description} onChange={set('description')} required />
            </FormField>
            <FormField label="Technologies" hint="Click to toggle">
              {technologies.length === 0 ? (
                <p className="text-xs text-[var(--color-text-muted)]">No technologies yet. Add them in the Technologies page first.</p>
              ) : (
                <div className="flex flex-wrap gap-2 rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-bg-elevated)] p-3">
                  {technologies.map(tech => {
                    const selected = form.technologyIds.includes(tech.id);
                    return (
                      <button key={tech.id} type="button" onClick={() => toggleTech(tech.id)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                          selected ? 'bg-[var(--color-accent-blue)] text-white' : 'border border-[var(--color-glass-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]'
                        }`}>
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </FormField>
            <FormField label="Features" hint="One per line"><AdminTextarea rows={3} value={form.features} onChange={set('features')} /></FormField>
            <FormField label="Challenges" hint="One per line"><AdminTextarea rows={3} value={form.challenges} onChange={set('challenges')} /></FormField>
            <FormField label="Learnings" hint="One per line"><AdminTextarea rows={3} value={form.learnings} onChange={set('learnings')} /></FormField>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-[var(--color-glass-border)] px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition">Cancel</button>
              <button type="submit" disabled={saveMutation.isPending} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                {saveMutation.isPending ? 'Saving…' : latestSaved ? 'Save Changes' : 'Save & Add Images →'}
              </button>
            </div>
          </form>
        )}

        {/* Images tab */}
        {activeTab === 'images' && latestSaved && (
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <ProjectImagesSection project={latestSaved} />
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Done
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}

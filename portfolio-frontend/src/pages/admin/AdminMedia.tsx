import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, Trash2, FileText, Image, ChevronDown, CheckCircle } from 'lucide-react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { AdminSelect } from '../../components/admin/FormField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { useMedia } from '../../hooks/useMedia';
import { usePortfolio } from '../../hooks/usePortfolio';
import { uploadMedia, deleteMedia } from '../../api/media.api';
import { updatePortfolio } from '../../api/portfolio.api';
import { useToast } from '../../context/ToastContext';
import { mediaUrl } from '../../lib/mediaUrl';
import type { ApiMedia } from '../../types/api';

const FOLDERS = [
  { value: 'temp', label: 'General / Temp' },
  { value: 'profile', label: 'Profile Image' },
  { value: 'workspace', label: 'Workspace Image' },
  { value: 'projects', label: 'Projects' },
  { value: 'certifications', label: 'Certifications' },
  { value: 'achievements', label: 'Achievements' },
  { value: 'resume', label: 'Resume (PDF)' },
] as const;
type Folder = (typeof FOLDERS)[number]['value'];

type AssignField = 'profileImageId' | 'workspaceImageId' | 'resumeId';

const ASSIGN_OPTIONS: { label: string; field: AssignField }[] = [
  { label: 'Set as Profile Image', field: 'profileImageId' },
  { label: 'Set as Workspace Image', field: 'workspaceImageId' },
  { label: 'Set as Resume', field: 'resumeId' },
];

function MediaCard({
  m,
  isProfileImage,
  isWorkspaceImage,
  isResume,
  onDelete,
  onAssign,
  assigning,
}: {
  m: ApiMedia;
  isProfileImage: boolean;
  isWorkspaceImage: boolean;
  isResume: boolean;
  onDelete: (id: string) => void;
  onAssign: (mediaId: string, field: AssignField) => void;
  assigning: boolean;
}) {
  const { showToast } = useToast();
  const url = mediaUrl(m.fileUrl);
  const [menuOpen, setMenuOpen] = useState(false);

  const fmt = (b: number) =>
    b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  const assignedLabel = isProfileImage
    ? 'Profile Image'
    : isWorkspaceImage
    ? 'Workspace Image'
    : isResume
    ? 'Resume'
    : null;

  return (
    <div className="glass group flex flex-col overflow-hidden rounded-2xl transition-all hover:border-[var(--color-accent-blue)]/40">
      {/* Assigned badge */}
      {assignedLabel && (
        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
          <CheckCircle size={12} />
          {assignedLabel}
        </div>
      )}

      {/* Preview */}
      <div className="aspect-square bg-white/3">
        {m.type === 'IMAGE' && url ? (
          <img src={url} alt={m.fileName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {m.type === 'IMAGE'
              ? <Image size={32} className="text-[var(--color-text-muted)]" />
              : <FileText size={32} className="text-[var(--color-text-muted)]" />}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-1">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">{m.fileName}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{fmt(m.fileSize)}</p>
        </div>
        <button
          onClick={() => { if (confirm(`Delete "${m.fileName}"?`)) onDelete(m.id); }}
          className="shrink-0 rounded-lg p-1.5 text-[var(--color-text-muted)] transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Action row */}
      <div className="flex border-t border-white/8">
        {url && (
          <button
            onClick={() => { navigator.clipboard.writeText(url); showToast('URL copied!', 'info'); }}
            className="flex-1 px-2 py-2 text-xs text-[var(--color-text-muted)] transition hover:text-white"
          >
            Copy URL
          </button>
        )}

        <div className="relative border-l border-white/8">
          <button
            onClick={() => setMenuOpen(o => !o)}
            disabled={assigning}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-accent-blue)] transition hover:opacity-80 disabled:opacity-40"
          >
            {assigning ? 'Saving…' : 'Assign'} <ChevronDown size={12} />
          </button>

          {menuOpen && (
            <>
              {/* click-outside trap */}
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute bottom-full right-0 z-20 mb-1 w-48 overflow-hidden rounded-xl border border-white/10 bg-[var(--color-bg-elevated)] shadow-2xl">
                {ASSIGN_OPTIONS.map(({ label, field }) => (
                  <button
                    key={field}
                    onClick={() => { onAssign(m.id, field); setMenuOpen(false); }}
                    className="block w-full px-4 py-2.5 text-left text-xs text-[var(--color-text-secondary)] transition hover:bg-white/8 hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMedia() {
  const { data: media = [], isLoading, isError, refetch } = useMedia();
  const { data: portfolio } = usePortfolio();
  const { showToast } = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [folder, setFolder] = useState<Folder>('temp');
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadMedia(file, folder),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['media'] });
      showToast('File uploaded successfully.', 'success');
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Upload failed.';
      showToast(msg, 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['media'] });
      showToast('File deleted.', 'success');
    },
  });

  const handleAssign = async (mediaId: string, field: AssignField) => {
    setAssigningId(mediaId);
    try {
      await updatePortfolio({ [field]: mediaId });
      // Force a fresh GET /portfolio so public pages see the new image
      await qc.invalidateQueries({ queryKey: ['portfolio'] });
      await qc.refetchQueries({ queryKey: ['portfolio'] });
      const labels: Record<AssignField, string> = {
        profileImageId: 'Profile image',
        workspaceImageId: 'Workspace image',
        resumeId: 'Resume',
      };
      showToast(`✓ ${labels[field]} set! It will now appear on your portfolio.`, 'success');
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      if (status === 401) {
        showToast('Session expired. Please log in again.', 'error');
      } else {
        showToast(msg ?? `Failed to assign (${status ?? 'network error'}).`, 'error');
      }
    } finally {
      setAssigningId(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMutation.mutate(file);
    e.target.value = '';
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <AdminPageHeader
        title="Media"
        description={`${media.length} file${media.length !== 1 ? 's' : ''}`}
        action={
          <div className="flex items-center gap-3">
            {/* Custom themed folder selector */}
            <AdminSelect
              value={folder}
              options={FOLDERS.map(f => ({ value: f.value, label: f.label }))}
              onChange={v => setFolder(v as Folder)}
              className="w-44"
            />
            <input ref={fileRef} type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp,application/pdf"
              className="hidden" onChange={handleFileChange}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploadMutation.isPending}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90 disabled:opacity-50"
            >
              <Upload size={16} />
              {uploadMutation.isPending ? 'Uploading…' : 'Upload File'}
            </button>
          </div>
        }
      />

      {/* Current assignments summary */}
      {portfolio && (
        <div className="glass mb-6 grid gap-4 rounded-2xl p-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-[var(--color-text-muted)] text-xs mb-1">Profile Image</p>
            <p className="font-medium truncate">
              {portfolio.profileImage?.fileName ?? <span className="text-[var(--color-text-muted)]">Not set</span>}
            </p>
          </div>
          <div>
            <p className="text-[var(--color-text-muted)] text-xs mb-1">Workspace Image</p>
            <p className="font-medium truncate">
              {portfolio.workspaceImage?.fileName ?? <span className="text-[var(--color-text-muted)]">Not set</span>}
            </p>
          </div>
          <div>
            <p className="text-[var(--color-text-muted)] text-xs mb-1">Resume</p>
            <p className="font-medium truncate">
              {portfolio.resume?.fileName ?? <span className="text-[var(--color-text-muted)]">Not set</span>}
            </p>
          </div>
        </div>
      )}

      {media.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-[var(--color-text-secondary)]">
          No media files yet. Upload one above.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map(m => (
            <MediaCard
              key={m.id}
              m={m}
              isProfileImage={portfolio?.profileImageId === m.id}
              isWorkspaceImage={portfolio?.workspaceImageId === m.id}
              isResume={portfolio?.resumeId === m.id}
              onDelete={id => deleteMutation.mutate(id)}
              onAssign={handleAssign}
              assigning={assigningId === m.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

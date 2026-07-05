import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ImageIcon, FileText } from 'lucide-react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import FormField, { AdminInput, AdminTextarea } from '../../components/admin/FormField';
import AdminModal from '../../components/admin/AdminModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useMedia } from '../../hooks/useMedia';
import { updatePortfolio } from '../../api/portfolio.api';
import { useToast } from '../../context/ToastContext';
import { mediaUrl } from '../../lib/mediaUrl';
import type { Portfolio, ApiMedia } from '../../types/api';

type TextField = Omit<
  Portfolio,
  | 'id' | 'createdAt' | 'updatedAt'
  | 'profileImage' | 'workspaceImage' | 'resume'
  | 'profileImageId' | 'workspaceImageId' | 'resumeId'
>;

type PickerTarget = 'profileImageId' | 'workspaceImageId' | 'resumeId';

/* ── Image Card ─────────────────────────────────────────────────── */
function ImageCard({
  label, hint, currentMedia, onPick, onClear, isPdf,
}: {
  label: string; hint: string; currentMedia: ApiMedia | null | undefined;
  onPick: () => void; onClear: () => void; isPdf?: boolean;
}) {
  const url = mediaUrl(currentMedia?.fileUrl);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onPick}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition">
            {currentMedia ? 'Change' : 'Select'}
          </button>
          {currentMedia && (
            <button type="button" onClick={onClear}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition">
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="glass flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl">
        {url ? (
          isPdf ? (
            <div className="flex flex-col items-center gap-2 text-[var(--color-text-secondary)]">
              <FileText size={28} />
              <span className="text-xs truncate max-w-[120px]">{currentMedia?.fileName}</span>
            </div>
          ) : (
            <img src={url} alt={label} className="h-full w-full object-cover" />
          )
        ) : (
          <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
            {isPdf ? <FileText size={28} /> : <ImageIcon size={28} />}
            <span className="text-xs">Not set</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Media Picker Modal ─────────────────────────────────────────── */
function MediaPickerModal({
  open, onClose, onSelect, filterType, title,
}: {
  open: boolean; onClose: () => void; onSelect: (m: ApiMedia) => void;
  filterType?: 'IMAGE' | 'PDF'; title: string;
}) {
  const { data: allMedia = [], isLoading } = useMedia();
  const filtered = filterType ? allMedia.filter(m => m.type === filterType) : allMedia;
  return (
    <AdminModal open={open} title={title} onClose={onClose} size="lg">
      {isLoading ? <LoadingSpinner /> : filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">
          No {filterType === 'PDF' ? 'PDFs' : 'images'} uploaded yet. Go to Media and upload one first.
        </p>
      ) : (
        <div className="grid max-h-[60vh] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4">
          {filtered.map(m => {
            const url = mediaUrl(m.fileUrl);
            return (
              <button key={m.id} type="button" onClick={() => onSelect(m)}
                className="glass flex flex-col overflow-hidden rounded-xl transition hover:border-[var(--color-accent-blue)]/60">
                <div className="aspect-square w-full bg-white/3">
                  {m.type === 'IMAGE' && url
                    ? <img src={url} alt={m.fileName} className="h-full w-full object-cover" />
                    : <div className="flex h-full w-full items-center justify-center">
                        <FileText size={24} className="text-[var(--color-text-muted)]" />
                      </div>
                  }
                </div>
                <p className="truncate px-2 py-1.5 text-left text-xs text-[var(--color-text-secondary)]">
                  {m.fileName}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </AdminModal>
  );
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function AdminPortfolio() {
  const { data: portfolio, isLoading, isError, refetch } = usePortfolio();
  const { showToast } = useToast();
  const qc = useQueryClient();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<TextField>>({});
  const initializedRef = useRef(false);

  // Separate override state for images — these are NOT reset when portfolio refetches
  const [imageOverrides, setImageOverrides] = useState<{
    profileImageId?: ApiMedia | null;
    workspaceImageId?: ApiMedia | null;
    resumeId?: ApiMedia | null;
  }>({});

  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerTargetRef = useRef<PickerTarget>('profileImageId');
  const [pickerFilter, setPickerFilter] = useState<'IMAGE' | 'PDF'>('IMAGE');

  // Only populate form on FIRST load — never overwrite after that
  useEffect(() => {
    if (!portfolio || initializedRef.current) return;
    initializedRef.current = true;
    setForm({
      heroTitle: portfolio.heroTitle ?? '',
      heroSubtitle: portfolio.heroSubtitle ?? '',
      heroDescription: portfolio.heroDescription ?? '',
      aboutTitle: portfolio.aboutTitle ?? '',
      aboutDescription: portfolio.aboutDescription ?? '',
      github: portfolio.github ?? '',
      linkedin: portfolio.linkedin ?? '',
      x: portfolio.x ?? '',
      instagram: portfolio.instagram ?? '',
      email: portfolio.email ?? '',
      phone: portfolio.phone ?? '',
      address: portfolio.address ?? '',
      footerText: portfolio.footerText ?? '',
      metaTitle: portfolio.metaTitle ?? '',
      metaDescription: portfolio.metaDescription ?? '',
      keywords: portfolio.keywords ?? '',
    });
  }, [portfolio]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  // Resolve current image: override takes priority, then portfolio data
  const currentProfileImage =
    'profileImageId' in imageOverrides
      ? imageOverrides.profileImageId
      : portfolio?.profileImage ?? null;

  const currentWorkspaceImage =
    'workspaceImageId' in imageOverrides
      ? imageOverrides.workspaceImageId
      : portfolio?.workspaceImage ?? null;

  const currentResume =
    'resumeId' in imageOverrides
      ? imageOverrides.resumeId
      : portfolio?.resume ?? null;

  const set = (key: keyof TextField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const openPicker = (target: PickerTarget) => {
    pickerTargetRef.current = target;
    setPickerFilter(target === 'resumeId' ? 'PDF' : 'IMAGE');
    setPickerOpen(true);
  };

  const handleMediaSelect = async (media: ApiMedia) => {
    const target = pickerTargetRef.current;
    setPickerOpen(false);

    // Set override immediately — this drives the preview
    setImageOverrides(prev => ({ ...prev, [target]: media }));

    try {
      await updatePortfolio({ [target]: media.id });
      // Invalidate silently in background — don't await so it can't reset our override
      qc.invalidateQueries({ queryKey: ['portfolio'] });
      showToast('Image updated successfully.', 'success');
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Failed to update image. Please try again.';
      showToast(msg, 'error');
      // Revert override on failure
      setImageOverrides(prev => {
        const next = { ...prev };
        delete next[target];
        return next;
      });
    }
  };

  const clearImage = async (target: PickerTarget) => {
    setImageOverrides(prev => ({ ...prev, [target]: null }));
    try {
      await updatePortfolio({ [target]: null });
      qc.invalidateQueries({ queryKey: ['portfolio'] });
      showToast('Image removed.', 'success');
    } catch {
      showToast('Failed to remove image.', 'error');
      setImageOverrides(prev => {
        const next = { ...prev };
        delete next[target];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === '' ? null : v]),
      );
      await updatePortfolio(payload as Partial<Portfolio>);
      qc.invalidateQueries({ queryKey: ['portfolio'] });
      showToast('Portfolio saved successfully.', 'success');
    } catch {
      showToast('Failed to save. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const pickerTitles: Record<PickerTarget, string> = {
    profileImageId: 'Select Profile Image',
    workspaceImageId: 'Select Workspace Image',
    resumeId: 'Select Resume PDF',
  };

  return (
    <div>
      <AdminPageHeader
        title="Portfolio Settings"
        description="Manage images, hero text, about section, social links, and SEO."
      />

      {/* Images — save on pick */}
      <section className="glass mb-8 max-w-2xl rounded-2xl p-6">
        <h2 className="mb-5 font-semibold text-[var(--color-accent-blue)]">Images & Resume</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <ImageCard
            label="Profile Image"
            hint="Hero & About sections"
            currentMedia={currentProfileImage}
            onPick={() => openPicker('profileImageId')}
            onClear={() => clearImage('profileImageId')}
          />
          <ImageCard
            label="Workspace Image"
            hint="Hero background"
            currentMedia={currentWorkspaceImage}
            onPick={() => openPicker('workspaceImageId')}
            onClear={() => clearImage('workspaceImageId')}
          />
          <ImageCard
            label="Resume PDF"
            hint="Navbar & hero download"
            currentMedia={currentResume}
            onPick={() => openPicker('resumeId')}
            onClear={() => clearImage('resumeId')}
            isPdf
          />
        </div>
      </section>

      {/* Text fields — save via Submit */}
      <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-8">
        <section className="glass rounded-2xl p-6">
          <h2 className="mb-4 font-semibold text-[var(--color-accent-blue)]">Hero Section</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Hero Title">
              <AdminInput value={form.heroTitle ?? ''} onChange={set('heroTitle')} placeholder="Hi, I'm Bhavya Agrawal" />
            </FormField>
            <FormField label="Hero Subtitle">
              <AdminInput value={form.heroSubtitle ?? ''} onChange={set('heroSubtitle')} placeholder="Full Stack Developer • Backend Developer" />
            </FormField>
            <FormField label="Hero Description">
              <AdminTextarea rows={4} value={form.heroDescription ?? ''} onChange={set('heroDescription')} />
            </FormField>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="mb-4 font-semibold text-[var(--color-accent-blue)]">About Section</h2>
          <div className="flex flex-col gap-4">
            <FormField label="About Title">
              <AdminInput value={form.aboutTitle ?? ''} onChange={set('aboutTitle')} />
            </FormField>
            <FormField label="About Description">
              <AdminTextarea rows={6} value={form.aboutDescription ?? ''} onChange={set('aboutDescription')} />
            </FormField>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="mb-4 font-semibold text-[var(--color-accent-blue)]">Contact & Socials</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Email"><AdminInput value={form.email ?? ''} onChange={set('email')} placeholder="you@example.com" /></FormField>
            <FormField label="Phone"><AdminInput value={form.phone ?? ''} onChange={set('phone')} /></FormField>
            <FormField label="GitHub URL"><AdminInput value={form.github ?? ''} onChange={set('github')} placeholder="https://github.com/…" /></FormField>
            <FormField label="LinkedIn URL"><AdminInput value={form.linkedin ?? ''} onChange={set('linkedin')} placeholder="https://linkedin.com/in/…" /></FormField>
            <FormField label="X / Twitter URL"><AdminInput value={form.x ?? ''} onChange={set('x')} placeholder="https://x.com/…" /></FormField>
            <FormField label="Instagram URL"><AdminInput value={form.instagram ?? ''} onChange={set('instagram')} placeholder="https://instagram.com/…" /></FormField>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="mb-4 font-semibold text-[var(--color-accent-blue)]">Footer</h2>
          <FormField label="Footer Text">
            <AdminTextarea rows={3} value={form.footerText ?? ''} onChange={set('footerText')} />
          </FormField>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="mb-4 font-semibold text-[var(--color-accent-blue)]">SEO Metadata</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Meta Title"><AdminInput value={form.metaTitle ?? ''} onChange={set('metaTitle')} /></FormField>
            <FormField label="Meta Description"><AdminTextarea rows={3} value={form.metaDescription ?? ''} onChange={set('metaDescription')} /></FormField>
            <FormField label="Keywords" hint="Comma-separated"><AdminInput value={form.keywords ?? ''} onChange={set('keywords')} /></FormField>
          </div>
        </section>

        <button type="submit" disabled={saving}
          className="self-start rounded-xl bg-[var(--color-accent-blue)] px-6 py-3 text-sm font-semibold text-[var(--color-bg-base)] transition hover:opacity-90 disabled:opacity-50">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>

      <MediaPickerModal
        open={pickerOpen}
        title={pickerTitles[pickerTargetRef.current]}
        onClose={() => setPickerOpen(false)}
        onSelect={handleMediaSelect}
        filterType={pickerFilter}
      />
    </div>
  );
}

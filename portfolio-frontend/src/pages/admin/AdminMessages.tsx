import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminModal from '../../components/admin/AdminModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { fetchAllMessages, markMessageRead, deleteMessage } from '../../api/contact.api';
import { useToast } from '../../context/ToastContext';
import type { ApiContactMessage } from '../../types/api';

export default function AdminMessages() {
  const { data: messages = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchAllMessages,
    staleTime: 30_000,
  });
  const { showToast } = useToast();
  const qc = useQueryClient();
  const [selected, setSelected] = useState<ApiContactMessage | null>(null);

  const readMutation = useMutation({
    mutationFn: (id: string) => markMessageRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['messages'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      showToast('Message deleted.', 'success');
      setSelected(null);
    },
    onError: () => showToast('Failed to delete.', 'error'),
  });

  const openMessage = (m: ApiContactMessage) => {
    setSelected(m);
    if (!m.isRead) readMutation.mutate(m.id);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description={`${messages.length} total${unread > 0 ? ` · ${unread} unread` : ''}`}
      />

      {messages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-[var(--color-text-secondary)]">
          No messages yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => openMessage(m)}
              className={`glass flex items-start gap-4 rounded-2xl p-4 text-left transition-all hover:border-[var(--color-accent-blue)]/40 ${!m.isRead ? 'border-[var(--color-accent-blue)]/20 bg-[var(--color-accent-blue)]/5' : ''}`}
            >
              <div className="mt-0.5 shrink-0">
                {m.isRead
                  ? <MailOpen size={18} className="text-[var(--color-text-muted)]" />
                  : <Mail size={18} className="text-[var(--color-accent-blue)]" />
                }
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-medium ${!m.isRead ? 'text-white' : 'text-[var(--color-text-secondary)]'}`}>
                    {m.name}
                  </span>
                  <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                    {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">{m.email}</p>
                {m.subject && <p className="mt-1 text-sm font-medium">{m.subject}</p>}
                <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-secondary)]">{m.message}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      <AdminModal
        open={Boolean(selected)}
        title={selected?.subject || `Message from ${selected?.name}`}
        onClose={() => setSelected(null)}
        size="lg"
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <p className="text-[var(--color-text-muted)]">From</p>
                <p className="font-medium">{selected.name}</p>
              </div>
              <div>
                <p className="text-[var(--color-text-muted)]">Email</p>
                <a href={`mailto:${selected.email}`} className="font-medium text-[var(--color-accent-blue)]">
                  {selected.email}
                </a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-[var(--color-text-muted)]">Phone</p>
                  <p className="font-medium">{selected.phone}</p>
                </div>
              )}
              <div>
                <p className="text-[var(--color-text-muted)]">Received</p>
                <p className="font-medium">
                  {new Date(selected.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/3 p-4 text-sm leading-7 text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {selected.message}
            </div>

            <div className="flex justify-between gap-3 pt-2">
              <button
                onClick={() => { if (confirm('Delete this message?')) deleteMutation.mutate(selected.id); }}
                disabled={deleteMutation.isPending}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={14} /> Delete
              </button>
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent('🚀 Project Enquiry | Bhavya Portfolio Response')}&body=${encodeURIComponent(
                  `\n\n---\nOriginal Message:\nFrom: ${selected.name} (${selected.email})\nSent: ${new Date(selected.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}\nSubject: ${selected.subject || 'None'}\n\n${selected.message}`
                )}`}
                className="rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] hover:opacity-90"
              >
                Reply
              </a>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}

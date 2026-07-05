import { Link } from 'react-router-dom';
import { FolderKanban, Code2, GraduationCap, Award, MessageSquare, Image, Cpu, Briefcase, Trophy } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { mediaUrl } from '../../lib/mediaUrl';

const STAT_CONFIG = [
  { key: 'projects', label: 'Projects', icon: FolderKanban, to: '/admin/projects' },
  { key: 'skills', label: 'Skills', icon: Code2, to: '/admin/skills' },
  { key: 'technologies', label: 'Technologies', icon: Cpu, to: '/admin/technologies' },
  { key: 'education', label: 'Education', icon: GraduationCap, to: '/admin/education' },
  { key: 'internships', label: 'Internships', icon: Briefcase, to: '/admin/internships' },
  { key: 'certifications', label: 'Certifications', icon: Award, to: '/admin/certifications' },
  { key: 'achievements', label: 'Achievements', icon: Trophy, to: '/admin/achievements' },
  { key: 'contactMessages', label: 'Messages', icon: MessageSquare, to: '/admin/messages' },
  { key: 'media', label: 'Media Files', icon: Image, to: '/admin/media' },
] as const;

export default function AdminDashboard() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) return <LoadingSpinner message="Loading dashboard…" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const { stats, recentProjects, recentMessages } = data!;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your portfolio CMS."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {STAT_CONFIG.map(({ key, label, icon: Icon, to }) => (
          <Link
            key={key}
            to={to}
            className="glass flex flex-col gap-3 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40"
          >
            <Icon size={20} className="text-[var(--color-accent-blue)]" />
            <span className="text-2xl font-bold">{stats[key]}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>
          </Link>
        ))}

        {stats.unreadMessages > 0 && (
          <Link
            to="/admin/messages"
            className="glass flex flex-col gap-3 rounded-2xl border-amber-500/30 bg-amber-500/5 p-5 transition-all duration-200 hover:-translate-y-1"
          >
            <MessageSquare size={20} className="text-amber-400" />
            <span className="text-2xl font-bold text-amber-400">{stats.unreadMessages}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">Unread Messages</span>
          </Link>
        )}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Recent projects */}
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 font-semibold">Recent Projects</h2>
          {recentProjects.length === 0 ? (
            <p className="text-sm text-[var(--color-text-secondary)]">No projects yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {recentProjects.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  {p.thumbnail ? (
                    <img
                      src={mediaUrl(p.thumbnail.fileUrl)}
                      alt={p.title}
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                      <FolderKanban size={16} className="text-[var(--color-text-muted)]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{p.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent messages */}
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 font-semibold">Recent Messages</h2>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-[var(--color-text-secondary)]">No messages yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {recentMessages.map((m) => (
                <li key={m.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{m.name}</p>
                    {!m.isRead && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-[var(--color-text-secondary)]">
                    {m.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

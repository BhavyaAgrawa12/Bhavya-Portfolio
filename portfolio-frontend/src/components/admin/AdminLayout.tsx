import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  MessageSquare,
  Image,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/portfolio', label: 'Portfolio', icon: User },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/skills', label: 'Skills', icon: Code2 },
  { to: '/admin/technologies', label: 'Technologies', icon: Cpu },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/internships', label: 'Internships', icon: Briefcase },
  { to: '/admin/certifications', label: 'Certifications', icon: Award },
  { to: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/media', label: 'Media', icon: Image },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully.', 'info');
    navigate('/admin/login');
  };

  const Sidebar = (
    <aside className="flex h-full w-64 flex-col border-r border-white/8 bg-[var(--color-bg-surface)]">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-white/8 px-5">
        <img src="/logo.png" alt="BA Logo" className="h-8 w-auto" />
        <span className="font-semibold">Admin Panel</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--color-accent-blue)]/15 font-semibold text-[var(--color-accent-blue)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-white/8 px-4 py-4">
        <p className="text-xs text-[var(--color-text-muted)]">Signed in as</p>
        <p className="mt-0.5 truncate text-sm font-medium">{admin?.username}</p>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-[var(--color-text-secondary)] transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-base)]">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">{Sidebar}</div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 flex h-full">{Sidebar}</div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex h-16 items-center justify-between border-b border-white/8 bg-[var(--color-bg-surface)] px-5 md:hidden">
          <img src="/logo.png" alt="BA Logo" className="h-8 w-auto" />
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-xl p-2 hover:bg-white/5"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

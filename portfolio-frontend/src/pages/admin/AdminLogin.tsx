import { useState, type FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Already logged in — go straight to dashboard
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      showToast('Welcome back!', 'success');
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Invalid email or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-base)] px-4">
      <div className="glass w-full max-w-sm rounded-3xl p-8">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Sign in to manage your portfolio.
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 border border-red-500/20">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="glass w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent-blue)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="glass w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent-blue)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-[var(--color-accent-blue)] px-4 py-3 text-sm font-semibold text-[var(--color-bg-base)] transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

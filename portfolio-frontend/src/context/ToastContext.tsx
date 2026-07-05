import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TYPE_STYLES: Record<ToastType, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  error: 'border-red-500/30 bg-red-500/10 text-red-300',
  info: 'border-[var(--color-accent-blue)]/30 bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismiss }}>
      {children}

      {/* Toast container — fixed bottom-right, renders above everything */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`glass flex min-w-[260px] max-w-sm items-start justify-between gap-3 rounded-2xl border px-5 py-4 text-sm shadow-xl transition-all duration-300 ${TYPE_STYLES[t.type]}`}
          >
            <span>{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="mt-0.5 shrink-0 opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

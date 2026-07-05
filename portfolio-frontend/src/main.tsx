import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Show stale data while refetching — keeps UI snappy
      staleTime: 60_000,
      // Don't retry on 404/401 — these are intentional
      retry: (failureCount, error: unknown) => {
        const status = (error as { response?: { status: number } })?.response?.status;
        if (status === 404 || status === 401 || status === 403) return false;
        return failureCount < 2;
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

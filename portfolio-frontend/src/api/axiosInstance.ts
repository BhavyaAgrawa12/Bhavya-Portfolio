import axios from 'axios';

/**
 * Singleton Axios instance for all API calls.
 * - Base URL pulled from env so it never changes in multiple places.
 * - Request interceptor automatically attaches the JWT stored in localStorage.
 * - Response interceptor unwraps the ApiResponse envelope ({ success, data })
 *   so every caller receives `data` directly instead of the raw envelope.
 * - On 401 the stored token is cleared and the user is redirected to /admin/login.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    // Prevent browsers and proxies from returning cached 304 responses
    // for API calls. Without this, GET /portfolio returns 304 after a
    // PATCH and the frontend never sees the updated profileImageId.
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

/* ------------------------------------------------------------------ */
/* Request interceptor – attach Bearer token when present              */
/* ------------------------------------------------------------------ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ------------------------------------------------------------------ */
/* Response interceptor – unwrap envelope, handle auth errors          */
/* ------------------------------------------------------------------ */
api.interceptors.response.use(
  (response) => {
    // Backend always returns { success, statusCode, message, data }
    // Return the raw response so callers can access .data.data if needed,
    // but also provide a convenience: response.data IS the envelope.
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_admin_token');
      // Only redirect if we're inside an /admin route to avoid breaking public pages
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;

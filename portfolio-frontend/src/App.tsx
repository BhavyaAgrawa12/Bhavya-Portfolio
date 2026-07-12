import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/admin/ProtectedRoute';
import StartupLoader from './components/common/StartupLoader';

// Lazy-load admin pages — they're only needed when the admin visits /admin/*
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolio'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminSkills = lazy(() => import('./pages/admin/AdminSkills'));
const AdminTechnologies = lazy(() => import('./pages/admin/AdminTechnologies'));
const AdminEducation = lazy(() => import('./pages/admin/AdminEducation'));
const AdminInternships = lazy(() => import('./pages/admin/AdminInternships'));
const AdminCertifications = lazy(() => import('./pages/admin/AdminCertifications'));
const AdminAchievements = lazy(() => import('./pages/admin/AdminAchievements'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminMedia = lazy(() => import('./pages/admin/AdminMedia'));

const AdminFallback = <div className="flex h-screen items-center justify-center"><LoadingSpinner /></div>;

export default function App() {
  return (
    <StartupLoader>
      <Routes>
      {/* Public portfolio routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/projects"
        element={
          <Layout>
            <Projects />
          </Layout>
        }
      />
      <Route
        path="/projects/:slug"
        element={
          <Layout>
            <ProjectDetail />
          </Layout>
        }
      />
      <Route
        path="/experience"
        element={
          <Layout>
            <Experience />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />

      {/* Admin auth — no layout wrapper */}
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={AdminFallback}>
            <AdminLogin />
          </Suspense>
        }
      />

      {/* Admin panel — protected, lazy loaded */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={AdminFallback}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route index element={<Suspense fallback={AdminFallback}><AdminDashboard /></Suspense>} />
        <Route path="portfolio" element={<Suspense fallback={AdminFallback}><AdminPortfolio /></Suspense>} />
        <Route path="projects" element={<Suspense fallback={AdminFallback}><AdminProjects /></Suspense>} />
        <Route path="skills" element={<Suspense fallback={AdminFallback}><AdminSkills /></Suspense>} />
        <Route path="technologies" element={<Suspense fallback={AdminFallback}><AdminTechnologies /></Suspense>} />
        <Route path="education" element={<Suspense fallback={AdminFallback}><AdminEducation /></Suspense>} />
        <Route path="internships" element={<Suspense fallback={AdminFallback}><AdminInternships /></Suspense>} />
        <Route path="certifications" element={<Suspense fallback={AdminFallback}><AdminCertifications /></Suspense>} />
        <Route path="achievements" element={<Suspense fallback={AdminFallback}><AdminAchievements /></Suspense>} />
        <Route path="messages" element={<Suspense fallback={AdminFallback}><AdminMessages /></Suspense>} />
        <Route path="media" element={<Suspense fallback={AdminFallback}><AdminMedia /></Suspense>} />
      </Route>

      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
      </Routes>
    </StartupLoader>
  );
}

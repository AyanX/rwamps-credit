import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastContainer } from './components/Toast';
import { PuffLoader } from 'react-spinners';
import Layout from './components/Layout';
import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/Login';
import ErrorPage from './pages/error/ErrorPage';

const ProductsPage = lazy(() => import('./pages/products/ProductsPage'));
const ContactsPage = lazy(() => import('./pages/contacts/ContactsPage'));
const MessagesPage = lazy(() => import('./pages/messages/MessagesPage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const LoansPage = lazy(() => import('./pages/loans/LoansPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/reset-password/ResetPasswordPage'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <PuffLoader color="#22C55E" size={60} />
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const LazyWrap = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<LazyWrap><ForgotPasswordPage /></LazyWrap>} />
      <Route path="/reset-password" element={<LazyWrap><ResetPasswordPage /></LazyWrap>} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DataProvider>
              <Layout />
            </DataProvider>
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
      >
        <Route index element={<HomePage />} />
        <Route path="products" element={<LazyWrap><ProductsPage /></LazyWrap>} />
        <Route path="contacts" element={<LazyWrap><ContactsPage /></LazyWrap>} />
        <Route path="messages" element={<LazyWrap><MessagesPage /></LazyWrap>} />
        <Route path="about" element={<LazyWrap><AboutPage /></LazyWrap>} />
        <Route path="services" element={<LazyWrap><ServicesPage /></LazyWrap>} />
        <Route path="loans" element={<LazyWrap><LoansPage /></LazyWrap>} />
        <Route path="settings" element={<LazyWrap><SettingsPage /></LazyWrap>} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const App = () => (
  <AuthProvider>
    <ToastContainer />
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;

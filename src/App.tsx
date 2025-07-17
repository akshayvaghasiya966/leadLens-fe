import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { useAuthCheck } from './hooks/useAuthCheck';
import Overview from './pages/Overview';
import Campaigns from './pages/Campaigns';
import Leads from './pages/Leads';
import AiInsights from './pages/AiInsights';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';

const ProtectedRoute = () => {
  const { user, loading } = useAuthCheck();
  if (loading) return null;
  if (!user) return <Navigate to="/sign-in" replace />;
  return <Outlet />;
};

const PublicRoute = () => {
  const user = useSelector((state: RootState) => state.userData);
  const location = useLocation();
  if (user?._id) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};



function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
          <Route element={<PublicRoute />}>
         
          <Route path="/sign-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
         <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Protected routes */}
            <Route
              path="/"
              element={
                   <Overview />
              }
            />
            <Route
              path="/campaigns"
              element={
                   <Campaigns />
              }
            />
            <Route
              path="/leads"
              element={
                   <Leads />
              }
            />
            <Route
              path="/ai-insights"
              element={
                   <AiInsights />
              }
            />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

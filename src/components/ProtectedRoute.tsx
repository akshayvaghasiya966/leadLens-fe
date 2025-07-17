import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { LayoutProps } from '@/types/ui';

const ProtectedRoute = ({ children }: LayoutProps) => {
  const { _id } = useSelector((state: RootState) => state.userData);
  const location = useLocation();

  if (!_id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 
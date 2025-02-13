import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Debug logs
  console.log('Authentication status:', isAuthenticated);
  console.log('Current token:', localStorage.getItem('authToken'));
  console.log('Current role:', localStorage.getItem('role'));

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Get role from localStorage
  const userRole = localStorage.getItem('role');
  
  // Check if user has permission
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/home'} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
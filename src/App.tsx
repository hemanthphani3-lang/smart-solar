import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import PublicAnalytics from './pages/public/Analytics';
import InstallationsMap from './pages/public/Map';
import Login from './pages/auth/Login';

// Dashboards
import ProducerDashboard from './pages/dashboard/Producer';
import HandlerDashboard from './pages/dashboard/Handler';
import ConsumerDashboard from './pages/dashboard/Consumer';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/analytics" element={<PublicAnalytics />} />
            <Route path="/map" element={<InstallationsMap />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard Routes */}
            <Route 
              path="/dashboard/producer/*" 
              element={
                <ProtectedRoute allowedRoles={['producer']}>
                  <ProducerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/handler/*" 
              element={
                <ProtectedRoute allowedRoles={['handler']}>
                  <HandlerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/consumer/*" 
              element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <ConsumerDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

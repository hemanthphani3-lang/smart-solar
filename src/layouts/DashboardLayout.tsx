import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sun, LayoutDashboard, Users, Zap, 
  BarChart3, Settings, LogOut, Bell, Search, 
  Menu, X, Map as MapIcon, Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const producerLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/producer' },
    { name: 'Handlers', icon: Users, path: '/dashboard/producer/handlers' },
    { name: 'Live Map', icon: MapIcon, path: '/dashboard/producer/map' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/producer/analytics' },
    { name: 'Reports', icon: Wallet, path: '/dashboard/producer/reports' },
  ];

  const handlerLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/handler' },
    { name: 'Consumers', icon: Users, path: '/dashboard/handler/consumers' },
    { name: 'Billing', icon: Wallet, path: '/dashboard/handler/billing' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/handler/analytics' },
  ];

  const consumerLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/consumer' },
    { name: 'Usage History', icon: BarChart3, path: '/dashboard/consumer/usage' },
    { name: 'Billing', icon: Wallet, path: '/dashboard/consumer/billing' },
  ];

  const links = user?.role === 'producer' ? producerLinks : user?.role === 'handler' ? handlerLinks : consumerLinks;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: isSidebarOpen ? '280px' : '80px', 
        borderRight: '1px solid var(--border-glass)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition-smooth)',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        background: 'var(--bg-dark)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', overflow: 'hidden' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.75rem' }}>
            <Sun size={24} color="white" />
          </div>
          {isSidebarOpen && (
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', whiteSpace: 'nowrap' }}>
              SolarSync
            </span>
          )}
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '0.875rem', 
                borderRadius: '0.75rem',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)',
                background: location.pathname === link.path ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                transition: 'var(--transition-smooth)',
                overflow: 'hidden'
              }}
            >
              <link.icon size={20} />
              {isSidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{link.name}</span>}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.875rem', 
              color: 'var(--text-secondary)'
            }}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen && <span>Collapse</span>}
          </button>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.875rem', 
              color: '#ef4444',
              overflow: 'hidden'
            }}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: isSidebarOpen ? '280px' : '80px', 
        transition: 'var(--transition-smooth)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header style={{ 
          height: '70px', 
          borderBottom: '1px solid var(--border-glass)', 
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(2, 6, 23, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ 
                  width: '100%', 
                  padding: '0.6rem 1rem 0.6rem 3rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--border-glass)', 
                  borderRadius: '2rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ color: 'var(--text-secondary)', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user?.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user?.role}</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main style={{ padding: '2rem', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

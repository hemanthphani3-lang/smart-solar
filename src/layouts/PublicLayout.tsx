import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Map', path: '/map' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 50, 
        padding: '1rem 2rem',
        background: 'rgba(2, 6, 23, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sun className="text-primary" size={32} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
            Solar<span style={{ color: 'var(--primary)' }}>Sync</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-only">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              style={{ 
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'var(--transition-smooth)'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogIn size={18} />
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-only" style={{ color: 'var(--text-primary)' }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'fixed', 
              top: '70px', 
              width: '100%', 
              background: 'var(--bg-dark)', 
              zIndex: 40,
              padding: '2rem',
              borderBottom: '1px solid var(--border-glass)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: '1.2rem' }}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--primary)' }}>Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flex: 1, paddingTop: '80px' }}>
        {children}
      </main>

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sun className="text-primary" size={24} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>SolarSync</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Accelerating the world's transition to decentralized renewable energy.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Link to="/analytics">Analytics</Link>
              <Link to="/map">Live Map</Link>
              <Link to="/about">Our Vision</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          © 2026 SolarSync. All rights reserved.
        </div>
      </footer>
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PublicLayout;

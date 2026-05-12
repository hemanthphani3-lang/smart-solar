import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { Sun, Shield, Zap, User, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('consumer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email || 'demo@solarsync.com', role);
      navigate(`/dashboard/${role}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles: { id: UserRole; label: string; icon: any; desc: string }[] = [
    { id: 'producer', label: 'Producer', icon: Shield, desc: 'Manage the entire grid and all handlers.' },
    { id: 'handler', label: 'Handler', icon: Zap, desc: 'Distribute energy to local consumers.' },
    { id: 'consumer', label: 'Consumer', icon: User, desc: 'Track your usage and pay bills.' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem',
      background: 'radial-gradient(circle at top right, rgba(6, 182, 212, 0.1), transparent), radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.1), transparent)'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Sun size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to manage your solar ecosystem</p>
        </div>

        <Card className="glass-card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem 0.75rem 3rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--border-glass)', 
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select Your Role</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1rem', 
                      borderRadius: '0.75rem',
                      background: role === r.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                      border: `1px solid ${role === r.id ? 'var(--primary)' : 'var(--border-glass)'}`,
                      textAlign: 'left',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      background: role === r.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      color: role === r.id ? 'white' : 'var(--text-secondary)'
                    }}>
                      <r.icon size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: role === r.id ? 'white' : 'var(--text-primary)' }}>{r.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="glass-button" 
              style={{ 
                width: '100%', 
                background: 'var(--primary)', 
                color: 'white', 
                fontWeight: 'bold', 
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? 'Authenticating...' : (
                <>
                  Sign In <Lock size={18} />
                </>
              )}
            </button>
          </form>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Contact Administrator</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

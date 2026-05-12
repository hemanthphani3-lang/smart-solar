import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import { useData } from '../../context/DataContext';
import { 
  Users, Zap, DollarSign, Plus, 
  Trash2, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HandlerDashboard = () => {
  const { consumers, handlers, addConsumer, removeConsumer } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
    'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar',
    'Aurangabad', 'Dhanbad', 'Amritsar', 'Ranchi', 'Howrah', 'Jabalpur', 'Gwalior',
    'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh'
  ];
  const [newConsumer, setNewConsumer] = useState({ name: '', location: 'Mumbai, India', meter_id: '' });

  // Mock handler ID for this user
  const handlerId = 'h1';
  const handler = handlers.find(h => h.id === handlerId);
  const myConsumers = consumers.filter(c => c.handler_id === handlerId);
  
  const totalSupplied = myConsumers.reduce((acc, c) => acc + c.current_usage, 0);
  const totalRevenue = totalSupplied * 8;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (myConsumers.length >= 4) return;
    addConsumer(handlerId, {
      ...newConsumer,
      handler_id: handlerId,
      current_usage: 0,
      total_cost: 0
    });
    setShowAddModal(false);
    setNewConsumer({ name: '', location: 'Mumbai, India', meter_id: '' });
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Handler Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Managing energy distribution for {handler?.name}.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          disabled={myConsumers.length >= 4}
          className="glass-button" 
          style={{ 
            background: 'var(--primary)', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            opacity: myConsumers.length >= 4 ? 0.5 : 1
          }}
        >
          <Plus size={18} /> Add Consumer
        </button>
      </div>

      {myConsumers.length >= 4 && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid #ef4444', 
          padding: '1rem', 
          borderRadius: '0.75rem', 
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <AlertCircle size={20} />
          <span>Consumer limit reached (Maximum 4 consumers allowed per handler).</span>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card title="Connected Consumers">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users size={32} style={{ color: 'var(--primary)' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{myConsumers.length} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ 4</span></div>
          </div>
        </Card>
        <Card title="Total Supplied">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Zap size={32} style={{ color: 'var(--secondary)' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalSupplied.toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>kWh</span></div>
          </div>
        </Card>
        <Card title="Revenue Earned">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <DollarSign size={32} style={{ color: '#eab308' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>${totalRevenue.toLocaleString()}</div>
          </div>
        </Card>
      </div>

      {/* Consumer Table */}
      <Card title="Manage Consumers">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-glass)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Consumer Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>ID / Meter</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Usage (kWh)</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Current Cost</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myConsumers.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{(c as any).location || 'India'}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.875rem' }}>{c.unique_id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.meter_id}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                    {c.current_usage.toFixed(1)}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                    ${c.total_cost.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', fontSize: '0.75rem' }}>Active</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => removeConsumer(c.id)}
                      style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {myConsumers.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No consumers connected yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.8)', zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ width: '100%', maxWidth: '500px', padding: '1rem' }}
            >
              <Card title="Add New Consumer">
                <form onSubmit={handleAdd}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={newConsumer.name}
                      onChange={e => setNewConsumer({...newConsumer, name: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem', color: 'white' }} 
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Location (City)</label>
                    <select
                      required
                      value={newConsumer.location}
                      onChange={e => setNewConsumer({...newConsumer, location: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem', color: 'white' }}
                    >
                      {indianCities.map(city => (
                        <option key={city} value={`${city}, India`} style={{ background: 'var(--bg-dark)' }}>{city}, India</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Meter ID</label>
                    <input 
                      required
                      type="text" 
                      value={newConsumer.meter_id}
                      onChange={e => setNewConsumer({...newConsumer, meter_id: e.target.value})}
                      placeholder="MTR-XXXX"
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem', color: 'white' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="button" onClick={() => setShowAddModal(false)} className="glass-button" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="glass-button" style={{ flex: 1, background: 'var(--primary)', color: 'white' }}>Connect</button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default HandlerDashboard;

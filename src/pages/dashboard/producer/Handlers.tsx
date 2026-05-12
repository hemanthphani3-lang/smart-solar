import { useState } from 'react';
import Card from '../../../components/ui/Card';
import { useData } from '../../../context/DataContext';
import { Search, MapPin, Zap, Users } from 'lucide-react';

const ProducerHandlers = () => {
  const { handlers } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHandlers = handlers.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.unique_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Network Handlers</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Managing {handlers.length} distribution nodes across the network.</p>
        </div>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by name, place, or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 3rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border-glass)', 
              borderRadius: '0.75rem',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <Card title={`Active Handlers (${filteredHandlers.length})`}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-glass)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Handler ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Name & Location</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Consumers</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Gen. Capacity</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHandlers.slice(0, 50).map(h => ( // Show first 50 for performance, or add pagination
                <tr key={h.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>{h.unique_id}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{h.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} /> {h.location}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={14} style={{ color: 'var(--text-muted)' }} />
                      {h.consumers.length} / 4
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Zap size={14} style={{ color: 'var(--primary)' }} />
                      {h.total_generation} kWh
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '1rem', 
                      fontSize: '0.75rem', 
                      background: h.active_status ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: h.active_status ? 'var(--primary)' : '#ef4444'
                    }}>
                      {h.active_status ? 'Active' : 'Offline'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>View Details</button>
                  </td>
                </tr>
              ))}
              {filteredHandlers.length > 50 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Showing first 50 handlers. Use search to find specific nodes.
                  </td>
                </tr>
              )}
              {filteredHandlers.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No handlers found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProducerHandlers;

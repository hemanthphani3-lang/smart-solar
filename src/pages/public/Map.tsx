
import PublicLayout from '../../layouts/PublicLayout';
import LeafletMap from '../../components/map/LeafletMap';
import Card from '../../components/ui/Card';
import { useData } from '../../context/DataContext';

const PublicMap = () => {
  const { handlers } = useData();

  return (
    <PublicLayout>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Live Network Map</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Real-time view of active SolarSync handlers and their distribution network.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
          {/* Map Container */}
          <div style={{ flex: 1, position: 'relative', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
            <LeafletMap />
          </div>

          {/* Side Panel */}
          <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <Card title="Network Overview">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Handlers:</span>
                <span style={{ fontWeight: 'bold' }}>{handlers.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Active Nodes:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{handlers.filter(h => h.active_status).length}</span>
              </div>
            </Card>

            <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Local Hubs</h3>
            
            {handlers.map(h => (
              <Card key={h.id} className="glass-card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{h.name}</h4>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: h.active_status ? 'var(--primary)' : 'var(--text-muted)' }}></div>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{h.location}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>Capacity: {h.total_generation} kWh</span>
                  <span>{h.consumers.length}/4 Connected</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublicMap;

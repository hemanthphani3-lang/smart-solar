
import Card from '../../../components/ui/Card';
import LeafletMap from '../../../components/map/LeafletMap';
import { useData } from '../../../context/DataContext';

const ProducerMap = () => {
  const { handlers } = useData();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Live Network Distribution</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Visualizing all {handlers.length} nodes across India.</p>
        </div>
      </div>

      <Card style={{ flex: 1, padding: '0.5rem' }}>
        <LeafletMap />
      </Card>
    </div>
  );
};

export default ProducerMap;


import Card from '../../../components/ui/Card';
import { useData } from '../../../context/DataContext';
import LeafletMap from '../../../components/map/LeafletMap';
import { 
  Zap, Activity, MapPin, DollarSign, 
  ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

const ProducerOverview = () => {
  const { handlers, totalGeneration, totalConsumption } = useData();

  const chartData = [
    { time: '00:00', generation: 4000, consumption: 2400 },
    { time: '04:00', generation: 3000, consumption: 1398 },
    { time: '08:00', generation: 9800, consumption: 2000 }, // Fixed: Generation >= Consumption
    { time: '12:00', generation: 3908, consumption: 2780 },
    { time: '16:00', generation: 4800, consumption: 1890 },
    { time: '20:00', generation: 3800, consumption: 2390 },
    { time: '23:59', generation: 4300, consumption: 3490 },
  ];

  const stats = [
    { label: 'Total Generation', value: `${totalGeneration.toLocaleString()} kWh`, icon: Zap, color: 'var(--primary)', trend: '+12.5%' },
    { label: 'Total Consumption', value: `${totalConsumption.toFixed(1)} kWh`, icon: Activity, color: 'var(--secondary)', trend: '+5.2%' },
    { label: 'Active Handlers', value: handlers.length.toLocaleString(), icon: MapPin, color: 'var(--accent)', trend: '0%' },
    { label: 'Total Revenue', value: `$${(totalConsumption * 8).toLocaleString()}`, icon: DollarSign, color: '#eab308', trend: '+18.4%' },
  ];

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Producer Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitoring the global solar distribution network.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: `${stat.color}20`, padding: '0.5rem', borderRadius: '0.5rem', color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: stat.trend.startsWith('+') ? 'var(--primary)' : 'var(--text-secondary)' }}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{stat.value}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card title="Energy Flow (24h)">
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="generation" stroke="var(--primary)" fillOpacity={1} fill="url(#colorGen)" />
                <Area type="monotone" dataKey="consumption" stroke="var(--secondary)" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Activity">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {handlers.slice(0, 5).map(h => (
              <div key={h.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: h.active_status ? 'var(--primary)' : 'var(--text-muted)' }}></div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{h.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{h.unique_id} • {h.location}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{h.total_generation} kWh</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{h.consumers.length} Consumers</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Live Network Map" className="glass-card">
        <div style={{ height: '400px', width: '100%', borderRadius: '0.5rem', overflow: 'hidden', marginTop: '1rem' }}>
          <LeafletMap />
        </div>
      </Card>
    </>
  );
};

export default ProducerOverview;

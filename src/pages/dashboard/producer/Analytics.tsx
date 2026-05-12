
import Card from '../../../components/ui/Card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Zap, Activity, TrendingUp } from 'lucide-react';

const ProducerAnalytics = () => {

  const chartData = [
    { time: '00:00', generation: 4000, consumption: 2400 },
    { time: '04:00', generation: 3000, consumption: 1398 },
    { time: '08:00', generation: 9800, consumption: 2000 }, // Fixed: Generation >= Consumption
    { time: '12:00', generation: 3908, consumption: 2780 },
    { time: '16:00', generation: 4800, consumption: 1890 },
    { time: '20:00', generation: 3800, consumption: 2390 },
    { time: '23:59', generation: 4300, consumption: 3490 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Advanced Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Detailed insights into generation and consumption patterns.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card title="Energy Flow (24h)">
          <div style={{ height: '400px', width: '100%' }}>
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

        <Card title="Efficiency Metrics">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)' }}>
                <Zap size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Generation Efficiency</span>
                  <span style={{ fontWeight: 'bold' }}>94.2%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '94.2%', height: '100%', background: 'var(--primary)' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary)' }}>
                <Activity size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Network Stability</span>
                  <span style={{ fontWeight: 'bold' }}>99.8%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '99.8%', height: '100%', background: 'var(--secondary)' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                <TrendingUp size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Growth Forecast</span>
                  <span style={{ fontWeight: 'bold' }}>+12.5%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', background: '#eab308' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProducerAnalytics;

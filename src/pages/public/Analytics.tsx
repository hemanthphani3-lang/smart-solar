import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Card from '../../components/ui/Card';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Activity, Zap, TrendingDown, Leaf } from 'lucide-react';

const PublicAnalytics = () => {
  const { totalGeneration, totalConsumption, handlers, consumers } = useData();

  const networkEfficiency = ((totalConsumption / totalGeneration) * 100).toFixed(1);
  const carbonSaved = (totalGeneration * 0.4).toFixed(0); // Rough estimate: 0.4 kg CO2 per kWh

  const chartData = [
    { name: 'Mon', generated: 4000, consumed: 2400 },
    { name: 'Tue', generated: 3000, consumed: 1398 },
    { name: 'Wed', generated: 2000, consumed: 9800 },
    { name: 'Thu', generated: 2780, consumed: 3908 },
    { name: 'Fri', generated: 1890, consumed: 4800 },
    { name: 'Sat', generated: 2390, consumed: 3800 },
    { name: 'Sun', generated: 3490, consumed: 4300 },
  ];

  const distributionData = handlers.map(h => ({
    name: h.name,
    capacity: h.total_generation,
    utilization: h.consumers.length * 150 // Mock utilization
  }));

  return (
    <PublicLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Global Network Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Real-time transparency into the SolarSync energy ecosystem. We believe in open data to accelerate the transition to sustainable energy.
          </p>
        </div>

        {/* Global Impact Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                  <Zap size={24} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>Live Generation</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalGeneration.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kWh</span></div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--secondary)' }}>
                  <Activity size={24} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>Network Efficiency</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{networkEfficiency}%</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--accent)' }}>
                  <TrendingDown size={24} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>Grid Load Variance</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>±4.2%</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                  <Leaf size={24} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>CO2 Prevented</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{carbonSaved} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kg</span></div>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card title="7-Day Generation vs Consumption">
              <div style={{ height: '350px', width: '100%', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" />
                    <Tooltip 
                      contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Area type="monotone" dataKey="generated" stroke="var(--primary)" fillOpacity={1} fill="url(#colorGen)" />
                    <Area type="monotone" dataKey="consumed" stroke="var(--secondary)" fillOpacity={1} fill="url(#colorCon)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card title="Handler Utilization">
              <div style={{ height: '350px', width: '100%', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="var(--text-muted)" />
                    <YAxis dataKey="name" type="category" stroke="var(--text-muted)" width={100} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem' }}
                    />
                    <Bar dataKey="capacity" fill="rgba(255,255,255,0.1)" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="utilization" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* System Health */}
        <Card title="System Health & Status">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              <div>
                <div style={{ fontWeight: '600' }}>Active Handlers</div>
                <div style={{ color: 'var(--text-secondary)' }}>{handlers.filter(h => h.active_status).length} / {handlers.length} Online</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              <div>
                <div style={{ fontWeight: '600' }}>API Uptime</div>
                <div style={{ color: 'var(--text-secondary)' }}>99.99% (Last 30 days)</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              <div>
                <div style={{ fontWeight: '600' }}>Database Status</div>
                <div style={{ color: 'var(--text-secondary)' }}>Optimal, 12ms latency</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default PublicAnalytics;

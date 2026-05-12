import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Zap, Wallet, History, Info, 
  ArrowRight, Download, CreditCard 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const ConsumerDashboard = () => {
  const { consumers, handlers } = useData();
  const { user } = useAuth();

  // Mock matching consumer for this user
  const myConsumer = consumers.find(c => c.id === 'c1') || consumers[0];
  const myHandler = handlers.find(h => h.id === myConsumer?.handler_id);

  const usageData = [
    { day: 'Mon', usage: 12 },
    { day: 'Tue', usage: 15 },
    { day: 'Wed', usage: 10 },
    { day: 'Thu', usage: 18 },
    { day: 'Fri', usage: 22 },
    { day: 'Sat', usage: 25 },
    { day: 'Sun', usage: 20 },
  ];

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Your Energy Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitoring usage for {myConsumer?.name}.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Zap size={24} style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Current Usage</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{myConsumer?.current_usage.toFixed(1)} <span style={{ fontSize: '1.25rem' }}>kWh</span></div>
              <div style={{ fontSize: '0.875rem', color: 'var(--primary)', marginTop: '0.5rem' }}>+1.2% from yesterday</div>
            </Card>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Wallet size={24} style={{ color: '#eab308' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Bill</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>${myConsumer?.total_cost.toFixed(2)}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Due in 12 days</div>
            </Card>
          </div>

          {/* Usage Chart */}
          <Card title="Weekly Usage Analysis">
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="usage" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Handler Info */}
          <Card title="Your Energy Provider">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={24} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>{myHandler?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{myHandler?.unique_id}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Your energy is supplied by a local smart hub located in {myHandler?.location}.
            </div>
            <button className="glass-button" style={{ width: '100%', fontSize: '0.875rem' }}>Contact Support</button>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                <CreditCard size={18} /> Pay Current Bill
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                <Download size={18} /> Download Statement
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                <History size={18} /> Billing History
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Recommendations */}
      <Card title="AI-Powered Energy Insights" className="glass-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', borderLeft: '3px solid var(--primary)', background: 'rgba(16, 185, 129, 0.05)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Optimization Alert</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Using high-power appliances between 2 PM and 4 PM could save you 15% on peak charges.
            </p>
          </div>
          <div style={{ padding: '1rem', borderLeft: '3px solid var(--secondary)', background: 'rgba(6, 182, 212, 0.05)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Maintenance Note</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Your local hub (Downtown Hub) is scheduled for efficiency upgrades on May 20th.
            </p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ConsumerDashboard;

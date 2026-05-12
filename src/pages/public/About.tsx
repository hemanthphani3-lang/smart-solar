
import PublicLayout from '../../layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Leaf } from 'lucide-react';
import Card from '../../components/ui/Card';

const About = () => {
  return (
    <PublicLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Empowering the <br /><span className="text-gradient">Green Revolution</span></h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            SolarSync is on a mission to decentralize energy production and distribution through cutting-edge AI and transparent grid management.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '8rem' }}>
          {[
            { icon: Target, title: 'Our Mission', desc: 'To provide every community with the tools to generate and manage their own renewable energy.' },
            { icon: Lightbulb, title: 'Our Vision', desc: 'A world where energy is clean, affordable, and distributed fairly through smart networks.' },
            { icon: Users, title: 'Community Driven', desc: 'Connecting local producers with nearby consumers to build resilient energy ecosystems.' },
            { icon: Leaf, title: 'Eco-First', desc: 'Maximizing carbon reduction through intelligent optimization of solar resources.' }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card" style={{ height: '100%' }}>
                <item.icon size={32} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
                <h3 style={{ marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <section style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Innovative Distribution</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Our platform uses advanced algorithms to balance grid load in real-time. By connecting producers directly to handlers and consumers, we eliminate the inefficiencies of traditional centralized grids.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Every kWh is tracked, verified, and billed automatically, ensuring total transparency for all participants in the SolarSync ecosystem.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <div className="glass-card" style={{ padding: '3rem', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>98.4%</div>
                <div style={{ fontWeight: '600', marginBottom: '1rem' }}>Distribution Efficiency</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Industry-leading power management through AI-optimized load balancing and predictive maintenance.
                </p>
              </div>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100%', height: '100%', background: 'var(--primary-glow)', filter: 'blur(60px)', opacity: 0.2, zIndex: 0 }} />
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default About;

import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';

const Home = () => {
  const stats = [
    { label: 'Total Handlers', value: '1,284', icon: Globe },
    { label: 'Active Consumers', value: '5,120+', icon: Shield },
    { label: 'Energy Generated', value: '42.5 GWh', icon: Zap },
    { label: 'CO2 Reduced', value: '12,400 Tons', icon: BarChart3 },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 2rem',
        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            The Future of <br />
            <span className="text-gradient">Solar Distribution</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            Empowering communities with smart, decentralized energy management. 
            Real-time tracking, AI-optimized distribution, and complete transparency.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="glass-button" style={{ background: 'var(--primary)', borderColor: 'var(--primary)', color: 'white', fontWeight: 'bold', padding: '1rem 2.5rem' }}>
              Get Started
            </Link>
            <Link to="/analytics" className="glass-button" style={{ padding: '1rem 2.5rem' }}>
              View Live Stats
            </Link>
          </div>
        </motion.div>

        {/* Floating Animation Element */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            marginTop: '4rem',
            width: '100%',
            maxWidth: '1000px',
            height: '400px',
            background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))',
            borderRadius: '2rem',
            filter: 'blur(80px)',
            opacity: 0.2,
            position: 'absolute',
            zIndex: -1
          }}
        />
      </section>

      {/* Stats Grid */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <stat.icon size={32} style={{ color: 'var(--primary)', marginBottom: '1rem', margin: '0 auto' }} />
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.value}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '8rem 2rem', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Smart Ecosystem</h2>
            <p style={{ color: 'var(--text-secondary)' }}>From generation to consumption, managed by intelligent algorithms.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { title: 'Real-time Monitoring', desc: 'Track energy flow from producers to consumers with millisecond precision.' },
              { title: 'AI-Driven Insights', desc: 'Predict usage patterns and optimize distribution to reduce waste.' },
              { title: 'Secure & Transparent', desc: 'Immutable records of every kWh generated and billed.' }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '1rem', borderRadius: '1rem', background: 'var(--primary-glow)', color: 'var(--primary)' }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to power your community?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Join thousands of handlers and consumers already using SolarSync to manage their renewable energy needs.
            </p>
            <Link to="/login" className="glass-button" style={{ background: 'white', color: 'black', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
              Launch Dashboard <ArrowRight size={20} />
            </Link>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(45deg, var(--primary-glow), transparent)', opacity: 0.1 }} />
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;

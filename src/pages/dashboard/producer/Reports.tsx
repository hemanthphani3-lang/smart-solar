
import Card from '../../../components/ui/Card';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

const ProducerReports = () => {
  const reports = [
    { name: 'Monthly Energy Summary', date: 'May 2026', size: '2.4 MB', type: 'PDF' },
    { name: 'Network Stability Report', date: 'April 2026', size: '1.8 MB', type: 'CSV' },
    { name: 'Revenue & Billing Analysis', date: 'Q1 2026', size: '4.2 MB', type: 'PDF' },
    { name: 'Consumer Growth Statistics', date: '2025 Annual', size: '12.5 MB', type: 'XLSX' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Financial & Network Reports</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Download and analyze comprehensive network data.</p>
        </div>
        <button className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} /> Filter Reports
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {reports.map((report, i) => (
          <Card key={i} className="glass-card">
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--primary)' }}>
                <FileText size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{report.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} /> {report.date}
                  </span>
                  <span>{report.size}</span>
                  <span style={{ padding: '0.1rem 0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{report.type}</span>
                </div>
                <button className="glass-button" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <Download size={16} /> Download Report
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProducerReports;

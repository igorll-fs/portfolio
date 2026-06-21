import { getAnalyticsSummary } from '../analytics'
import { X, Eye, Monitor, Smartphone, Clock, Globe, BarChart3 } from 'lucide-react'

export default function AnalyticsDashboard({ onClose }) {
  const stats = getAnalyticsSummary();

  return (
    <div style={{ minHeight: '100vh', background: '#07070a', color: '#e0e0e0', padding: '2rem', fontFamily: 'Manrope, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e8b931' }}>📊 igor.dev Analytics</h1>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid #333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <X size={16} /> Fechar
          </button>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card icon={<Eye size={20} />} label="Total" value={stats.total} color="#e8b931" />
          <Card icon={<Clock size={20} />} label="Hoje" value={stats.today} color="#4ade80" />
          <Card icon={<BarChart3 size={20} />} label="Esta semana" value={stats.thisWeek} color="#60a5fa" />
          <Card icon={<Monitor size={20} />} label="Desktop" value={stats.devices.desktop} color="#a78bfa" />
          <Card icon={<Smartphone size={20} />} label="Mobile" value={stats.devices.mobile} color="#f472b6" />
        </div>

        {/* Top pages */}
        <Section title="📄 Páginas mais visitadas">
          {stats.pages.length === 0 ? <Empty /> : stats.pages.map(([page, count]) => (
            <Bar key={page} label={page} count={count} max={stats.pages[0][1]} />
          ))}
        </Section>

        {/* Referrers */}
        <Section title="🌐 Origem do tráfego">
          {stats.referrers.length === 0 ? <Empty /> : stats.referrers.map(([ref, count]) => (
            <Bar key={ref} label={ref} count={count} max={stats.referrers[0][1]} />
          ))}
        </Section>

        {/* Hourly */}
        <Section title="⏰ Visitas por hora (hoje)">
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '100px' }}>
            {Array.from({ length: 24 }, (_, h) => {
              const count = stats.hourly[h] || 0;
              const maxH = Math.max(...Object.values(stats.hourly), 1);
              return (
                <div key={h} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '100%', background: count > 0 ? '#e8b931' : '#1a1a2e', borderRadius: '3px', height: `${(count / maxH) * 80}px`, minHeight: '4px' }} />
                  <span style={{ fontSize: '0.6rem', color: '#666' }}>{h}h</span>
                </div>
              );
            })}
          </div>
        </Section>

        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.75rem', marginTop: '2rem' }}>
          Ctrl+Shift+A para abrir/fechar • Dados desde {stats.total > 0 ? 'a primeira visita' : 'aguardando visitas'}
        </p>
      </div>
    </div>
  );
}

function Card({ icon, label, value, color }) {
  return (
    <div style={{ background: '#0f0f17', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '1.25rem' }}>
      <div style={{ color, marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: '#888' }}>{label}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: '#0f0f17', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#ccc' }}>{title}</h2>
      {children}
    </div>
  );
}

function Bar({ label, count, max }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
      <span style={{ fontSize: '0.8rem', color: '#aaa', minWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, background: '#1a1a2e', borderRadius: '4px', height: '8px' }}>
        <div style={{ width: `${(count / max) * 100}%`, background: '#e8b931', borderRadius: '4px', height: '100%', transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e8b931', minWidth: '30px', textAlign: 'right' }}>{count}</span>
    </div>
  );
}

function Empty() {
  return <p style={{ color: '#555', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>Nenhum dado ainda — aguardando visitas</p>;
}

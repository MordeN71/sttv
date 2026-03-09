'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

const months = [
  { name: 'March', year: '2026', events: [
    { name: 'MDK Season 4', logo: '/events/mdkseason4.png', date: 'Mar 9-10', path: '/events/mdk-s4', prize: '1,600 RUB', teams: 8 },
    { name: 'Frogstar League', logo: '/events/frogstar.png', date: 'Mar 15-20', path: '/events/frogstar', prize: 'TBD', teams: 16 },
  ]},
  { name: 'April', year: '2026', events: [] },
  { name: 'May', year: '2026', events: [] },
  { name: 'June', year: '2026', events: [] },
  { name: 'July', year: '2026', events: [] },
  { name: 'August', year: '2026', events: [] },
  { name: 'September', year: '2026', events: [] },
  { name: 'October', year: '2026', events: [] },
];

export default function EventCalendarPage() {
  return (
    <div
      style={{
        background: bgMain,
        minHeight: '100vh',
        padding: '24px 20px 40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 1400, width: '100%' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ ...glassCard, padding: 24, marginBottom: 24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#e5e7eb', margin: 0, textTransform: 'uppercase' }}>
                Event Calendar
              </h1>
              <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>Counter-Strike Top Tier Calendar 2026</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#a855f7', padding: '6px 12px', borderRadius: 4, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}>All</span>
              <span style={{ fontSize: 12, color: '#6b7280', padding: '6px 12px', borderRadius: 4 }}>Europe</span>
              <span style={{ fontSize: 12, color: '#6b7280', padding: '6px 12px', borderRadius: 4 }}>Americas</span>
              <span style={{ fontSize: 12, color: '#6b7280', padding: '6px 12px', borderRadius: 4 }}>Asia</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {months.map((month) => (
              <div key={month.name} style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12, textTransform: 'uppercase' }}>
                  {month.name}
                </div>
                {month.events.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {month.events.map((event) => (
                      <Link key={event.name} href={event.path} style={{ textDecoration: 'none' }}>
                        <motion.div
                          whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px',
                            borderRadius: 6,
                            backgroundColor: 'rgba(30, 41, 59, 0.6)',
                            cursor: 'pointer',
                          }}
                        >
                          <img src={event.logo} alt={event.name} style={{ width: 28, height: 28, borderRadius: 4, objectFit: 'contain' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, color: '#e5e7eb', fontWeight: 600 }}>{event.name}</div>
                            <div style={{ fontSize: 10, color: '#6b7280' }}>{event.date} • {event.teams} teams</div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: '#4b5563', textAlign: 'center', padding: '20px 0' }}>
                    No events yet
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

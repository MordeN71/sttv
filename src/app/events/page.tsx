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

const tournaments = [
  {
    id: 'mdk-s4',
    name: 'MDK Season 4',
    icon: '🏆',
    prize: '$10,000',
    teams: 8,
    status: 'Ongoing',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
    location: 'Online',
    tier: 'A-Tier',
  },
  {
    id: 'frogstar',
    name: 'FROGSTAR #1',
    icon: '🐸',
    prize: '$5,000',
    teams: 8,
    status: 'Upcoming',
    startDate: '2026-03-20',
    endDate: '2026-03-22',
    location: 'Online',
    tier: 'B-Tier',
  },
];

export default function EventsPage() {
  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 24, marginBottom: 20 }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>
            STTV // Events
          </h1>
          <p style={{ fontSize: 12, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            All tournaments and competitions
          </p>
        </motion.div>

        {/* Tournament Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 20 }}>
          {tournaments.map((tournament, idx) => (
            <Link key={tournament.id} href={`/events/${tournament.id}`} style={{ textDecoration: 'none' }}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                style={{
                  ...glassCard,
                  padding: 20,
                  cursor: 'pointer',
                  border: '1px solid rgba(168, 85, 247, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ fontSize: 48 }}>{tournament.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{tournament.name}</h3>
                      <span
                        style={{
                          fontSize: 10,
                          padding: '2px 8px',
                          borderRadius: 4,
                          backgroundColor: tournament.status === 'Ongoing' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                          color: tournament.status === 'Ongoing' ? '#22c55e' : '#a855f7',
                          fontWeight: 600,
                        }}
                      >
                        {tournament.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 12 }}>
                      {tournament.startDate} - {tournament.endDate}
                    </p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                      <span style={{ color: '#a855f7' }}>💰 {tournament.prize}</span>
                      <span style={{ color: '#9ca3af' }}>👥 {tournament.teams} teams</span>
                      <span style={{ color: '#9ca3af' }}>📍 {tournament.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


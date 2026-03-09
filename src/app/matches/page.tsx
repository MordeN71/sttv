'use client';

import { useState } from 'react';
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

const matchesData = [
  { id: 1, team1: 'HOLOXY', team2: 'Impact Team', date: '2026-03-09', time: '21:00', format: 'BO3', event: 'MDK Season 4', status: 'upcoming' },
  { id: 2, team1: 'MGL ESPORTS', team2: 'DEAD EYES', date: '2026-03-09', time: '21:00', format: 'BO3', event: 'MDK Season 4', status: 'upcoming' },
  { id: 3, team1: 'BEBRIKI', team2: 'PLATINA', date: '2026-03-09', time: '21:00', format: 'BO3', event: 'MDK Season 4', status: 'upcoming' },
  { id: 4, team1: 'HAWKS', team2: 'XENOX ACADEMY', date: '2026-03-09', time: '21:00', format: 'BO3', event: 'MDK Season 4', status: 'upcoming' },
];

const teamLogos: Record<string, string> = {
  'HOLOXY': '/teams/holoxy.png',
  'Impact Team': '/teams/impact.png',
  'MGL ESPORTS': '/teams/mgl.png',
  'DEAD EYES': '/teams/deadeyes.png',
  'BEBRIKI': '/teams/bebriki.png',
  'PLATINA': '/teams/platina.png',
  'HAWKS': '/teams/hawks.png',
  'XENOX ACADEMY': '/teams/xenox.png',
  'HOXY NXT': '/teams/hoxynxt.png',
  'Imperium eSports': '/teams/imperium.png',
  'KeHeXiLi IG': '/teams/kehexili.png',
  'Valhalla': '/teams/valhalla.png',
};

export default function MatchesPage() {
  const [filter, setFilter] = useState('all');

  const filteredMatches = filter === 'all' ? matchesData : matchesData.filter(m => m.event.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 24, marginBottom: 20 }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>
            STTV // Match Center
          </h1>
          <p style={{ fontSize: 12, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Live and upcoming matches
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'flex', gap: 12, marginBottom: 20 }}
        >
          {['all', 'MDK', 'FROGSTAR'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(168, 85, 247, 0.3)',
                backgroundColor: filter === f ? 'rgba(168, 85, 247, 0.3)' : 'rgba(22, 27, 34, 0.4)',
                color: filter === f ? '#fff' : '#9ca3af',
                cursor: 'pointer',
                fontSize: 12,
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {f === 'all' ? 'All Matches' : f}
            </button>
          ))}
        </motion.div>

        {/* Matches List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredMatches.map((match, idx) => (
            <motion.div
              key={match.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
              style={{
                ...glassCard,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                <div style={{ fontSize: 11, color: '#6b7280', minWidth: 60 }}>
                  <div>{match.date}</div>
                  <div>{match.time}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{match.team1}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#a855f7', fontWeight: 700 }}>VS</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{match.team2}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '4px 8px', borderRadius: 4 }}>
                  {match.format}
                </span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{match.event}</span>
                <span style={{ fontSize: 11, color: '#22c55e' }}>● Upcoming</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ ...glassCard, padding: 40, textAlign: 'center', color: '#6b7280' }}
          >
            No matches found for this filter.
          </motion.div>
        )}
      </div>
    </div>
  );
}


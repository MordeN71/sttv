'use client';

import { motion } from 'framer-motion';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

const resultsData: any[] = [];

export default function ResultsPage() {
  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 24, marginBottom: 20 }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>
            STTV // Results
          </h1>
          <p style={{ fontSize: 12, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Recent match results
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {resultsData.map((match, idx) => (
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
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                <div style={{ fontSize: 11, color: '#6b7280', minWidth: 60 }}>
                  <div>{match.date}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{match.team1}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: 'rgba(22, 27, 34, 0.8)', padding: '4px 12px', borderRadius: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: match.score1 > match.score2 ? '#22c55e' : '#ef4444' }}>{match.score1}</span>
                    <span style={{ fontSize: 14, color: '#6b7280' }}>:</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: match.score2 > match.score1 ? '#22c55e' : '#ef4444' }}>{match.score2}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{match.team2}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{match.event}</span>
                <span style={{ fontSize: 11, color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '4px 8px', borderRadius: 4 }}>
                  {match.map}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


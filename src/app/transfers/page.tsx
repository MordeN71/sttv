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

const transfersData = [
  { id: 1, player: 'kr1vda', fromTeam: 'Free Agent', toTeam: 'HOLOXY', date: '2026-03-05', type: 'Join' },
  { id: 2, player: 'neondreams', fromTeam: 'MGL ESPORTS', toTeam: 'HOLOXY', date: '2026-03-01', type: 'Transfer' },
  { id: 3, player: '1YEKINDAR', fromTeam: 'Impact Team', toTeam: 'HOLOXY', date: '2026-02-28', type: 'Transfer' },
  { id: 4, player: 'shadow', fromTeam: 'DEAD EYES', toTeam: 'Free Agent', date: '2026-02-25', type: 'Leave' },
];

export default function TransfersPage() {
  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 24, marginBottom: 20 }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>
            STTV // All Transfers
          </h1>
          <p style={{ fontSize: 12, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Player transfers and roster changes
          </p>
        </motion.div>

        {/* Transfers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {transfersData.map((transfer, idx) => (
            <motion.div
              key={transfer.id}
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
                <div style={{ fontSize: 11, color: '#6b7280', minWidth: 80 }}>
                  <div>{transfer.date}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{transfer.player}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>→</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: '#ef4444' }}>{transfer.fromTeam}</span>
                    <span style={{ fontSize: 12, color: '#a855f7' }}>→</span>
                    <span style={{ fontSize: 13, color: '#22c55e' }}>{transfer.toTeam}</span>
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: 11,
                  padding: '4px 12px',
                  borderRadius: 4,
                  backgroundColor:
                    transfer.type === 'Join'
                      ? 'rgba(34, 197, 94, 0.2)'
                      : transfer.type === 'Leave'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(168, 85, 247, 0.2)',
                  color:
                    transfer.type === 'Join' ? '#22c55e' : transfer.type === 'Leave' ? '#ef4444' : '#a855f7',
                  fontWeight: 600,
                }}
              >
                {transfer.type}
              </span>
            </motion.div>
          ))}
        </div>

        {transfersData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ ...glassCard, padding: 40, textAlign: 'center', color: '#6b7280' }}
          >
            No transfers recorded yet.
          </motion.div>
        )}
      </div>
    </div>
  );
}

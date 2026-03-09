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

export default function NewsPage() {
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
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.01, y: -4 }}
        style={{
          ...glassCard,
          maxWidth: 1100,
          width: '100%',
          padding: 24,
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: 6,
          }}
        >
          STTV // Newsroom
        </h1>
        <p
          style={{
            fontSize: 12,
            color: '#a5b4fc',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 20,
          }}
        >
          Liquid glass hub for MDK League stories
        </p>
      </motion.section>
    </div>
  );
}


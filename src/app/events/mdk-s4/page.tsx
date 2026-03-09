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

const tabs = ['Overview', 'Matches', 'Results', 'Stats', 'Teams'];

export default function MDKSeason4Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderOverview = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div>
          <h2 style={{ fontSize: 24, color: '#a855f7', fontWeight: 700 }}>
            MDK Season 4 Overview
          </h2>
          <p style={{ fontSize: 14, color: '#e5e7eb' }}>
            Tournament information and bracket will be available here.
          </p>
        </div>
      </div>
    );
  };

  const renderMatches = () => {
    return (
      <div>
        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
          Upcoming MDK Season 4 matches
        </h3>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 16, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>Matches coming soon</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Match schedule will be available when tournament begins</div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: 16, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>No matches played yet</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>Tournament starts March 9th 2026</div>
      </div>
    );
  };

  const renderStats = () => {
    return (
      <div>
        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
          Tournament Statistics
        </h3>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 16, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>Stats coming soon</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Statistics will be available after matches begin</div>
        </div>
      </div>
    );
  };

  const renderTeams = () => {
    return (
      <div>
        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
          Teams attending
        </h3>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 16, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>Teams coming soon</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Team information will be available when tournament begins</div>
        </div>
      </div>
    );
  };

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
        {/* Banner with tabs */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ ...glassCard, padding: 0, overflow: 'hidden' }}
        >
          <div
            style={{
              height: 260,
              backgroundImage: "linear-gradient(130deg, rgba(15,23,42,0.6) 0%, rgba(88,28,135,0.8) 50%, rgba(15,23,42,0.9) 100%)",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 60px rgba(168, 85, 247, 0.18)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 24,
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(248, 250, 252, 0.06)',
              }}
            >
              MDK Season 4
            </div>
            <div
              style={{
                position: 'absolute',
                top: 18,
                right: 24,
                padding: '4px 10px',
                borderRadius: 2,
                fontSize: 10,
                fontWeight: 700,
                backgroundColor: '#ef4444',
                color: '#fff',
              }}
            >
              LIVE
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 900,
                fontStyle: 'italic',
                textTransform: 'uppercase',
                margin: 0,
                color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              }}
            >
              MDK League Season 4
            </h1>
            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                color: '#c4b5fd',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                textShadow: '0 1px 10px rgba(0,0,0,0.6)',
              }}
            >
              Eight teams. One liquid glass trophy.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderTop: '1px solid rgba(148, 163, 253, 0.3)',
            }}
          >
            {tabs.map((tab, idx) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '14px 0',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRight: idx === tabs.length - 1 ? 'none' : '1px solid rgba(30, 64, 175, 0.5)',
                  color: activeTab === tab ? '#fff' : '#9ca3af',
                  fontWeight: activeTab === tab ? 700 : 500,
                  background:
                    activeTab === tab
                      ? 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.5), transparent)'
                      : 'transparent',
                  borderBottom: activeTab === tab ? '2px solid #a855f7' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tab Content */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ ...glassCard, padding: 24, marginTop: 20 }}
        >
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'Matches' && renderMatches()}
          {activeTab === 'Results' && renderResults()}
          {activeTab === 'Stats' && renderStats()}
          {activeTab === 'Teams' && renderTeams()}
        </motion.section>
      </div>
    </div>
  );
}

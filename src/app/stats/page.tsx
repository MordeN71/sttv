'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(15px) saturate(140%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
  borderRadius: 12,
};

// All matches data - empty since no games played yet
const allMatches: any[] = [];

const events = ['All Events', 'MDK Season 4', 'FROGSTAR #1'];
const maps = ['All Maps', 'Mirage', 'Inferno', 'Nuke', 'Ancient', 'Dust2'];

export default function StatsPage() {
  const [selectedEvent, setSelectedEvent] = useState('All Events');
  const [selectedMap, setSelectedMap] = useState('All Maps');

  const filteredMatches = allMatches.filter(match => {
    const eventMatch = selectedEvent === 'All Events' || match.event === selectedEvent;
    const mapMatch = selectedMap === 'All Maps' || match.map === selectedMap;
    return eventMatch && mapMatch;
  });

  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px', color: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          style={{ marginBottom: 24 }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
            Match Statistics
          </h1>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>
            Complete match history with scores, maps, and events
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ ...glassCard, padding: 20, marginBottom: 20 }}
        >
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 8 }}>
                Event
              </label>
              <select 
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  color: '#fff',
                  fontSize: 13,
                  cursor: 'pointer',
                  minWidth: 160,
                }}
              >
                {events.map(event => (
                  <option key={event} value={event} style={{ backgroundColor: '#0f172a' }}>{event}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 8 }}>
                Map
              </label>
              <select 
                value={selectedMap}
                onChange={(e) => setSelectedMap(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  color: '#fff',
                  fontSize: 13,
                  cursor: 'pointer',
                  minWidth: 140,
                }}
              >
                {maps.map(map => (
                  <option key={map} value={map} style={{ backgroundColor: '#0f172a' }}>{map}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Matches List */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ ...glassCard, padding: 0, overflow: 'hidden' }}
        >
          {/* Table Header */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '100px 1fr 80px 1fr 100px 100px 100px', 
            gap: 12,
            padding: '16px 20px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#9ca3af',
            fontWeight: 600,
          }}>
            <span>Date</span>
            <span style={{ textAlign: 'right' }}>Team 1</span>
            <span style={{ textAlign: 'center' }}>Score</span>
            <span>Team 2</span>
            <span>Map</span>
            <span>Event</span>
            <span>Status</span>
          </div>

          {/* Matches */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.08)' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 80px 1fr 100px 100px 100px',
                  gap: 12,
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{match.date}</span>
                <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'right', color: match.score1 > match.score2 ? '#a855f7' : '#e5e7eb' }}>
                  {match.team1}
                </span>
                <span style={{ 
                  fontSize: 14, 
                  fontWeight: 800, 
                  textAlign: 'center',
                  color: match.status === 'Live' ? '#ef4444' : '#fff',
                }}>
                  {match.score1} - {match.score2}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: match.score2 > match.score1 ? '#a855f7' : '#e5e7eb' }}>
                  {match.team2}
                </span>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{match.map}</span>
                <span style={{ fontSize: 11, color: '#c4b5fd' }}>{match.event}</span>
                <span style={{ fontSize: 11 }}>
                  {match.status === 'Live' ? (
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>● LIVE</span>
                  ) : (
                    <span style={{ color: '#6b7280' }}>Finished</span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
              No matches found for selected filters
            </div>
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 20 }}
        >
          {[
            { label: 'Total Matches', value: allMatches.length },
            { label: 'Live Now', value: allMatches.filter(m => m.status === 'Live').length },
            { label: 'Events', value: new Set(allMatches.map(m => m.event)).size },
            { label: 'Maps Played', value: new Set(allMatches.map(m => m.map)).size },
          ].map((stat, idx) => (
            <div key={stat.label} style={{ ...glassCard, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#a855f7', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


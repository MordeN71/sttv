'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Add Twitch types
declare global {
  interface Window {
    Twitch: {
      Embed: new (targetId: string, options: any) => void;
    };
  }
}

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

const tournaments = [
  { id: 'morrden71', name: 'MORRDEN71', channel: 'morrden71' },
];

export default function LivePage() {
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0]);
  const [twitchLoaded, setTwitchLoaded] = useState(false);

  useEffect(() => {
    // Load Twitch Embed script
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    script.onload = () => setTwitchLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (twitchLoaded && selectedTournament && window.Twitch) {
      // Clear previous embed
      const container = document.getElementById('twitch-embed');
      if (container) {
        container.innerHTML = '';
      }
      
      // Initialize Twitch player
      new window.Twitch.Embed('twitch-embed', {
        width: '100%',
        height: '100%',
        channel: selectedTournament.channel,
        layout: 'video',
        autoplay: true,
        muted: true,
        parent: [window.location.hostname],
      });
    }
  }, [twitchLoaded, selectedTournament]);

  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ marginBottom: 24 }}
        >
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: 900, 
            color: '#fff', 
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}>
            Live Streams
          </h1>
          <p style={{ fontSize: 16, color: '#a855f7', marginBottom: 24 }}>
            Watch live CS:GO tournaments from around the world
          </p>
        </motion.div>

        {/* Tournament Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ ...glassCard, padding: 20, marginBottom: 24 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <label style={{ fontSize: 14, color: '#a855f7', fontWeight: 600 }}>
              Select Tournament:
            </label>
            <select
              value={selectedTournament.id}
              onChange={(e) => {
                const tournament = tournaments.find(t => t.id === e.target.value);
                if (tournament) setSelectedTournament(tournament);
              }}
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: 8,
                color: '#fff',
                fontSize: 14,
                cursor: 'pointer',
                minWidth: 200,
              }}
            >
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
            <div style={{ 
              padding: '6px 12px', 
              backgroundColor: '#ef4444', 
              borderRadius: 6, 
              color: '#fff', 
              fontSize: 12, 
              fontWeight: 700 
            }}>
              LIVE
            </div>
          </div>
        </motion.div>

        {/* Stream Container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ ...glassCard, overflow: 'hidden' }}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 400px', 
            height: '600px' 
          }}>
            {/* Twitch Stream */}
            <div style={{ position: 'relative' }}>
              <div id="twitch-embed" style={{ width: '100%', height: '100%' }} />
              {!twitchLoaded && (
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 24, marginBottom: 16 }}>📺</div>
                    <div style={{ fontSize: 16, color: '#a855f7', marginBottom: 8 }}>
                      Loading stream...
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      {selectedTournament.name}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat */}
            <div style={{ 
              borderLeft: '1px solid rgba(168, 85, 247, 0.2)',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ 
                padding: '16px', 
                borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)'
              }}>
                <h3 style={{ 
                  fontSize: 14, 
                  color: '#a855f7', 
                  fontWeight: 600, 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Live Chat
                </h3>
              </div>
              <div style={{ 
                flex: 1, 
                padding: 16, 
                overflowY: 'auto',
                fontSize: 13,
                color: '#9ca3af'
              }}>
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>💬</div>
                  <div>Chat is available on Twitch</div>
                  <div style={{ fontSize: 11, marginTop: 8 }}>
                    Join the conversation on {selectedTournament.channel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Live Streams */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: 24 }}
        >
          <h2 style={{ fontSize: 20, color: '#a855f7', marginBottom: 16, fontWeight: 600 }}>
            Other Live Streams
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {tournaments.filter(t => t.id !== selectedTournament.id).map((tournament) => (
              <motion.div
                key={tournament.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedTournament(tournament)}
                style={{
                  ...glassCard,
                  padding: 16,
                  cursor: 'pointer',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ 
                    width: 60, 
                    height: 40, 
                    backgroundColor: 'rgba(168, 85, 247, 0.2)', 
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    📺
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 600, marginBottom: 4 }}>
                      {tournament.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>
                      {tournament.channel}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#ef4444', 
                    borderRadius: 4, 
                    color: '#fff', 
                    fontSize: 10, 
                    fontWeight: 700 
                  }}>
                    LIVE
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


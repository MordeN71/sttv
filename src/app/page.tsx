'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(15px) saturate(140%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
  borderRadius: 12,
};

// Full ranking data - all 16 teams with STR values reset to 0
const fullRanking = [
  { rank: 1, team: 'HOLOXY', points: 0, region: 'Russia', logo: '/teams/holoxy.png' },
  { rank: 2, team: 'Impact Team', points: 0, region: 'Russia', logo: '/teams/impact.png' },
  { rank: 3, team: 'MGL ESPORTS', points: 0, region: 'Russia', logo: '/teams/mgl.png' },
  { rank: 4, team: 'DEAD EYES', points: 0, region: 'Russia', logo: '/teams/deadeyes.png' },
  { rank: 5, team: 'BEBRIKI', points: 0, region: 'Russia', logo: '/teams/bebriki.png' },
  { rank: 6, team: 'PLATINA', points: 0, region: 'Russia', logo: '/teams/platina.png' },
  { rank: 7, team: 'HOXY NXT', points: 0, region: 'Europe', logo: '/teams/hoxynxt.png' },
  { rank: 8, team: 'HAWKS', points: 0, region: 'Russia', logo: '/teams/hawks.png' },
  { rank: 9, team: 'XENOX ACADEMY', points: 0, region: 'Russia', logo: '/teams/xenox.png' },
  { rank: 10, team: 'Imperium eSports', points: 0, region: 'Russia', logo: '/teams/imperium.png' },
  { rank: 11, team: 'KeHeXiLi IG', points: 0, region: 'Russia', logo: '/teams/kehexili.png' },
  { rank: 12, team: 'Valhalla', points: 0, region: 'Russia', logo: '/teams/valhalla.png' },
  { rank: 13, team: 'GODBLESS TEAM', points: 0, region: 'Russia', logo: '/teams/godbless.png' },
  { rank: 14, team: 'KLEPTO TEAM', points: 0, region: 'Russia', logo: '/teams/klepto.png' },
  { rank: 15, team: 'PRIMUS', points: 0, region: 'Europe', logo: '/teams/primus.png' },
  { rank: 16, team: 'AuraTeam', points: 0, region: 'Russia', logo: '/teams/aurateam.png' },
];

// Events data - only 2 tournaments
const events = [
  { 
    name: 'MDK League Season 4', 
    status: 'Live', 
    prize: '1,600 RUB', 
    href: '/events/mdk-s4',
    date: 'Mar 9-10',
    logo: '/events/mdkseason4.png'
  },
  { 
    name: 'FROGSTAR | CS:GO TOURNAMENT #1', 
    status: 'Upcoming', 
    prize: '500 RUB', 
    href: '/events/frogstar',
    date: 'Mar 20-22',
    logo: '/events/frogstar.png'
  },
];

// Latest News - only BETA 0.1
const latestNews = {
  id: 'beta-0-1',
  title: 'BETA 0.1 STARTING NOW',
  category: 'Announcement',
  time: 'Just now',
  summary: 'STTV is now live in open beta!',
  content: `Welcome to STTV (StatTV) - your ultimate destination for Counter-Strike esports coverage!

We are excited to announce that STTV has officially launched in OPEN BETA version 0.1!

What is STTV?
STTV is a platform dedicated to competitive Counter-Strike coverage, featuring:
- Live match scores and results
- Tournament brackets and schedules
- Team rankings and statistics
- Player profiles and performance data
- Event coverage and news

Current Features in BETA 0.1:
✓ 16 professional teams in our database
✓ 2 active tournaments (MDK Season 4 & FROGSTAR)
✓ Full ranking system
✓ Team pages with detailed rosters
✓ Event pages with brackets
✓ Forum for community discussions

Coming Soon:
• Live match streaming integration
• More tournaments and events
• Advanced player statistics
• Mobile application
• Fantasy league system

Thank you for joining us in this early stage. We appreciate your feedback as we continue to improve the platform!

Join our community:
• Telegram: @yamolekula
• Forum: sttv.gg/forum

STTV Team`
};

// Today's matches - 4 pairs
const todayMatches = [
  { team1: 'DEAD EYES', team2: 'MGL', time: '21:00', status: 'Upcoming', score: '-', event: 'MDK Season 4' },
  { team1: 'BEBRIKI', team2: 'PLATINA', time: '21:00', status: 'Upcoming', score: '-', event: 'MDK Season 4' },
  { team1: 'HAWKS', team2: 'XENOX ACADEMY', time: '21:00', status: 'Upcoming', score: '-', event: 'MDK Season 4' },
  { team1: 'Impact Team', team2: 'HOLOXY', time: '21:00', status: 'Upcoming', score: '-', event: 'MDK Season 4' },
];

// News Modal Component
function NewsModal({ news, onClose }: { news: typeof latestNews | null; onClose: () => void }) {
  if (!news) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...glassCard,
          padding: 0,
          maxWidth: 700,
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div style={{ 
          padding: '24px 28px',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)',
        }}>
          <div>
            <span style={{ 
              fontSize: 10, 
              padding: '4px 10px', 
              backgroundColor: 'rgba(168, 85, 247, 0.3)', 
              borderRadius: 4, 
              color: '#c4b5fd',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {news.category}
            </span>
            <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 12 }}>{news.time}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: 24,
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '28px', overflowY: 'auto' }}>
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 800, 
            color: '#fff', 
            marginBottom: 20,
            lineHeight: 1.3,
          }}>
            {news.title}
          </h1>
          
          <div style={{ 
            fontSize: 14, 
            color: '#e5e7eb', 
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
          }}>
            {news.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ 
          padding: '16px 28px',
          borderTop: '1px solid rgba(168, 85, 247, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>Posted by STTV Team</span>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              backgroundColor: 'rgba(168, 85, 247, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: 6,
              color: '#a855f7',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
export default function HomePage() {
  const [selectedNews, setSelectedNews] = useState<typeof latestNews | null>(null);

  return (
    <>
      <div style={{ minHeight: '100vh', color: '#fff', background: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)', padding: '20px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {/* Three column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 300px', gap: 20 }}>
              
              {/* LEFT COLUMN - Ranking & Events */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {/* Ranking */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ ...glassCard, padding: 16 }}>
                  <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14, color: '#a855f7' }}>
                    World Ranking
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {fullRanking.slice(0, 5).map((team) => (
                      <Link key={team.rank} href={`/teams/${team.team.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                        <motion.div 
                          whileHover={{ x: 3, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 10, 
                            padding: '8px 10px', 
                            borderRadius: 8,
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                          }}
                        >
                          <span style={{ 
                            width: 20, 
                            textAlign: 'center', 
                            fontWeight: 800, 
                            color: team.rank <= 3 ? '#a855f7' : '#6b7280',
                            fontSize: 12 
                          }}>
                            {team.rank}
                          </span>
                          <img src={team.logo} alt={team.team} style={{ width: 20, height: 20, borderRadius: '50%' }} />
                          <span style={{ flex: 1, fontSize: 12, color: '#e5e7eb', fontWeight: 600 }}>{team.team}</span>
                          <span style={{ fontSize: 10, color: '#9ca3af' }}>{team.points} STR</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/ranking" style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                      style={{ 
                        marginTop: 12, 
                        padding: '10px',
                        textAlign: 'center', 
                        fontSize: 11, 
                        color: '#a855f7', 
                        cursor: 'pointer',
                        borderRadius: 6,
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      View full ranking →
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Events */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ ...glassCard, padding: 16 }}>
                  <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14, color: '#a855f7' }}>
                    Events
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {events.map((event) => (
                      <Link key={event.name} href={event.href} style={{ textDecoration: 'none' }}>
                        <motion.div 
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                          style={{ 
                            padding: 12, 
                            borderRadius: 8, 
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            borderLeft: event.status === 'Live' ? '3px solid #ef4444' : '3px solid transparent',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            {event.status === 'Live' && (
                              <span style={{ fontSize: 9, padding: '2px 6px', backgroundColor: '#ef4444', borderRadius: 3, fontWeight: 700 }}>LIVE</span>
                            )}
                            {event.status === 'Upcoming' && (
                              <span style={{ fontSize: 9, padding: '2px 6px', backgroundColor: '#3b82f6', borderRadius: 3, fontWeight: 700 }}>UPCOMING</span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: '#e5e7eb', fontWeight: 600, marginBottom: 4 }}>{event.name}</div>
                          <div style={{ fontSize: 10, color: '#9ca3af', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{event.date}</span>
                            <span>{event.prize}</span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/events/calendar" style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                      style={{ 
                        marginTop: 12, 
                        padding: '10px',
                        textAlign: 'center', 
                        fontSize: 11, 
                        color: '#a855f7', 
                        cursor: 'pointer',
                        borderRadius: 6,
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        fontWeight: 600,
                      }}
                    >
                      Event Calendar →
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* CENTER COLUMN - Banner & News */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {/* MDK Banner */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ ...glassCard, overflow: 'hidden' }}>
                  <Link href="/events/mdk-s4" style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      style={{ 
                        height: 200, 
                        backgroundImage: "linear-gradient(135deg, rgba(88,28,135,0.95) 0%, rgba(15,23,42,0.9) 100%), url('/events/mdkseason4.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: 24, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'flex-end',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ 
                        position: 'absolute', 
                        top: 16, 
                        right: 16, 
                        padding: '4px 10px', 
                        backgroundColor: '#ef4444', 
                        borderRadius: 4, 
                        fontSize: 10, 
                        fontWeight: 900 
                      }}>
                        LIVE
                      </div>
                      <h1 style={{ 
                        fontSize: 28, 
                        fontWeight: 900, 
                        fontStyle: 'italic', 
                        textTransform: 'uppercase', 
                        margin: 0,
                        color: '#fff',
                      }}>
                        MDK League Season 4
                      </h1>
                      <p style={{ 
                        color: '#c4b5fd', 
                        fontSize: 12, 
                        margin: '8px 0 0 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}>
                        The Grind Begins Here — Watch Live Now
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Latest News - Only BETA 0.1 */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ ...glassCard, padding: 20 }}>
                  <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, color: '#a855f7' }}>
                    Latest News
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <motion.div 
                      whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', scale: 1.01 }}
                      onClick={() => setSelectedNews(latestNews)}
                      style={{ 
                        display: 'flex', 
                        gap: 16, 
                        padding: 16, 
                        borderRadius: 8,
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                      }}
                    >
                      <div style={{ 
                        width: 80, 
                        height: 60, 
                        borderRadius: 8, 
                        background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#fff',
                      }}>
                        β
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 9, padding: '3px 8px', backgroundColor: 'rgba(168, 85, 247, 0.4)', borderRadius: 4, color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>
                            {latestNews.category}
                          </span>
                          <span style={{ fontSize: 10, color: '#6b7280' }}>{latestNews.time}</span>
                        </div>
                        <h3 style={{ fontSize: 16, color: '#fff', fontWeight: 700, margin: '0 0 4px 0', lineHeight: 1.3 }}>
                          {latestNews.title}
                        </h3>
                        <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{latestNews.summary}</p>
                      </div>
                      <div style={{ fontSize: 20, color: '#a855f7' }}>→</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN - Today's Matches & Transfers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {/* Today's Matches - 4 pairs */}
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ ...glassCard, padding: 16 }}>
                  <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14, color: '#a855f7' }}>
                    Today&apos;s Matches
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {todayMatches.map((match, idx) => (
                      <Link key={idx} href="/events/mdk-s4" style={{ textDecoration: 'none' }}>
                        <motion.div 
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                          style={{ 
                            padding: 12, 
                            borderRadius: 8, 
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            border: '1px solid rgba(168, 85, 247, 0.15)',
                          }}
                        >
                          <div style={{ fontSize: 9, color: '#a855f7', marginBottom: 6, textTransform: 'uppercase' }}>{match.event}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontSize: 10, color: '#9ca3af' }}>{match.time}</span>
                            <span style={{ fontSize: 10, color: '#6b7280' }}>BO3</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              <span style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 600 }}>{match.team1}</span>
                              <span style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 600 }}>{match.team2}</span>
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 800, color: '#6b7280' }}>
                              {match.score}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/matches" style={{ textDecoration: 'none' }}>
                    <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11, color: '#a855f7', cursor: 'pointer' }}>
                      All matches →
                    </div>
                  </Link>
                </motion.div>

                {/* TOP 30 TRANSFERS */}
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ ...glassCard, padding: 16 }}>
                  <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14, color: '#a855f7' }}>
                    TOP 30 TRANSFERS
                  </h2>
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0', fontSize: 12 }}>
                    No recent transfers
                  </div>
                  <Link href="/transfers" style={{ textDecoration: 'none' }}>
                    <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11, color: '#a855f7', cursor: 'pointer' }}>
                      All transfers →
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      <AnimatePresence>
        {selectedNews && (
          <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

// Full ranking data - all 16 teams with STR values reset to 0
const fullRanking = [
  { rank: 1, team: 'HOLOXY', points: 0, region: 'Russia', logo: '/teams/holoxy.png', players: ['kr1vda', 'hobs', 'neondreams', '1YEKINDAR', 'CARRY4U'], change: 0 },
  { rank: 2, team: 'Impact Team', points: 0, region: 'Russia', logo: '/teams/impact.png', players: ['W0rk1nP', 'hXh', 'KOTBATA', 'PRIVET', 'Rysn'], change: 0 },
  { rank: 3, team: 'MGL ESPORTS', points: 0, region: 'Russia', logo: '/teams/mgl.png', players: ['TBA'], change: 0 },
  { rank: 4, team: 'DEAD EYES', points: 0, region: 'Russia', logo: '/teams/deadeyes.png', players: ['TBA'], change: 0 },
  { rank: 5, team: 'BEBRIKI', points: 0, region: 'Russia', logo: '/teams/bebriki.png', players: ['TBA'], change: 0 },
  { rank: 6, team: 'PLATINA', points: 0, region: 'Russia', logo: '/teams/platina.png', players: ['TBA'], change: 0 },
  { rank: 7, team: 'HOXY NXT', points: 0, region: 'Europe', logo: '/teams/hoxynxt.png', players: ['TBA'], change: '+1' },
  { rank: 8, team: 'HAWKS', points: 0, region: 'Russia', logo: '/teams/hawks.png', players: ['TBA'], change: '-1' },
  { rank: 9, team: 'XENOX ACADEMY', points: 0, region: 'Russia', logo: '/teams/xenox.png', players: ['TBA'], change: 0 },
  { rank: 10, team: 'Imperium eSports', points: 0, region: 'Russia', logo: '/teams/imperium.png', players: ['TBA'], change: 0 },
  { rank: 11, team: 'KeHeXiLi IG', points: 0, region: 'Russia', logo: '/teams/kehexili.png', players: ['TBA'], change: 0 },
  { rank: 12, team: 'Valhalla', points: 0, region: 'Russia', logo: '/teams/valhalla.png', players: ['TBA'], change: 0 },
  { rank: 13, team: 'GODBLESS TEAM', points: 0, region: 'Russia', logo: '/teams/godbless.png', players: ['TBA'], change: 0 },
  { rank: 14, team: 'KLEPTO TEAM', points: 0, region: 'Russia', logo: '/teams/klepto.png', players: ['TBA'], change: 0 },
  { rank: 15, team: 'PRIMUS', points: 0, region: 'Europe', logo: '/teams/primus.png', players: ['TBA'], change: 0 },
  { rank: 16, team: 'AuraTeam', points: 0, region: 'Russia', logo: '/teams/aurateam.png', players: ['TBA'], change: 0 },
];

export default function RankingPage() {
  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: bgMain, padding: '24px 20px' }}>

      <div style={{ padding: '24px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 24 }}
        >
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: '#fff' }}>
              Counter-Strike World Ranking
            </h1>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>
              Last updated: March 2nd, 2026
            </p>
          </div>

          {/* Ranking Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {fullRanking.map((team) => (
              <Link 
                key={team.rank} 
                href={`/teams/${team.team.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 60px 1fr 150px 100px 80px',
                    alignItems: 'center',
                    padding: '16px 20px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: 8,
                    borderLeft: team.rank <= 3 ? '3px solid #a855f7' : '3px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ 
                    fontSize: 16, 
                    fontWeight: 800, 
                    color: team.rank <= 3 ? '#a855f7' : '#6b7280',
                  }}>
                    #{team.rank}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={team.logo} 
                      alt={team.team} 
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#e5e7eb' }}>
                      {team.team}
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                      {team.players.slice(0, 3).join(', ')}{team.players.length > 3 ? '...' : ''}
                    </div>
                  </div>
                  
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>
                    {team.region}
                  </div>
                  
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>
                    {team.points} STR
                  </div>
                  
                  <div style={{ fontSize: 12, color: typeof team.change === 'number' && team.change > 0 ? '#22c55e' : typeof team.change === 'number' && team.change < 0 ? '#ef4444' : '#6b7280' }}>
                    {typeof team.change === 'number' && team.change > 0 ? `+${team.change}` : team.change}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Legend */}
          <div style={{ marginTop: 24, padding: 16, backgroundColor: 'rgba(15, 23, 42, 0.3)', borderRadius: 8 }}>
            <h3 style={{ fontSize: 12, color: '#a855f7', marginBottom: 12, textTransform: 'uppercase' }}>About the ranking</h3>
            <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
              The STTV Ranking is a ranking of the best Counter-Strike teams in the world. 
              Teams are ranked based on their performance in tournaments, with points awarded 
              based on prize pool, level of competition, and recency of results. The ranking 
              is updated weekly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


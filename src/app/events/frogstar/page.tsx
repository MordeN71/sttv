'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ModernBracket from '@/components/ModernBracket';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

// Frogstar teams data
const teamsData: Record<string, {
  logo: string;
  region: string;
  strRank: number | string;
  worldRank: number | string;
}> = {
  'HOXY NXT': { logo: '/teams/hoxynxt.png', region: 'Europe', strRank: 6, worldRank: 6 },
  'Imperium eSports': { logo: '/teams/imperium.png', region: 'Russia', strRank: 7, worldRank: 7 },
  'KeHeXiLi IG': { logo: '/teams/kehexili.png', region: 'Russia', strRank: 8, worldRank: 9 },
  'Valhalla': { logo: '/teams/valhalla.png', region: 'Russia', strRank: 9, worldRank: 10 },
  'GODBLESS TEAM': { logo: '/teams/godbless.png', region: 'Russia', strRank: 11, worldRank: 11 },
  'KLEPTO TEAM': { logo: '/teams/klepto.png', region: 'Russia', strRank: 13, worldRank: 13 },
  'PRIMUS': { logo: '/teams/primus.png', region: 'Europe', strRank: 14, worldRank: 14 },
  'AuraTeam': { logo: '/teams/aurateam.png', region: 'Russia', strRank: '-', worldRank: '-' },
};

const attendingTeams = Object.entries(teamsData).map(([name, data]) => ({
  name,
  ...data,
}));

// World ranking data - top 5 teams with 0 STR
const worldRanking = [
  { name: 'HOLOXY', logo: '/teams/holoxy.png', strRank: 1 },
  { name: 'Impact Team', logo: '/teams/impact.png', strRank: 2 },
  { name: 'MGL ESPORTS', logo: '/teams/mgl.png', strRank: 3 },
  { name: 'DEAD EYES', logo: '/teams/deadeyes.png', strRank: 4 },
  { name: 'BEBRIKI', logo: '/teams/bebriki.png', strRank: 5 },
];

// Single Elimination Bracket (TBD format like photo 4)
const bracket = {
  quarterfinals: [
    { id: 'QF1', time: '21:00 Friday', format: 'BO3', team1: 'TBD', team2: 'TBD' },
    { id: 'QF2', time: '21:00 Friday', format: 'BO3', team1: 'TBD', team2: 'TBD' },
    { id: 'QF3', time: '21:00 Friday', format: 'BO3', team1: 'TBD', team2: 'TBD' },
    { id: 'QF4', time: '21:00 Friday', format: 'BO3', team1: 'TBD', team2: 'TBD' },
  ],
  semifinals: [
    { id: 'SF1', time: '21:00 Saturday', format: 'BO3', team1: 'TBD', team2: 'TBD' },
    { id: 'SF2', time: '21:00 Saturday', format: 'BO3', team1: 'TBD', team2: 'TBD' },
  ],
  grandFinal: { id: 'GF', time: '21:00 Sunday', format: 'BO5', team1: 'TBD', team2: 'TBD' },
};

const upcomingMatches = [
  { time: '21:00', team1: 'HOXY NXT', team2: 'TBD', format: 'BO3', date: 'March 20th 2026' },
  { time: '21:00', team1: 'Imperium eSports', team2: 'TBD', format: 'BO3', date: 'March 20th 2026' },
  { time: '21:00', team1: 'KeHeXiLi IG', team2: 'TBD', format: 'BO3', date: 'March 20th 2026' },
  { time: '21:00', team1: 'Valhalla', team2: 'TBD', format: 'BO3', date: 'March 20th 2026' },
];

const tabs = ['Overview', 'Matches', 'Results', 'Stats', 'Teams'];

function TeamLogo({ name, size = 24 }: { name: string; size?: number }) {
  const team = teamsData[name as keyof typeof teamsData];
  if (!team || name === 'TBD') {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          color: '#9ca3af',
          border: '1px solid rgba(168, 85, 247, 0.3)',
        }}
      >
        ?
      </div>
    );
  }
  return (
    <img
      src={team.logo}
      alt={name}
      style={{ width: size, height: size, objectFit: 'contain', borderRadius: '50%' }}
    />
  );
}

function BracketMatch({ match, onClick }: { match: any; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.15)' } : {}}
      onClick={onClick}
      style={{
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(15,23,42,0.9)',
        border: '1px solid rgba(148, 163, 253, 0.35)',
        cursor: onClick ? 'pointer' : 'default',
        minWidth: 140,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 9, color: '#6b7280' }}>{match.id}</span>
        <span style={{ fontSize: 9, color: '#9ca3af' }}>{match.time}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TeamLogo name={match.team1} size={16} />
            <span style={{ fontSize: 11, color: '#e5e7eb', fontWeight: 500 }}>{match.team1}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#e5e7eb' }}>-</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TeamLogo name={match.team2} size={16} />
            <span style={{ fontSize: 11, color: '#e5e7eb', fontWeight: 500 }}>{match.team2}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#e5e7eb' }}>-</span>
        </div>
      </div>
    </motion.div>
  );
}

function MatchModal({ match, onClose }: { match: any; onClose: () => void }) {
  if (!match) return null;

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
        zIndex: 100,
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...glassCard,
          padding: 28,
          maxWidth: 480,
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: '#6b7280' }}>{match.id}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: 20,
              padding: 0,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
            <TeamLogo name={match.team1} size={52} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb', textAlign: 'center' }}>{match.team1}</span>
          </div>
          <div style={{ textAlign: 'center', padding: '0 20px' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#e5e7eb', letterSpacing: 4 }}>
              -:-
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>{match.time || 'TBD'}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
            <TeamLogo name={match.team2} size={52} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb', textAlign: 'center' }}>{match.team2}</span>
          </div>
        </div>

        <div 
          style={{ 
            textAlign: 'center', 
            padding: '14px 0', 
            borderTop: '1px solid rgba(168, 85, 247, 0.25)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 12, color: '#a855f7', fontWeight: 600 }}>Match page →</span>
        </div>
      </motion.div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280, flexShrink: 0 }}>
      {/* World Ranking */}
      <div style={{ ...glassCard, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            World Ranking
          </div>
          <div style={{ fontSize: 9, color: '#6b7280' }}>Last updated: 2nd of Mar</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {worldRanking.map((team, idx) => (
            <Link key={team.name} href={`/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 12, color: '#6b7280', width: 20, textAlign: 'center', fontWeight: 600 }}>{idx + 1}</span>
                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                  🏆
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 500 }}>{team.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#a855f7', fontWeight: 700 }}>0</div>
                  <div style={{ fontSize: 9, color: '#6b7280' }}>STR</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <Link href="/ranking" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
            style={{
              marginTop: 12,
              padding: '8px 12px',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: 6,
              textAlign: 'center',
              fontSize: 11,
              color: '#a855f7',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View full ranking →
          </motion.div>
        </Link>
      </div>

      {/* Events */}
      <div style={{ ...glassCard, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Events
          </div>
          <Link href="/events/calendar" style={{ fontSize: 10, color: '#a855f7', textDecoration: 'none' }}>
            Event Calendar →
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/events/mdk-s4" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px',
                borderRadius: 8,
                cursor: 'pointer',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
              }}
            >
              <img src="/events/mdkseason4.png" alt="MDK Season 4" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'contain' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 600 }}>MDK Season 4</div>
                <div style={{ fontSize: 10, color: '#6b7280' }}>Mar 9-10</div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Today's Matches */}
      <div style={{ ...glassCard, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Today&apos;s Matches
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0', fontSize: 12 }}>
            No matches scheduled
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FrogstarPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const renderOverview = () => {
    // Single Elimination Bracket - 8 teams with modern design
    const bracketRounds = [
      {
        name: 'Quarterfinals',
        matches: [
          {
            id: 'qf-1',
            team1: { name: 'HOXY NXT', logo: '/teams/hoxynxt.png', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          },
          {
            id: 'qf-2',
            team1: { name: 'Imperium eSports', logo: '/teams/imperium.png', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          },
          {
            id: 'qf-3',
            team1: { name: 'KeHeXiLi IG', logo: '/teams/kehexili.png', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          },
          {
            id: 'qf-4',
            team1: { name: 'Valhalla', logo: '/teams/valhalla.png', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          }
        ]
      },
      {
        name: 'Semifinals',
        matches: [
          {
            id: 'sf-1',
            team1: { name: 'TBD', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          },
          {
            id: 'sf-2',
            team1: { name: 'TBD', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          }
        ]
      },
      {
        name: 'Grand Final',
        matches: [
          {
            id: 'gf-1',
            team1: { name: 'TBD', score: undefined, isWinner: false },
            team2: { name: 'TBD', score: undefined, isWinner: false }
          }
        ]
      }
    ];

    const handleMatchClick = (match: any) => {
      console.log('Match clicked:', match);
      // TODO: Open match modal or navigate to match page
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>
        {/* Tournament Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            padding: 24,
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)',
            borderRadius: 16,
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(20px)',
            width: '100%',
            maxWidth: '1200px'
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</div>
            <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>Mar 20-22, 2026</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prize pool</div>
            <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>500 RUB</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Teams</div>
            <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>8</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</div>
            <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>🇷🇺</span>
              <span>Russia (Online)</span>
            </div>
          </div>
        </div>

        {/* Single Elimination Bracket */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ModernBracket rounds={bracketRounds} onMatchClick={handleMatchClick} />
        </div>

        {/* Prize Distribution */}
        <div style={{ width: '100%' }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
            Prize Distribution
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {[
              { place: '1st', prize: '500 RUB', points: '50 VRS Points', color: '#fbbf24', icon: '🏆' },
              { place: '2nd', prize: '', points: '35 VRS Points', color: '#9ca3af', icon: '🥈' },
              { place: '3rd', prize: '', points: '25 VRS Points', color: '#a855f7', icon: '🥉' },
              { place: '4th', prize: '', points: '15 VRS Points', color: '#6b7280', icon: '🎯' },
              { place: '5-8th', prize: '', points: '5 VRS Points', color: '#6b7280', icon: '⭐' },
            ].map((prize, idx) => (
              <div
                key={idx}
                style={{
                  padding: 20,
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)',
                  borderRadius: 12,
                  border: `1px solid ${prize.color}30`,
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{prize.icon}</div>
                <div style={{ fontSize: 14, color: prize.color, fontWeight: 700, marginBottom: 8 }}>
                  {prize.place}
                </div>
                {prize.prize && (
                  <div style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 600, marginBottom: 4 }}>
                    {prize.prize}
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                  {prize.prize && '+'} {prize.points}
                </div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 6 }}>TBD</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMatches = () => (
    <div>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
        Upcoming FROGSTAR matches
      </h3>
      <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
        Bracket will be announced soon
      </div>
    </div>
  );

  const renderResults = () => (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 16, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>No matches played yet</div>
      <div style={{ fontSize: 12, color: '#9ca3af' }}>Tournament starts March 20th 2026</div>
    </div>
  );

  const renderStats = () => (
    <div>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
        Top teams
      </h3>
      <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
        No statistics available yet
      </div>
    </div>
  );

  const renderTeams = () => (
    <div>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
        Teams attending
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {attendingTeams.map((team) => (
          <Link key={team.name} href={`/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 14,
                borderRadius: 10,
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(148, 163, 253, 0.25)',
                cursor: 'pointer',
              }}
            >
              <TeamLogo name={team.name} size={44} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>{team.name}</span>
                <span style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                  STR #{team.strRank} | World #{team.worldRank}
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );

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
      <div style={{ maxWidth: 1400, width: '100%', display: 'flex', gap: 24 }}>
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                backgroundImage: "url('/banner-fs.jpg'), linear-gradient(130deg, rgba(15,23,42,0.6) 0%, rgba(88,28,135,0.8) 50%, rgba(15,23,42,0.9) 100%)",
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
                FROGSTAR #1
              </div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  margin: 0,
                  color: '#fff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.6)',
                }}
              >
                FROGSTAR | CS:GO TOURNAMENT #1
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
                Eight teams. Single elimination. One winner.
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
            style={{ ...glassCard, padding: 24 }}
          >
            {activeTab === 'Overview' && renderOverview()}
            {activeTab === 'Matches' && renderMatches()}
            {activeTab === 'Results' && renderResults()}
            {activeTab === 'Stats' && renderStats()}
            {activeTab === 'Teams' && renderTeams()}
          </motion.section>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Match Modal */}
      <AnimatePresence>
        {selectedMatch && <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
      </AnimatePresence>
    </div>
  );
}

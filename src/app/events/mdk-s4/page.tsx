'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import TournamentGroup from '@/components/TournamentGroup';
import ModernBracket from '@/components/ModernBracket';
import ModernDoubleEliminationBracket from '@/components/ModernDoubleEliminationBracket';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

// Team data with full roster information
const teamsData: Record<string, {
  logo: string;
  region: string;
  strRank: number | string;
  worldRank: number | string;
  players: { name: string; flag: string }[];
  coach: string;
  weeksInTop30: number;
  avgAge: number;
}> = {
  'HOLOXY': {
    logo: '/teams/holoxy.png',
    region: 'RU',
    strRank: 1,
    worldRank: 1,
    players: [
      { name: 'Aler1t514', flag: '🇷🇺' },
      { name: 'N1rMys', flag: '🇷🇺' },
      { name: 'L1mpiks', flag: '🇷🇺' },
      { name: 'BoryaKomfort', flag: '🇷🇺' },
      { name: 'd9dyaDima', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'Impact Team': {
    logo: '/teams/impact.png',
    region: 'RU',
    strRank: 2,
    worldRank: 2,
    players: [
      { name: 'Qwerty', flag: '🇷🇺' },
      { name: 'Ka1yser', flag: '🇷🇺' },
      { name: 'yborshiiik', flag: '🇷🇺' },
      { name: 'Kurnach', flag: '🇷🇺' },
      { name: 'makent0w', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'MGL': {
    logo: '/teams/mgl.png',
    region: 'RU',
    strRank: 3,
    worldRank: 3,
    players: [
      { name: 'Varadka', flag: '🇷🇺' },
      { name: 'masuka_ment', flag: '🇷🇺' },
      { name: '-k0bayashii', flag: '🇰🇿' },
      { name: 'speNder', flag: '🇰🇿' },
      { name: 'dark', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'DEAD EYES': {
    logo: '/teams/deadeyes.png',
    region: 'RU',
    strRank: 4,
    worldRank: 4,
    players: [
      { name: 'solac3', flag: '🇷🇺' },
      { name: 'y9ko', flag: '🇷🇺' },
      { name: 'Famlikus', flag: '🇷🇺' },
      { name: 'x0nes', flag: '🇷🇺' },
      { name: 'Troyka', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'PLATINA': {
    logo: '/teams/platina.png',
    region: 'RU',
    strRank: 5,
    worldRank: 5,
    players: [
      { name: 'fly143', flag: '🇷🇺' },
      { name: 'puywx', flag: '🇷🇺' },
      { name: '12fth', flag: '🇷🇺' },
      { name: 'low11ness', flag: '🇷🇺' },
      { name: 'qfls-', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'HAWKS': {
    logo: '/teams/hawks.png',
    region: 'RU',
    strRank: 10,
    worldRank: 12,
    players: [
      { name: 'I1uvatar', flag: '🇷🇺' },
      { name: 'hamp1kx', flag: '🇷🇺' },
      { name: 'Pruwka', flag: '🇷🇺' },
      { name: 'ex3empl66', flag: '🇷🇺' },
      { name: 'killoYa1337', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'BEBRIKI': {
    logo: '/teams/bebriki.png',
    region: 'RU',
    strRank: 12,
    worldRank: 8,
    players: [
      { name: 'Sinfulll', flag: '🇷🇺' },
      { name: 'kurotosocial', flag: '🇷🇺' },
      { name: 'snapi', flag: '🇷🇺' },
      { name: 'QweFerz', flag: '🇷🇺' },
      { name: 'z1lJekxxx666', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
  'XENOX ACADEMY': {
    logo: '/teams/xenoxac.png',
    region: 'RU',
    strRank: '-',
    worldRank: '-',
    players: [
      { name: 'SkyCrole', flag: '🇷🇺' },
      { name: 'oTMoRoZzOK1337', flag: '🇷🇺' },
      { name: 'Sale', flag: '🇷🇺' },
      { name: 'sojerio', flag: '🇷🇺' },
      { name: 'BOBNOCТЬ', flag: '🇷🇺' },
    ],
    coach: '-',
    weeksInTop30: 0,
    avgAge: 18.1,
  },
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

// Events data
const eventsData = [
  { name: 'MDK Season 4', logo: '/events/mdkseason4.png', date: 'Mar 9-10', path: '/events/mdk-s4', banner: '/banner-bg.jpg' },
  { name: 'Frogstar League', logo: '/events/frogstar.png', date: 'Mar 15-20', path: '/events/frogstar', banner: '/banner-fs.jpg' },
];

const bracket = {
  upperR1: [
    { id: 'UB1', team1: 'DEAD EYES', team2: 'MGL', score1: 0, score2: 0, time: '21:00', date: 'March 9th 2026' },
    { id: 'UB2', team1: 'BEBRIKI', team2: 'PLATINA', score1: 0, score2: 0, time: '21:00', date: 'March 9th 2026' },
    { id: 'UB3', team1: 'HAWKS', team2: 'XENOX ACADEMY', score1: 0, score2: 0, time: '21:00', date: 'March 10th 2026' },
    { id: 'UB4', team1: 'Impact Team', team2: 'HOLOXY', score1: 0, score2: 0, time: '21:00', date: 'March 10th 2026' },
  ],
  upperR2: [
    { id: 'UB5', slot: 'Winner UB1 vs Winner UB2' },
    { id: 'UB6', slot: 'Winner UB3 vs Winner UB4' },
  ],
  upperFinal: { id: 'UBF', slot: 'Winner UB5 vs Winner UB6' },
  lowerR1: [
    { id: 'LB1', slot: 'Loser UB1 vs Loser UB2' },
    { id: 'LB2', slot: 'Loser UB3 vs Loser UB4' },
  ],
  lowerR2: [
    { id: 'LB3', slot: 'Winner LB1 vs Loser UB5' },
    { id: 'LB4', slot: 'Winner LB2 vs Loser UB6' },
  ],
  lowerR3: { id: 'LB5', slot: 'Winner LB3 vs Winner LB4' },
  grandFinal: { id: 'GF', slot: 'Winner UBF vs Winner LB5' },
};

const upcomingMatches = [
  { time: '21:00', team1: 'DEAD EYES', team2: 'MGL', format: 'BO3', date: 'March 9th 2026' },
  { time: '21:00', team1: 'BEBRIKI', team2: 'PLATINA', format: 'BO3', date: 'March 9th 2026' },
  { time: '21:00', team1: 'HAWKS', team2: 'XENOX ACADEMY', format: 'BO3', date: 'March 10th 2026' },
  { time: '21:00', team1: 'Impact Team', team2: 'HOLOXY', format: 'BO3', date: 'March 10th 2026' },
];

const tabs = ['Overview', 'Matches', 'Results', 'Stats', 'Teams'];

function TeamLogo({ name, size = 24 }: { name: string; size?: number }) {
  const team = teamsData[name];
  if (!team) {
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
          fontSize: size * 0.5,
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
  const isKnownMatch = match.team1 && match.team2;
  
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : {}}
      onClick={onClick}
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        backgroundColor: 'rgba(15,23,42,0.9)',
        border: '1px solid rgba(148, 163, 253, 0.35)',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: 140,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 8, color: '#6b7280' }}>{match.id}</span>
        {isKnownMatch && <span style={{ fontSize: 8, color: '#9ca3af' }}>{match.time}</span>}
      </div>
      {isKnownMatch ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TeamLogo name={match.team1} size={20} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#e5e7eb' }}>{match.score1}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TeamLogo name={match.team2} size={20} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#e5e7eb' }}>{match.score2}</span>
          </div>
        </>
      ) : (
        <div style={{ fontSize: 9, color: '#9ca3af', textAlign: 'center', padding: '8px 0' }}>
          {match.slot}
        </div>
      )}
    </motion.div>
  );
}

function MatchCard({ match, onClick }: { match: any; onClick?: () => void }) {
  const isKnownMatch = match.team1 && match.team2;
  
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.15)' } : {}}
      onClick={onClick}
      style={{
        padding: isKnownMatch ? 10 : 12,
        borderRadius: 10,
        backgroundColor: 'rgba(15,23,42,0.9)',
        border: isKnownMatch ? '1px solid rgba(148, 163, 253, 0.35)' : '1px solid rgba(129, 140, 248, 0.25)',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: isKnownMatch ? 6 : 0,
        minHeight: isKnownMatch ? 'auto' : 70,
        justifyContent: isKnownMatch ? 'flex-start' : 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isKnownMatch ? 6 : 0 }}>
        <span style={{ fontSize: 9, color: '#6b7280' }}>{match.id}</span>
        {isKnownMatch && <span style={{ fontSize: 9, color: '#9ca3af' }}>{match.time}</span>}
      </div>
      {isKnownMatch ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TeamLogo name={match.team1} size={18} />
              <span style={{ fontSize: 10, color: '#e5e7eb', fontWeight: 600 }}>{match.team1}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#e5e7eb' }}>{match.score1}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TeamLogo name={match.team2} size={18} />
              <span style={{ fontSize: 10, color: '#e5e7eb', fontWeight: 600 }}>{match.team2}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#e5e7eb' }}>{match.score2}</span>
          </div>
        </>
      ) : (
        <div style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center' }}>
          {match.slot}
        </div>
      )}
    </motion.div>
  );
}

function MatchPage({ match, onBack }: { match: any; onBack: () => void }) {
  const team1Data = teamsData[match.team1];
  const team2Data = teamsData[match.team2];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0f172a',
        zIndex: 100,
        overflow: 'auto',
        padding: '20px 40px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(168, 85, 247, 0.2)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#e5e7eb',
            padding: '8px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          ← Back
        </button>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{match.id} | {match.date}</span>
      </div>

      {/* Match Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, marginBottom: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <TeamLogo name={match.team1} size={80} />
            <div style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: '#e5e7eb' }}>{match.team1}</div>
            {team1Data && (
              <div style={{ marginTop: 4, fontSize: 12, color: '#9ca3af' }}>
                STR #{team1Data.strRank} | World #{team1Data.worldRank}
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#e5e7eb' }}>
              {match.score1} - {match.score2}
            </div>
            <div style={{ fontSize: 14, color: '#9ca3af', marginTop: 8 }}>
              Best of 3 | {match.time}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TeamLogo name={match.team2} size={80} />
            <div style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: '#e5e7eb' }}>{match.team2}</div>
            {team2Data && (
              <div style={{ marginTop: 4, fontSize: 12, color: '#9ca3af' }}>
                STR #{team2Data.strRank} | World #{team2Data.worldRank}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lineups */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Team 1 */}
        <div style={{ backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 12, padding: 20, border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <TeamLogo name={match.team1} size={40} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#e5e7eb' }}>{match.team1}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Russia</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {team1Data?.players.map((player, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 8, 
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}>
                  👤
                </div>
                <div style={{ fontSize: 10 }}>{player.flag}</div>
                <div style={{ fontSize: 11, color: '#e5e7eb', fontWeight: 600 }}>{player.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team 2 */}
        <div style={{ backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 12, padding: 20, border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <TeamLogo name={match.team2} size={40} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#e5e7eb' }}>{match.team2}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Russia</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {team2Data?.players.map((player, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 8, 
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}>
                  👤
                </div>
                <div style={{ fontSize: 10 }}>{player.flag}</div>
                <div style={{ fontSize: 11, color: '#e5e7eb', fontWeight: 600 }}>{player.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 12, padding: 20, border: '1px solid rgba(168, 85, 247, 0.2)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 20 }}>Match Statistics</div>
        <div style={{ textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
          Match has not started yet. Statistics will be available after the match begins.
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280, flexShrink: 0 }}>
      {/* World Ranking */}
      <div style={{ ...glassCard, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          World Ranking
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
          {eventsData.map((event) => (
            <Link key={event.name} href={event.path} style={{ textDecoration: 'none' }}>
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
                <img src={event.logo} alt={event.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'contain' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 600 }}>{event.name}</div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{event.date}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Matches */}
      <div style={{ ...glassCard, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Today's Matches
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>March 9th 2026</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 6 }}>
            <TeamLogo name="HOLOXY" size={20} />
            <span style={{ fontSize: 10, color: '#9ca3af' }}>vs</span>
            <TeamLogo name="Impact Team" size={20} />
            <span style={{ fontSize: 10, color: '#6b7280', marginLeft: 'auto' }}>21:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MDKSeason4Page() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const renderOverview = () => {
    const handleMatchClick = (match: any) => {
      console.log('Match clicked:', match);
      // TODO: Open match modal or navigate to match page
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
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
            backdropFilter: 'blur(20px)'
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</div>
            <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>Mar 9-10, 2026</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prize pool</div>
            <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>1,600 RUB</div>
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

        {/* Grand Final */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ 
              fontSize: 28, 
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              marginBottom: 8, 
              color: '#a855f7', 
              fontWeight: 800,
              textShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
            }}>
              Grand Final
            </h2>
            <p style={{ 
              fontSize: 14, 
              color: '#9ca3af', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              fontWeight: 500 
            }}>
              Winner Group A vs Winner Group B
            </p>
          </div>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <ModernBracket rounds={[
              {
                name: 'Grand Final',
                matches: [
                  {
                    id: 'grand-final',
                    team1: { name: 'DEAD EYES', logo: '/teams/deadeyes.png', score: 2, isWinner: true },
                    team2: { name: 'HAWKS', logo: '/teams/impact.png', score: 1, isWinner: false }
                  }
                ]
              }
            ]} onMatchClick={handleMatchClick} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          width: '100%', 
          height: '2px', 
          background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)',
          margin: '20px 0'
        }}></div>

        {/* Groups A and B side by side */}
        <div style={{ display: 'flex', gap: 40 }}>
          {/* Group A */}
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h3 style={{ 
                fontSize: 24, 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                marginBottom: 8, 
                color: '#fff', 
                fontWeight: 700,
                textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
              }}>
                Group A
              </h3>
              <p style={{ 
                fontSize: 12, 
                color: '#9ca3af', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                fontWeight: 500 
              }}>
                Double Elimination
              </p>
            </div>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <ModernDoubleEliminationBracket 
              upperBracket={{
                name: 'Upper Bracket',
                rounds: [
                  {
                    name: 'Round 1',
                    matches: [
                      {
                        id: 'ga-ur-1',
                        team1: { name: 'DEAD EYES', logo: '/teams/deadeyes.png', score: undefined, isWinner: false },
                        team2: { name: 'MGL', logo: '/teams/mgl.png', score: undefined, isWinner: false }
                      },
                      {
                        id: 'ga-ur-2',
                        team1: { name: 'BEBRIKI', logo: '/teams/bebriki.png', score: undefined, isWinner: false },
                        team2: { name: 'PLATINA', logo: '/teams/platina.png', score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Round 1.5',
                    matches: [
                      {
                        id: 'ga-ur-1.5',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'SPIRE', logo: '/teams/spire.png', score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Round 2',
                    matches: [
                      {
                        id: 'ga-ur-3',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Upper Final',
                    matches: [
                      {
                        id: 'ga-uf-1',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  }
                ]
              }} 
              lowerBracket={{
                name: 'Lower Bracket',
                rounds: [
                  {
                    name: 'Lower Final',
                    matches: [
                      {
                        id: 'ga-lf-1',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Lower Round 1.5',
                    matches: [
                      {
                        id: 'ga-lr-1.5',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Consolidation Final',
                    matches: [
                      {
                        id: 'ga-cf-1',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  }
                ]
              }}
              onMatchClick={handleMatchClick}
            />
            </div>
          </div>

          {/* Group B */}
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h3 style={{ 
                fontSize: 24, 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                marginBottom: 8, 
                color: '#fff', 
                fontWeight: 700,
                textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
              }}>
                Group B
              </h3>
              <p style={{ 
                fontSize: 12, 
                color: '#9ca3af', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                fontWeight: 500 
              }}>
                Double Elimination
              </p>
            </div>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <ModernDoubleEliminationBracket 
              upperBracket={{
                name: 'Upper Bracket',
                rounds: [
                  {
                    name: 'Round 1',
                    matches: [
                      {
                        id: 'gb-ur-1',
                        team1: { name: 'HAWKS', logo: '/teams/hawks.png', score: undefined, isWinner: false },
                        team2: { name: 'XENOX ACADEMY', logo: '/teams/xenoxac.png', score: undefined, isWinner: false }
                      },
                      {
                        id: 'gb-ur-2',
                        team1: { name: 'IMPACT TEAM', logo: '/teams/impact.png', score: undefined, isWinner: false },
                        team2: { name: 'HOLOXY', logo: '/teams/holoxy.png', score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Round 2',
                    matches: [
                      {
                        id: 'gb-ur-3',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Upper Final',
                    matches: [
                      {
                        id: 'gb-uf-1',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  }
                ]
              }} 
              lowerBracket={{
                name: 'Lower Bracket',
                rounds: [
                  {
                    name: 'Lower Final',
                    matches: [
                      {
                        id: 'gb-lf-1',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  },
                  {
                    name: 'Consolidation Final',
                    matches: [
                      {
                        id: 'gb-cf-1',
                        team1: { name: 'TBD', logo: undefined, score: undefined, isWinner: false },
                        team2: { name: 'TBD', logo: undefined, score: undefined, isWinner: false }
                      }
                    ]
                  }
                ]
              }}
              onMatchClick={handleMatchClick}
            />
          </div>
        </div>

        {/* Prize Distribution */}
        <div style={{ width: '100%' }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
            Prize Distribution
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {[
              { place: '1st', prize: '1000 RUB', points: '50 VRS Points', color: '#fbbf24', icon: '🏆' },
              { place: '2nd', prize: '600 RUB', points: '35 VRS Points', color: '#9ca3af', icon: '🥈' },
              { place: '3rd', prize: '', points: '25 VRS Points', color: '#a855f7', icon: '🥉' },
              { place: '4th', prize: '', points: '15 VRS Points', color: '#6b7280', icon: '🎯' },
              { place: '5-9th', prize: '', points: '5 VRS Points', color: '#6b7280', icon: '⭐' },
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
        Upcoming MDK Season 4 matches
      </h3>
      
      {/* March 9 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: '#e5e7eb', marginBottom: 14, fontWeight: 600 }}>Monday — March 9th 2026</div>
        {upcomingMatches.filter(m => m.date === 'March 9th 2026').map((match, idx) => (
          <motion.div
            key={idx}
            whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.12)' }}
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr auto',
              alignItems: 'center',
              gap: 16,
              padding: '14px 18px',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              borderRadius: 8,
              marginBottom: 8,
              border: '1px solid rgba(168, 85, 247, 0.12)',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedMatch({ ...match, id: `UB${idx + 1}`, score1: 0, score2: 0 })}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#e5e7eb' }}>{match.time}</div>
              <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2 }}>{match.format}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 500 }}>{match.team1}</span>
                <TeamLogo name={match.team1} size={24} />
              </div>
              <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, padding: '0 8px' }}>vs</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <TeamLogo name={match.team2} size={24} />
                <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 500 }}>{match.team2}</span>
              </div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid rgba(168, 85, 247, 0.3)' }} />
          </motion.div>
        ))}
      </div>

      {/* March 10 */}
      <div>
        <div style={{ fontSize: 12, color: '#e5e7eb', marginBottom: 14, fontWeight: 600 }}>Tuesday — March 10th 2026</div>
        {upcomingMatches.filter(m => m.date === 'March 10th 2026').map((match, idx) => (
          <motion.div
            key={idx}
            whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.12)' }}
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr auto',
              alignItems: 'center',
              gap: 16,
              padding: '14px 18px',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              borderRadius: 8,
              marginBottom: 8,
              border: '1px solid rgba(168, 85, 247, 0.12)',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedMatch({ ...match, id: `UB${idx + 3}`, score1: 0, score2: 0 })}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#e5e7eb' }}>{match.time}</div>
              <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2 }}>{match.format}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 500 }}>{match.team1}</span>
                <TeamLogo name={match.team1} size={24} />
              </div>
              <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, padding: '0 8px' }}>vs</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <TeamLogo name={match.team2} size={24} />
                <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 500 }}>{match.team2}</span>
              </div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid rgba(168, 85, 247, 0.3)' }} />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderResults = () => (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 16, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>No matches played yet</div>
      <div style={{ fontSize: 12, color: '#9ca3af' }}>Tournament starts March 9th 2026</div>
    </div>
  );

  const renderStats = () => (
    <div>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, color: '#a855f7', fontWeight: 700 }}>
        Top teams
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {attendingTeams.map((team, idx) => (
          <Link key={team.name} href={`/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 50px 1fr 100px 70px',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: 8,
                border: '1px solid rgba(168, 85, 247, 0.1)',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</span>
              <TeamLogo name={team.name} size={28} />
              <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>{team.name}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 700 }}>0.00</div>
                <div style={{ fontSize: 9, color: '#6b7280' }}>Rating 2.0</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 500 }}>0</div>
                <div style={{ fontSize: 9, color: '#6b7280' }}>Maps</div>
              </div>
            </motion.div>
          </Link>
        ))}
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

  const renderBracket = () => (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <Link 
          href="/tournaments/mdk-season-4-bracket"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: 8,
            color: '#a855f7',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.3)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          View Full Tournament Bracket →
        </Link>
      </div>
      
      {/* Mini bracket preview */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 40,
        padding: '20px',
        backgroundColor: 'rgba(22, 27, 34, 0.4)',
        borderRadius: 12,
        border: '1px solid rgba(168, 85, 247, 0.15)'
      }}>
        {/* Round 1 */}
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: 12, color: '#a855f7', marginBottom: 10, textTransform: 'uppercase' }}>Round 1</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: 'rgba(15, 23, 42, 0.5)', 
              borderRadius: 6, 
              fontSize: 11,
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>HOLOXY vs DEAD EYES</div>
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: 'rgba(15, 23, 42, 0.5)', 
              borderRadius: 6, 
              fontSize: 11,
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>BEBRIKI vs MGL</div>
          </div>
        </div>
        
        {/* Arrow */}
        <div style={{ fontSize: 24, color: '#a855f7' }}>→</div>
        
        {/* Round 2 */}
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: 12, color: '#a855f7', marginBottom: 10, textTransform: 'uppercase' }}>Finals</h4>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: 'rgba(15, 23, 42, 0.5)', 
            borderRadius: 6, 
            fontSize: 11,
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>TBD vs TBD</div>
        </div>
      </div>
    </div>
  );

  const renderGroups = () => {
    // Sample group data for MDK Season 4
    const groupsData = [
      {
        name: "Group A",
        openingRound: [
          { id: "A1", team1: "HOLOXY", team2: "DEAD EYES", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
          { id: "A2", team1: "BEBRIKI", team2: "MGL", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
          { id: "A3", team1: "HAWKS", team2: "PLATINA", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
          { id: "A4", team1: "Impact Team", team2: "XENOX ACADEMY", score1: 0, score2: 2, status: "completed" as const, winner: "team2" as const },
        ],
        upperFinal: [
          { id: "A5", team1: "HOLOXY", team2: "MGL", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
          { id: "A6", team1: "HAWKS", team2: "XENOX ACADEMY", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
        ],
        groupFinal: [
          { id: "A7", team1: "HOLOXY", team2: "XENOX ACADEMY", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
        ],
        lowerFinal: [
          { id: "A8", team1: "MGL", team2: "HAWKS", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
        ],
        consolidationFinal: [
          { id: "A9", team1: "XENOX ACADEMY", team2: "MGL", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
        ],
      },
      {
        name: "Group B",
        openingRound: [
          { id: "B1", team1: "AURATEAM", team2: "GODBLESS", score1: 2, score2: 2, status: "live" as const },
          { id: "B2", team1: "FROGSTAR", team2: "MYSTIQUE", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
          { id: "B3", team1: "NEXUS", team2: "VORTEX", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
          { id: "B4", team1: "PHOENIX", team2: "SHADOW", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
        ],
        upperFinal: [
          { id: "B5", team1: "FROGSTAR", team2: "VORTEX", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
        ],
        groupFinal: [
          { id: "B6", team1: "FROGSTAR", team2: "PHOENIX", status: "upcoming" as const },
        ],
        lowerFinal: [
          { id: "B7", team1: "VORTEX", team2: "SHADOW", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
        ],
        consolidationFinal: [
          { id: "B8", team1: "PHOENIX", team2: "VORTEX", status: "upcoming" as const },
        ],
      },
    ];

    return (
      <div className="space-y-8">
        {groupsData.map((group) => (
          <TournamentGroup key={group.name} group={group} />
        ))}
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
                backgroundImage: "url('/banner-bg.jpg'), linear-gradient(130deg, rgba(15,23,42,0.6) 0%, rgba(88,28,135,0.8) 50%, rgba(15,23,42,0.9) 100%)",
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

      </div>
  );
}

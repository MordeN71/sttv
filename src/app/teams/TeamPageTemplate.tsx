'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { teamsData, eventsData } from './teamData';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

interface TeamPageProps {
  teamName: string;
}

export default function TeamPage({ teamName }: TeamPageProps) {
  const [activeTab, setActiveTab] = useState('Info');
  const [eventsFilter, setEventsFilter] = useState<'ongoing' | 'ended'>('ongoing');
  const [achievementsFilter, setAchievementsFilter] = useState<'major' | 'lan' | 'online'>('major');
  const team = teamsData[teamName];

  if (!team) return <div>Team not found</div>;

  const tabs = ['Info', 'Roster', 'Matches', 'Events', 'Achievements', 'News', 'Stats'];

  const worldRanking = Object.entries(teamsData)
    .filter(([_, data]) => data.strRank !== '-')
    .sort((a, b) => (a[1].strRank as number) - (b[1].strRank as number));

  const upcomingMatch = teamName === 'HOLOXY' || teamName === 'Impact Team'
    ? { team1: 'Impact Team', team2: 'HOLOXY', time: '21:00', date: 'March 10th 2026', format: 'BO3', event: 'MDK Season 4' }
    : teamName === 'DEAD EYES' || teamName === 'MGL'
    ? { team1: 'DEAD EYES', team2: 'MGL', time: '21:00', date: 'March 9th 2026', format: 'BO3', event: 'MDK Season 4' }
    : teamName === 'BEBRIKI' || teamName === 'PLATINA'
    ? { team1: 'BEBRIKI', team2: 'PLATINA', time: '21:00', date: 'March 9th 2026', format: 'BO3', event: 'MDK Season 4' }
    : { team1: 'HAWKS', team2: 'XENOX ACADEMY', time: '21:00', date: 'March 10th 2026', format: 'BO3', event: 'MDK Season 4' };

  const todayMatches = [
    { pair: 1, team1: 'DEAD EYES', team2: 'MGL', time: '21:00', event: 'MDK Season 4' },
    { pair: 2, team1: 'BEBRIKI', team2: 'PLATINA', time: '21:00', event: 'MDK Season 4' },
    { pair: 3, team1: 'HAWKS', team2: 'XENOX ACADEMY', time: '21:00', event: 'MDK Season 4' },
    { pair: 4, team1: 'Impact Team', team2: 'HOLOXY', time: '21:00', event: 'MDK Season 4' },
  ];

  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '24px 20px 40px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1400, width: '100%', display: 'flex', gap: 24 }}>
        {/* Left Sidebar */}
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
              {worldRanking.slice(0, 5).map(([name, data], idx) => (
                <Link key={name} href={`/teams/${name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 10px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      backgroundColor: name === teamName ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    }}
                  >
                    <span style={{ fontSize: 12, color: '#6b7280', width: 20, textAlign: 'center', fontWeight: 600 }}>{idx + 1}</span>
                    <img src={data.logo} alt={name} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'contain' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 500 }}>{name}</div>
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
                  padding: '10px',
                  textAlign: 'center',
                  borderRadius: 6,
                  fontSize: 11,
                  color: '#a855f7',
                  cursor: 'pointer',
                  borderTop: '1px solid rgba(168, 85, 247, 0.2)',
                }}
              >
                Complete ranking →
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
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Team Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ ...glassCard, padding: 24, marginBottom: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={team.logo} alt={teamName} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'contain' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>🇷🇺</span>
                  <span style={{ fontSize: 14, color: '#9ca3af' }}>{team.region}</span>
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#e5e7eb', margin: 0 }}>{teamName}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>
                    <span style={{ color: '#e5e7eb', fontWeight: 600 }}>#{team.strRank}</span> STR ranking
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>
                    <span style={{ color: '#e5e7eb', fontWeight: 600 }}>#{team.worldRank}</span> World ranking
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ ...glassCard, padding: 0, overflow: 'hidden', marginBottom: 20 }}
          >
            <div style={{ display: 'flex', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(148, 163, 253, 0.3)' }}>
              {tabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '14px 20px',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    color: activeTab === tab ? '#fff' : '#9ca3af',
                    fontWeight: activeTab === tab ? 700 : 500,
                    borderBottom: activeTab === tab ? '2px solid #a855f7' : '2px solid transparent',
                    background: activeTab === tab ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: 24 }}>
              {activeTab === 'Info' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                    <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 16, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Weeks in top 30 for core</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#e5e7eb' }}>{team.weeksInTop30}</div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 16, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Average player age</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#e5e7eb' }}>{team.avgAge}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                    No ranking data available yet.
                  </div>
                </div>
              )}

              {activeTab === 'Roster' && (
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12 }}>Players of {teamName}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
                      {team.players.map((player, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                          <div style={{
                            width: 70,
                            height: 70,
                            borderRadius: 8,
                            backgroundColor: 'rgba(168, 85, 247, 0.2)',
                            margin: '0 auto 8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                          }}>
                            👤
                          </div>
                          <div style={{ fontSize: 11 }}>{player.flag}</div>
                          <div style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 600 }}>{player.name}</div>
                          <div style={{
                            fontSize: 10,
                            color: '#fff',
                            backgroundColor: '#4b5563',
                            padding: '2px 8px',
                            borderRadius: 4,
                            display: 'inline-block',
                            marginTop: 4,
                          }}>
                            {player.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12 }}>Player Statistics</div>
                    <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(168, 85, 247, 0.1)' }}>
                        <div style={{ fontSize: 11, color: '#6b7280' }}>Player</div>
                        <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>Time on team</div>
                        <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>Maps played</div>
                        <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>Rating 3.0</div>
                      </div>
                      {team.players.map((player, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(168, 85, 247, 0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 14 }}>{player.flag}</span>
                            <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>{player.name}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>0 months</div>
                          <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>0</div>
                          <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>0.00</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Matches' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                    <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb' }}>0</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>Current win streak</div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb' }}>0%</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>Win rate</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12 }}>Upcoming matches for {teamName}</div>
                    <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 16, borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: '#a855f7', fontWeight: 600, marginBottom: 8 }}>{upcomingMatch.event}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13, color: '#e5e7eb' }}>{upcomingMatch.team1}</span>
                          <img src={teamsData[upcomingMatch.team1].logo} alt="" style={{ width: 20, height: 20, borderRadius: '50%' }} />
                        </div>
                        <div style={{ fontSize: 12, color: '#9ca3af' }}>vs</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <img src={teamsData[upcomingMatch.team2].logo} alt="" style={{ width: 20, height: 20, borderRadius: '50%' }} />
                          <span style={{ fontSize: 13, color: '#e5e7eb' }}>{upcomingMatch.team2}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280' }}>{upcomingMatch.time}</div>
                        <Link href={`/events/mdk-s4`} style={{ fontSize: 11, color: '#fff', backgroundColor: '#4b5563', padding: '4px 12px', borderRadius: 4, textDecoration: 'none' }}>
                          Match
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12 }}>Recent results for {teamName}</div>
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0' }}>
                      No matches played yet
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Events' && (
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <div 
                      onClick={() => setEventsFilter('ongoing')}
                      style={{ 
                        fontSize: 12, 
                        color: eventsFilter === 'ongoing' ? '#fff' : '#6b7280', 
                        backgroundColor: eventsFilter === 'ongoing' ? '#4b5563' : 'transparent', 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Ongoing & Upcoming
                    </div>
                    <div 
                      onClick={() => setEventsFilter('ended')}
                      style={{ 
                        fontSize: 12, 
                        color: eventsFilter === 'ended' ? '#fff' : '#6b7280', 
                        backgroundColor: eventsFilter === 'ended' ? '#4b5563' : 'transparent', 
                        padding: '8px 16px', 
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Ended
                    </div>
                  </div>
                  {eventsFilter === 'ongoing' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <Link href="/events/mdk-s4" style={{ textDecoration: 'none' }}>
                        <motion.div
                          whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            padding: 16,
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            borderRadius: 8,
                          }}
                        >
                          <img src="/events/mdkseason4.png" alt="MDK Season 4" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'contain' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, color: '#e5e7eb', fontWeight: 600 }}>MDK Season 4</div>
                            <div style={{ fontSize: 12, color: '#9ca3af' }}>Mar 9-10</div>
                          </div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            {Object.entries(teamsData).slice(0, 8).map(([name, data]) => (
                              <img key={name} src={data.logo} alt="" style={{ width: 20, height: 20, borderRadius: '50%' }} />
                            ))}
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                      No ended events yet
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Achievements' && (
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <div 
                      onClick={() => setAchievementsFilter('major')}
                      style={{ 
                        fontSize: 12, 
                        color: achievementsFilter === 'major' ? '#fff' : '#6b7280', 
                        backgroundColor: achievementsFilter === 'major' ? '#4b5563' : 'transparent', 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Major
                    </div>
                    <div 
                      onClick={() => setAchievementsFilter('lan')}
                      style={{ 
                        fontSize: 12, 
                        color: achievementsFilter === 'lan' ? '#fff' : '#6b7280', 
                        backgroundColor: achievementsFilter === 'lan' ? '#4b5563' : 'transparent', 
                        padding: '8px 16px', 
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      LAN
                    </div>
                    <div 
                      onClick={() => setAchievementsFilter('online')}
                      style={{ 
                        fontSize: 12, 
                        color: achievementsFilter === 'online' ? '#fff' : '#6b7280', 
                        backgroundColor: achievementsFilter === 'online' ? '#4b5563' : 'transparent', 
                        padding: '8px 16px', 
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Online
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                    No {achievementsFilter} achievements yet
                  </div>
                </div>
              )}

              {activeTab === 'News' && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12 }}>News posts mentioning {teamName}</div>
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                    No news posts yet
                  </div>
                </div>
              )}

              {activeTab === 'Stats' && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 12 }}>{teamName}&apos;s last 5 matches</div>
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                    No statistics available yet
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280, flexShrink: 0 }}>
          {/* Today's Matches */}
          <div style={{ ...glassCard, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Today&apos;s Matches
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {todayMatches.map((match) => (
                <Link key={match.pair} href="/events/mdk-s4" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 10, color: '#a855f7', marginBottom: 6 }}>{match.event}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <img src={teamsData[match.team1].logo} alt="" style={{ width: 16, height: 16, borderRadius: '50%' }} />
                        <span style={{ fontSize: 12, color: '#e5e7eb' }}>{match.team1}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <img src={teamsData[match.team2].logo} alt="" style={{ width: 16, height: 16, borderRadius: '50%' }} />
                        <span style={{ fontSize: 12, color: '#e5e7eb' }}>{match.team2}</span>
                      </div>
                      <span style={{ fontSize: 11, color: '#6b7280' }}>{match.time}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* TOP 30 TRANSFERS */}
          <div style={{ ...glassCard, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              TOP 30 TRANSFERS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0', fontSize: 12 }}>
                No recent transfers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

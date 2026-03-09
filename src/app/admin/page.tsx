'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'HLTV_ADMIN_92841';

export default function AdminPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('tournaments');
  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'MDK Season 4', status: 'live', prize: '1600 RUB' },
    { id: 2, name: 'FROGSTAR', status: 'upcoming', prize: '500 RUB' },
  ]);
  const [teams, setTeams] = useState([
    { id: 1, name: 'HOLOXY', region: 'Russia', logo: '/teams/holoxy.png' },
    { id: 2, name: 'Impact Team', region: 'Russia', logo: '/teams/impact.png' },
  ]);
  const [matches, setMatches] = useState([
    { id: 1, tournamentId: 1, team1Id: 1, team2Id: 2, status: 'upcoming', time: '21:00' },
  ]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('admin_authenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
    } else {
      alert('Invalid admin key');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setAdminKey('');
  };

  if (!isSignedIn) {
    return (
      <div style={{ background: bgMain, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ ...glassCard, padding: 40, maxWidth: 400, width: '100%' }}>
          <h2 style={{ color: '#a855f7', textAlign: 'center', marginBottom: 24 }}>Admin Access Required</h2>
          <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: 24 }}>
            Please sign in to access admin panel
          </p>
          <button
            onClick={() => router.push('/sign-in')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#a855f7',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ background: bgMain, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...glassCard, padding: 40, maxWidth: 400, width: '100%' }}
        >
          <h2 style={{ color: '#a855f7', textAlign: 'center', marginBottom: 24 }}>Admin Verification</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#fff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
              Admin Key
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#a855f7',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Verify
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: bgMain, minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, color: '#fff', fontWeight: 800, textTransform: 'uppercase' }}>
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24, borderBottom: '1px solid rgba(168, 85, 247, 0.2)' }}>
          {['tournaments', 'teams', 'matches'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === tab ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                color: activeTab === tab ? '#a855f7' : '#9ca3af',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #a855f7' : 'none',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...glassCard, padding: 24 }}
        >
          {activeTab === 'tournaments' && (
            <div>
              <h2 style={{ color: '#a855f7', marginBottom: 20 }}>Tournament Management</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                {tournaments.map((tournament) => (
                  <div key={tournament.id} style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: 4 }}>
                        {tournament.name}
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                        {tournament.prize} • {tournament.status}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}>
                        Edit
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: 20,
                padding: '12px 24px',
                backgroundColor: '#a855f7',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}>
                Add Tournament
              </button>
            </div>
          )}

          {activeTab === 'teams' && (
            <div>
              <h2 style={{ color: '#a855f7', marginBottom: 20 }}>Team Management</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                {teams.map((team) => (
                  <div key={team.id} style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'rgba(168, 85, 247, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                      }}>
                        🏆
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: 2 }}>
                          {team.name}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                          {team.region}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}>
                        Edit
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: 20,
                padding: '12px 24px',
                backgroundColor: '#a855f7',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}>
                Add Team
              </button>
            </div>
          )}

          {activeTab === 'matches' && (
            <div>
              <h2 style={{ color: '#a855f7', marginBottom: 20 }}>Match Management</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                {matches.map((match) => (
                  <div key={match.id} style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: 4 }}>
                          Match #{match.id}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                          {match.time} • {match.status}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3b82f6',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}>
                          Edit Score
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          color: '#22c55e',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}>
                          Set Winner
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ color: '#fff', fontSize: '14px' }}>
                        Team {match.team1Id} vs Team {match.team2Id}
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                        BO3
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: 20,
                padding: '12px 24px',
                backgroundColor: '#a855f7',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}>
                Add Match
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

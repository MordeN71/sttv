'use client';

import React, { useMemo } from 'react';

interface Team {
  name: string;
  logo?: string;
  score?: number;
  isWinner?: boolean;
}

interface MatchData {
  id: string;
  team1: Team;
  team2: Team;
  roundIndex?: number;
  matchIndex?: number;
}

interface BracketRound {
  name: string;
  matches: MatchData[];
}

interface ModernBracketProps {
  rounds: BracketRound[];
  type?: 'single' | 'double';
  onMatchClick?: (match: MatchData) => void;
  className?: string;
}

const ModernBracket: React.FC<ModernBracketProps> = ({ 
  rounds, 
  type = 'single', 
  onMatchClick, 
  className = '' 
}) => {
  // Calculate positions only (no lines)
  const { matchPositions } = useMemo(() => {
    const positions: Array<{ round: number; match: number; top: number; left: number }> = [];
    
    const baseSpacing = 100;
    const columnWidth = 280;
    const columnGap = 120;
    
    rounds.forEach((round, roundIndex) => {
      const matchSpacing = baseSpacing * Math.pow(2, roundIndex);
      const left = roundIndex * (columnWidth + columnGap);
      
      round.matches.forEach((match, matchIndex) => {
        const top = matchIndex * matchSpacing;
        positions.push({
          round: roundIndex,
          match: matchIndex,
          top,
          left
        });
      });
    });
    
    return { matchPositions: positions };
  }, [rounds]);

  return (
    <div className={`modern-bracket ${className}`}>
      {/* Bracket Content */}
      <div 
        className="bracket-content"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '120px',
          padding: '40px',
          minHeight: '600px',
          width: '100%',
          position: 'relative'
        }}
      >
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            <div className="round-header">
              {round.name}
            </div>
            <div className="round-matches">
              {round.matches.map((match, matchIndex) => (
                <ModernMatchCard
                  key={match.id}
                  match={match}
                  roundIndex={roundIndex}
                  matchIndex={matchIndex}
                  onClick={() => onMatchClick?.(match)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .modern-bracket {
          position: relative;
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%);
          border-radius: 20px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          overflow: visible;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 0 60px rgba(139, 92, 246, 0.1),
            inset 0 0 40px rgba(139, 92, 246, 0.05);
          width: 100%;
          max-width: 100%;
        }

        .bracket-content {
          min-width: fit-content;
          margin: 0 auto;
        }

        .bracket-round {
          position: relative;
          height: 500px;
          width: 100%;
          max-width: 280px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .round-header {
          color: #a855f7;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-align: center;
          margin-bottom: 30px;
          padding: '12px 20px';
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.3) 100%);
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.4);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
        }

        .round-matches {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 80px;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          flex: 1;
        }
      `}</style>
    </div>
  );
};

// Modern Match Card Component
interface ModernMatchCardProps {
  match: MatchData;
  roundIndex: number;
  matchIndex: number;
  onClick?: () => void;
}

const ModernMatchCard: React.FC<ModernMatchCardProps> = ({ 
  match, 
  roundIndex, 
  matchIndex, 
  onClick 
}) => {
  const baseSpacing = 100;
  const matchSpacing = baseSpacing * Math.pow(2, roundIndex);
  const top = matchIndex * matchSpacing;

  return (
    <div
      className={`modern-match-card ${(match.team1.isWinner || match.team2.isWinner) ? 'winner-glow' : ''}`}
      style={{
        width: '100%',
        maxWidth: '280px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={onClick}
    >
      <div className="match-card-inner">
        {/* Team 1 */}
        <div className={`team ${match.team1.isWinner ? 'winner' : ''}`}>
          <div className="team-left">
            <div className="team-logo">
              {match.team1.logo ? (
                <img 
                  src={match.team1.logo} 
                  alt={match.team1.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '2px solid rgba(139, 92, 246, 0.3)'
                  }}
                />
              ) : (
                <div className="logo-placeholder">
                  {match.team1.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="team-name">{match.team1.name}</span>
          </div>
          <div className={`team-score ${match.team1.isWinner ? 'winner' : ''}`}>
            {match.team1.score ?? '-'}
          </div>
        </div>

        {/* Team 2 */}
        <div className={`team ${match.team2.isWinner ? 'winner' : ''}`}>
          <div className="team-left">
            <div className="team-logo">
              {match.team2.logo ? (
                <img 
                  src={match.team2.logo} 
                  alt={match.team2.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '2px solid rgba(139, 92, 246, 0.3)'
                  }}
                />
              ) : (
                <div className="logo-placeholder">
                  {match.team2.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="team-name">{match.team2.name}</span>
          </div>
          <div className={`team-score ${match.team2.isWinner ? 'winner' : ''}`}>
            {match.team2.score ?? '-'}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-match-card {
          transform: translateX(0);
        }

        .modern-match-card:hover {
          transform: translateX(8px) scale(1.02);
        }

        .winner-glow .match-card-inner {
          box-shadow: 
            0 0 40px rgba(139, 92, 246, 0.4),
            0 0 80px rgba(139, 92, 246, 0.2),
            inset 0 0 20px rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.6);
        }

        .match-card-inner {
          background: linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          padding: '16px';
          backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(139, 92, 246, 0.05);
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        .team {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: '12px 0';
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
          transition: 'all 0.2s ease';
        }

        .team:last-child {
          border-bottom: none;
        }

        .team.winner {
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%);
          border-radius: 8px;
          margin: 0 -8px;
          padding: 12px 8px;
        }

        .team-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .team-logo {
          flex-shrink: 0;
        }

        .logo-placeholder {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.4) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          border: 2px solid rgba(139, 92, 246, 0.3);
        }

        .team-name {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: 'color 0.2s ease';
        }

        .team.winner .team-name {
          color: #fff;
          font-weight: 700;
        }

        .team-score {
          color: rgba(255, 255, 255, 0.7);
          font-size: 18px;
          font-weight: 700;
          min-width: 40px;
          text-align: right;
          transition: 'all 0.2s ease';
        }

        .team-score.winner {
          color: #a855f7;
          font-size: 20px;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
};

export default ModernBracket;

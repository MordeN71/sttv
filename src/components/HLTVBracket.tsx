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
}

interface BracketRound {
  name: string;
  matches: MatchData[];
}

interface HLTVBracketProps {
  rounds: BracketRound[];
  onMatchClick?: (match: MatchData) => void;
  className?: string;
}

const HLTVBracket: React.FC<HLTVBracketProps> = ({ rounds, onMatchClick, className = '' }) => {
  // Calculate match positions and SVG paths
  const { matchPositions, svgPaths } = useMemo(() => {
    const baseSpacing = 80;
    const positions: Array<{ round: number; match: number; top: number; left: number }> = [];
    const paths: Array<{ d: string; key: string }> = [];

    rounds.forEach((round, roundIndex) => {
      const matchSpacing = baseSpacing * Math.pow(2, roundIndex);
      const left = roundIndex * (200 + 80); // 200px width + 80px gap

      round.matches.forEach((match, matchIndex) => {
        // Proper vertical spacing for all rounds
        const top = matchIndex * (matchSpacing + 40); // Add 40px vertical spacing between matches
        positions.push({
          round: roundIndex,
          match: matchIndex,
          top,
          left
        });

        // Create connector lines to next round
        if (roundIndex < rounds.length - 1) {
          const nextRound = rounds[roundIndex + 1];
          const nextMatchIndex = Math.floor(matchIndex / 2);
          const nextMatchSpacing = baseSpacing * Math.pow(2, roundIndex + 1);
          const nextLeft = (roundIndex + 1) * (200 + 80);
          
          // Calculate next top position with proper centering
          const currentMatchHeight = 50; // Approximate match height
          const nextTop = nextMatchIndex * (nextMatchSpacing + 40) + (nextMatchSpacing / 2) - (currentMatchHeight / 2);
          const currentTop = top + 25;

          // Calculate connection points
          const currentRight = left + 180; // Match width
          const midX = currentRight + 40; // Middle point
          const nextLeftPoint = nextLeft;

          // Create path: M startX startY H midX V endY H endX
          const pathData = `M ${currentRight} ${currentTop} H ${midX} V ${nextTop + 25} H ${nextLeftPoint}`;
          
          paths.push({
            d: pathData,
            key: `line-${roundIndex}-${matchIndex}`
          });
        }
      });
    });

    return { matchPositions: positions, svgPaths: paths };
  }, [rounds]);

  return (
    <div className={`hltv-bracket-wrapper ${className}`}>
      {/* SVG Connector Lines */}
      <svg 
        className="bracket-lines"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {svgPaths.map((path) => (
          <path
            key={path.key}
            d={path.d}
            fill="none"
            stroke="rgba(170, 120, 255, 0.4)"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Bracket Grid */}
      <div 
        className="bracket"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: '200px',
          columnGap: '80px',
          position: 'relative',
          padding: '20px',
          minHeight: '300px'
        }}
      >
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            <div className="round-header">
              {round.name}
            </div>
            <div className="round-matches">
              {round.matches.map((match, matchIndex) => {
                const baseSpacing = 80;
                const matchSpacing = baseSpacing * Math.pow(2, roundIndex);
                const top = matchIndex * matchSpacing;
                
                return (
                  <HLTVMatchCard
                    key={match.id}
                    match={match}
                    style={{
                      position: 'absolute',
                      top: `${top}px`,
                      width: '180px'
                    }}
                    onClick={() => onMatchClick?.(match)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hltv-bracket-wrapper {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          background: rgba(15, 10, 25, 0.8);
          border-radius: 16px;
          border: 1px solid rgba(170, 120, 255, 0.2);
          overflow: visible;
        }

        .bracket-round {
          position: relative;
          min-height: 200px;
        }

        .round-header {
          color: #a855f7;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 20px;
          padding: 8px;
          background: rgba(40, 20, 70, 0.3);
          border-radius: 6px;
          border: 1px solid rgba(170, 120, 255, 0.2);
        }

        .round-matches {
          position: relative;
        }
      `}</style>
    </div>
  );
};

// HLTV Match Card Component
interface HLTVMatchCardProps {
  match: MatchData;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const HLTVMatchCard: React.FC<HLTVMatchCardProps> = ({ match, style, onClick }) => {
  return (
    <div
      className={`hltv-match ${(match.team1.isWinner || match.team2.isWinner) ? 'winner' : ''}`}
      style={{
        ...style,
        padding: '6px',
        borderRadius: '6px',
        background: 'rgba(40, 20, 70, 0.55)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(170, 120, 255, 0.35)',
        boxShadow: '0 0 18px rgba(140, 90, 255, 0.25)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      {/* Team 1 */}
      <div className="team">
        <div className="team-info">
          <div className="logo">
            {match.team1.logo ? (
              <img 
                src={match.team1.logo} 
                alt={match.team1.name}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'rgba(170, 120, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8px',
                  color: '#a855f7'
                }}
              >
                ?
              </div>
            )}
          </div>
          <span className={`name ${match.team1.isWinner ? 'winner' : ''}`}>
            {match.team1.name}
          </span>
        </div>
        <span className={`score ${match.team1.isWinner ? 'winner' : ''}`}>
          {match.team1.score ?? '-'}
        </span>
      </div>

      {/* Team 2 */}
      <div className="team">
        <div className="team-info">
          <div className="logo">
            {match.team2.logo ? (
              <img 
                src={match.team2.logo} 
                alt={match.team2.name}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'rgba(170, 120, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8px',
                  color: '#a855f7'
                }}
              >
                ?
              </div>
            )}
          </div>
          <span className={`name ${match.team2.isWinner ? 'winner' : ''}`}>
            {match.team2.name}
          </span>
        </div>
        <span className={`score ${match.team2.isWinner ? 'winner' : ''}`}>
          {match.team2.score ?? '-'}
        </span>
      </div>

      <style jsx>{`
        .hltv-match {
          border-bottom: 1px solid rgba(170, 120, 255, 0.2);
        }

        .hltv-match.winner {
          box-shadow: 0 0 30px rgba(200, 140, 255, 0.6) !important;
          border-color: rgba(200, 140, 255, 0.6) !important;
        }

        .hltv-match:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(180, 120, 255, 0.5);
          border-color: rgba(180, 120, 255, 0.5);
        }

        .team {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 0;
          min-height: 24px;
        }

        .team:first-child {
          border-bottom: 1px solid rgba(170, 120, 255, 0.15);
        }

        .team-info {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
        }

        .logo {
          flex-shrink: 0;
        }

        .name {
          color: rgba(255, 255, 255, 0.8);
          font-size: 10px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .name.winner {
          color: #fff;
          font-weight: 600;
        }

        .score {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          font-weight: 600;
          margin-left: 6px;
        }

        .score.winner {
          color: #a855f7;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default HLTVBracket;

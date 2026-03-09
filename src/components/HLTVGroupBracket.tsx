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

interface HLTVGroupBracketProps {
  rounds: BracketRound[];
  groupName: string;
  onMatchClick?: (match: MatchData) => void;
  className?: string;
}

const HLTVGroupBracket: React.FC<HLTVGroupBracketProps> = ({ rounds, groupName, onMatchClick, className = '' }) => {
  // Calculate match positions and SVG paths for group bracket
  const { svgPaths } = useMemo(() => {
    const baseSpacing = 70;
    const paths: Array<{ d: string; key: string }> = [];

    rounds.forEach((round, roundIndex) => {
      if (roundIndex === rounds.length - 1) return; // Last round has no outgoing lines
      
      const nextRound = rounds[roundIndex + 1];
      const left = roundIndex * (200 + 60); // 200px width + 60px gap
      
      round.matches.forEach((match, matchIndex) => {
        const top = matchIndex * baseSpacing;
        
        // Create connector lines to next round
        if (roundIndex < rounds.length - 1 && matchIndex < nextRound.matches.length) {
          const nextLeft = (roundIndex + 1) * (200 + 60);
          const nextTop = matchIndex * baseSpacing;

          // Calculate connection points
          const currentRight = left + 180; // Match width
          const midX = currentRight + 30; // Middle point
          const currentTop = top + 25;

          // Create path: M startX startY H midX V endY H endX
          const pathData = `M ${currentRight} ${currentTop} H ${midX} V ${nextTop + 25} H ${nextLeft}`;
          
          paths.push({
            d: pathData,
            key: `line-${roundIndex}-${matchIndex}`
          });
        }
      });
    });

    return { svgPaths: paths };
  }, [rounds]);

  return (
    <div className={`hltv-group-bracket ${className}`}>
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

      {/* Group Header */}
      <div className="group-header">
        {groupName}
      </div>

      {/* Bracket Grid */}
      <div 
        className="bracket"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: '200px',
          columnGap: '60px',
          position: 'relative',
          padding: '15px',
          minHeight: '250px'
        }}
      >
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            <div className="round-header">
              {round.name}
            </div>
            <div className="round-matches">
              {round.matches.map((match, matchIndex) => {
                const baseSpacing = 70;
                const top = matchIndex * baseSpacing;
                
                return (
                  <HLTVGroupMatchCard
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
        .hltv-group-bracket {
          position: relative;
          background: rgba(15, 10, 25, 0.6);
          border-radius: 12px;
          border: 1px solid rgba(170, 120, 255, 0.2);
          padding: 20px;
          margin-bottom: 20px;
        }

        .group-header {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 15px;
          padding: 10px;
          background: rgba(40, 20, 70, 0.4);
          border-radius: 8px;
          border: 1px solid rgba(170, 120, 255, 0.3);
          box-shadow: 0 0 15px rgba(140, 80, 255, 0.3);
        }

        .bracket-round {
          position: relative;
          min-height: 150px;
        }

        .round-header {
          color: #a855f7;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
          margin-bottom: 10px;
          padding: 4px;
          background: rgba(40, 20, 70, 0.3);
          border-radius: 4px;
          border: 1px solid rgba(170, 120, 255, 0.2);
        }

        .round-matches {
          position: relative;
        }
      `}</style>
    </div>
  );
};

// Group Match Card Component (simplified version)
interface HLTVGroupMatchCardProps {
  match: MatchData;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const HLTVGroupMatchCard: React.FC<HLTVGroupMatchCardProps> = ({ match, style, onClick }) => {
  return (
    <div
      className={`hltv-group-match ${(match.team1.isWinner || match.team2.isWinner) ? 'winner' : ''}`}
      style={{
        ...style,
        padding: '5px',
        borderRadius: '5px',
        background: 'rgba(40, 20, 70, 0.55)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(170, 120, 255, 0.35)',
        boxShadow: '0 0 15px rgba(140, 90, 255, 0.25)',
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
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'rgba(170, 120, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '7px',
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
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'rgba(170, 120, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '7px',
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
        .hltv-group-match {
          border-bottom: 1px solid rgba(170, 120, 255, 0.2);
        }

        .hltv-group-match.winner {
          box-shadow: 0 0 25px rgba(200, 140, 255, 0.6) !important;
          border-color: rgba(200, 140, 255, 0.6) !important;
        }

        .hltv-group-match:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(180, 120, 255, 0.5);
          border-color: rgba(180, 120, 255, 0.5);
        }

        .team {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3px 0;
          min-height: 20px;
        }

        .team:first-child {
          border-bottom: 1px solid rgba(170, 120, 255, 0.15);
        }

        .team-info {
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1;
        }

        .logo {
          flex-shrink: 0;
        }

        .name {
          color: rgba(255, 255, 255, 0.8);
          font-size: 9px;
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
          font-size: 10px;
          font-weight: 600;
          margin-left: 5px;
        }

        .score.winner {
          color: #a855f7;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default HLTVGroupBracket;

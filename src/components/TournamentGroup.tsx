'use client';

import React from 'react';

interface Match {
  id: string;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  status: 'completed' | 'upcoming' | 'live';
  winner?: 'team1' | 'team2';
}

interface GroupData {
  name: string;
  openingRound: Match[];
  upperFinal: Match[];
  groupFinal: Match[];
  lowerFinal?: Match[];
  consolidationFinal?: Match[];
}

interface TournamentGroupProps {
  group: GroupData;
}

const TournamentGroup: React.FC<TournamentGroupProps> = ({ group }) => {
  return (
    <div className="bg-[#1b1e21] text-white p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#a855f7] mb-8 text-center uppercase">
        {group.name}
      </h2>

      {/* Upper Bracket */}
      <div className="upper-bracket mb-12">
        <div 
          className="grid gap-8 relative"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '60px',
          }}
        >
          {/* Opening Round - 4 matches */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Opening Round
            </h3>
            {group.openingRound.map((match, index) => (
              <div
                key={match.id}
                className="relative"
                style={{
                  gridRow: index + 2,
                }}
              >
                <MatchCard match={match} />
                {/* Connection line to Upper Final */}
                {match.winner && index < 2 && (
                  <div 
                    className="absolute after:border-t-2 after:border-[#4a5568] after:content-[''] pointer-events-none"
                    style={{
                      top: '50%',
                      right: '-40px',
                      width: '40px',
                      height: '2px',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Upper Final - 2 matches */}
          <div className="flex flex-col justify-center space-y-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Upper Final
            </h3>
            {group.upperFinal.map((match, index) => (
              <div
                key={match.id}
                className="relative"
                style={{
                  marginTop: index === 1 ? '60px' : '0',
                }}
              >
                {/* Connection lines from Opening Round */}
                <div 
                  className="absolute before:border-t-2 before:border-[#4a5568] before:content-[''] pointer-events-none"
                  style={{
                    top: '50%',
                    left: '-40px',
                    width: '40px',
                    height: '2px',
                  }}
                />
                <MatchCard match={match} />
                {/* Connection line to Group Final */}
                {match.winner && index === 0 && (
                  <div 
                    className="absolute after:border-t-2 after:border-[#4a5568] after:content-[''] pointer-events-none"
                    style={{
                      top: '50%',
                      right: '-40px',
                      width: '40px',
                      height: '2px',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Group Final - 1 match */}
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Group Final
            </h3>
            {group.groupFinal.map((match) => (
              <div
                key={match.id}
                className="relative"
              >
                {/* Connection line from Upper Final */}
                <div 
                  className="absolute before:border-t-2 before:border-[#4a5568] before:content-[''] pointer-events-none"
                  style={{
                    top: '50%',
                    left: '-40px',
                    width: '40px',
                    height: '2px',
                  }}
                />
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Bracket */}
      {group.lowerFinal && group.consolidationFinal && (
        <div className="lower-bracket">
          <div 
            className="grid gap-8 relative"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '60px',
            }}
          >
            {/* Empty space for alignment */}
            <div></div>
            
            {/* Lower Final */}
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Lower Final
              </h3>
              {group.lowerFinal.map((match) => (
                <div
                  key={match.id}
                  className="relative"
                >
                  <MatchCard match={match} />
                  {/* Connection line to Consolidation Final */}
                  {match.winner && (
                    <div 
                      className="absolute after:border-t-2 after:border-[#4a5568] after:content-[''] pointer-events-none"
                      style={{
                        top: '50%',
                        right: '-40px',
                        width: '40px',
                        height: '2px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Consolidation Final */}
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Consolidation Final
              </h3>
              {group.consolidationFinal.map((match) => (
                <div
                  key={match.id}
                  className="relative"
                >
                  {/* Connection line from Lower Final */}
                  <div 
                    className="absolute before:border-t-2 before:border-[#4a5568] before:content-[''] pointer-events-none"
                    style={{
                      top: '50%',
                      left: '-40px',
                      width: '40px',
                      height: '2px',
                    }}
                  />
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Match Card Component
interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const getTeamColor = (team: 'team1' | 'team2') => {
    if (!match.winner) return 'bg-gray-600';
    return match.winner === team ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div className="bg-[#2d3135] rounded p-2 h-[60px] flex flex-col justify-between hover:bg-[#3d424d]/80 transition-colors relative">
      {/* Team 1 */}
      <div className="flex items-center gap-2">
        <div className={`w-1 h-4 ${getTeamColor('team1')} rounded-sm`}></div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center text-[8px] font-bold">
              {match.team1.substring(0, 3).toUpperCase()}
            </div>
            <span className="text-xs">{match.team1}</span>
          </div>
          {match.score1 !== undefined && (
            <span className="text-sm font-bold text-[#a855f7]">
              {match.score1}
            </span>
          )}
        </div>
      </div>

      {/* Team 2 */}
      <div className="flex items-center gap-2">
        <div className={`w-1 h-4 ${getTeamColor('team2')} rounded-sm`}></div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center text-[8px] font-bold">
              {match.team2.substring(0, 3).toUpperCase()}
            </div>
            <span className="text-xs">{match.team2}</span>
          </div>
          {match.score2 !== undefined && (
            <span className="text-sm font-bold text-[#a855f7]">
              {match.score2}
            </span>
          )}
        </div>
      </div>

      {/* Status Badge */}
      {match.status === 'live' && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded font-bold animate-pulse">
          LIVE
        </div>
      )}
      {match.status === 'upcoming' && (
        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] px-1 py-0.5 rounded font-bold">
          UPCOMING
        </div>
      )}
    </div>
  );
};

export default TournamentGroup;

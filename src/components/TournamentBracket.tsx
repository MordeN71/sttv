'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Match {
  id: string;
  team1?: string;
  team2?: string;
  score1?: number;
  score2?: number;
  status: 'completed' | 'upcoming' | 'live';
  winner?: 'team1' | 'team2';
  round?: number;
  position?: number;
}

interface Round {
  title: string;
  matches: Match[];
}

interface TournamentBracketProps {
  rounds: Round[];
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ rounds }) => {
  return (
    <div className="min-h-screen bg-[#1b1e21] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-[#a855f7] mb-12 text-center italic uppercase tracking-wider">
          MDK Season 4 - Tournament Bracket
        </h1>

        <div 
          className="grid gap-x-8 relative"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '60px',
            minHeight: '600px',
          }}
        >
          {/* Round Headers */}
          <div style={{ gridColumn: 1 }} className="text-center">
            <h2 className="text-xl font-bold text-[#a855f7] mb-6 uppercase">
              {rounds[0]?.title}
            </h2>
          </div>
          <div style={{ gridColumn: 2 }} className="text-center">
            <h2 className="text-xl font-bold text-[#a855f7] mb-6 uppercase">
              {rounds[1]?.title}
            </h2>
          </div>
          <div style={{ gridColumn: 3 }} className="text-center">
            <h2 className="text-xl font-bold text-[#a855f7] mb-6 uppercase">
              {rounds[2]?.title}
            </h2>
          </div>
          <div style={{ gridColumn: 4 }} className="text-center">
            <h2 className="text-xl font-bold text-[#a855f7] mb-6 uppercase">
              {rounds[3]?.title}
            </h2>
          </div>

          {/* Round 1 Matches */}
          {rounds[0]?.matches.map((match, matchIndex) => (
            <div
              key={match.id}
              className="relative"
              style={{
                gridRow: `${2 + matchIndex * 2}`,
                gridColumn: 1,
              }}
            >
              <div className="relative bg-[#2d3135] border border-[#3d424d] rounded p-3 h-[60px] flex items-center justify-between group hover:bg-[#3d424d]/80 transition-colors">
                
                {/* Connection line to next round ::after */}
                {match.winner && (
                  <div 
                    className="absolute after:border-t-2 after:border-r-2 after:border-[#a855f7] after:content-[''] pointer-events-none"
                    style={{
                      top: '50%',
                      right: '-16px',
                      width: '16px',
                      height: '2px',
                    }}
                  />
                )}

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team1 ? match.team1.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                  {match.score1 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score1}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {match.score2 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score2}
                    </span>
                  )}
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team2 ? match.team2.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                </div>

                <div className="absolute bottom-1 left-2 text-xs text-gray-500">
                  {match.id}
                </div>

                {match.status === 'live' && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
                    LIVE
                  </div>
                )}
                {match.status === 'upcoming' && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
                    UPCOMING
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Round 2 Matches - Centered */}
          {rounds[1]?.matches.map((match, matchIndex) => (
            <div
              key={match.id}
              className="relative flex items-center justify-center"
              style={{
                gridRow: `${3 + matchIndex * 4}`,
                gridColumn: 2,
              }}
            >
              <div 
                className="absolute before:border-t-2 before:border-[#a855f7] before:content-[''] pointer-events-none"
                style={{
                  top: '50%',
                  left: '-32px',
                  width: '32px',
                  height: '2px',
                }}
              />

              <div className="bg-[#2d3135] border border-[#3d424d] rounded p-3 h-[60px] flex items-center justify-between group hover:bg-[#3d424d]/80 transition-colors">
                
                {match.winner && (
                  <div 
                    className="absolute after:border-t-2 after:border-r-2 after:border-[#a855f7] after:content-[''] pointer-events-none"
                    style={{
                      top: '50%',
                      right: '-16px',
                      width: '16px',
                      height: '2px',
                    }}
                  />
                )}

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team1 ? match.team1.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                  {match.score1 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score1}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {match.score2 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score2}
                    </span>
                  )}
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team2 ? match.team2.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                </div>

                <div className="absolute bottom-1 left-2 text-xs text-gray-500">
                  {match.id}
                </div>

                {match.status === 'live' && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
                    LIVE
                  </div>
                )}
                {match.status === 'upcoming' && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
                    UPCOMING
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Round 3 Matches - Centered */}
          {rounds[2]?.matches.map((match, matchIndex) => (
            <div
              key={match.id}
              className="relative flex items-center justify-center"
              style={{
                gridRow: `${5 + matchIndex * 8}`,
                gridColumn: 3,
              }}
            >
              <div 
                className="absolute before:border-t-2 before:border-[#a855f7] before:content-[''] pointer-events-none"
                style={{
                  top: '50%',
                  left: '-32px',
                  width: '32px',
                  height: '2px',
                }}
              />

              <div className="bg-[#2d3135] border border-[#3d424d] rounded p-3 h-[60px] flex items-center justify-between group hover:bg-[#3d424d]/80 transition-colors">
                
                {match.winner && (
                  <div 
                    className="absolute after:border-t-2 after:border-r-2 after:border-[#a855f7] after:content-[''] pointer-events-none"
                    style={{
                      top: '50%',
                      right: '-16px',
                      width: '16px',
                      height: '2px',
                    }}
                  />
                )}

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team1 ? match.team1.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                  {match.score1 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score1}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {match.score2 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score2}
                    </span>
                  )}
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team2 ? match.team2.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                </div>

                <div className="absolute bottom-1 left-2 text-xs text-gray-500">
                  {match.id}
                </div>

                {match.status === 'live' && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
                    LIVE
                  </div>
                )}
                {match.status === 'upcoming' && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
                    UPCOMING
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Grand Final - Centered */}
          {rounds[3]?.matches.map((match) => (
            <div
              key={match.id}
              className="relative flex items-center justify-center"
              style={{
                gridRow: '9',
                gridColumn: 4,
              }}
            >
              <div 
                className="absolute before:border-t-2 before:border-[#a855f7] before:content-[''] pointer-events-none"
                style={{
                  top: '50%',
                  left: '-32px',
                  width: '32px',
                  height: '2px',
                }}
              />

              <div className="bg-[#2d3135] border border-[#3d424d] rounded p-3 h-[60px] flex items-center justify-between group hover:bg-[#3d424d]/80 transition-colors">
                
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team1 ? match.team1.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                  {match.score1 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score1}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {match.score2 !== undefined && (
                    <span className="text-lg font-bold text-[#a855f7]">
                      {match.score2}
                    </span>
                  )}
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {match.team2 ? match.team2.substring(0, 3).toUpperCase() : 'TBD'}
                  </div>
                </div>

                <div className="absolute bottom-1 left-2 text-xs text-gray-500">
                  {match.id}
                </div>

                {match.status === 'live' && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
                    LIVE
                  </div>
                )}
                {match.status === 'upcoming' && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
                    UPCOMING
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-16 flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded"></div>
            <span className="text-gray-400">Winner</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-400">Live</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-400">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;

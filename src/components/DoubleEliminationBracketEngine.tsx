'use client';

import React from 'react';
import ModernBracket from './ModernBracket';

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

interface DoubleEliminationBracketProps {
  rounds: {
    upperBracket: BracketRound[];
    lowerBracket: BracketRound[];
    grandFinal?: MatchData;
  };
}

export default function DoubleEliminationBracketEngine({ rounds }: DoubleEliminationBracketProps) {
  return (
    <div style={{ display: 'flex', gap: 40, padding: 20 }}>
      {/* Upper Bracket */}
      <div style={{ flex: 1 }}>
        <h3 style={{ color: '#a855f7', marginBottom: 20 }}>Upper Bracket</h3>
        <ModernBracket rounds={rounds.upperBracket} />
      </div>

      {/* Lower Bracket */}
      <div style={{ flex: 1 }}>
        <h3 style={{ color: '#a855f7', marginBottom: 20 }}>Lower Bracket</h3>
        <ModernBracket rounds={rounds.lowerBracket} />
      </div>

      {/* Grand Final */}
      {rounds.grandFinal && (
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#a855f7', marginBottom: 20 }}>Grand Final</h3>
          <ModernBracket rounds={[{ name: 'Grand Final', matches: [rounds.grandFinal] }]} />
        </div>
      )}
    </div>
  );
}

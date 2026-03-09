'use client';

import React from 'react';
import HLTVBracket from './HLTVBracket';

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

interface BracketTier {
  name: string;
  rounds: BracketRound[];
}

interface HLTVDoubleEliminationBracketProps {
  upperBracket: BracketTier;
  lowerBracket: BracketTier;
  onMatchClick?: (match: MatchData) => void;
  className?: string;
}

const HLTVDoubleEliminationBracket: React.FC<HLTVDoubleEliminationBracketProps> = ({
  upperBracket,
  lowerBracket,
  onMatchClick,
  className = ''
}) => {
  return (
    <div className={`hltv-double-elimination ${className}`}>
      {/* Upper Bracket */}
      <div className="bracket-tier">
        <div className="tier-header">
          {upperBracket.name}
        </div>
        <HLTVBracket 
          rounds={upperBracket.rounds}
          onMatchClick={onMatchClick}
          className="upper-bracket"
        />
      </div>

      {/* Lower Bracket */}
      <div className="bracket-tier">
        <div className="tier-header">
          {lowerBracket.name}
        </div>
        <HLTVBracket 
          rounds={lowerBracket.rounds}
          onMatchClick={onMatchClick}
          className="lower-bracket"
        />
      </div>

      <style jsx>{`
        .hltv-double-elimination {
          display: flex;
          gap: 40px;
          background: rgba(15, 10, 25, 0.6);
          border-radius: 16px;
          border: 1px solid rgba(170, 120, 255, 0.2);
          padding: 30px;
          overflow-x: auto;
          position: relative;
        }

        .bracket-tier {
          flex: 1;
          min-width: 600px;
        }

        .tier-header {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          text-transform: 'uppercase';
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(40, 20, 70, 0.4);
          border-radius: 10px;
          border: 1px solid rgba(170, 120, 255, 0.3);
          box-shadow: 0 0 20px rgba(140, 80, 255, 0.3);
        }

        .upper-bracket :global(.hltv-bracket-wrapper) {
          background: rgba(40, 20, 70, 0.2);
          border-radius: 12px;
        }

        .lower-bracket :global(.hltv-bracket-wrapper) {
          background: rgba(20, 10, 40, 0.2);
          border-radius: 12px;
        }

        @media (max-width: 1400px) {
          .hltv-double-elimination {
            flex-direction: column;
            gap: 30px;
          }
          
          .bracket-tier {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default HLTVDoubleEliminationBracket;

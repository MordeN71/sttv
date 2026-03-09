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

interface BracketTier {
  name: string;
  rounds: BracketRound[];
}

interface ModernDoubleEliminationBracketProps {
  upperBracket: BracketTier;
  lowerBracket: BracketTier;
  onMatchClick?: (match: MatchData) => void;
  className?: string;
}

const ModernDoubleEliminationBracket: React.FC<ModernDoubleEliminationBracketProps> = ({
  upperBracket,
  lowerBracket,
  onMatchClick,
  className = ''
}) => {
  return (
    <div className={`modern-double-elimination ${className}`}>
      {/* Upper Bracket */}
      <div className="bracket-tier">
        <div className="tier-header">
          {upperBracket.name}
        </div>
        <ModernBracket 
          rounds={upperBracket.rounds}
          onMatchClick={onMatchClick}
          className="upper-bracket"
        />
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Lower Bracket */}
      <div className="bracket-tier">
        <div className="tier-header">
          {lowerBracket.name}
        </div>
        <ModernBracket 
          rounds={lowerBracket.rounds}
          onMatchClick={onMatchClick}
          className="lower-bracket"
        />
      </div>

      <style jsx>{`
        .modern-double-elimination {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%);
          border-radius: 24px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 40px;
          overflow: visible;
          position: relative;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 0 60px rgba(139, 92, 246, 0.1),
            inset 0 0 40px rgba(139, 92, 246, 0.05);
        }

        .bracket-tier {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%);
          margin: 20px 0;
        }

        .tier-header {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-align: center;
          margin-bottom: 30px;
          padding: '16px 24px';
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.4) 100%);
          border-radius: 16px;
          border: 1px solid rgba(139, 92, 246, 0.4);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
          text-shadow: 0 2px 10px rgba(139, 92, 246, 0.5);
        }

        .upper-bracket :global(.modern-bracket) {
          background: linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
        }

        .lower-bracket :global(.modern-bracket) {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%);
          border: 1px solid rgba(168, 85, 247, 0.4);
        }

        .lower-bracket :global(.round-header) {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.3) 100%);
          border-color: rgba(168, 85, 247, 0.4);
        }

        @media (max-width: 1400px) {
          .modern-double-elimination {
            flex-direction: column;
            gap: 40px;
          }
          
          .bracket-tier {
            min-width: auto;
          }
        }

        @media (max-width: 768px) {
          .modern-double-elimination {
            padding: 20px;
            gap: 30px;
          }
          
          .tier-header {
            font-size: 16px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernDoubleEliminationBracket;

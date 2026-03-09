'use client';

import React from 'react';
import TournamentGroup from './TournamentGroup';

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

interface TournamentGroupsProps {
  groups: GroupData[];
}

const TournamentGroups: React.FC<TournamentGroupsProps> = ({ groups }) => {
  return (
    <div className="space-y-8">
      {groups.map((group, index) => (
        <TournamentGroup key={group.name} group={group} />
      ))}
    </div>
  );
};

export default TournamentGroups;

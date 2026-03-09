'use client';

import TournamentGroup from '@/components/TournamentGroup';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample group data for MDK Season 4
const groupsData = [
  {
    name: "Group A",
    openingRound: [
      { id: "A1", team1: "HOLOXY", team2: "DEAD EYES", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
      { id: "A2", team1: "BEBRIKI", team2: "MGL", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
      { id: "A3", team1: "HAWKS", team2: "PLATINA", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
      { id: "A4", team1: "Impact Team", team2: "XENOX ACADEMY", score1: 0, score2: 2, status: "completed" as const, winner: "team2" as const },
    ],
    upperFinal: [
      { id: "A5", team1: "HOLOXY", team2: "MGL", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
      { id: "A6", team1: "HAWKS", team2: "XENOX ACADEMY", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
    ],
    groupFinal: [
      { id: "A7", team1: "HOLOXY", team2: "XENOX ACADEMY", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
    ],
    lowerFinal: [
      { id: "A8", team1: "MGL", team2: "HAWKS", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
    ],
    consolidationFinal: [
      { id: "A9", team1: "XENOX ACADEMY", team2: "MGL", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
    ],
  },
  {
    name: "Group B",
    openingRound: [
      { id: "B1", team1: "AURATEAM", team2: "GODBLESS", score1: 2, score2: 2, status: "live" as const },
      { id: "B2", team1: "FROGSTAR", team2: "MYSTIQUE", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
      { id: "B3", team1: "NEXUS", team2: "VORTEX", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
      { id: "B4", team1: "PHOENIX", team2: "SHADOW", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
    ],
    upperFinal: [
      { id: "B5", team1: "FROGSTAR", team2: "VORTEX", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
    ],
    groupFinal: [
      { id: "B6", team1: "FROGSTAR", team2: "PHOENIX", status: "upcoming" as const },
    ],
    lowerFinal: [
      { id: "B7", team1: "VORTEX", team2: "SHADOW", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
    ],
    consolidationFinal: [
      { id: "B8", team1: "PHOENIX", team2: "VORTEX", status: "upcoming" as const },
    ],
  },
];

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-black">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-md border-b border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-white">
              MDK Season 4 - Group Stage
            </h1>
            <div className="flex items-center space-x-4">
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                LIVE
              </span>
              <span className="text-gray-400 text-sm">
                Prize Pool: $10,000
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Groups */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {groupsData.map((group, index) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <TournamentGroup group={group} />
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 backdrop-blur-md border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Teams</h3>
            <p className="text-3xl font-bold text-white">16</p>
            <p className="text-sm text-gray-400">Competing teams</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-md border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Format</h3>
            <p className="text-3xl font-bold text-white">GSL</p>
            <p className="text-sm text-gray-400">Double elimination</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-md border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Qualified</h3>
            <p className="text-3xl font-bold text-white">8</p>
            <p className="text-sm text-gray-400">Teams to playoffs</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import TournamentBracket from '@/components/TournamentBracket';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample tournament data for MDK Season 4
const tournamentRounds = [
  {
    title: "Round of 16",
    matches: [
      { id: "1", team1: "HOLOXY", team2: "DEAD EYES", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
      { id: "2", team1: "BEBRIKI", team2: "MGL", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
      { id: "3", team1: "HAWKS", team2: "PLATINA", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
      { id: "4", team1: "Impact Team", team2: "XENOX ACADEMY", score1: 0, score2: 2, status: "completed" as const, winner: "team2" as const },
      { id: "5", team1: "AURATEAM", team2: "GODBLESS", score1: 2, score2: 2, status: "live" as const },
      { id: "6", team1: "FROGSTAR", team2: "MYSTIQUE", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
      { id: "7", team1: "NEXUS", team2: "VORTEX", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
      { id: "8", team1: "PHOENIX", team2: "SHADOW", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
    ]
  },
  {
    title: "Quarter Finals",
    matches: [
      { id: "9", team1: "HOLOXY", team2: "MGL", score1: 2, score2: 1, status: "completed" as const, winner: "team1" as const },
      { id: "10", team1: "HAWKS", team2: "XENOX ACADEMY", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
      { id: "11", team1: "AURATEAM", team2: "FROGSTAR", status: "upcoming" as const },
      { id: "12", team1: "VORTEX", team2: "PHOENIX", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
    ]
  },
  {
    title: "Semi Finals",
    matches: [
      { id: "13", team1: "HOLOXY", team2: "XENOX ACADEMY", score1: 2, score2: 0, status: "completed" as const, winner: "team1" as const },
      { id: "14", team1: "FROGSTAR", team2: "PHOENIX", score1: 1, score2: 2, status: "completed" as const, winner: "team2" as const },
    ]
  },
  {
    title: "Grand Final",
    matches: [
      { id: "15", team1: "HOLOXY", team2: "PHOENIX", status: "upcoming" as const },
    ]
  }
];

export default function MDKTournamentPage() {
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
              MDK Season 4
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

      {/* Tournament Bracket */}
      <TournamentBracket rounds={tournamentRounds} />

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-gray-900/30 backdrop-blur-sm border-t border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">Total Matches</h3>
              <p className="text-3xl font-bold text-white">15</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">Teams</h3>
              <p className="text-3xl font-bold text-white">16</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">Format</h3>
              <p className="text-xl font-bold text-white">Double Elimination</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

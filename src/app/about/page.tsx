'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: bgMain, padding: '24px 20px' }}>

      <div style={{ padding: '40px 20px', maxWidth: 800, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 40 }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>
            About Us
          </h1>
          
          <div style={{ fontSize: 14, lineHeight: 1.8, color: '#e5e7eb' }}>
            <p style={{ marginBottom: 16 }}>
              STTV is a website dedicated to the coverage of competitive Counter-Strike. 
              It features news, schedules, results, live scores, statistics, photographs, 
              and a dedicated community forum. The website is also known for its Rating, 
              team world ranking, yearly Top 20 players ranking, and coverage of major tournaments.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              History
            </h2>
            <p style={{ marginBottom: 16 }}>
              STTV was founded in 2025 with the goal of providing comprehensive coverage 
              of Counter-Strike esports. It was initially created to host tournaments and 
              track match results for the growing competitive scene. Since then, the 
              website has evolved to include news, statistics, team rankings, and more.
            </p>
            <p style={{ marginBottom: 16 }}>
              STTV transitioned from covering Counter-Strike: Global Offensive to 
              Counter-Strike 2 in 2025, keeping pace with the latest developments in 
              the competitive scene.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              Key Features
            </h2>
            <p style={{ marginBottom: 16 }}>
              STTV offers a unique combination of features tailored to Counter-Strike 
              enthusiasts, fans, and professionals, including:
            </p>
            <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Live scores and results:</strong> We provide real-time updates 
                on match scores, ensuring fans can keep up to date at home or on the go.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Tournament Schedules:</strong> Through our event pages, you can 
                find information about upcoming tournaments and matches.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Player and Team Statistics:</strong> Access detailed insights 
                into player performance, team dynamics, and historical data, empowering 
                fans and analysts alike.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>World Ranking:</strong> Celebrating excellence in Counter-Strike, 
                our ranking recognizes and honors the outstanding achievements of teams, 
                reflecting the pinnacle of skill and dedication in the game.
              </li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              Our Mission
            </h2>
            <p style={{ marginBottom: 16 }}>
              Our mission is to provide the most comprehensive and accurate coverage 
              of Counter-Strike esports. We strive to be the go-to source for fans, 
              players, and organizations looking for the latest news, statistics, and 
              insights into the competitive scene.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              Contact
            </h2>
            <p>
              For inquiries, please contact us via Telegram:{' '}
              <a href="https://t.me/yamolekula" target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7', textDecoration: 'none' }}>
                @yamolekula
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


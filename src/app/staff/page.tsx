'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

const staffMembers = [
  { 
    name: 'Founder', 
    role: 'CEO & Founder', 
    description: 'Founder and visionary behind STTV. Responsible for overall strategy and direction.',
    telegram: '@yamolekula'
  },
  { 
    name: 'Head Admin', 
    role: 'Head Administrator', 
    description: 'Manages day-to-day operations and oversees the administrative team.',
    telegram: '@admin'
  },
  { 
    name: 'Lead Developer', 
    role: 'Technical Lead', 
    description: 'Responsible for platform development, maintenance, and technical infrastructure.',
    telegram: '@dev'
  },
  { 
    name: 'Content Manager', 
    role: 'Content Lead', 
    description: 'Manages news content, tournament coverage, and editorial team.',
    telegram: '@content'
  },
  { 
    name: 'Community Manager', 
    role: 'Community Lead', 
    description: 'Engages with the community, manages forums, and handles user relations.',
    telegram: '@community'
  },
  { 
    name: 'Tournament Director', 
    role: 'Esports Lead', 
    description: 'Oversees tournament organization, rules, and competitive integrity.',
    telegram: '@esports'
  },
];

export default function StaffPage() {
  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: bgMain, padding: '24px 20px' }}>

      <div style={{ padding: '40px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 40 }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff', textAlign: 'center' }}>
            STTV Staff
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', marginBottom: 40 }}>
            Meet the team behind STTV
          </p>

          {/* Staff Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {staffMembers.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', scale: 1.02 }}
                style={{
                  padding: 24,
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: 12,
                  border: '1px solid rgba(168, 85, 247, 0.15)',
                }}
              >
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(168, 85, 247, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 16,
                }}>
                  👤
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: 13, color: '#a855f7', marginBottom: 12 }}>
                  {member.role}
                </p>
                <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12, lineHeight: 1.5 }}>
                  {member.description}
                </p>
                <a 
                  href={`https://t.me/${member.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    color: '#0088cc',
                    textDecoration: 'none',
                  }}
                >
                  {member.telegram}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Join Us Section */}
          <div style={{ 
            marginTop: 40, 
            padding: 24, 
            backgroundColor: 'rgba(168, 85, 247, 0.1)', 
            borderRadius: 12,
            border: '1px solid rgba(168, 85, 247, 0.3)',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#fff' }}>
              Want to join our team?
            </h2>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
              We are always looking for talented individuals passionate about esports.
            </p>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ backgroundColor: '#a855f7' }}
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: 'rgba(168, 85, 247, 0.3)',
                  color: '#fff',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Apply Now
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

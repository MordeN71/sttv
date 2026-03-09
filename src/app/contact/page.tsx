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

const contactOptions = [
  { icon: '🏆', title: 'Event organizer', desc: 'For tournament organizers' },
  { icon: '👥', title: 'Team or player', desc: 'For teams and players' },
  { icon: '🎙️', title: 'Caster or streamer', desc: 'For broadcast talent' },
  { icon: '📢', title: 'Advertising', desc: 'For business inquiries' },
  { icon: '💼', title: 'Apply for job', desc: 'Join our team' },
  { icon: '🛡️', title: 'Data protection', desc: 'Privacy and data requests' },
  { icon: '📰', title: 'Press, Coverage or Stats', desc: 'Media and statistics' },
  { icon: '📱', title: 'Apps', desc: 'Mobile and API inquiries' },
];

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: bgMain, padding: '24px 20px' }}>

      <div style={{ padding: '40px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 40 }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff', textAlign: 'center' }}>
            Contact STTV
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', marginBottom: 40 }}>
            Get in touch with us for any inquiries
          </p>

          {/* Telegram Contact */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(88, 28, 135, 0.3) 100%)',
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
            border: '1px solid rgba(168, 85, 247, 0.3)',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#fff' }}>
              Direct Contact
            </h2>
            <p style={{ fontSize: 14, color: '#e5e7eb', marginBottom: 16 }}>
              For immediate assistance, contact us via Telegram:
            </p>
            <a 
              href="https://t.me/yamolekula" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#0088cc',
                color: '#fff',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Telegram: @yamolekula
            </a>
          </div>

          {/* Contact Options Grid */}
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#a855f7' }}>
            Contact Categories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {contactOptions.map((option) => (
              <motion.div
                key={option.title}
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', scale: 1.02 }}
                style={{
                  padding: 20,
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: 8,
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(168, 85, 247, 0.15)',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{option.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb' }}>{option.title}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{option.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#a855f7' }}>
              Send us a message
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
              <select
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: 8,
                  color: '#9ca3af',
                  fontSize: 14,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="">Select category</option>
                {contactOptions.map((opt) => (
                  <option key={opt.title} value={opt.title}>{opt.title}</option>
                ))}
              </select>
              <textarea
                placeholder="Your message..."
                rows={5}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 24px',
                  backgroundColor: '#a855f7',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)' }}>
      <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 40, maxWidth: 450, width: '100%' }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ 
              width: 60, 
              height: 60, 
              borderRadius: 12, 
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: 24,
              fontWeight: 800,
            }}>
              S
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Forgot Password
            </h1>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>
              Enter your email to reset your password
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
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
                  marginTop: 8,
                }}
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
              <p style={{ fontSize: 14, color: '#e5e7eb', marginBottom: 8 }}>
                Check your email!
              </p>
              <p style={{ fontSize: 13, color: '#9ca3af' }}>
                We've sent a password reset link to {email}
              </p>
            </div>
          )}

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
            Remember your password?{' '}
            <Link href="/auth" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

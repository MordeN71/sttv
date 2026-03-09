'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SignIn, SignUp, UserButton, useUser } from '@clerk/nextjs';

const headerGlass = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(15px)',
  borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
};

const navItems = [
  { label: 'News', href: '/', type: 'link' as const },
  { label: 'Matches', href: '/matches', type: 'link' as const },
  { label: 'Results', href: '/results', type: 'link' as const },
  {
    label: 'Events',
    type: 'dropdown' as const,
    items: [
      { label: 'All events', href: '/events' },
      { label: 'MDK Season 4', href: '/events/mdk-s4' },
      { label: 'FROGSTAR #1', href: '/events/frogstar' },
    ],
  },
  { label: 'Stats', href: '/stats', type: 'link' as const },
  { label: 'Ranking', href: '/ranking', type: 'link' as const },
  { label: 'Forum', href: '/forum', type: 'link' as const },
  { label: 'LIVE', href: '/live', type: 'link' as const, highlight: true },
];

export function Header() {
  const { user } = useUser();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      style={{
        ...headerGlass,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1350,
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <img 
              src="/logo/sttv.png" 
              alt="STTV Logo" 
              style={{
                width: 140,
                height: 42,
                objectFit: 'contain',
              }}
            />
            <span style={{
              fontSize: 22,
              fontWeight: 900,
              fontFamily: 'Arial Black, sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#e5e7eb',
              textShadow: '0 0 15px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.4)',
              marginLeft: '-5px',
            }}>STTV</span>
          </motion.div>
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            color: '#9ca3af',
          }}
        >
          {navItems.map((item) =>
            item.type === 'link' ? (
              <motion.div key={item.label} whileHover={{ y: -2, scale: 1.05 }}>
                <Link
                  href={item.href}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 999,
                    border: '1px solid transparent',
                    textDecoration: 'none',
                    color: item.highlight ? '#ef4444' : 'inherit',
                    fontWeight: item.highlight ? 700 : 500,
                    backgroundColor: 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={item.label}
                style={{ position: 'relative' }}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <details
                  style={{
                    position: 'relative',
                  }}
                >
                  <summary
                    style={{
                      listStyle: 'none',
                      padding: '6px 10px',
                      borderRadius: 999,
                      border: '1px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>{item.label}</span>
                    <span style={{ fontSize: 10 }}>▼</span>
                  </summary>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute',
                      top: 30,
                      left: 0,
                      minWidth: 170,
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      backdropFilter: 'blur(18px)',
                      borderRadius: 10,
                      border: '1px solid rgba(148, 163, 253, 0.4)',
                      boxShadow: '0 18px 45px rgba(0, 0, 0, 0.9)',
                      padding: 6,
                      zIndex: 30,
                    }}
                  >
                    {item.items.map((sub) => (
                      <motion.div
                        key={sub.href}
                        whileHover={{
                          backgroundColor: 'rgba(30, 64, 175, 0.5)',
                          x: 2,
                        }}
                        style={{ borderRadius: 6 }}
                      >
                        <Link
                          href={sub.href}
                          style={{
                            display: 'block',
                            padding: '6px 10px',
                            fontSize: 11,
                            color: '#e5e7eb',
                            textDecoration: 'none',
                          }}
                        >
                          {sub.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </details>
              </motion.div>
            ),
          )}
          
          {/* Authentication */}
          <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            {user && (
              <>
                <Link href="/admin" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: 12 }}>⚙️</span>
                    <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>Admin</span>
                  </motion.div>
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: 32,
                        height: 32,
                      },
                      userButtonPopoverCard: {
                        backgroundColor: 'rgba(22, 27, 34, 0.95)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                      },
                      userButtonPopoverActionButton: {
                        color: '#e5e7eb',
                      },
                      userButtonPopoverActionButtonText: {
                        color: '#e5e7eb',
                      }
                    }
                  }}
                />
              </>
            )}
            
            {!user && (
              <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 14 }}>🔐</span>
                  <span style={{ fontSize: 11, color: '#a855f7', fontWeight: 600 }}>Sign In</span>
                </motion.div>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;


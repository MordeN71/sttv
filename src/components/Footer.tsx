'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        marginTop: 32,
        borderTop: '1px solid rgba(148, 163, 253, 0.25)',
        backgroundColor: 'rgba(10, 8, 25, 0.9)',
        backdropFilter: 'blur(16px) saturate(160%)',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div
        style={{
          maxWidth: 1350,
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          fontSize: 11,
          color: '#9ca3af',
        }}
      >
        <span style={{ opacity: 0.8 }}>© {new Date().getFullYear()} STTV</span>
        <nav
          style={{
            display: 'flex',
            gap: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
          }}
        >
          {[
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Staff', href: '/staff' },
            { label: 'Terms of Use', href: '/terms' },
          ].map((link) => (
            <motion.span
              key={link.label}
              whileHover={{ y: -2, scale: 1.03 }}
              style={{ cursor: 'pointer' }}
            >
              <Link
                href={link.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {link.label}
              </Link>
            </motion.span>
          ))}
        </nav>
      </div>
    </motion.footer>
  );
}

export default Footer;


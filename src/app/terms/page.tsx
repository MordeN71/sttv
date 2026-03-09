'use client';

import { motion } from 'framer-motion';

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: bgMain, padding: '24px 20px' }}>

      <div style={{ padding: '40px 20px', maxWidth: 800, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...glassCard, padding: 40 }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>
            Terms of Use
          </h1>
          
          <div style={{ fontSize: 14, lineHeight: 1.8, color: '#e5e7eb' }}>
            <p style={{ marginBottom: 16 }}>
              Welcome to STTV. By accessing or using our website, you agree to be bound by these 
              Terms of Use. Please read them carefully before using our services.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: 16 }}>
              By accessing or using STTV, you agree to these Terms of Use and all applicable laws 
              and regulations. If you do not agree with any of these terms, you are prohibited 
              from using or accessing this site.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              2. Use License
            </h2>
            <p style={{ marginBottom: 16 }}>
              Permission is granted to temporarily access the materials on STTV for personal, 
              non-commercial use only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}>Modify or copy the materials</li>
              <li style={{ marginBottom: 8 }}>Use the materials for any commercial purpose</li>
              <li style={{ marginBottom: 8 }}>Attempt to decompile or reverse engineer any software</li>
              <li style={{ marginBottom: 8 }}>Remove any copyright or proprietary notations</li>
              <li style={{ marginBottom: 8 }}>Transfer the materials to another person</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              3. User Conduct
            </h2>
            <p style={{ marginBottom: 16 }}>
              Users agree to use STTV in a manner consistent with all applicable laws and 
              regulations. You agree not to:
            </p>
            <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}>Harass, abuse, or harm another person</li>
              <li style={{ marginBottom: 8 }}>Post or transmit any unlawful, threatening, libelous, defamatory content</li>
              <li style={{ marginBottom: 8 }}>Impersonate any person or entity</li>
              <li style={{ marginBottom: 8 }}>Upload or transmit viruses or malicious code</li>
              <li style={{ marginBottom: 8 }}>Interfere with the operation of the website</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              4. Disclaimer
            </h2>
            <p style={{ marginBottom: 16 }}>
              The materials on STTV are provided on an 'as is' basis. STTV makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness 
              for a particular purpose, or non-infringement of intellectual property.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              5. Limitations
            </h2>
            <p style={{ marginBottom: 16 }}>
              In no event shall STTV or its suppliers be liable for any damages arising out of 
              the use or inability to use the materials on STTV, even if STTV or an authorized 
              representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              6. Accuracy of Materials
            </h2>
            <p style={{ marginBottom: 16 }}>
              The materials appearing on STTV could include technical, typographical, or 
              photographic errors. STTV does not warrant that any of the materials on its website 
              are accurate, complete, or current.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              7. Links
            </h2>
            <p style={{ marginBottom: 16 }}>
              STTV has not reviewed all of the sites linked to its website and is not responsible 
              for the contents of any such linked site. The inclusion of any link does not imply 
              endorsement by STTV of the site.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              8. Modifications
            </h2>
            <p style={{ marginBottom: 16 }}>
              STTV may revise these terms of use for its website at any time without notice. 
              By using this website you are agreeing to be bound by the then current version 
              of these Terms of Use.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              9. Governing Law
            </h2>
            <p style={{ marginBottom: 16 }}>
              These terms and conditions are governed by and construed in accordance with 
              applicable laws, and you irrevocably submit to the exclusive jurisdiction of 
              the courts in that location.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: '#a855f7' }}>
              10. Contact
            </h2>
            <p>
              If you have any questions about these Terms of Use, please contact us via Telegram:{' '}
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


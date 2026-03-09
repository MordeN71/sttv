'use client';

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

const bgMain = 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)';

export default function SignUpPage() {
  return (
    <div style={{ background: bgMain, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: 400,
        }}
      >
        <div style={{
          backgroundColor: 'rgba(22, 27, 34, 0.4)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
          borderRadius: 12,
          padding: 40,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ 
              fontSize: 32, 
              fontWeight: 800, 
              color: '#fff', 
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}>
              Sign Up
            </h1>
            <p style={{ fontSize: 14, color: '#a855f7' }}>
              Join the STTV community
            </p>
          </div>
          
          <SignUp 
            appearance={{
              elements: {
                rootBox: {
                  display: 'none'
                },
                card: {
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  width: '100%'
                },
                formButtonPrimary: {
                  backgroundColor: '#a855f7',
                  color: '#fff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '12px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                },
                formFieldInput: {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  padding: '12px',
                },
                formFieldLabel: {
                  color: '#a855f7',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                },
                footerActionLink: {
                  color: '#a855f7',
                  fontSize: '12px',
                  fontWeight: 600,
                },
                dividerLine: {
                  borderColor: 'rgba(168, 85, 247, 0.2)',
                },
                dividerText: {
                  color: '#9ca3af',
                  fontSize: '12px',
                },
                socialButtonsIconButton: {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                },
                socialButtonsBlockButtonText: {
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                }
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

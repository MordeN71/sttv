'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';

const glassCard = {
  backgroundColor: 'rgba(22, 27, 34, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(168, 85, 247, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
  borderRadius: 12,
};

const forumSections = [
  {
    id: 'counter-strike',
    title: 'Counter-Strike',
    description: 'Discussions and questions regarding Counter-Strike and events',
    topics: 156,
    posts: 2341,
    lastPost: { title: 'MDK Season 4 Predictions', author: 'cs_fan', time: '2 hours ago' },
  },
  {
    id: 'fantasy',
    title: 'Fantasy',
    description: 'Discussions and questions about fantasy and shared users tips',
    topics: 45,
    posts: 892,
    lastPost: { title: 'Best picks for this week', author: 'fantasy_pro', time: '4 hours ago' },
  },
  {
    id: 'betting',
    title: 'Betting',
    description: 'Discussions and questions about betting and shared users tips',
    topics: 89,
    posts: 1456,
    lastPost: { title: 'Odds analysis MDK S4', author: 'betmaster', time: '1 day ago' },
  },
  {
    id: 'hardware',
    title: 'Hardware & Tweaks',
    description: 'Discussions and questions on hardware and tweaks',
    topics: 67,
    posts: 823,
    lastPost: { title: 'Best mouse for CS2 2025', author: 'gamer_x', time: '2 days ago' },
  },
  {
    id: 'bugs',
    title: 'Bugs & Suggestions',
    description: 'Inform about bugs and provide suggestions for STTV',
    topics: 23,
    posts: 156,
    lastPost: { title: 'Feature request: Dark mode', author: 'user123', time: '3 days ago' },
  },
  {
    id: 'off-topic',
    title: 'Off Topic',
    description: 'Discussions and questions about everything',
    topics: 234,
    posts: 4567,
    lastPost: { title: 'What games do you play besides CS?', author: 'multi_gamer', time: '5 minutes ago' },
  },
];

const recentTopics: any[] = [];

export default function ForumPage() {
  const { isSignedIn, user } = useUser();
  const [activeView, setActiveView] = useState<'sections' | 'recent' | 'rules'>('sections');
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [newTopic, setNewTopic] = useState({ title: '', content: '', section: 'counter-strike' });
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    // WebSocket connection for real-time online users
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'online_users') {
        setOnlineUsers(data.count);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert('Please sign in to create topics');
      return;
    }
    
    if (!newTopic.title.trim() || !newTopic.content.trim()) return;
    
    const topic = {
      id: Date.now(),
      title: newTopic.title,
      author: user?.firstName || 'Anonymous',
      replies: 0,
      views: 1,
      time: 'Just now',
      section: forumSections.find(s => s.id === newTopic.section)?.title || 'General',
      content: newTopic.content,
    };
    
    setTopics([topic, ...topics]);
    setNewTopic({ title: '', content: '', section: 'counter-strike' });
    setShowNewTopicModal(false);
    setActiveView('recent');
  };

  return (
    <div style={{ minHeight: '100vh', color: '#fff', background: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0b0a1a 100%)', padding: '24px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 280px', gap: 24 }}>
          
          {/* Left Sidebar - Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ ...glassCard, padding: 16 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a855f7', marginBottom: 12 }}>
                Forum Navigation
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button 
                  onClick={() => setActiveView('sections')}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: activeView === 'sections' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: 6,
                    color: activeView === 'sections' ? '#fff' : '#9ca3af',
                    cursor: 'pointer',
                    fontSize: 13,
                    textAlign: 'left',
                    fontWeight: activeView === 'sections' ? 600 : 400,
                  }}
                >
                  📁 Forum Sections
                </button>
                <button 
                  onClick={() => setActiveView('recent')}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: activeView === 'recent' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: 6,
                    color: activeView === 'recent' ? '#fff' : '#9ca3af',
                    cursor: 'pointer',
                    fontSize: 13,
                    textAlign: 'left',
                    fontWeight: activeView === 'recent' ? 600 : 400,
                  }}
                >
                  📝 Recent Topics
                </button>
                <button 
                  onClick={() => setActiveView('rules')}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: activeView === 'rules' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: 6,
                    color: activeView === 'rules' ? '#fff' : '#9ca3af',
                    cursor: 'pointer',
                    fontSize: 13,
                    textAlign: 'left',
                    fontWeight: activeView === 'rules' ? 600 : 400,
                  }}
                >
                  📋 House Rules
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ ...glassCard, padding: 16 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a855f7', marginBottom: 12 }}>
                User Menu
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/auth" style={{ textDecoration: 'none' }}>
                  <motion.div 
                    whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'rgba(168, 85, 247, 0.1)',
                      borderRadius: 6,
                      color: '#a855f7',
                      fontSize: 13,
                      textAlign: 'center',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    🔐 Login / Register
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ ...glassCard, padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>
                  STTV Forum
                </h1>
                <button 
                  onClick={() => setShowNewTopicModal(true)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#a855f7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  + New Topic
                </button>
              </div>
              <p style={{ fontSize: 14, color: '#9ca3af' }}>
                Community discussions around Counter-Strike esports, tournaments, and more.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeView === 'sections' && (
                <motion.div 
                  key="sections"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {forumSections.map((section) => (
                    <motion.div 
                      key={section.id}
                      whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', scale: 1.01 }}
                      style={{
                        padding: 20,
                        backgroundColor: 'rgba(15, 23, 42, 0.5)',
                        borderRadius: 8,
                        border: '1px solid rgba(168, 85, 247, 0.15)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#e5e7eb', marginBottom: 6 }}>
                            {section.title}
                          </h3>
                          <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>
                            {section.description}
                          </p>
                          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6b7280' }}>
                            <span>{section.topics} topics</span>
                            <span>{section.posts} posts</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: 150 }}>
                          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Last post:</p>
                          <p style={{ fontSize: 12, color: '#a855f7', fontWeight: 500, marginBottom: 4 }}>
                            {section.lastPost.title}
                          </p>
                          <p style={{ fontSize: 11, color: '#6b7280' }}>
                            by {section.lastPost.author} • {section.lastPost.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeView === 'recent' && (
                <motion.div 
                  key="recent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {topics.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ ...glassCard, padding: 40, textAlign: 'center', color: '#9ca3af' }}
                    >
                      <p style={{ fontSize: 16, marginBottom: 8 }}>No topics yet</p>
                      <p style={{ fontSize: 13 }}>Be the first to create a topic!</p>
                    </motion.div>
                  ) : (
                    topics.map((topic) => (
                      <motion.div 
                        key={topic.id}
                        whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', scale: 1.01 }}
                        style={{
                          padding: 16,
                          backgroundColor: 'rgba(15, 23, 42, 0.5)',
                          borderRadius: 8,
                          border: '1px solid rgba(168, 85, 247, 0.15)',
                          cursor: 'pointer',
                        }}
                      >
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#e5e7eb', marginBottom: 8 }}>
                          {topic.title}
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#9ca3af' }}>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <span>👤 {topic.author}</span>
                            <span style={{ color: '#a855f7' }}>{topic.section}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 16 }}>
                            <span>💬 {topic.replies} replies</span>
                            <span>👁️ {topic.views} views</span>
                            <span>🕒 {topic.time}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {activeView === 'rules' && (
                <motion.div 
                  key="rules"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ ...glassCard, padding: 24 }}
                >
                  <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#a855f7' }}>
                    HOUSE RULES
                  </h2>
                  <div style={{ fontSize: 13, lineHeight: 1.8, color: '#e5e7eb' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#fff' }}>
                      Hello mens,
                    </h3>
                    <p style={{ marginBottom: 16 }}>
                      Welcome to the home of competitive Counter-Strike. Our community is fueled by the passion for CS2 esports. With a drive to create the best possible experience throughout our rich history, spanning well over two decades, we serve millions across the globe.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      With a mammoth, passionate community, we want to ensure that comments posted under our news articles and forum topics are tasteful, relevant, and lawful. Therefore, we've created clear guidelines on what is encouraged, what isn't tolerated, and how moderators will enforce the House Rules.
                    </p>

                    <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#fff' }}>
                      RESPECT & INCLUSION
                    </h3>
                    <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                      <li style={{ marginBottom: 8 }}>Always treat all members with respect. While friendly rivalries are allowed, any type of abuse will not be tolerated.</li>
                      <li style={{ marginBottom: 8 }}>Personal attacks, insults, or harassment of other members, moderators, players, or staff are not allowed.</li>
                      <li style={{ marginBottom: 8 }}>Racism, sexism, religious discrimination, homophobia, transphobia, ableism, xenophobia, or any other form of discrimination is strictly prohibited.</li>
                      <li style={{ marginBottom: 8 }}>No defamatory content. Do not post false statements that could damage the reputation of players, organisations, celebrities, HLTV staff, or anyone else.</li>
                      <li style={{ marginBottom: 8 }}>HLTV's community is vast and encompasses many cultures with unique perspectives. Respect others' opinions and backgrounds.</li>
                    </ul>

                    <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#fff' }}>
                      HEALTHY BANTER & DEBATE
                    </h3>
                    <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                      <li style={{ marginBottom: 8 }}>Keep debates on topic. Irrelevant or disruptive content may be removed.</li>
                      <li style={{ marginBottom: 8 }}>Counter-Strike thrives on rivalries, stars, underdogs, and intense esports action. Therefore, debates can get heated. Don't let it get too hot, avoiding personal attacks or offensive language. Banter and humour are welcome.</li>
                      <li style={{ marginBottom: 8 }}>Spirited disagreement is welcome, toxic behaviour is not.</li>
                      <li style={{ marginBottom: 8 }}>Avoid spamming repetitive arguments, using excessive caps lock, or posting disruptive comments.</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Recent Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ ...glassCard, padding: 16 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a855f7', marginBottom: 12 }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recentTopics.slice(0, 4).map((topic) => (
                  <div key={topic.id} style={{ padding: 10, backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 6 }}>
                    <p style={{ fontSize: 12, color: '#e5e7eb', fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>
                      {topic.title}
                    </p>
                    <p style={{ fontSize: 10, color: '#6b7280' }}>
                      {topic.time} • {topic.replies} replies
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ ...glassCard, padding: 16 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a855f7', marginBottom: 12 }}>
                Forum Stats
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#9ca3af' }}>Total Topics:</span>
                  <span style={{ color: '#e5e7eb', fontWeight: 600 }}>{topics.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#9ca3af' }}>Total Posts:</span>
                  <span style={{ color: '#e5e7eb', fontWeight: 600 }}>{topics.reduce((acc, topic) => acc + topic.replies + 1, 0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#9ca3af' }}>Registered Users:</span>
                  <span style={{ color: '#e5e7eb', fontWeight: 600 }}>0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#9ca3af' }}>Online Now:</span>
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>{onlineUsers}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* New Topic Modal */}
      {showNewTopicModal && (
        <div 
          onClick={() => setShowNewTopicModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              ...glassCard,
              padding: 24,
              maxWidth: 500,
              width: '100%',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#fff' }}>
              Create New Topic
            </h2>
            <form onSubmit={handleCreateTopic} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                  Section
                </label>
                <select
                  value={newTopic.section}
                  onChange={(e) => setNewTopic({ ...newTopic, section: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 13,
                  }}
                >
                  {forumSections.map((section) => (
                    <option key={section.id} value={section.id}>{section.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                  Topic Title
                </label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  placeholder="Enter topic title..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 13,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                  Content
                </label>
                <textarea
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                  rows={5}
                  placeholder="Write your post..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 13,
                    resize: 'vertical',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowNewTopicModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: 6,
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#a855f7',
                    border: 'none',
                    borderRadius: 6,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Create Topic
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}


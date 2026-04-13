import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { profiles } from '../data/profiles';

const INITIAL_CONVERSATIONS = {
  1: [
    { from: 'them', text: "Hello! I came across your profile and found your interest in Carnatic music very refreshing. I've been learning veena for 8 years.", time: '10:32 AM' },
    { from: 'me', text: "That's wonderful! I've been attending sabha concerts since childhood. Which ragas do you enjoy the most?", time: '11:05 AM' },
    { from: 'them', text: "Bhairavi and Kalyani — they feel like home to me. Do you play any instrument?", time: '11:20 AM' },
  ],
  3: [
    { from: 'them', text: "Hi, I read your profile and I appreciated how thoughtfully you wrote about what you are looking for. Felt genuine.", time: 'Yesterday' },
    { from: 'me', text: "Thank you — I tried to be honest about it. I noticed you are a paediatrician. What drew you to that specialisation?", time: 'Yesterday' },
  ],
};

export default function Messages({ activeConversation, setActiveConversation }) {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [input, setInput] = useState('');

  // Contacts who have conversations
  const contacts = profiles.filter(p => conversations[p.id]);

  const sendMessage = () => {
    if (!input.trim() || !activeConversation) return;
    const newMsg = { from: 'me', text: input.trim(), time: 'Just now' };
    setConversations(prev => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMsg],
    }));
    setInput('');
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // If a new conversation is opened from outside, ensure it exists
  if (activeConversation && !conversations[activeConversation.id]) {
    setConversations(prev => ({ ...prev, [activeConversation.id]: [] }));
  }

  const currentMessages = activeConversation ? (conversations[activeConversation.id] || []) : [];

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '24px',
      height: 'calc(100vh - 120px)',
      display: 'flex',
      gap: '2px',
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        flexShrink: 0,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--text)' }}>Messages</h3>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {contacts.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px' }}>
              No conversations yet
            </div>
          ) : (
            contacts.map(p => {
              const msgs = conversations[p.id] || [];
              const last = msgs[msgs.length - 1];
              const isActive = activeConversation?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveConversation(p)}
                  style={{
                    width: '100%',
                    background: isActive ? 'var(--surface2)' : 'none',
                    border: 'none',
                    borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '16px', color: 'var(--accent)',
                  }}>
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '400', marginBottom: '2px' }}>{p.name.split(' ')[0]}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {last ? last.text : 'Start a conversation'}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '16px', color: 'var(--accent)',
              }}>
                {activeConversation.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--text)' }}>{activeConversation.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{activeConversation.profession}</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentMessages.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px', marginTop: '40px' }}>
                  <MessageCircle size={28} color="var(--text-dim)" style={{ marginBottom: '12px' }} />
                  <p>Begin your conversation with {activeConversation.name.split(' ')[0]}</p>
                  <p style={{ marginTop: '6px', fontSize: '12px' }}>Be genuine — a thoughtful first message goes a long way.</p>
                </div>
              )}
              {currentMessages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '72%',
                    background: msg.from === 'me' ? 'var(--accent)' : 'var(--surface2)',
                    color: msg.from === 'me' ? 'var(--bg)' : 'var(--text)',
                    padding: '12px 16px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontWeight: msg.from === 'me' ? '400' : '300',
                  }}>
                    {msg.text}
                    <div style={{
                      fontSize: '10px',
                      marginTop: '4px',
                      opacity: 0.6,
                      textAlign: msg.from === 'me' ? 'right' : 'left',
                    }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: '16px 20px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '10px',
            }}>
              <textarea
                className="input-field"
                style={{ flex: 1, resize: 'none', height: '52px', paddingTop: '14px' }}
                placeholder={`Write a thoughtful message to ${activeConversation.name.split(' ')[0]}…`}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button
                className="btn-primary"
                onClick={sendMessage}
                disabled={!input.trim()}
                style={{ opacity: input.trim() ? 1 : 0.4 }}
              >
                <Send size={14} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
            <MessageCircle size={40} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Select a conversation</p>
            <p style={{ fontSize: '13px', marginTop: '6px' }}>or start one from a profile you like</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Heart, Menu, X, MessageCircle, Search, User } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, expressedInterests }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'browse', label: 'Browse', icon: Search },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => setCurrentView('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Heart size={16} fill="var(--bg)" color="var(--bg)" />
          </div>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            fontWeight: '500',
            color: 'var(--text)',
            letterSpacing: '0.02em',
          }}>
            Vivāha
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                background: currentView === item.id ? 'rgba(201,169,110,0.1)' : 'transparent',
                border: 'none',
                color: currentView === item.id ? 'var(--accent)' : 'var(--text-muted)',
                padding: '8px 16px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
              }}
            >
              <item.icon size={14} />
              {item.label}
              {item.id === 'interests' && expressedInterests > 0 && (
                <span style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  borderRadius: '100px',
                  fontSize: '10px',
                  fontWeight: '500',
                  padding: '1px 6px',
                  marginLeft: '2px',
                }}>
                  {expressedInterests}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '12px 24px 20px',
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id); setMenuOpen(false); }}
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: 'none',
                color: currentView === item.id ? 'var(--accent)' : 'var(--text-muted)',
                padding: '12px 0',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

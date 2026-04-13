import { Heart, ArrowRight, X } from 'lucide-react';
import { profiles } from '../data/profiles';

export default function Interests({ interests, toggleInterest, setSelectedProfile, setCurrentView }) {
  const interestedProfiles = profiles.filter(p => interests.has(p.id));
  const receivedInterests = profiles.filter(p => !interests.has(p.id)).slice(0, 3); // Simulated received

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '400', color: 'var(--text)', marginBottom: '8px' }}>Interests</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Track your expressed and received interests</p>
      </div>

      {/* Sent Interests */}
      <div style={{ marginBottom: '48px' }}>
        <div className="divider" style={{ marginBottom: '28px' }}>
          <span>Interests You Sent ({interestedProfiles.length})</span>
        </div>

        {interestedProfiles.length === 0 ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '60px',
            textAlign: 'center',
          }}>
            <Heart size={32} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '8px' }}>No interests sent yet</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '24px' }}>Browse profiles and express interest to connect</p>
            <button className="btn-primary" onClick={() => setCurrentView('browse')}>
              Browse Profiles <ArrowRight size={13} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {interestedProfiles.map(p => (
              <div key={p.id} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {/* Initials */}
                <div style={{
                  width: '48px', height: '48px', flexShrink: 0,
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '18px', color: 'var(--accent)',
                }}>
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--text)' }}>{p.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{p.age} yrs · {p.location}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.profession}</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '8px 16px' }}
                    onClick={() => setSelectedProfile(p)}>
                    View Profile
                  </button>
                  <button
                    onClick={() => toggleInterest(p.id)}
                    style={{
                      background: 'none', border: '1px solid var(--border)',
                      color: 'var(--text-dim)', cursor: 'pointer',
                      padding: '8px 10px', transition: 'all 0.2s',
                    }}
                    title="Withdraw interest"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = 'var(--rose)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)'; }}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Received Interests (simulated) */}
      <div>
        <div className="divider" style={{ marginBottom: '28px' }}>
          <span>Interests You Received ({receivedInterests.length})</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {receivedInterests.map(p => (
            <div key={p.id} style={{
              background: 'var(--surface)',
              border: '1px solid rgba(201,169,110,0.2)',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}>
              <div style={{
                width: '48px', height: '48px', flexShrink: 0,
                background: 'rgba(201,169,110,0.06)',
                border: '1px solid rgba(201,169,110,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '18px', color: 'var(--accent)',
              }}>
                {p.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--text)' }}>{p.name}</span>
                  <span className="tag tag-accent" style={{ fontSize: '10px' }}>New</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.age} yrs · {p.profession} · {p.location}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button className="btn-primary" style={{ fontSize: '12px', padding: '8px 16px' }}
                  onClick={() => { toggleInterest(p.id); }}>
                  <Heart size={12} /> Accept
                </button>
                <button className="btn-ghost" style={{ fontSize: '12px', padding: '8px 16px' }}
                  onClick={() => setSelectedProfile(p)}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ArrowRight, Heart, Users, MessageCircle, Star } from 'lucide-react';

export default function Home({ setCurrentView }) {
  const stats = [
    { num: '2,40,000+', label: 'Verified Profiles' },
    { num: '18,000+', label: 'Successful Unions' },
    { num: '94%', label: 'Privacy Rating' },
    { num: '50+', label: 'Communities' },
  ];

  const features = [
    {
      icon: '✦',
      title: 'Words over Appearances',
      desc: 'We believe your story, values, and voice matter infinitely more than a filtered photograph. Every profile is built around depth, not image.',
    },
    {
      icon: '❋',
      title: 'Curated Matching',
      desc: 'Our compatibility engine weighs education, values, lifestyle, and aspirations — not physical metrics. Real alignment, not swipe-right luck.',
    },
    {
      icon: '◈',
      title: 'Complete Privacy',
      desc: 'Your identity is never exposed to strangers. Only mutual interests unlock full contact details. No screenshots, no data reselling.',
    },
    {
      icon: '⟡',
      title: 'Meaningful Conversations',
      desc: 'Our structured introduction flow ensures first messages are thoughtful, not generic. Quality over volume, always.',
    },
  ];

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        textAlign: 'center',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '1px',
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, var(--border), transparent)',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '1px',
          height: '150px',
          background: 'linear-gradient(to bottom, transparent, var(--border), transparent)',
        }} />

        <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <span className="tag tag-accent">Est. 2020 · Text-First Matrimony</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: '300',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            color: 'var(--text)',
          }}>
            Find your
          </h1>
          <h1 className="gold-text" style={{
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: '600',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          }}>
            soulmate
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-muted)',
            maxWidth: '520px',
            margin: '0 auto 48px',
            lineHeight: '1.7',
            fontWeight: '300',
          }}>
            Where your words write the story of who you are.
            No photographs. No videos. Just honest, beautiful conversations.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setCurrentView('browse')}>
              Browse Profiles <ArrowRight size={14} />
            </button>
            <button className="btn-ghost" onClick={() => setCurrentView('profile')}>
              Create Your Profile
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-dim)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
          }} />
        </div>
      </section>

      {/* Stats */}
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px',
        background: 'var(--surface)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '20px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '36px',
                fontWeight: '500',
                color: 'var(--accent)',
                lineHeight: '1',
                marginBottom: '6px',
              }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
          <div className="divider" style={{ marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            <span>Our Philosophy</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '300', color: 'var(--text)', lineHeight: '1.2', marginBottom: '20px' }}>
            In the age of images,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>we chose words</em>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto' }}>
            Every great marriage begins with a conversation. We removed everything that gets in the way of that —
            the judging, the swiping, the surface-level screening — and kept only what matters: who you truly are.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              padding: '40px 32px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
            >
              <div style={{ fontSize: '24px', color: 'var(--accent)', marginBottom: '20px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text)', marginBottom: '12px', lineHeight: '1.2' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section style={{
        padding: '80px 24px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '32px' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />)}
          </div>
          <blockquote style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: '1.5',
            marginBottom: '32px',
            fontWeight: '400',
          }}>
            "We spent three weeks writing to each other before we even exchanged names. By then, I already knew she was the one. Vivāha gave us the space to truly see each other."
          </blockquote>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Kiran & Meera — Married April 2024, Mysore
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '300', color: 'var(--text)', marginBottom: '20px' }}>
          Your story is waiting<br />
          <span className="gold-text" style={{ fontWeight: '600' }}>to be written</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px' }}>
          Join thousands of thoughtful people who chose depth over display.
        </p>
        <button className="btn-primary" onClick={() => setCurrentView('browse')}>
          Start Exploring <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
}

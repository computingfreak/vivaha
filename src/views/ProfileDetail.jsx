import { ArrowLeft, MapPin, GraduationCap, Briefcase, Heart, MessageCircle, Languages, Users, Star } from 'lucide-react';

export default function ProfileDetail({ profile, onBack, isInterested, onInterest, onMessage }) {
  if (!profile) return null;

  const sections = [
    { label: 'About Me', content: profile.aboutMe },
    { label: 'Values', content: profile.values },
    { label: 'Partner Expectations', content: profile.partnerExpectations },
  ];

  const details = [
    { label: 'Age', value: `${profile.age} years` },
    { label: 'Height', value: profile.height },
    { label: 'Religion', value: profile.religion },
    { label: 'Caste', value: profile.caste },
    { label: 'Mother Tongue', value: profile.motherTongue },
    { label: 'Marital Status', value: profile.maritalStatus },
    { label: 'Diet', value: profile.diet },
    { label: 'Family Type', value: profile.familyType },
    { label: 'Siblings', value: profile.siblings },
    { label: 'Annual Income', value: profile.annualIncome },
    { label: 'Astrology', value: profile.astrology },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }} className="animate-fade-up">
      {/* Back button */}
      <button className="btn-ghost" onClick={onBack} style={{ marginBottom: '32px', fontSize: '12px' }}>
        <ArrowLeft size={13} /> Back to Browse
      </button>

      {/* Hero section */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '40px',
        marginBottom: '2px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '32px',
        alignItems: 'start',
      }}>
        {/* Initials avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '28px',
          color: 'var(--accent)',
          flexShrink: 0,
        }}>
          {profile.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '400', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.1' }}>
            {profile.name}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <MapPin size={12} /> {profile.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <GraduationCap size={12} /> {profile.education}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <Briefcase size={12} /> {profile.profession}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {profile.tags.map(t => (
              <span key={t} className="tag tag-accent">{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className={isInterested ? 'btn-primary' : 'btn-ghost'}
              onClick={() => onInterest(profile.id)}
            >
              <Heart size={13} fill={isInterested ? 'var(--bg)' : 'none'} />
              {isInterested ? 'Interest Sent' : 'Express Interest'}
            </button>
            <button className="btn-ghost" onClick={() => onMessage(profile)}>
              <MessageCircle size={13} /> Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2px', marginBottom: '2px' }}>
        {/* Left: text sections */}
        <div>
          {sections.map((s, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '32px',
              marginBottom: '2px',
            }}>
              <div className="divider" style={{ marginBottom: '20px' }}><span>{s.label}</span></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.85', fontWeight: '300' }}>
                {s.content}
              </p>
            </div>
          ))}

          {/* Hobbies */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', marginBottom: '2px' }}>
            <div className="divider" style={{ marginBottom: '20px' }}><span>Hobbies & Interests</span></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profile.hobbies.map(h => (
                <span key={h} style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  padding: '8px 16px',
                  fontSize: '13px',
                }}>
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px' }}>
            <div className="divider" style={{ marginBottom: '20px' }}>
              <Languages size={12} style={{ color: 'var(--text-dim)' }} /><span>Languages</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {profile.languages.map(l => (
                <span key={l} className="tag tag-accent">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: quick facts */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px', alignSelf: 'start' }}>
          <div className="divider" style={{ marginBottom: '20px' }}><span>Profile Details</span></div>
          {details.map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '10px 0',
              borderBottom: i < details.length - 1 ? '1px solid var(--border)' : 'none',
              gap: '12px',
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
                {d.label}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'right' }}>
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy notice */}
      <div style={{
        background: 'rgba(201,169,110,0.04)',
        border: '1px solid rgba(201,169,110,0.15)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <Star size={14} color="var(--accent)" />
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Contact details are shared only after mutual interest is expressed. Your privacy is protected at every step.
        </p>
      </div>
    </div>
  );
}

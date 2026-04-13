import { useState } from 'react';
import { Search, Filter, MapPin, GraduationCap, Briefcase, Heart, X } from 'lucide-react';
import { profiles, religions, dietOptions, ageRanges } from '../data/profiles';

function ProfileCard({ profile, onClick, isInterested, onInterest }) {
  return (
    <div
      className="card-hover"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '28px',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => onClick(profile)}
    >
      {/* Avatar placeholder — initials only */}
      <div style={{
        width: '56px',
        height: '56px',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '22px',
        color: 'var(--accent)',
        marginBottom: '16px',
        letterSpacing: '0.05em',
      }}>
        {profile.name.split(' ').map(n => n[0]).join('')}
      </div>

      {/* Name & Age */}
      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '22px',
        fontWeight: '500',
        color: 'var(--text)',
        marginBottom: '4px',
      }}>
        {profile.name}
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{profile.age} yrs</span>
        <span style={{ color: 'var(--border)', fontSize: '10px' }}>◆</span>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{profile.height}</span>
        <span style={{ color: 'var(--border)', fontSize: '10px' }}>◆</span>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{profile.diet}</span>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <MapPin size={12} color="var(--text-dim)" />
          {profile.location}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <GraduationCap size={12} color="var(--text-dim)" />
          {profile.education}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <Briefcase size={12} color="var(--text-dim)" />
          {profile.profession}
        </div>
      </div>

      {/* About excerpt */}
      <p style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        lineHeight: '1.7',
        marginBottom: '20px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {profile.aboutMe}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {profile.tags.slice(0, 3).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Interest button */}
      <button
        className={isInterested ? 'btn-primary' : 'btn-ghost'}
        style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}
        onClick={e => { e.stopPropagation(); onInterest(profile.id); }}
      >
        <Heart size={13} fill={isInterested ? 'var(--bg)' : 'none'} />
        {isInterested ? 'Interest Sent' : 'Express Interest'}
      </button>
    </div>
  );
}

export default function Browse({ setSelectedProfile, interests, toggleInterest }) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    religion: '',
    diet: '',
    ageRange: '',
  });

  const filtered = profiles.filter(p => {
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.profession.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.education.toLowerCase().includes(q) ||
      p.motherTongue.toLowerCase().includes(q);

    const matchesReligion = !filters.religion || p.religion === filters.religion;
    const matchesDiet = !filters.diet || p.diet === filters.diet;
    const matchesAge = !filters.ageRange || (() => {
      const r = ageRanges.find(a => a.label === filters.ageRange);
      return r ? p.age >= r.min && p.age <= r.max : true;
    })();

    return matchesSearch && matchesReligion && matchesDiet && matchesAge;
  });

  const hasFilters = filters.religion || filters.diet || filters.ageRange;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '400', color: 'var(--text)', marginBottom: '8px' }}>
          Browse Profiles
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          {filtered.length} profile{filtered.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Search + Filter row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            className="input-field"
            style={{ paddingLeft: '40px' }}
            placeholder="Search by name, profession, city, language…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          className={showFilters ? 'btn-primary' : 'btn-ghost'}
          onClick={() => setShowFilters(!showFilters)}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Filter size={13} />
          Filters {hasFilters && '·'}
        </button>
        {hasFilters && (
          <button className="btn-ghost" onClick={() => setFilters({ religion: '', diet: '', ageRange: '' })}>
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '24px',
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }} className="animate-fade-in">
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Religion</label>
            <select className="input-field" value={filters.religion} onChange={e => setFilters(f => ({ ...f, religion: e.target.value }))}>
              <option value="">Any Religion</option>
              {religions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Diet</label>
            <select className="input-field" value={filters.diet} onChange={e => setFilters(f => ({ ...f, diet: e.target.value }))}>
              <option value="">Any Diet</option>
              {dietOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Age Range</label>
            <select className="input-field" value={filters.ageRange} onChange={e => setFilters(f => ({ ...f, ageRange: e.target.value }))}>
              <option value="">Any Age</option>
              {ageRanges.map(a => <option key={a.label} value={a.label}>{a.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '36px', marginBottom: '16px', color: 'var(--text-dim)' }}>◇</div>
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>No profiles match your search</p>
          <p style={{ fontSize: '13px' }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {filtered.map(p => (
            <ProfileCard
              key={p.id}
              profile={p}
              onClick={setSelectedProfile}
              isInterested={interests.has(p.id)}
              onInterest={toggleInterest}
            />
          ))}
        </div>
      )}
    </div>
  );
}

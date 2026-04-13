import { useState } from 'react';
import { Save, User, CheckCircle } from 'lucide-react';

const EMPTY_PROFILE = {
  name: '',
  age: '',
  location: '',
  education: '',
  profession: '',
  religion: '',
  caste: '',
  motherTongue: '',
  height: '',
  maritalStatus: 'Never Married',
  diet: 'Vegetarian',
  aboutMe: '',
  values: '',
  partnerExpectations: '',
  hobbies: '',
  languages: '',
  annualIncome: '',
  astrology: '',
  familyType: 'Nuclear',
  siblings: '',
};

const FIELDS = [
  { section: 'Basic Information', fields: [
    { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
    { key: 'age', label: 'Age', placeholder: 'e.g. 28', type: 'number' },
    { key: 'location', label: 'Location', placeholder: 'City, State', type: 'text' },
    { key: 'height', label: 'Height', placeholder: 'e.g. 5\'6"', type: 'text' },
    { key: 'maritalStatus', label: 'Marital Status', type: 'select', options: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'] },
    { key: 'diet', label: 'Diet', type: 'select', options: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'] },
  ]},
  { section: 'Background', fields: [
    { key: 'religion', label: 'Religion', placeholder: 'e.g. Hindu, Muslim, Christian…', type: 'text' },
    { key: 'caste', label: 'Caste / Community', placeholder: 'Optional', type: 'text' },
    { key: 'motherTongue', label: 'Mother Tongue', placeholder: 'e.g. Tamil, Telugu…', type: 'text' },
    { key: 'languages', label: 'Languages Known', placeholder: 'Comma-separated, e.g. Tamil, English, Hindi', type: 'text' },
    { key: 'astrology', label: 'Rasi / Nakshatra', placeholder: 'Optional', type: 'text' },
  ]},
  { section: 'Education & Career', fields: [
    { key: 'education', label: 'Education', placeholder: 'Highest qualification', type: 'text' },
    { key: 'profession', label: 'Profession', placeholder: 'Role & Organisation', type: 'text' },
    { key: 'annualIncome', label: 'Annual Income', placeholder: 'e.g. ₹20–25 LPA', type: 'text' },
  ]},
  { section: 'Family', fields: [
    { key: 'familyType', label: 'Family Type', type: 'select', options: ['Nuclear', 'Joint', 'Joint (will shift to nuclear)'] },
    { key: 'siblings', label: 'Siblings', placeholder: 'e.g. 1 elder sister', type: 'text' },
  ]},
  { section: 'In Your Own Words', fields: [
    { key: 'aboutMe', label: 'About Me', placeholder: 'Tell potential partners who you really are — your story, values, what makes you you. Be honest, be warm.', type: 'textarea', rows: 5 },
    { key: 'values', label: 'My Values', placeholder: 'What principles guide your life? What do you stand for?', type: 'textarea', rows: 3 },
    { key: 'partnerExpectations', label: 'Partner Expectations', placeholder: 'Describe the kind of person and partnership you are looking for.', type: 'textarea', rows: 3 },
    { key: 'hobbies', label: 'Hobbies & Interests', placeholder: 'Comma-separated, e.g. Classical music, Cooking, Reading', type: 'text' },
  ]},
];

export default function MyProfile() {
  const [data, setData] = useState(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const update = (key, val) => setData(d => ({ ...d, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const completedFields = Object.values(data).filter(v => v.trim?.() !== '' && v !== '').length;
  const totalFields = Object.keys(EMPTY_PROFILE).length;
  const completionPct = Math.round((completedFields / totalFields) * 100);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: '400', color: 'var(--text)', marginBottom: '8px' }}>My Profile</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your profile is your story — make it count</p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          {saved ? <><CheckCircle size={13} /> Saved!</> : <><Save size={13} /> Save Profile</>}
        </button>
      </div>

      {/* Completion bar */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '20px 24px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{
          width: '48px', height: '48px',
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <User size={20} color="var(--text-muted)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Profile Completion</span>
            <span style={{ fontSize: '13px', color: 'var(--accent)', fontFamily: 'Cormorant Garamond, serif' }}>{completionPct}%</span>
          </div>
          <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px' }}>
            <div style={{
              height: '100%',
              width: `${completionPct}%`,
              background: 'var(--accent)',
              borderRadius: '2px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {FIELDS.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveSection(i)}
            style={{
              background: activeSection === i ? 'var(--accent)' : 'var(--surface)',
              color: activeSection === i ? 'var(--bg)' : 'var(--text-muted)',
              border: '1px solid ' + (activeSection === i ? 'var(--accent)' : 'var(--border)'),
              padding: '8px 16px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {s.section}
          </button>
        ))}
      </div>

      {/* Active section form */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '36px',
      }} className="animate-fade-in" key={activeSection}>
        <div className="divider" style={{ marginBottom: '32px' }}>
          <span>{FIELDS[activeSection].section}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {FIELDS[activeSection].fields.map(f => (
            <div key={f.key}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {f.label}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  className="input-field"
                  placeholder={f.placeholder}
                  value={data[f.key]}
                  onChange={e => update(f.key, e.target.value)}
                  rows={f.rows || 3}
                  style={{ resize: 'vertical', lineHeight: '1.7' }}
                />
              ) : f.type === 'select' ? (
                <select
                  className="input-field"
                  value={data[f.key]}
                  onChange={e => update(f.key, e.target.value)}
                >
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  className="input-field"
                  type={f.type}
                  placeholder={f.placeholder}
                  value={data[f.key]}
                  onChange={e => update(f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <button
            className="btn-ghost"
            onClick={() => setActiveSection(s => Math.max(0, s - 1))}
            disabled={activeSection === 0}
            style={{ opacity: activeSection === 0 ? 0.3 : 1 }}
          >
            ← Previous
          </button>
          {activeSection < FIELDS.length - 1 ? (
            <button className="btn-primary" onClick={() => setActiveSection(s => s + 1)}>
              Next →
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSave}>
              {saved ? <><CheckCircle size={13} /> Saved!</> : <><Save size={13} /> Save Profile</>}
            </button>
          )}
        </div>
      </div>

      {/* Privacy note */}
      <div style={{
        marginTop: '16px',
        padding: '14px 20px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        fontSize: '12px',
        color: 'var(--text-dim)',
        lineHeight: '1.6',
      }}>
        ◆ No photos or videos are ever requested or displayed on Vivāha. Your identity is protected until mutual interest is established.
      </div>
    </div>
  );
}

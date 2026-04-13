import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Browse from './views/Browse';
import ProfileDetail from './views/ProfileDetail';
import Interests from './views/Interests';
import Messages from './views/Messages';
import MyProfile from './views/MyProfile';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [interests, setInterests] = useState(new Set());
  const [activeConversation, setActiveConversation] = useState(null);

  const toggleInterest = (id) => {
    setInterests(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSetSelectedProfile = (profile) => {
    setSelectedProfile(profile);
    setCurrentView('profile-detail');
  };

  const handleMessage = (profile) => {
    setActiveConversation(profile);
    setCurrentView('messages');
  };

  const renderView = () => {
    if (currentView === 'profile-detail' && selectedProfile) {
      return (
        <ProfileDetail
          profile={selectedProfile}
          onBack={() => { setCurrentView('browse'); setSelectedProfile(null); }}
          isInterested={interests.has(selectedProfile.id)}
          onInterest={toggleInterest}
          onMessage={handleMessage}
        />
      );
    }
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView} />;
      case 'browse':
        return (
          <Browse
            setSelectedProfile={handleSetSelectedProfile}
            interests={interests}
            toggleInterest={toggleInterest}
          />
        );
      case 'interests':
        return (
          <Interests
            interests={interests}
            toggleInterest={toggleInterest}
            setSelectedProfile={handleSetSelectedProfile}
            setCurrentView={setCurrentView}
          />
        );
      case 'messages':
        return (
          <Messages
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        );
      case 'profile':
        return <MyProfile />;
      default:
        return <Home setCurrentView={setCurrentView} />;
    }
  };

  const showNav = currentView !== 'home';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar
        currentView={currentView}
        setCurrentView={(v) => { setCurrentView(v); setSelectedProfile(null); }}
        expressedInterests={interests.size}
      />
      {renderView()}
    </div>
  );
}

export default App;

import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { Header } from '@/components/ui/Header';
import { WelcomeOverlay } from '@/components/ui/WelcomeOverlay';
import { Story } from '@/data/stories';
import welcomeAudio from '@/voice/Welcome.mp3';

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasStarted, setHasStarted] = useState(() => {
    return location.state?.skipWelcome || false;
  });

  useEffect(() => {
    if (hasStarted) {
      const audio = new Audio(welcomeAudio);
      audio.play().catch(e => console.error("Audio playback failed:", e));

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [hasStarted]);
  const handleStorySelect = useCallback((story: Story | null) => {
    if (story) {
      navigate(`/story/${story.id}`);
    }
  }, [navigate]);

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, []);

  const handleBackToLanding = useCallback(() => {
    setHasStarted(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/login', { replace: true });
  }, [navigate]);

  const handleCloudClick = useCallback((cloudId: number) => {
    const messages = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];
    toast(messages[cloudId % messages.length], {
      duration: 2000,
      position: 'top-center',
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Welcome overlay */}
      {!hasStarted && (
        <WelcomeOverlay onStart={handleStart} />
      )}

      {/* Main content */}
      {hasStarted && (
        <>
          {/* Header */}
          <Header />

          {/* Top Right Controls */}
          <div className="fixed top-[20px] right-[20px] z-[9999] flex items-center gap-3">
            <button
              onClick={handleBackToLanding}
              className="flex items-center gap-2 rounded-full text-white shadow-md font-medium cursor-pointer"
              style={{
                backgroundColor: '#f4a623',
                padding: '10px 20px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e09612';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f4a623';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full text-white shadow-md font-medium cursor-pointer"
              style={{
                backgroundColor: '#e83e4a',
                padding: '10px 20px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b9212a';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e83e4a';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Interactive 2D Roadmap */}
          <div className="absolute inset-0">
            <InteractiveRoadmap
              onStorySelect={handleStorySelect}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;

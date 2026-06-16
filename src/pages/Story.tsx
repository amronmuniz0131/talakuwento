import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { StoryPanelView } from '@/components/story/StoryPanelView';
import { SceneView } from '@/components/story/SceneView';
import { stories, Story } from '@/data/stories';

const StoryPage = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOverlayModel, setShowOverlayModel] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find current story
  useEffect(() => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setCurrentStory(story);
    } else {
      // Default to first story if not found
      setCurrentStory(stories[0]);
    }
    setShowOverlayModel(false);
    setIsFullscreen(false);
  }, [storyId]);

  // Handle ESC key for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Navigate to next story
  const handleNextStory = () => {
    if (!currentStory) return;
    const currentIndex = stories.findIndex(s => s.id === currentStory.id);
    const nextIndex = (currentIndex + 1) % stories.length;
    navigate(`/story/${stories[nextIndex].id}`);
  };

  // Navigate back to roadmap
  const handleBackToRoadmap = () => {
    navigate('/homepage', { state: { skipWelcome: true } });
  };

  if (!currentStory) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-2xl font-display text-foreground animate-pulse">
          Loading story...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-gradient-to-br from-sky-100 via-amber-50 to-pink-100"
    >
      {/* Back button */}
      {!isFullscreen && (
        <button
          onClick={handleBackToRoadmap}
          className="fixed top-4 left-4 z-50 px-4 py-2 rounded-full bg-card/90 
                     backdrop-blur-sm shadow-soft font-display text-sm
                     hover:bg-card transition-all duration-300 hover:scale-105"
        >
          ← Back to Map
        </button>
      )}

      {/* Split screen layout */}
      <div className="flex flex-row h-full w-full">
        {/* LEFT: Story Panel */}
        <div 
          className={`transition-all duration-700 ease-in-out ${
            isFullscreen ? 'w-0 opacity-0 overflow-hidden' : 'w-[55%] lg:w-1/2 h-full'
          } z-10 relative flex-shrink-0`}
        >
          <div className="h-full w-full flex items-center justify-center p-2 sm:p-4 lg:p-8 lg:pt-16">
            <StoryPanelView
              story={currentStory}
              onNext={handleNextStory}
              showOverlayModel={showOverlayModel}
              setShowOverlayModel={setShowOverlayModel}
            />
          </div>
        </div>

        {/* RIGHT: Scene View */}
        <div 
          className={`transition-all duration-700 ease-in-out flex items-center justify-center ${
            isFullscreen ? 'w-full h-full p-0 z-50' : 'w-[45%] lg:w-1/2 h-full py-4 pr-2 pl-0 sm:py-8 sm:pr-4 lg:p-8 lg:pt-16 lg:pl-0'
          } relative flex-grow`}
        >
          {/* Constrain height slightly on mobile so it isn't too tall */}
          <div className={`w-full transition-all duration-700 ${isFullscreen ? 'h-full' : 'h-[75%] lg:h-full'}`}>
          <SceneView 
            story={currentStory}
            showOverlayModel={showOverlayModel}
            setShowOverlayModel={setShowOverlayModel}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;

import { useState, useEffect } from 'react';
import welcomePic from '@/images/new-welcome.png';

export const WelcomeCharacter = ({ onShowChange }: { onShowChange?: (show: boolean) => void }) => {
  const [mount, setMount] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger fade in for character
    const showRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShow(true);
        onShowChange?.(true);
      });
    });

    // Auto hide after 6 seconds
    const hideTimer = setTimeout(() => {
      handleHide();
    }, 6000);

    return () => {
      cancelAnimationFrame(showRaf);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleHide = () => {
    setShow(false);
    onShowChange?.(false);
    setTimeout(() => setMount(false), 800); // Wait for fade out
  };

  if (!mount) return null;

  return (
    <>
      <div 
        className={`fixed bottom-0 left-0 md:left-[2%] z-50 flex items-start transition-opacity duration-[800ms] ease-in-out pointer-events-none ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Character Image Container */}
        <div 
          onClick={handleHide}
          className="relative group cursor-pointer animate-float-character pointer-events-auto"
        >
          <div className="relative transition-all duration-500 group-hover:scale-[1.02] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <img 
              src={welcomePic} 
              alt="Welcome" 
              className="w-auto h-[55vh] md:h-[75vh] object-contain object-bottom origin-bottom"
            />
          </div>
        </div>
      </div>
    </>
  );
};

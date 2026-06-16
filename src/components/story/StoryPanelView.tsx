import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, Pause, ChevronRight, Brain } from 'lucide-react';
import { Story } from '@/data/stories';
import { QuizModal } from '../ui/QuizModal';
import bantuganAudio from '@/voice/bantungan-new-voice.mp3';
import mariaMakilingAudio from '@/voice/maria-makiling.mp3';
import palakaKalabawAudio from '@/voice/pabula-kalabaw.mp3';
import alamatBulusanAudio from '@/voice/alamat-bulusan.mp3';
import indarapatraAudio from '@/voice/indarapat.mp3';
import ibigMagingTenorAudio from '@/voice/ibig-maging-tenor.mp3';

const audioMap: Record<string, string> = {
  'bantugan': bantuganAudio,
  'maria-makiling': mariaMakilingAudio,
  'palaka-kalabaw': palakaKalabawAudio,
  'lawa-ng-bulusan': alamatBulusanAudio,
  'indarapatra-sulayman': indarapatraAudio,
  'ibig-maging-tenor': ibigMagingTenorAudio,
};


interface StoryPanelViewProps {
  story: Story;
  onNext: () => void;
  showOverlayModel?: boolean;
  setShowOverlayModel?: (show: boolean | ((prev: boolean) => boolean)) => void;
}

export const StoryPanelView = ({
  story,
  onNext,
  showOverlayModel = false,
  setShowOverlayModel,
}: StoryPanelViewProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const currentAudioPath = audioMap[story.id];

    if (currentAudioPath) {
      audioRef.current = new Audio(currentAudioPath);
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current = null;
    }

    setIsPlaying(false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [story.id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset elements
      gsap.set(panelRef.current, { x: '-100%', opacity: 0 });
      gsap.set([titleRef.current, descriptionRef.current, buttonsRef.current], {
        y: 30,
        opacity: 0
      });

      // Panel slides in from left
      gsap.to(panelRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Staggered text animations
      gsap.to([titleRef.current, descriptionRef.current, buttonsRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, [story.id]);

  return (
    <div
      ref={panelRef}
      className="w-full h-full max-h-full flex flex-col max-w-lg bg-card/95 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-panel p-2 sm:p-4 lg:p-8 
                 border border-white/50 relative overflow-hidden mx-auto"
      style={{
        boxShadow: `0 20px 60px -20px ${story.color}40, 0 8px 32px -8px rgba(0,0,0,0.1)`,
      }}
    >
      {/* Decorative background gradient */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: story.glowColor }}
      />
      <div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-20 translate-y-1/2 -translate-x-1/2"
        style={{ backgroundColor: story.color }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full space-y-1 sm:space-y-2 lg:space-y-6">
        {/* Icon and Title */}
        <div className="text-center shrink-0">
          <h1
            ref={titleRef}
            className="font-display text-sm sm:text-lg lg:text-4xl font-bold mb-0.5 lg:mb-2"
            style={{ color: story.color }}
          >
            {story.title}
          </h1>
        </div>

        {/* Description */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
          <p
            ref={descriptionRef}
            className="font-body text-[10px] sm:text-sm lg:text-lg text-foreground/80 leading-snug sm:leading-relaxed text-center whitespace-pre-wrap"
          >
            {story.description}
          </p>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex gap-1 sm:gap-2 lg:gap-3 pt-1 lg:pt-4 flex-wrap shrink-0">



          {/* Voice button */}
          {audioMap[story.id] && (
            <button
              onClick={() => {
                if (!audioRef.current) return;
                if (isPlaying) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
              }}
              className="flex-1 py-1 sm:py-2 lg:py-3 px-1 sm:px-2 lg:px-4 rounded-lg sm:rounded-xl lg:rounded-3xl font-display font-semibold
                         flex items-center justify-center gap-0.5 sm:gap-1 lg:gap-2 transition-all duration-300
                         hover:scale-105 active:scale-95 border sm:border-2 whitespace-nowrap min-w-0 sm:min-w-[80px] lg:min-w-[140px] text-[8px] sm:text-xs lg:text-base"
              style={{
                backgroundColor: isPlaying ? story.color : 'white',
                color: isPlaying ? 'white' : story.color,
                borderColor: `${story.glowColor}40`,
              }}
            >
              {isPlaying ? <Pause className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> : <Play className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
              {isPlaying ? 'Pause' : 'Voice'}
            </button>
          )}

          {/* Quiz button */}
          <button
            onClick={() => setShowQuiz(true)}
            className="flex-1 py-1 sm:py-2 lg:py-3 px-1 sm:px-2 lg:px-4 rounded-lg sm:rounded-xl lg:rounded-3xl font-display font-semibold
                       flex items-center justify-center gap-0.5 sm:gap-1 lg:gap-2 transition-all duration-300
                       hover:scale-105 active:scale-95 border sm:border-2 text-[8px] sm:text-xs lg:text-base min-w-0 sm:min-w-[80px]"
            style={{
              backgroundColor: 'white',
              color: story.color,
              borderColor: `${story.glowColor}40`,
            }}
          >
            <Brain className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            Pagsusulit
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            className="flex-1 py-1 sm:py-2 lg:py-3 px-1 sm:px-2 lg:px-4 rounded-lg sm:rounded-xl lg:rounded-3xl font-display font-semibold text-white
                       flex items-center justify-center gap-0.5 sm:gap-1 lg:gap-2 transition-all duration-300
                       hover:scale-105 active:scale-95 shadow-lg text-[8px] sm:text-xs lg:text-base min-w-0 sm:min-w-[80px]"
            style={{
              background: `linear-gradient(135deg, ${story.color}, ${story.glowColor})`,
            }}
          >
            Susunod
            <ChevronRight className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          story={story}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};

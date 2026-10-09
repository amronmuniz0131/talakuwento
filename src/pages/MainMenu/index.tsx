import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

import SunImg from '@/images/sun1.png';
import RoadmapImg from './images/bg.jpg';
import MountainsImg from '@/pages/PalakaKalabaw/components/images/mountains.png';
import GroundImg from '@/pages/PalakaKalabaw/components/images/ground.png';
import TenorImg from '@/pages/Tenor/components/images/sheep.png';
import PutaktiImg from '@/pages/Putakti/components/images/famer-guy.png';
import PinyaImg from '@/pages/Pinya/components/images/pinya-seek.png';
import PalakaImg from '@/pages/PalakaKalabaw/components/images/frog-still.png';
import MakopaImg from '@/pages/Makopa/components/images/bell-normal.png';
import MakahiyaImg from '@/pages/Makahiya/components/images/tree.png';
import LanggamImg from '@/pages/Langgam/compnents/images/ant-stay.png';
import IbalonImg from '@/pages/Ibalon/components/images/boy1.png';
import BuwayaImg from '@/pages/Buwaya/components/images/crocs.png';
import KalahiImg from '@/pages/Kalahi/components/images/chicken-base.png';
import IndarapatraImg from '@/pages/Indarapatra/components/images/dragon.png';
import LamAngImg from '@/pages/Lam-ang/components/images/spear.png';
import BulusanImg from '@/pages/Bulusan/components/images/bird.png';
import UlalimImg from '@/pages/Ulalim/components/images/dancing-man.png';

interface StoryOption {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  image: string;
  position: number[];
  label: string;
  locked?: boolean;
}
const storyOptions: StoryOption[] = [
  { id: 'tenor', position: [70, 15], title: 'Pabula: Ibig Maging Tenor', subtitle: 'Kuwento ng Tupa at Kuliglig', route: '/tenor', image: TenorImg, label: 'Tenor' },
  { id: 'putakti', position: [52, 17], title: 'Ang Putakti', subtitle: 'Kuwento ng Magsasaka', route: '/putakti', image: PutaktiImg, label: 'Putakti' },
  { id: 'pinya', position: [68, 25], title: 'Alamat ng Pinya', subtitle: 'Ang Pinya at ang Ina', route: '/pinya', image: PinyaImg, label: 'Pinya' },
  { id: 'palaka-kalabaw', position: [62, 34], title: 'Pabula: Ang Palaka at ang Kalabaw', subtitle: 'Kuwentong Palaka', route: '/palaka-kalabaw', image: PalakaImg, label: 'Palaka at Kalabaw' },
  { id: 'makahiya', position: [80, 20], title: 'Alamat ng Makahiya', subtitle: 'Ang Kwento ng Punong Ligaw', route: '/makahiya', image: MakahiyaImg, label: 'Makahiya' },
  { id: 'makopa', position: [85, 42], title: 'Alamat ng Makopa', subtitle: 'Ang Kampana ng Makopa', route: '/makopa', image: MakopaImg, label: 'Makopa' },
  { id: 'langgam', position: [85, 55], title: 'Ang Mag-anak na Langgam', subtitle: 'Paghahanda sa Tag-ulan', route: '/langgam', image: LanggamImg, label: 'Langgam' },
  { id: 'ibalon', position: [60, 50], title: 'Epiko ng Ibalon', subtitle: 'Epiko ng Bicol', route: '/ibalon', image: IbalonImg, label: 'Ibalon' },
  { id: 'buwaya', position: [40, 45], title: 'Alamat ng Buwaya', subtitle: 'Kuwento ng Buwaya', route: '/buwaya', image: BuwayaImg, label: 'Buwaya' },
  { id: 'kalahi', position: [15, 50], title: 'Ang Kalahi', subtitle: 'Kuwento ng mga Manok', route: '/kalahi', image: KalahiImg, label: 'Kalahi' },
  { id: 'bulusan', position: [15, 60], title: 'Alamat ng Bulusan', subtitle: 'Kuwento ng Bulusan', route: '/bulusan', image: BulusanImg, label: 'Bulusan' },
  { id: 'lam-ang', position: [13, 80], title: 'Biag ni Lam-ang', subtitle: 'Epiko ng Ilocos', route: '/lam-ang', image: LamAngImg, label: 'Lam-ang' },
  { id: 'indarapatra', position: [25, 95], title: 'Indarapatra', subtitle: 'Epiko ng Mindanao', route: '/indarapatra', image: IndarapatraImg, label: 'Indarapatra' },
  { id: 'ulalim', position: [45, 88], title: 'Ulalim', subtitle: 'Epiko ng Kalinga', route: '/ulalim', image: UlalimImg, label: 'Ulalim' },
];

// Dots interpolating between consecutive story positions (offset ~ card centers)
const pathDots = storyOptions.slice(0, -1).flatMap((story, i) => {
  const [x1, y1] = story.position;
  const [x2, y2] = storyOptions[i + 1].position;
  const steps = 7;
  return Array.from({ length: steps - 1 }, (_, s) => {
    const t = (s + 1) / steps;
    return { left: x1 + (x2 - x1) * t + 10, top: y1 + (y2 - y1) * t + 4 };
  });
});

export default function MainMenu() {
  const level = Number(localStorage.getItem("level") ?? 0);
  const [selected, setSelected] = useState<StoryOption | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-100">
      {/* Roadmap background - natural size, scrolls with content */}
      <img src={RoadmapImg} alt="roadmap" className="absolute top-0 left-0 w-full h-auto" />
      {/* Sun layer - moves slowest */}
      {/* <img src={SunImg} alt="sun" className="absolute top-0 right-8 w-screen h-screen drop-shadow-xl" /> */}

      {/* Mountains layer - moves slower than content */}
      {/* <img src={MountainsImg} alt="mountains" className="absolute bottom-[15%] w-full h-[60%] object-cover" /> */}

      {/* Ground layer */}
      {/* <img src={GroundImg} alt="ground" className="absolute bottom-0 w-full h-[35%] object-cover" /> */}
      <div className="relative flex flex-col items-center px-8 pt-10 h-[300vh]">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)]">
          Talakuwento
        </h1>
        <p className="mt-2 text-xl font-semibold text-white/90 drop-shadow-md">
          Pumili ng kuwento na nais mong basahin
        </p>

        {/* <div className="grid grid-cols-1 gap-12 mt-10"> */}
        {/* Dots leading to the next story */}
        {pathDots.map((dot, i) => (
          <div
            key={i}
            style={{ left: `${dot.left}%`, top: `${dot.top}%` }}
            className="absolute w-4 h-4 rounded-full bg-white/80 border-2 border-amber-500 shadow-md"
          />
        ))}

        {storyOptions.map((story, index) => (
          <button
            key={story.id}
            onClick={() => index <= level && setSelected(story)}
            disabled={index > level}
            style={{ left: `${story.position[0]}%`, top: `${story.position[1]}%` }}
            className={`absolute group flex flex-col items-center gap-3 rounded-3xl p-5 w-52 transition-all duration-300 ${index > level
              ? 'opacity-80 grayscale cursor-not-allowed'
              : 'hover:shadow-2xl hover:-translate-y-2 hover:scale-105'
              }`}
          >
            <div className="h-28 flex items-center justify-center">
              <img
                src={story.image}
                alt={story.label}
                className={`max-h-28 object-contain drop-shadow-md ${index > level ? '' : 'group-hover:scale-110 transition-transform duration-300'}`}
              />
            </div>
            <span className="flex items-center gap-2 text-lg font-bold text-gray-800">
              {index > level && <Lock className="w-5 h-5 text-gray-500" />}
              {story.label}
            </span>
          </button>
        ))}
        {/* </div> */}
      </div>
      {/* Story popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 w-[28rem] max-w-[90vw] flex flex-col items-center gap-4"
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="h-32 object-contain drop-shadow-lg"
              />
              <h2 className="text-2xl font-extrabold text-gray-900 text-center">
                {selected.title}
              </h2>
              <p className="text-gray-500 text-center -mt-2">{selected.subtitle}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(selected.route)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Simulang Magbasa
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-8 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Kanselahin
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

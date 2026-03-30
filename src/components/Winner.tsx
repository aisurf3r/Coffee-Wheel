import { useEffect, useState } from 'react';
import { RotateCcw, Users, Share2 } from 'lucide-react';
import { Participant } from '../types';
import { Language, getTranslation } from '../i18n/translations';

interface WinnerProps {
  winner: Participant;
  onRestart: () => void;
  onNewRound: () => void;
  language: Language;
}

interface Confetto {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

export function Winner({ winner, onRestart, onNewRound, language }: WinnerProps) {
  const [confetti, setConfetti] = useState<Confetto[]>([]);

  useEffect(() => {
    const colors = ['#FF6B35', '#00D9FF', '#FFD23F', '#B4E33D', '#FF006E', '#9B51E0'];
    const newConfetti: Confetto[] = [];

    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setConfetti(newConfetti);
  }, [winner]);

  const handleShare = () => {
    const message = getTranslation(language, 'shareMessage', { name: winner.name });

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 flex items-center justify-center p-4 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sparkles-winner" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
            <polygon points="45,15 50,30 65,35 50,40 45,55 40,40 25,35 40,30" fill="rgba(255,255,255,0.4)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sparkles-winner)"/>
      </svg>

      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="absolute top-0 w-3 h-3 rounded-full animate-fall"
          style={{
            left: `${conf.left}%`,
            backgroundColor: conf.color,
            animationDelay: `${conf.delay}s`,
            animationDuration: `${conf.duration}s`,
            zIndex: 5,
          }}
        />
      ))}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative z-10">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>

          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {getTranslation(language, 'winnerTitle')}
          </h2>

          <div
            className="inline-block px-8 py-6 rounded-2xl mb-8"
            style={{ backgroundColor: winner.color }}
          >
            <p className="text-5xl font-black text-white drop-shadow-lg">
              {winner.name}
            </p>
          </div>

          <p className="text-gray-600 text-lg mb-8">
            {getTranslation(language, 'winnerSubtext')} ☕
          </p>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              {getTranslation(language, 'restartButton')}
            </button>

            <button
              onClick={onNewRound}
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <Users size={20} />
              {getTranslation(language, 'newRoundButton')}
            </button>

            <button
              onClick={handleShare}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 size={20} />
              {getTranslation(language, 'shareButton')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.3;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}

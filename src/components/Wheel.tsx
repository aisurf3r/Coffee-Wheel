import { useEffect, useState, useRef } from 'react';
import { Participant } from '../types';
import { Language, getTranslation } from '../i18n/translations';

interface WheelProps {
  participants: Participant[];
  winner: Participant | null;
  onSpinComplete: () => void;
  reduceMotion: boolean;
  language: Language;
}

export function Wheel({ participants, winner, onSpinComplete, reduceMotion, language }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!winner) return;

    const winnerIndex = participants.findIndex(p => p.id === winner.id);
    const segmentAngle = 360 / participants.length;
    const targetAngle = 360 - (winnerIndex * segmentAngle) - (segmentAngle / 2);

    const spins = reduceMotion ? 1 : 5;
    const finalRotation = (360 * spins) + targetAngle + (Math.random() * 10 - 5);

    const duration = reduceMotion ? 1000 : 4000;
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRotation = startRotation + (finalRotation - startRotation) * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(onSpinComplete, 300);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [winner]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    ctx.clearRect(0, 0, size, size);

    const segmentAngle = (2 * Math.PI) / participants.length;

    participants.forEach((participant, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = participant.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px Arial';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(participant.name, radius * 0.65, 0);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [participants]);

  const canvasSize = typeof window !== 'undefined' && window.innerWidth < 420 ? 280 : 400;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="coffee-cups-wheel" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
              <path d="M 35,40 Q 30,40 30,50 L 30,70 Q 30,80 40,80 L 60,80 Q 70,80 70,70 L 70,50 Q 70,40 65,40 Z"/>
              <path d="M 70,55 Q 75,55 80,60 Q 85,65 85,70 Q 80,75 75,75 Q 70,75 70,70"/>
              <ellipse cx="50" cy="40" rx="15" ry="3"/>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#coffee-cups-wheel)"/>
      </svg>
      <div className="text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 animate-pulse">
          {getTranslation(language, 'spinning')}
        </h2>

        <div className="relative inline-block">
          <div className="absolute -top-8 sm:-top-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[15px] sm:border-l-[20px] border-l-transparent border-r-[15px] sm:border-r-[20px] border-r-transparent border-t-[30px] sm:border-t-[40px] border-t-yellow-400 drop-shadow-lg" />
          </div>

          <div
            className="relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: reduceMotion ? 'transform 1s ease-out' : 'none'
            }}
          >
            <canvas
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        <p className="text-white text-lg sm:text-xl mt-8 font-semibold">
          {getTranslation(language, 'spinningText')} 🤔
        </p>
      </div>
    </div>
  );
}

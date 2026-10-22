import React, { useRef, useState, useEffect } from 'react';
import { Target, ChartNoAxesCombined, CalendarCheck, UsersRound, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { BENTO_CARDS } from '../lib/designTokens';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SpotlightCardProps {
  card: (typeof BENTO_CARDS)[0];
  isTouch: boolean;
  prefersReducedMotion: boolean;
}

const BentoCardItem: React.FC<SpotlightCardProps> = ({
  card,
  isTouch,
  prefersReducedMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate tilt (max 5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    const rotateX = -((y - centerY) / centerY) * 4.5;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: -200, y: -200 });
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Target':
        return <Target size={22} className="text-accent" strokeWidth={1.5} />;
      case 'ChartNoAxesCombined':
        return <ChartNoAxesCombined size={22} className="text-accent" strokeWidth={1.5} />;
      case 'CalendarCheck':
        return <CalendarCheck size={22} className="text-accent" strokeWidth={1.5} />;
      case 'UsersRound':
        return <UsersRound size={22} className="text-accent" strokeWidth={1.5} />;
      default:
        return null;
    }
  };

  const cardStyle =
    !isTouch && !prefersReducedMotion && isHovered
      ? {
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
          transition: 'transform 0.15s ease-out',
        }
      : {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.4s ease-out',
        };

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card group relative p-6 sm:p-8 flex flex-col justify-between ${card.className}`}
    >
      {/* Soft Radial Spotlight Following Pointer */}
      {!isTouch && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 243, 106, 0.12), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Featured Card A with atmospheric barbell training photo */}
      {card.id === 'featured' && card.image && (
        <>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={card.image}
              alt="Athlete training with barbell"
              loading="lazy"
              className="w-full h-full object-cover filter contrast-115 brightness-[0.55] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/60 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="label-mono text-xs text-accent px-2.5 py-1 rounded bg-[#10110F]/80 border border-[#30332C]">
              {card.tag}
            </span>
            <div className="w-8 h-8 rounded-full bg-[#10110F]/80 border border-[#30332C] flex items-center justify-center text-accent group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-24 text-[#F1F0E9]">
            <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F0E9] group-hover:text-accent transition-colors">
              {card.title}
            </h3>
            <p className="mt-3 text-base sm:text-lg text-[#A1A49A] max-w-xl leading-relaxed">
              {card.description}
            </p>
          </div>
        </>
      )}

      {/* Cards B, C, D, E */}
      {card.id !== 'featured' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-btn bg-surface-elevated border border-border flex items-center justify-center group-hover:border-accent transition-colors">
              {getIcon(card.icon)}
            </div>
            <span className="label-mono text-[10px] text-text-muted">
              {card.tag}
            </span>
          </div>

          <div className="mt-auto">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary tracking-tight mb-2 group-hover:text-accent transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {card.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export const WhyIronvault: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
    }
  }, []);

  return (
    <section
      id="approach"
      className="py-24 md:py-32 bg-background transition-colors duration-theme border-b border-border"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        <SectionHeading
          eyebrow="THE PLATFORM ARCHITECTURE"
          title="BUILT FOR SERIOUS PROGRESSION."
          description="Everything in IRONVAULT exists to eliminate friction between your current baseline and your physical potential."
        />

        {/* 5-Card Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {BENTO_CARDS.map(card => (
            <BentoCardItem
              key={card.id}
              card={card}
              isTouch={isTouch}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

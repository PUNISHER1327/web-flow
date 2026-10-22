import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import { NAV_ITEMS } from '../lib/designTokens';
import type { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onStartTraining: () => void;
  onLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onStartTraining,
  onLogin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blurred background after 80px
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide down / show up logic
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-sm py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-1440 mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Left: Brand Logo & Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-text-primary group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            {/* Geometric Mark */}
            <div className="w-8 h-8 rounded-btn bg-[#10110F] dark:bg-[#191B17] border border-accent/40 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-accent transform -rotate-45" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tighter text-text-primary">
              IRONVAULT
            </span>
          </a>

          {/* Middle Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="editorial-link font-sans text-sm text-text-muted hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={onLogin}
              className="text-sm font-sans font-medium text-text-muted hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1"
            >
              Log in
            </button>

            <Button
              variant="primary"
              size="sm"
              withArrow
              onClick={onStartTraining}
            >
              Start training
            </Button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-btn text-text-primary hover:bg-surface-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col justify-between pt-28 pb-10 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <span className="label-mono text-accent text-xs">MENU // EXPLORE</span>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * (idx + 1), duration: 0.3 }}
                  className="font-heading text-3xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogin();
                }}
                className="w-full py-3 text-center text-sm font-heading font-semibold text-text-muted hover:text-text-primary border border-border rounded-btn"
              >
                Log in to Account
              </button>

              <Button
                variant="primary"
                size="lg"
                withArrow
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onStartTraining();
                }}
              >
                Start training
              </Button>

              <p className="text-center text-xs font-mono text-text-muted mt-2">
                IRONVAULT PERFORMANCE CLUB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

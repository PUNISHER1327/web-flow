import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signup' | 'login';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [goal, setGoal] = useState<'strength' | 'hypertrophy' | 'fatloss' | 'base'>('strength');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0B09]/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg bg-surface border border-border rounded-card shadow-2xl overflow-hidden z-10 my-8"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/20 text-accent flex items-center justify-center border border-accent/40">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-text-primary">
                  {mode === 'signup' ? 'Assessment Received' : 'Logged into Demo Space'}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                  {mode === 'signup'
                    ? `Welcome aboard, ${name || 'Athlete'}. Your initial training track has been configured. In live deployment, confirmation is dispatched to ${email}.`
                    : `Welcome back. Active session authenticated for ${email}.`}
                </p>
                <div className="mt-6 p-3 rounded-lg bg-surface-elevated border border-border text-xs font-mono text-text-muted text-left">
                  <div className="flex items-center gap-2 text-accent font-semibold mb-1">
                    <ShieldCheck size={14} /> DEMO NOTICE
                  </div>
                  IRONVAULT client prototype running in production preview mode. Local preferences and metrics stored locally.
                </div>
                <div className="mt-6">
                  <Button variant="primary" size="md" onClick={handleReset} className="w-full">
                    Proceed to Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {/* Mode Tabs */}
                <div className="flex items-center border-b border-border pb-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`font-heading text-lg font-bold pb-2 transition-colors relative mr-6 ${
                      mode === 'signup' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Start Training
                    {mode === 'signup' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`font-heading text-lg font-bold pb-2 transition-colors relative ${
                      mode === 'login' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Member Log In
                    {mode === 'login' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <>
                      <div>
                        <label className="block text-xs font-mono text-text-muted mb-2">
                          PRIMARY TRAINING OBJECTIVE
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'strength', label: 'Strength' },
                            { id: 'hypertrophy', label: 'Muscle Growth' },
                            { id: 'fatloss', label: 'Fat Loss' },
                            { id: 'base', label: 'Build Your Base' },
                          ].map(item => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setGoal(item.id as any)}
                              className={`p-2.5 rounded-btn text-xs font-mono text-left border transition-all ${
                                goal === item.id
                                  ? 'border-accent bg-accent/15 text-text-primary font-bold'
                                  : 'border-border text-text-muted hover:border-text-primary'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5" htmlFor="auth-name">
                          ATHLETE NAME
                        </label>
                        <div className="relative">
                          <input
                            id="auth-name"
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Alex Thorne"
                            className="w-full px-3.5 py-2.5 rounded-btn bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-1.5" htmlFor="auth-email">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <input
                        id="auth-email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="athlete@ironvault.club"
                        className="w-full px-3.5 py-2.5 rounded-btn bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {mode === 'login' && (
                    <div>
                      <label className="block text-xs font-mono text-text-muted mb-1.5" htmlFor="auth-pass">
                        PASSWORD
                      </label>
                      <input
                        id="auth-pass"
                        type="password"
                        defaultValue="demo-access-2026"
                        required
                        className="w-full px-3.5 py-2.5 rounded-btn bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent"
                      />
                    </div>
                  )}

                  <div className="pt-2">
                    <Button variant="primary" size="lg" withArrow className="w-full">
                      {mode === 'signup' ? 'Configure My Plan' : 'Access Platform'}
                    </Button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-xs text-text-muted font-sans">
                    {mode === 'signup' ? 'Already have an active account?' : 'Need a training plan?'}
                  </span>{' '}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                    className="text-xs font-heading font-semibold text-accent hover:underline"
                  >
                    {mode === 'signup' ? 'Sign in here' : 'Start here'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

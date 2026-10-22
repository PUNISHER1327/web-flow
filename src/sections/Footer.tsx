import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';

interface FooterProps {
  onSignIn: () => void;
  onCreateAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSignIn,
  onCreateAccount,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid athletic contact email.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <footer className="w-full bg-[#10110F] text-[#F1F0E9] pt-20 pb-12 border-t border-[#22251F]">
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        {/* Top Section: Link Groups & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#22251F]">
          {/* Newsletter Subscription (5 Cols) */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="label-mono text-accent text-xs">DISPATCH // WEEKLY PROTOCOL</span>
            </div>

            <h3 className="font-heading text-2xl font-bold tracking-tight text-[#F1F0E9] mb-3">
              TRAIN INFORMED.
            </h3>

            <p className="text-sm text-[#A1A49A] leading-relaxed mb-6">
              Weekly scientific updates on progressive overload, recovery protocols, and program updates. Zero spam, pure training substance.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    aria-label="Email address for training dispatch"
                    className="w-full px-4 py-3 rounded-btn bg-[#191B17] border border-[#30332C] text-sm text-[#F1F0E9] placeholder:text-[#73756F] focus:outline-none focus:border-accent"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'loading'}
                  className="sm:w-auto"
                >
                  {status === 'loading' ? 'Verifying...' : 'Subscribe'}
                </Button>
              </div>

              {/* Honest Demo State Message */}
              {status === 'success' && (
                <div className="p-3 rounded-btn bg-[#191B17] border border-accent/40 text-xs text-accent flex items-start gap-2">
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Dispatch demo registered:</span> {email} logged in local state. (Ready for Mailchimp/Resend API webhook integration).
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 rounded-btn bg-[#191B17] border border-red-500/40 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>

          {/* 4 Navigation Link Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Platform */}
            <div>
              <h4 className="label-mono text-accent text-xs mb-4">
                PLATFORM
              </h4>
              <ul className="space-y-3 text-sm text-[#A1A49A]">
                <li>
                  <a href="#programs" className="editorial-link hover:text-[#F1F0E9] transition-colors">
                    Training programs
                  </a>
                </li>
                <li>
                  <a href="#dashboard" className="editorial-link hover:text-[#F1F0E9] transition-colors">
                    Progress tracking
                  </a>
                </li>
                <li>
                  <a href="#dashboard" className="editorial-link hover:text-[#F1F0E9] transition-colors">
                    Workout planner
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="label-mono text-accent text-xs mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-3 text-sm text-[#A1A49A]">
                <li>
                  <a href="#manifesto" className="editorial-link hover:text-[#F1F0E9] transition-colors">
                    Our approach
                  </a>
                </li>
                <li>
                  <a href="#stories" className="editorial-link hover:text-[#F1F0E9] transition-colors">
                    Member stories
                  </a>
                </li>
                <li>
                  <a href="#faq" className="editorial-link hover:text-[#F1F0E9] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="label-mono text-accent text-xs mb-4">
                ACCOUNT
              </h4>
              <ul className="space-y-3 text-sm text-[#A1A49A]">
                <li>
                  <button
                    type="button"
                    onClick={onSignIn}
                    className="editorial-link hover:text-[#F1F0E9] transition-colors text-left"
                  >
                    Sign in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onCreateAccount}
                    className="editorial-link hover:text-[#F1F0E9] transition-colors text-left"
                  >
                    Create account
                  </button>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="label-mono text-accent text-xs mb-4">
                COMMUNITY
              </h4>
              <ul className="space-y-3 text-sm text-[#A1A49A]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link hover:text-[#F1F0E9] transition-colors inline-flex items-center gap-1.5"
                    aria-label="IRONVAULT on Instagram"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link hover:text-[#F1F0E9] transition-colors inline-flex items-center gap-1.5"
                    aria-label="IRONVAULT on YouTube"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3v6Z" />
                    </svg>
                    <span>YouTube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive Full-Width Wordmark */}
        <div className="py-12 sm:py-16 text-center select-none overflow-hidden">
          <div className="font-heading font-black tracking-tighter text-[#1C1F19] hover:text-[#252A21] transition-colors duration-500 text-[14vw] leading-none whitespace-nowrap">
            IRONVAULT
          </div>
        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-8 border-t border-[#22251F] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#73756F] gap-4">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} IRONVAULT PERFORMANCE CLUB.</span>
            <span className="hidden sm:inline">•</span>
            <span>BUILT FOR THE WORK</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#F1F0E9] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#F1F0E9] transition-colors">
              Terms of Service
            </a>
            <a href="#system" className="hover:text-accent transition-colors">
              Status 99.98%
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

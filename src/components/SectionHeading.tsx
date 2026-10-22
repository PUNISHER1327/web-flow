import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  id,
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="label-mono text-accent">{eyebrow}</span>
        </div>
      )}

      <h2 id={id} className="h2-fluid text-text-primary tracking-tighter">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};

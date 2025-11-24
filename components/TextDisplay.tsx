
import React from 'react';
import { TrilingualContent } from '../types';

interface TextDisplayProps {
  content: TrilingualContent;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  variant?: 'default' | 'inverted';
}

export const TextDisplay: React.FC<TextDisplayProps> = ({ 
  content, 
  className = '', 
  size = 'md',
  align = 'left',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: { zh: 'text-base', sub: 'text-xs' },
    md: { zh: 'text-lg md:text-xl', sub: 'text-sm' },
    lg: { zh: 'text-2xl md:text-3xl', sub: 'text-base' },
    xl: { zh: 'text-4xl md:text-5xl', sub: 'text-lg' },
  };

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const colors = {
    default: {
      zh: 'text-slate-800',
      en: 'text-slate-500',
      vi: 'text-slate-400'
    },
    inverted: {
      zh: 'text-white',
      en: 'text-indigo-200',
      vi: 'text-indigo-300'
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${alignClass[align]} ${className}`}>
      <div className={`font-bold leading-relaxed ${colors[variant].zh} ${sizeClasses[size].zh}`}>
        {content.zh}
      </div>
      <div className={`font-medium leading-snug ${colors[variant].en} ${sizeClasses[size].sub}`}>
        {content.en}
      </div>
      <div className={`italic leading-snug ${colors[variant].vi} ${sizeClasses[size].sub}`}>
        {content.vi}
      </div>
    </div>
  );
};
    
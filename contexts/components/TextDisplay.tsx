
import React from 'react';
import { TrilingualContent } from '../types';

interface TextDisplayProps {
  content: TrilingualContent;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
}

export const TextDisplay: React.FC<TextDisplayProps> = ({ 
  content, 
  className = '', 
  size = 'md',
  align = 'left' 
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

  return (
    <div className={`flex flex-col gap-1 ${alignClass[align]} ${className}`}>
      <div className={`font-bold text-slate-800 leading-relaxed ${sizeClasses[size].zh}`}>
        {content.zh}
      </div>
      <div className={`text-slate-500 font-medium leading-snug ${sizeClasses[size].sub}`}>
        {content.en}
      </div>
      <div className={`text-slate-400 italic leading-snug ${sizeClasses[size].sub}`}>
        {content.vi}
      </div>
    </div>
  );
};

import React from 'react';

interface ResourceRoomLogoProps {
  className?: string;
  variant?: 'default' | 'small' | 'large';
}

export const ResourceRoomLogo: React.FC<ResourceRoomLogoProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    small: 'text-sm', // Used in footer
    default: 'text-2xl', // Default usage
    large: 'text-4xl md:text-6xl' // Hero section
  }[variant];

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Text Branding - Blue Color: #6BA4D8 */}
      <div className={`font-bold tracking-widest leading-tight text-[#6BA4D8] flex flex-col items-center text-center ${sizeClasses}`}>
        <div className="font-sans whitespace-nowrap drop-shadow-sm">資源教室</div>
        <div className="font-nunito text-[0.4em] tracking-[0.3em] opacity-90 whitespace-nowrap mt-1">RESOURCE ROOM</div>
      </div>
    </div>
  );
};
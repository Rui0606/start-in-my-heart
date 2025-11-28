import React, { useState } from 'react';

interface ResourceRoomLogoProps {
  className?: string;
  variant?: 'default' | 'small' | 'large';
}

export const ResourceRoomLogo: React.FC<ResourceRoomLogoProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    small: 'text-sm', 
    default: 'text-2xl', 
    large: 'text-4xl md:text-6xl'
  }[variant];

  const logoDimensions = {
    small: 'w-10 h-10',
    default: 'w-32 h-32',
    large: 'w-48 h-48 md:w-64 md:h-64'
  }[variant];

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {/* 
         ⚠️ Image Loading Logic:
         1. Tries to load '/logo.svg' from the public folder.
         2. If fails, shows an error message placeholder.
         Ensure your folder is named 'public' (lowercase) and file is 'logo.svg'.
      */}
      {!imgError ? (
        <img 
          src="/logo.svg" 
          alt="Resource Room Logo"
          onError={() => {
            console.error("Logo failed to load. Please check if 'public/logo.svg' exists.");
            setImgError(true);
          }}
          className={`${logoDimensions} object-contain mb-2 transition-transform hover:scale-105 duration-300 drop-shadow-md`}
        />
      ) : (
        <div className={`${logoDimensions} mb-2 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 p-2`}>
           <span className="text-2xl">🖼️</span>
           <span className="text-[10px] text-center mt-1">Logo Missing<br/>(public/logo.svg)</span>
        </div>
      )}

      {/* Text Branding - Blue Color: #6BA4D8 */}
      <div className={`font-bold tracking-widest leading-tight text-[#6BA4D8] flex flex-col items-center text-center ${sizeClasses}`}>
        <div className="font-sans whitespace-nowrap drop-shadow-sm">資源教室</div>
        <div className="font-nunito text-[0.4em] tracking-[0.3em] opacity-90 whitespace-nowrap mt-1">RESOURCE ROOM</div>
      </div>
    </div>
  );
};
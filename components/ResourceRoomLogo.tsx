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
         ⚠️ 請確認您的專案 public 資料夾中已有 'logo.svg' 檔案
         ⚠️ Ensure 'logo.svg' exists in your public folder 
      */}
      <img 
        src="/logo.svg" 
        alt="Resource Room Logo"
        className={`${logoDimensions} object-contain mb-2 transition-transform hover:scale-105 duration-300 drop-shadow-md`}
      />

      {/* Text Branding - Blue Color: #6BA4D8 */}
      <div className={`font-bold tracking-widest leading-tight text-[#6BA4D8] flex flex-col items-center text-center ${sizeClasses}`}>
        <div className="font-sans whitespace-nowrap drop-shadow-sm">資源教室</div>
        <div className="font-nunito text-[0.4em] tracking-[0.3em] opacity-90 whitespace-nowrap mt-1">RESOURCE ROOM</div>
      </div>
    </div>
  );
};
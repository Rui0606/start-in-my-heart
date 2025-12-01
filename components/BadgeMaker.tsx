import React, { useState, useRef } from 'react';
import { useSound } from '../contexts/SoundContext';
import { ResourceRoomLogo } from './ResourceRoomLogo';
import { WorkshopTutorial } from './WorkshopTutorial'; // Import new component

type WorkshopMode = 'menu' | 'badge' | 'mirror' | 'magnet';

export const BadgeMaker: React.FC = () => {
  const [mode, setMode] = useState<WorkshopMode>('menu');
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  const handleTutorialFinish = () => {
      setShowUploadPrompt(true);
      // Smooth scroll to gallery
      if (galleryRef.current) {
          galleryRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  };

  // --- MENU VIEW ---
  if (mode === 'menu') {
    return (
      <div className="max-w-5xl mx-auto animate-fade-in text-center pb-20">
        <div className="mb-12">
            <h2 className="text-4xl font-bold text-indigo-900 mb-2">徽章機創作說明</h2>
            <p className="text-gray-500 text-lg">Badge Maker Instructions / Hướng dẫn Máy làm Huy hiệu</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 px-4">
            {/* Option 1: Badge */}
            <button 
                onClick={() => { setMode('badge'); playSound('click'); }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-indigo-200"
            >
                <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    📛
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600">胸章</h3>
                <div className="text-sm font-bold text-gray-400 mb-4">Badge / Huy hiệu</div>
                <p className="text-gray-500 text-sm">
                    製作專屬於你的個性化胸章，別在背包上展現自我！
                </p>
            </button>

            {/* Option 2: Mirror */}
            <button 
                onClick={() => { setMode('mirror'); playSound('click'); }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-pink-200"
            >
                <div className="w-24 h-24 bg-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    🪞
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-600">鏡子</h3>
                <div className="text-sm font-bold text-gray-400 mb-4">Mirror / Gương</div>
                <p className="text-gray-500 text-sm">
                    隨身攜帶的小圓鏡，實用又可愛的日常小物。
                </p>
            </button>

            {/* Option 3: Magnet */}
            <button 
                onClick={() => { setMode('magnet'); playSound('click'); }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-amber-200"
            >
                <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    🧲
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-amber-600">冰箱貼</h3>
                <div className="text-sm font-bold text-gray-400 mb-4">Magnet / Nam châm tủ lạnh</div>
                <p className="text-gray-500 text-sm">
                    將喜歡的圖案吸在冰箱或白板上，隨時陪伴你。
                </p>
            </button>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center opacity-70">
           <p className="text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Powered By</p>
           <ResourceRoomLogo variant="default" />
        </div>
      </div>
    );
  }

  // --- WORKSHOP VIEW ---
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <button 
            onClick={() => { setMode('menu'); playSound('click'); }}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors"
        >
            ← 返回選單 (Back to Menu)
        </button>
      </div>

      <div className="text-center mb-8 bg-indigo-50 p-8 rounded-3xl border-2 border-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex justify-center items-center gap-4 mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
                    {mode === 'badge' ? '胸章製作' : mode === 'mirror' ? '鏡子製作' : '冰箱貼製作'}
                </h2>
                {/* GIF Placeholder: celebration.gif */}
                <img 
                    src="/celebration.gif" 
                    alt="Celebrate" 
                    className="h-16 w-16 object-contain"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">
                恭喜完成挑戰！開始製作吧！
            </h3>
            <p className="text-gray-500">Congratulations! Start Making Your {mode === 'badge' ? 'Badge' : mode === 'mirror' ? 'Mirror' : 'Magnet'}</p>
        </div>
      </div>

      {/* Tutorial Section - Now supports ALL modes */}
      {(mode === 'badge' || mode === 'mirror' || mode === 'magnet') && (
          <WorkshopTutorial mode={mode} onFinish={handleTutorialFinish} />
      )}
      
      {/* Padlet Gallery Section */}
      <div ref={galleryRef} className="mt-12 mb-20 animate-fade-in-up scroll-mt-20">
          <div className="text-center mb-8 relative">
              
              {/* CALL TO ACTION PROMPT */}
              {showUploadPrompt && (
                  <div className="absolute left-1/2 -top-16 -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-bounce z-20 whitespace-nowrap">
                      👇 現在，上傳你的作品吧！(Upload Now!)
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500 rotate-45"></div>
                  </div>
              )}

              <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold mb-4">Showcase</div>
              <h2 className="text-3xl font-bold text-indigo-900 mb-2">認識星朋友「成品星空牆」</h2>
              <p className="text-gray-500">Star Gallery / Bức tường ngôi sao</p>
              <p className="text-sm text-indigo-500 mt-4 bg-indigo-50 inline-block px-6 py-3 rounded-xl border border-indigo-100">
                  📷 請點擊牆上的 <span className="font-bold text-pink-500 text-xl inline-block transform translate-y-0.5 mx-1">+</span> 拍照上傳你的作品！
                  <br/><span className="text-xs opacity-70">(Click the + button to upload your photo!)</span>
              </p>
          </div>
          
          <div className="w-full h-[800px] bg-slate-100 rounded-3xl shadow-xl overflow-hidden border-4 border-indigo-100 relative">
              <iframe
                src="https://padlet.com/embed/uohll8oek3ky99pq"
                frameBorder="0"
                allow="camera;microphone;geolocation"
                style={{ width: '100%', height: '100%', display: 'block' }}
                title="Star Gallery"
              ></iframe>
          </div>
      </div>
      
      <div className="flex justify-center opacity-70 mt-8">
           <ResourceRoomLogo variant="small" />
      </div>
    </div>
  );
};
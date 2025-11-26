
import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';
import { ResourceRoomLogo } from './ResourceRoomLogo';

export const BadgeMaker: React.FC = () => {
  const [name, setName] = useState('My Name');
  const [color, setColor] = useState('#4F46E5');
  const [icon, setIcon] = useState('star');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  const colors = ['#4F46E5', '#DB2777', '#059669', '#D97706', '#2563EB'];
  const icons = ['star', 'heart', 'smile', 'sun', 'puzzle'];

  const handleDownload = () => {
    playSound('victory');
    alert("在真實環境中，這將下載您的徽章！ (In a real environment, this would download your badge!)");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string);
        playSound('click');
      };
      reader.readAsDataURL(file);
    }
  };

  const renderIcon = (type: string) => {
    if (customImage) {
        return <img src={customImage} alt="Custom Badge" className="w-24 h-24 object-contain drop-shadow-md" />;
    }

    switch(type) {
        case 'star': return <svg className="w-20 h-20" fill="white" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
        case 'heart': return <svg className="w-20 h-20" fill="white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
        case 'smile': return <svg className="w-20 h-20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
        case 'sun': return <svg className="w-20 h-20" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>;
        case 'puzzle': return <svg className="w-20 h-20" fill="white" viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>;
        default: return null;
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8 bg-indigo-50 p-8 rounded-3xl border-2 border-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex justify-center items-center gap-4 mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
                    恭喜你成功完成挑戰，出示本頁面
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
                製作你的「星心相印」徽章
            </h3>
            <p className="text-gray-500">Create Your "Star in My Heart" Badge</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
        
        {/* Badge Preview */}
        <div className="bg-white p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center relative">
          <div className="absolute top-0 left-0 w-full text-center -mt-6">
             <span className="bg-amber-400 text-amber-900 font-bold px-4 py-2 rounded-full text-sm">預覽 (PREVIEW)</span>
          </div>
          <div 
            ref={canvasRef}
            className="w-64 h-64 rounded-full shadow-inner flex flex-col items-center justify-center relative border-8 border-white ring-4 ring-gray-100 transition-colors duration-300 overflow-hidden"
            style={{ backgroundColor: color }}
          >
            {/* Badge Content */}
            <div className="mb-2 animate-bounce-slow relative z-10">
                {renderIcon(icon)}
            </div>
            <div className="text-white font-extrabold text-xl uppercase tracking-wider drop-shadow-md bg-black/20 px-4 py-1 rounded-lg backdrop-blur-sm relative z-10 max-w-[80%] truncate">
                {name || 'NAME'}
            </div>
            
            {/* Pin Back Visual */}
            <div className="absolute z-0 w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent top-0 left-0 pointer-events-none"></div>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm text-center max-w-xs">
            "放入金屬蓋 (A模)... 將下模向右推 (B模)..."
            <br/>(虛擬壓章機)
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-md space-y-8">
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">
                你的名字 <span className="text-sm font-normal text-gray-400">(Your Name)</span>
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={12}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-lg"
              placeholder="輸入名字..."
            />
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-bold">
                    步驟１：挑選喜歡的圖卡
                </label>
                <span className="text-sm font-normal text-gray-400">(Choose Symbol)</span>
             </div>
             
             <div className="flex flex-wrap gap-3 mb-4">
                {icons.map(i => (
                    <button
                        key={i}
                        onClick={() => { setIcon(i); setCustomImage(null); playSound('click'); }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all ${icon === i && !customImage ? 'bg-indigo-100 ring-2 ring-indigo-500 scale-110' : ''}`}
                    >
                        <div className="w-6 h-6 text-gray-600 fill-current">
                             <div className="scale-[0.3] origin-center transform -translate-x-[30%] -translate-y-[30%] text-gray-800">
                                 {/* Assuming renderIcon handles the SVG logic when not custom */}
                                 {i === 'star' && <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                                 {i === 'heart' && <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                                 {i === 'smile' && <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>}
                                 {i === 'sun' && <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>}
                                 {i === 'puzzle' && <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>}
                             </div>
                        </div>
                    </button>
                ))}
             </div>

             {/* Custom Image Upload */}
             <div className="mt-2">
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden" 
                />
                <Button 
                    variant={customImage ? 'primary' : 'outline'} 
                    size="sm" 
                    className="w-full border-dashed"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {customImage ? '更換圖片 (Change Image)' : '＋ 上傳自己的圖片 (Upload Custom)'}
                </Button>
                <p className="text-xs text-gray-400 mt-1 text-center">
                    支援 JPG, PNG (透明背景最佳)。Try uploading your "L9" file here!
                </p>
             </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
                徽章顏色 <span className="text-sm font-normal text-gray-400">(Color)</span>
            </label>
            <div className="flex gap-3">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => { setColor(c); playSound('click'); }}
                  className={`w-12 h-12 rounded-full shadow-sm transition-transform hover:scale-110 ${color === c ? 'ring-4 ring-offset-2 ring-gray-300 scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <Button onClick={handleDownload} size="lg" className="w-full shadow-xl">
            下載 / 列印徽章 (Download)
          </Button>

        </div>
      </div>

      <div className="mt-20 flex flex-col items-center justify-center opacity-70">
           <p className="text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Powered By</p>
           <ResourceRoomLogo variant="default" />
      </div>
    </div>
  );
};

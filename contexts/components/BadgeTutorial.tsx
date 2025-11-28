import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';

// Simple Canvas Confetti Implementation
const fireConfetti = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: any[] = [];
  const colors = ['#FCD34D', '#F87171', '#60A5FA', '#34D399', '#A78BFA'];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 5,
      life: Math.random() * 50 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      if (p.life > 0) {
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5; // Gravity
        p.life--;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (active) requestAnimationFrame(animate);
    else {
        canvas.style.display = 'none'; // Hide canvas when done
    }
  };

  canvas.style.display = 'block';
  animate();
};

const steps = [
  { 
    id: 1, 
    img: "/tutorial/1.jpg", 
    text: { 
      zh: "徽章機有分A邊跟B邊。", 
      en: "The badge machine is divided into Side A and Side B.", 
      vn: "Máy làm huy hiệu được chia thành Mặt A và Mặt B." 
    }
  },
  { 
    id: 2, 
    img: "/tutorial/2.jpg", 
    text: { 
      zh: "將鐵片有凹槽的面朝下放置到A邊。", 
      en: "Place the metal sheet with the groove facing down onto Side A.", 
      vn: "Đặt tấm kim loại với mặt có rãnh hướng xuống vào Mặt A." 
    }
  },
  { 
    id: 3, 
    img: "/tutorial/3.jpg", 
    text: { 
      zh: "放入徽章圖片。", 
      en: "Insert the badge image.", 
      vn: "Đặt hình ảnh huy hiệu vào." 
    }
  },
  { 
    id: 4, 
    img: "/tutorial/4.jpg", 
    text: { 
      zh: "放入透明片。", 
      en: "Insert the transparent film.", 
      vn: "Đặt tấm phim trong suốt vào." 
    }
  },
  { 
    id: 5, 
    img: "/tutorial/5.jpg", 
    text: { 
      zh: "輕輕向右推到底。", 
      en: "Gently push all the way to the right.", 
      vn: "Nhẹ nhàng đẩy sang phải cho đến khi chạm hết." 
    }
  },
  { 
    id: 6, 
    img: "/tutorial/6.jpg", 
    text: { 
      zh: "在B邊水平放置徽章針背板(注意:別針處朝下)。", 
      en: "Horizontally place the badge pin backing onto Side B (Note: the pin side faces down).", 
      vn: "Đặt tấm nền ghim huy hiệu nằm ngang vào Mặt B (Lưu ý: mặt ghim hướng xuống)." 
    }
  },
  { 
    id: 7, 
    img: "/tutorial/7.jpg", 
    text: { 
      zh: "向A邊按壓到底。", 
      en: "Press down completely onto Side A.", 
      vn: "Nhấn hoàn toàn xuống Mặt A." 
    }
  },
  { 
    id: 8, 
    img: "/tutorial/8.jpg", 
    text: { 
      zh: "向左輕推到底。", 
      en: "Gently push all the way to the left.", 
      vn: "Nhẹ nhàng đẩy sang trái cho đến khi chạm hết." 
    }
  },
  { 
    id: 9, 
    img: "/tutorial/9.jpg", 
    text: { 
      zh: "向B邊按壓到底。", 
      en: "Press down completely onto Side B.", 
      vn: "Nhấn hoàn toàn xuống Mặt B." 
    }
  },
  { 
    id: 10, 
    img: "/tutorial/10.jpg", 
    text: { 
      zh: "徽章製作好囉!", 
      en: "The badge is finished!", 
      vn: "Huy hiệu đã hoàn thành!" 
    }
  }
];

interface BadgeTutorialProps {
    onFinish?: () => void;
}

export const BadgeTutorial: React.FC<BadgeTutorialProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [lang, setLang] = useState<'zh' | 'en' | 'vn'>('zh');
  const { playSound } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
        playSound('click');
        setCurrentStep(currentStep + 1);
    } else {
        // Celebration logic
        playSound('victory');
        playSound('pop');
        if (canvasRef.current) fireConfetti(canvasRef.current);
        
        // Trigger parent callback (scroll)
        if (onFinish) {
            setTimeout(onFinish, 500); // Slight delay for visual effect
        }
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const currentData = steps[currentStep];

  return (
    <div className="relative">
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 pointer-events-none z-50" 
            style={{ display: 'none' }}
        />
        
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-indigo-50 overflow-hidden mb-12 animate-fade-in-up">
        {/* Header Bar */}
        <div className="bg-indigo-50 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
            <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    {currentData.id}
                </span>
                徽章製作教學 (Tutorial)
            </h2>
            </div>
            
            {/* Language Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-indigo-100">
            <button 
                onClick={() => { setLang('zh'); playSound('click'); }} 
                className={`px-3 py-1 text-sm rounded-md transition-colors font-bold ${lang === 'zh' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                中文
            </button>
            <button 
                onClick={() => { setLang('en'); playSound('click'); }} 
                className={`px-3 py-1 text-sm rounded-md transition-colors font-bold ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                English
            </button>
            <button 
                onClick={() => { setLang('vn'); playSound('click'); }} 
                className={`px-3 py-1 text-sm rounded-md transition-colors font-bold ${lang === 'vn' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                Tiếng Việt
            </button>
            </div>
        </div>

        <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Image Container */}
                <div className="w-full md:w-1/2 aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative group">
                    <img 
                    src={currentData.img} 
                    alt={`Step ${currentData.id}`} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'text-gray-400', 'p-4', 'text-center', 'text-sm');
                        if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerText = `Image not found.\nPlease ensure 'public/tutorial/${currentData.id}.jpg' exists.`;
                        }
                    }}
                    />
                </div>

                {/* Instruction & Controls */}
                <div className="w-full md:w-1/2 flex flex-col justify-between min-h-[250px]">
                    <div>
                    <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2">
                        Step {currentData.id} of {steps.length}
                    </div>
                    
                    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 min-h-[120px] flex items-center">
                        <p className={`text-xl md:text-2xl font-bold leading-relaxed w-full ${lang === 'vn' ? 'italic text-indigo-800' : 'text-slate-800'}`}>
                            {currentData.text[lang]}
                        </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200">
                        <strong>💡 小撇步 (Tip):</strong> 想像成做三明治！先把料(A模)做好，再把麵包蓋上去(B模)，壓一下就完成囉！
                    </div>
                    </div>

                    <div className="flex justify-between gap-4 mt-8">
                        <Button 
                        onClick={handlePrev} 
                        disabled={currentStep === 0}
                        variant="outline"
                        className="flex-1"
                        >
                        ← 上一步
                        </Button>
                        <Button 
                        onClick={handleNext} 
                        variant="primary"
                        className={`flex-1 shadow-md ${currentStep === steps.length - 1 ? 'bg-amber-500 hover:bg-amber-600 ring-amber-400' : ''}`}
                        >
                        {currentStep === steps.length - 1 ? '完成教學 🎉' : '下一步 (Next) →'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
            <div 
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
        </div>
        </div>
    </div>
  );
};
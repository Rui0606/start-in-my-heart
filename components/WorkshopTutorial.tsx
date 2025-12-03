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

// --- DATA DEFINITION ---

type TutorialType = 'badge' | 'mirror' | 'magnet';

interface TutorialStep {
  id: number;
  img: string;
  text: { zh: string; en: string; vn: string; id: string };
}

const TUTORIAL_DATA: Record<TutorialType, TutorialStep[]> = {
  badge: [
    { id: 1, img: "/tutorial/badge/a1.jpg", text: { zh: "徽章機有分A邊跟B邊。", en: "The badge machine is divided into Side A and Side B.", vn: "Máy làm huy hiệu được chia thành Mặt A và Mặt B.", id: "Mesin ini memiliki sisi A dan sisi B." } },
    { id: 2, img: "/tutorial/badge/a2.jpg", text: { zh: "將鐵片有凹槽的面朝下放置到A邊。", en: "Place the metal sheet with the groove facing down onto Side A.", vn: "Đặt tấm kim loại với mặt có rãnh hướng xuống vào Mặt A.", id: "Letakkan plat besi dengan sisi cekung menghadap ke bawah pada sisi A." } },
    { id: 3, img: "/tutorial/badge/a3.jpg", text: { zh: "放入徽章圖片。", en: "Insert the badge image.", vn: "Đặt hình ảnh huy hiệu vào.", id: "Masukkan gambar." } },
    { id: 4, img: "/tutorial/badge/a4.jpg", text: { zh: "放入透明片。", en: "Insert the transparent film.", vn: "Đặt tấm phim trong suốt vào.", id: "Lalu letakkan plastik bening di atasnya." } },
    { id: 5, img: "/tutorial/badge/a5.jpg", text: { zh: "輕輕向右推到底。", en: "Gently push all the way to the right.", vn: "Nhẹ nhàng đẩy sang phải cho đến khi chạm hết.", id: "Geser cetakan ke kanan secara perlahan sampai mentok." } },
    { id: 6, img: "/tutorial/badge/a6.jpg", text: { zh: "在B邊水平放置徽章針背板(注意:別針處朝下)。", en: "Horizontally place the badge pin backing onto Side B (Note: the pin side faces down).", vn: "Đặt tấm nền ghim huy hiệu nằm ngang vào Mặt B (Lưu ý: mặt ghim hướng xuống).", id: "Letakkan peniti secara horizontal di sisi B (sisi peniti menghadap ke bawah)." } },
    { id: 7, img: "/tutorial/badge/a7.jpg", text: { zh: "向A邊按壓到底。", en: "Press down completely onto Side A.", vn: "Nhấn hoàn toàn xuống Mặt A.", id: "Tekan tuas pada sisi A ke bawah sampai mentok." } },
    { id: 8, img: "/tutorial/badge/a8.jpg", text: { zh: "向左輕推到底。", en: "Gently push all the way to the left.", vn: "Nhẹ nhàng đẩy sang trái cho đến khi chạm hết.", id: "Geser ke kiri sampai mentok." } },
    { id: 9, img: "/tutorial/badge/a9.jpg", text: { zh: "向B邊按壓到底。", en: "Press down completely onto Side B.", vn: "Nhấn hoàn toàn xuống Mặt B.", id: "Lalu tekan tuas sisi B ke bawah sampai mentok." } },
    { id: 10, img: "/tutorial/badge/a10.jpg", text: { zh: "徽章製作好囉!", en: "The badge is finished!", vn: "Huy hiệu đã hoàn thành!", id: "Pin sudah jadi!" } },
  ],
  mirror: [
    { id: 1, img: "/tutorial/mirror/b1.jpg", text: { zh: "徽章機有分A邊跟B邊。", en: "The badge machine is divided into Side A and Side B.", vn: "Máy làm huy hiệu được chia thành Mặt A và Mặt B.", id: "Mesin ini memiliki sisi A dan sisi B." } },
    { id: 2, img: "/tutorial/mirror/b2.jpg", text: { zh: "將鐵片有凹槽的面朝下放置到A邊。", en: "Place the metal sheet with the groove facing down onto Side A.", vn: "Đặt tấm kim loại với mặt có rãnh hướng xuống vào Mặt A.", id: "Letakkan plat besi dengan sisi cekung menghadap ke bawah pada sisi A." } },
    { id: 3, img: "/tutorial/mirror/b3.gif", text: { zh: "先放入徽章圖片，再放入放入透明片。", en: "First insert the badge image, then insert the transparent film.", vn: "Đầu tiên đặt hình ảnh huy hiệu vào, sau đó đặt tấm phim trong suốt vào.", id: "Masukkan gambar, lalu letakkan plastik bening di atasnya." } },
    { id: 4, img: "/tutorial/mirror/b4.jpg", text: { zh: "輕輕向右推到底。", en: "Gently push all the way to the right.", vn: "Nhẹ nhàng đẩy sang phải cho đến khi chạm hết.", id: "Geser cetakan ke kanan secara perlahan sampai mentok." } },
    { id: 5, img: "/tutorial/mirror/b5.jpg", text: { zh: "在B邊放入鐵環墊片。", en: "Place the iron ring gasket onto Side B.", vn: "Đặt vòng đệm sắt vào Mặt B.", id: "Masukkan ring ganjal (washer) pada sisi B." } },
    { id: 6, img: "/tutorial/mirror/b6.jpg", text: { zh: "放入金屬鏡框，鋒利面朝上。", en: "Insert the metal mirror frame, sharp side facing up.", vn: "Đặt khung gương kim loại vào, mặt sắc nhọn hướng lên.", id: "Masukkan bingkai besi, sisi tajam menghadap ke atas." } },
    { id: 7, img: "/tutorial/mirror/b7.jpg", text: { zh: "放入鏡面(鏡面朝下)。", en: "Insert the mirror surface (mirror surface facing down).", vn: "Đặt mặt gương vào (mặt gương hướng xuống).", id: "Masukkan cermin (kaca menghadap ke bawah)." } },
    { id: 8, img: "/tutorial/mirror/b8.jpg", text: { zh: "向A邊壓到底。", en: "Press down completely onto Side A.", vn: "Nhấn hoàn toàn xuống Mặt A.", id: "Tekan tuas pada sisi A ke bawah sampai mentok." } },
    { id: 9, img: "/tutorial/mirror/b9.gif", text: { zh: "向左輕推到底，向B邊壓到底。", en: "Gently push all the way to the left, then press down completely onto Side B.", vn: "Nhẹ nhàng đẩy sang trái cho đến khi chạm hết, sau đó nhấn hoàn toàn xuống Mặt B.", id: "Geser ke kiri sampai mentok, lalu tekan tuas sisi B ke bawah sampai mentok." } },
    { id: 10, img: "/tutorial/mirror/b10.jpg", text: { zh: "鏡子就完成啦！", en: "The mirror is finished!", vn: "Gương đã hoàn thành!", id: "Cermin saku sudah jadi!" } },
  ],
  magnet: [
    { id: 1, img: "/tutorial/magnet/c1.jpg", text: { zh: "徽章機有分A邊跟B邊。", en: "The badge machine is divided into Side A and Side B.", vn: "Máy làm huy hiệu được chia thành Mặt A và Mặt B.", id: "Mesin ini memiliki sisi A dan sisi B." } },
    { id: 2, img: "/tutorial/magnet/c2.jpg", text: { zh: "將鐵片有凹槽的面朝下放置到A邊。", en: "Place the metal sheet with the groove facing down onto Side A.", vn: "Đặt tấm kim loại với mặt có rãnh hướng xuống vào Mặt A.", id: "Letakkan plat besi dengan sisi cekung menghadap ke bawah pada sisi A." } },
    { id: 3, img: "/tutorial/magnet/c3.gif", text: { zh: "先放入徽章圖片，再放入放入透明片。", en: "First insert the badge image, then insert the transparent film.", vn: "Đầu tiên đặt hình ảnh huy hiệu vào, sau đó đặt tấm phim trong suốt vào.", id: "Masukkan gambar, lalu letakkan plastik bening di atasnya." } },
    { id: 4, img: "/tutorial/magnet/c4.jpg", text: { zh: "輕輕向右推到底。", en: "Gently push all the way to the right.", vn: "Nhẹ nhàng đẩy sang phải cho đến khi chạm hết.", id: "Geser cetakan ke kanan secara perlahan sampai mentok." } },
    { id: 5, img: "/tutorial/magnet/c5.jpg", text: { zh: "在B邊放入鐵環墊片。", en: "Place the iron ring gasket onto Side B.", vn: "Đặt vòng đệm sắt vào Mặt B.", id: "Masukkan ring ganjal (washer) pada sisi B." } },
    { id: 6, img: "/tutorial/magnet/c6.jpg", text: { zh: "放入磁吸鐵片，(磁吸面朝下)。", en: "Insert the magnetic metal sheet (magnetic side facing down).", vn: "Đặt tấm kim loại từ tính vào (mặt từ tính hướng xuống).", id: "Masukkan plat magnet (sisi magnet menghadap ke bawah)." } },
    { id: 7, img: "/tutorial/magnet/c7.jpg", text: { zh: "向A邊壓到底。", en: "Press down completely onto Side A.", vn: "Nhấn hoàn toàn xuống Mặt A.", id: "Tekan tuas pada sisi A ke bawah sampai mentok." } },
    { id: 8, img: "/tutorial/magnet/c8.gif", text: { zh: "向左輕推到底，向B邊壓到底。", en: "Gently push all the way to the left, then press down completely onto Side B.", vn: "Nhẹ nhàng đẩy sang trái cho đến khi chạm hết, sau đó nhấn hoàn toàn xuống Mặt B.", id: "Geser ke kiri sampai mentok, lalu tekan tuas sisi B ke bawah sampai mentok." } },
    { id: 9, img: "/tutorial/magnet/c9.jpg", text: { zh: "冰箱貼就做好啦！", en: "The refrigerator magnet is finished!", vn: "Nam châm tủ lạnh đã hoàn thành!", id: "Tempelan kulkas sudah jadi!" } },
  ]
};

interface BadgeTutorialProps {
    mode?: TutorialType; // Made optional to support old usage, but defaults to 'badge'
    onFinish?: () => void;
}

export const BadgeTutorial: React.FC<BadgeTutorialProps> = ({ mode = 'badge', onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [lang, setLang] = useState<'zh' | 'en' | 'vn' | 'id'>('zh');
  const { playSound } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = TUTORIAL_DATA[mode];

  // Reset steps when mode changes
  useEffect(() => {
    setCurrentStep(0);
  }, [mode]);

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

  const getTitle = () => {
      switch(mode) {
          case 'badge': return "胸章製作教學 (Badge Tutorial)";
          case 'mirror': return "鏡子製作教學 (Mirror Tutorial)";
          case 'magnet': return "冰箱貼製作教學 (Magnet Tutorial)";
          default: return "製作教學 (Tutorial)";
      }
  };

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
                {getTitle()}
            </h2>
            </div>
            
            {/* Language Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-indigo-100 flex-wrap gap-1">
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
                EN
            </button>
            <button 
                onClick={() => { setLang('vn'); playSound('click'); }} 
                className={`px-3 py-1 text-sm rounded-md transition-colors font-bold ${lang === 'vn' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                VN
            </button>
            <button 
                onClick={() => { setLang('id'); playSound('click'); }} 
                className={`px-3 py-1 text-sm rounded-md transition-colors font-bold ${lang === 'id' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                Bahasa
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
                            e.currentTarget.parentElement.innerText = `Image not found.\nCheck: ${currentData.img}`;
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
                        <p className={`text-xl md:text-2xl font-bold leading-relaxed w-full ${lang === 'vn' || lang === 'id' ? 'italic text-indigo-800' : 'text-slate-800'}`}>
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
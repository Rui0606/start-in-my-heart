
import React, { useState, useEffect } from 'react';
import { GOOGLE_FORM_URL } from '../constants';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';

interface SurveyViewProps {
  onComplete: () => void;
}

export const SurveyView: React.FC<SurveyViewProps> = ({ onComplete }) => {
  const [canClaim, setCanClaim] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { playSound } = useSound();

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && canClaim === false && timer) {
       // This logic handles the transition if needed, but mainly controlled by handleClick
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSurveyClick = () => {
    playSound('click');
    // Start countdown of 5 seconds
    setCountdown(5);
    setTimeout(() => {
        setCanClaim(true);
        playSound('pass'); // Sound cue that it's unlocked
    }, 5000);
  };

  return (
    <div className="max-w-3xl mx-auto text-center py-12 bg-white rounded-3xl shadow-xl p-8">
      <div className="mb-6 text-6xl">📋</div>
      <h2 className="text-3xl font-bold text-indigo-900 mb-4">
        回饋問卷
        <div className="text-lg font-normal text-gray-500 mt-1">Feedback Survey / Khảo sát ý kiến</div>
      </h2>
      
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        恭喜你通過測驗！請填寫簡短的回饋問卷，<br/>
        完成後回來領取你的專屬徽章。
      </p>
      
      <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm mb-8 inline-block border border-yellow-200">
         💡 <strong>小提醒：</strong>請填寫完後，回到這個分頁領取獎勵喔！<br/>
         (Please keep this tab open to claim your reward after survey)
      </div>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <a 
          href={GOOGLE_FORM_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
          onClick={handleSurveyClick}
        >
          <Button size="lg" className="w-full shadow-lg bg-indigo-600 hover:bg-indigo-700">
            前往填寫問卷 (Go to Survey) ↗
          </Button>
        </a>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">完成後 (After finishing)</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="relative">
            <Button 
            onClick={onComplete} 
            size="lg" 
            variant="secondary"
            disabled={!canClaim}
            className={`w-full transition-all duration-500 ${canClaim ? 'opacity-100 animate-pulse bg-amber-400 hover:bg-amber-500 text-amber-900' : 'opacity-50 bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
            >
            {countdown > 0 ? `請稍等... (${countdown})` : '我已完成 😊，領取星星碎片！'}
            </Button>
            
            {!canClaim && countdown === 0 && (
                <p className="text-xs text-red-400 mt-2">
                    🔒 請先點擊上方按鈕填寫問卷，才能解鎖獎勵。
                </p>
            )}
        </div>

        <p className="text-sm text-gray-500 mt-2">
            依照 WORKSHOP 步驟，完成個人專屬作品 🌟🎨。
        </p>

        {/* Rescue Link for users who are stuck or already filled it out */}
        <div className="mt-8 pt-8 border-t border-gray-100">
            <button 
                onClick={() => { playSound('click'); onComplete(); }}
                className="text-xs text-gray-300 hover:text-gray-500 underline transition-colors"
            >
                如果您已填寫過問卷，或無法返回，請點此直接進入 (Skip/Rescue Link)
            </button>
        </div>
      </div>
    </div>
  );
};

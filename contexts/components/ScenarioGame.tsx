
import React, { useState } from 'react';
import { SCENARIOS } from '../constants';
import { Button } from './Button';
import { TextDisplay } from './TextDisplay';
import { useSound } from '../contexts/SoundContext';

interface ScenarioGameProps {
  onComplete: () => void;
}

export const ScenarioGame: React.FC<ScenarioGameProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playSound } = useSound();

  const currentScenario = SCENARIOS[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOptionIndex !== null) return; 
    setSelectedOptionIndex(index);
    
    if (currentScenario.options[index].isCorrect) {
        setScore(prev => prev + 1);
        playSound('correct');
    } else {
        playSound('wrong');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
    }
  };

  React.useEffect(() => {
    if (isCompleted) {
        if (score === SCENARIOS.length) {
            playSound('pass');
        } else {
            playSound('wrong');
        }
    }
  }, [isCompleted, score, playSound]);

  const handleRetry = () => {
    playSound('click');
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const isPerfect = score === SCENARIOS.length;

    return (
      <div className="text-center py-12 bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-6 text-6xl">
             {isPerfect ? '🤝' : '💬'}
        </div>
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">
             {isPerfect ? "溝通技巧升級！" : "練習未完成"}
        </h2>
        <p className="text-gray-500 mb-6">
            {isPerfect ? "Communication Skills Upgraded!" : "Practice Not Complete"}
        </p>
        
        <div className={`p-6 rounded-2xl inline-block mb-8 ${isPerfect ? 'bg-indigo-50' : 'bg-red-50'}`}>
            <div className="text-lg text-gray-600 mb-2">你的得分 / Your Score</div>
            <div className={`text-5xl font-black ${isPerfect ? 'text-indigo-600' : 'text-red-500'}`}>
                {score} / {SCENARIOS.length}
            </div>
        </div>

        {!isPerfect && (
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                請確保你選擇了對自閉症朋友最友善的回應，請再試一次！
                <br/>
                <span className="text-sm">Please ensure you choose the most supportive response. Try again!</span>
            </p>
        )}

        <div>
             {isPerfect ? (
                <Button onClick={onComplete} size="lg" variant="primary">
                進行最終測驗 (Final Quiz) &rarr;
                </Button>
             ) : (
                <Button onClick={handleRetry} size="lg" variant="outline">
                重新練習 (Retry) ↺
                </Button>
             )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-end justify-between mb-6 px-2">
        <div>
            <h2 className="text-2xl font-bold text-indigo-900">情境練習：你會怎麼做？</h2>
            <p className="text-gray-500 text-sm">Practice: What Would You Do?</p>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-400 font-bold">得分 / Score</div>
            <div className="text-2xl font-black text-indigo-600">{score}</div>
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-full min-h-[550px]">
        {/* Left: Context */}
        <div className="bg-indigo-600 p-8 text-white md:w-2/5 flex flex-col justify-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg width="100%" height="100%">
               <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1" fill="white" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#dots)" />
             </svg>
           </div>
           <div className="mb-4 opacity-80 uppercase tracking-widest font-bold text-xs">
             Scenario {currentIndex + 1}/{SCENARIOS.length}
           </div>
           <h3 className="text-xl font-bold text-indigo-100 mb-4 border-b border-indigo-400 pb-2">
                <TextDisplay content={currentScenario.title} className="text-white" size="lg" />
           </h3>
           <div className="text-indigo-50">
             <TextDisplay content={currentScenario.description} className="text-indigo-50" />
           </div>
        </div>

        {/* Right: Options */}
        <div className="p-8 md:w-3/5 flex flex-col overflow-y-auto">
          <p className="text-gray-500 font-bold mb-4 text-sm uppercase">請選擇最佳回應 / Choose response:</p>
          <div className="space-y-3 flex-grow">
            {currentScenario.options.map((option, idx) => {
              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative ";
              
              if (selectedOptionIndex === null) {
                buttonClass += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer";
              } else {
                if (idx === selectedOptionIndex) {
                   if (option.isCorrect) {
                     buttonClass += "border-green-500 bg-green-50";
                   } else {
                     buttonClass += "border-red-500 bg-red-50";
                   }
                } else if (option.isCorrect && selectedOptionIndex !== null) {
                   buttonClass += "border-green-500 bg-green-50 opacity-60";
                } else {
                   buttonClass += "border-gray-100 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOptionIndex !== null}
                  className={buttonClass}
                >
                  <TextDisplay content={option.text} size="sm" />
                  
                  {selectedOptionIndex === idx && (
                    <div className={`mt-3 pt-3 border-t ${option.isCorrect ? 'border-green-200 text-green-700' : 'border-red-200 text-red-600'}`}>
                      <div className="font-bold text-sm mb-1">{option.isCorrect ? "✅ 正確 (Correct)!" : "❌ 再試一次 (Try again)"}</div> 
                      <TextDisplay content={option.feedback} size="sm" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {selectedOptionIndex !== null && (
            <div className="mt-6 pt-4 border-t border-gray-100">
               <Button onClick={handleNext} className="w-full shadow-none">
                 {currentIndex === SCENARIOS.length - 1 ? '查看結果 (See Results)' : '下一題 (Next)'}
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

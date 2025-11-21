
import React, { useState } from 'react';
import { MYTHS } from '../constants';
import { Button } from './Button';
import { TextDisplay } from './TextDisplay';

interface MythGameProps {
  onComplete: () => void;
}

export const MythGame: React.FC<MythGameProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentMyth = MYTHS[currentIndex];

  const handleGuess = (guessTrue: boolean) => {
    if (revealed) return;
    if (guessTrue === currentMyth.isTrue) {
      setScore(prev => prev + 1);
    }
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < MYTHS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
        <div className="mb-6 text-6xl">🕵️‍♀️</div>
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            <div className="text-4xl mb-2">迷思破解完成！</div>
            <div className="text-xl font-normal text-gray-500">Myth Busting Complete!</div>
        </h2>
        
        <div className="bg-indigo-50 p-6 rounded-2xl inline-block mb-8">
            <div className="text-lg text-gray-600 mb-2">你的得分 / Your Score</div>
            <div className="text-5xl font-black text-indigo-600">{score} / {MYTHS.length}</div>
        </div>

        <div>
            <Button onClick={onComplete} size="lg" variant="primary">
            繼續練習 (Continue) &rarr;
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-end mb-4 px-2">
         <div>
             <h2 className="text-2xl font-bold text-indigo-900">迷思還是事實？</h2>
             <p className="text-gray-500 text-sm">Fact or Myth?</p>
         </div>
         <div className="text-right">
            <div className="text-sm text-gray-400 font-bold">得分 / Score</div>
            <div className="text-2xl font-black text-indigo-600">{score}</div>
         </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-indigo-100">
        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center items-center">
          <div className="bg-indigo-50 text-indigo-800 font-bold px-4 py-1 rounded-full mb-6 text-sm tracking-wide uppercase">
            Q {currentIndex + 1} / {MYTHS.length}
          </div>
          
          <div className="w-full mb-8">
            <TextDisplay content={currentMyth.statement} align="center" size="lg" />
          </div>

          {!revealed ? (
            <div className="flex gap-4 w-full max-w-md justify-center">
              <button
                onClick={() => handleGuess(true)}
                className="flex-1 py-4 rounded-xl border-2 border-green-500 text-green-600 font-bold text-lg hover:bg-green-50 transition-colors flex flex-col items-center"
              >
                <span>事實</span>
                <span className="text-xs font-normal">True</span>
              </button>
              <button
                onClick={() => handleGuess(false)}
                className="flex-1 py-4 rounded-xl border-2 border-red-500 text-red-600 font-bold text-lg hover:bg-red-50 transition-colors flex flex-col items-center"
              >
                <span>迷思</span>
                <span className="text-xs font-normal">Myth</span>
              </button>
            </div>
          ) : (
            <div className="animate-fade-in w-full">
              <div className={`mb-6 text-xl font-bold text-center ${currentMyth.isTrue ? 'text-green-600' : 'text-red-500'}`}>
                {currentMyth.isTrue ? (
                    <div>
                        <div>正確！這是事實。</div>
                        <div className="text-sm font-normal opacity-75">Correct! It is True.</div>
                    </div>
                ) : (
                    <div>
                        <div>這是迷思！</div>
                        <div className="text-sm font-normal opacity-75">It's a Myth!</div>
                    </div>
                )}
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl text-left mb-8 border-l-4 border-indigo-500">
                <TextDisplay content={currentMyth.explanation} />
              </div>
              <Button onClick={handleNext} className="w-full">
                {currentIndex === MYTHS.length - 1 ? '完成 (Finish)' : '下一題 (Next)'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

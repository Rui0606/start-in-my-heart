import React from 'react';
import { AppStage } from '../types';

interface ProgressBarProps {
  currentStage: AppStage;
  setStage: (stage: AppStage) => void;
}

const STAGES = [
  { id: AppStage.INTRO, label: 'Learn' },
  { id: AppStage.MYTHS, label: 'Myths' },
  { id: AppStage.SCENARIOS, label: 'Practice' },
  { id: AppStage.QUIZ, label: 'Quiz' },
  { id: AppStage.BADGE_MAKER, label: 'Badge' },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage, setStage }) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="flex justify-between items-center relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full" />
        
        {/* Active Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 -z-10 transition-all duration-500 ease-out rounded-full" 
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        />

        {STAGES.map((stage, index) => {
          const isActive = stage.id === currentStage;
          const isCompleted = index < currentIndex;
          const isAccessible = isCompleted || index === currentIndex;

          return (
            <button
              key={stage.id}
              onClick={() => isAccessible ? setStage(stage.id) : null}
              disabled={!isAccessible}
              className={`flex flex-col items-center group focus:outline-none ${!isAccessible ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300
                ${isActive ? 'bg-white border-indigo-600 scale-110 shadow-md' : ''}
                ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
              `}>
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  <span className={`font-bold text-sm ${isActive ? 'text-indigo-600' : ''}`}>{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-semibold transition-colors duration-300 ${isActive || isCompleted ? 'text-indigo-700' : 'text-gray-400'}`}>
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

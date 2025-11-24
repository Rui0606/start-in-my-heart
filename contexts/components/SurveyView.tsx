
import React from 'react';
import { GOOGLE_FORM_URL } from '../constants';
import { Button } from './Button';

interface SurveyViewProps {
  onComplete: () => void;
}

export const SurveyView: React.FC<SurveyViewProps> = ({ onComplete }) => {
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
      <p className="text-sm text-gray-400 mb-8 italic">
        Congratulations! Please fill out the feedback form. <br/>
        Return here to claim your badge after completion.
      </p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <a 
          href={GOOGLE_FORM_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
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

        <Button 
          onClick={onComplete} 
          size="lg" 
          variant="secondary"
          className="w-full animate-pulse"
        >
          我已完成，領取徽章 (Claim Badge)
        </Button>
      </div>
    </div>
  );
};

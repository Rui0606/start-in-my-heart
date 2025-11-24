
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { Button } from './Button';
import { TextDisplay } from './TextDisplay';
import { useSound } from '../contexts/SoundContext';

interface QuizViewProps {
  onPass: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onPass }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(QUIZ_QUESTIONS.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const { playSound } = useSound();

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    playSound('click');
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      if (ans === QUIZ_QUESTIONS[idx].correctIndex) correct++;
    });
    return Math.round((correct / QUIZ_QUESTIONS.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const passed = score === 100;
    
    setSubmitted(true);
    
    if (passed) {
        playSound('victory');
    } else {
        playSound('wrong');
    }
  };

  const score = submitted ? calculateScore() : 0;
  const passed = score === 100;

  if (submitted && passed) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl shadow-xl p-8 animate-bounce-in">
        <div className="mb-6 text-6xl">🏆</div>
        <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">恭喜！</h2>
        <p className="text-xl text-indigo-700 mb-4">Congratulations!</p>
        
        <div className="text-5xl font-black text-amber-500 mb-4">{score}%</div>
        
        <p className="text-lg text-gray-600 mb-2">
          你已經證明了你對自閉症譜系障礙的了解。
        </p>
        <p className="text-sm text-gray-400 mb-8">
          You passed the quiz with a perfect score! Next, please fill out a short survey.
        </p>
        
        <Button onClick={onPass} size="lg" variant="secondary" className="animate-pulse">
          下一步：填寫回饋問卷 (Next: Survey) &rarr;
        </Button>
      </div>
    );
  }

  if (submitted && !passed) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-6 text-6xl">📝</div>
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">再接再厲！</h2>
        <p className="text-lg text-indigo-700 mb-4">Keep Trying!</p>
        
        <div className="text-5xl font-black text-gray-400 mb-4">{score}%</div>
        
        <p className="text-lg text-gray-600 mb-2">
            你需要 100% 的分數才能解鎖徽章。
        </p>
        <p className="text-sm text-gray-400 mb-8">
           Review the characteristics and try again to get a perfect score.
        </p>

        <Button onClick={() => { playSound('click'); setSubmitted(false); setAnswers(new Array(QUIZ_QUESTIONS.length).fill(-1)); }} variant="outline">
          重試 (Retry) ↺
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-indigo-900 text-white p-8 rounded-t-3xl text-center">
         <h2 className="text-3xl font-bold mb-2">認證測驗</h2>
         <div className="text-indigo-200">Certification Quiz</div>
         <p className="opacity-80 mt-4 text-sm bg-indigo-800 inline-block px-3 py-1 rounded-full">
            得分 100% 即可解鎖獎勵！ (Score 100% to unlock reward)
         </p>
      </div>
      
      <div className="bg-white p-8 rounded-b-3xl shadow-xl">
        <div className="space-y-10">
          {QUIZ_QUESTIONS.map((q, qIdx) => (
            <div key={q.id} className="pb-8 border-b border-gray-100 last:border-0">
              <div className="mb-4 flex items-start gap-3">
                  <span className="bg-indigo-100 text-indigo-800 font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
                      {qIdx + 1}
                  </span>
                  <div className="flex-grow">
                    <TextDisplay content={q.question} size="lg" />
                  </div>
              </div>
              
              <div className="space-y-3 pl-11">
                {q.options.map((opt, oIdx) => (
                  <label 
                    key={oIdx}
                    className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      answers[qIdx] === oIdx 
                        ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={`q-${q.id}`} 
                      className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      checked={answers[qIdx] === oIdx}
                      onChange={() => handleAnswer(qIdx, oIdx)}
                    />
                    <div className="ml-3 w-full">
                        <TextDisplay content={opt} size="sm" />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4">
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={answers.includes(-1)}
          >
            提交答案 (Submit)
          </Button>
          {answers.includes(-1) && <p className="text-center text-sm text-red-400 mt-2">請回答所有問題 (Please answer all questions)</p>}
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { AppStage } from './types';
import { ProgressBar } from './components/ProgressBar';
import { MythGame } from './components/MythGame';
import { ScenarioGame } from './components/ScenarioGame';
import { QuizView } from './components/QuizView';
import { BadgeMaker } from './components/BadgeMaker';
import { Button } from './components/Button';
import { AiTutor } from './components/AiTutor';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [showAiTutor, setShowAiTutor] = useState(false);

  const advanceStage = (nextStage: AppStage) => {
    setStage(nextStage);
  };

  const IntroView = () => (
    <div className="max-w-4xl mx-auto text-center">
        <div className="mb-10 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-indigo-900 mb-2 tracking-tight">
                星心相印
            </h1>
            <div className="text-2xl text-indigo-600 font-bold mb-1">Stars in My Heart</div>
            <div className="text-xl text-indigo-400 font-medium italic mb-6">Những ngôi sao trong trái tim tôi</div>
            
            <p className="text-xl text-slate-600 font-bold bg-indigo-50 inline-block px-6 py-2 rounded-full">
                認識自閉症譜系障礙
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow text-left border border-indigo-50">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">🤔</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">什麼是自閉症？</h3>
                <div className="text-sm text-slate-500 font-bold mb-4">What is Autism? / Tự kỷ là gì?</div>
                
                <div className="space-y-2">
                    <p className="text-slate-700 text-lg font-medium leading-relaxed">
                        因神經心理功能異常，在溝通、社會互動、行為及興趣表現上有顯著困難。
                    </p>
                    <p className="text-slate-500 text-sm">
                        Significant difficulties in communication, interaction, and behavior due to neuropsychological differences.
                    </p>
                     <p className="text-slate-400 text-sm italic">
                        Những khó khăn đáng kể trong giao tiếp, tương tác và hành vi do sự khác biệt về tâm lý thần kinh.
                    </p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow text-left border border-indigo-50">
                <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">❤️</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">特質與行為</h3>
                <div className="text-sm text-slate-500 font-bold mb-4">Traits / Đặc điểm</div>

                <div className="space-y-2">
                    <p className="text-slate-700 text-lg font-medium leading-relaxed">
                        可能會有侷限的興趣（如恐龍、數學）並依賴固定流程。他們想要朋友，但表達方式不同。
                    </p>
                    <p className="text-slate-500 text-sm">
                        May have restricted interests and rely on routines. They want friends but express it differently.
                    </p>
                     <p className="text-slate-400 text-sm italic">
                        Có thể có những sở thích hạn chế và dựa vào thói quen. Họ muốn có bạn bè nhưng thể hiện điều đó khác đi.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl mb-12 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">加入「星星徽章」挑戰！</h3>
                <p className="text-indigo-200 text-lg mb-6">
                    學習知識、破解迷思，並通過測驗 (90%+) 來製作你的專屬徽章。
                </p>
                <Button onClick={() => advanceStage(AppStage.MYTHS)} size="lg" variant="secondary">
                    開始旅程 (Start) &rarr;
                </Button>
            </div>
            
            {/* Decorative stars */}
            <div className="absolute top-4 left-4 text-indigo-800 opacity-50 text-6xl">★</div>
            <div className="absolute bottom-4 right-10 text-indigo-800 opacity-50 text-8xl">★</div>
        </div>

        <p className="text-xs text-gray-400">
            資料來源：CRPD、身心障礙及資賦優異學生鑑定辦法。
        </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStage(AppStage.INTRO)}>
                <span className="text-2xl">🌟</span>
                <span className="font-bold text-indigo-900 text-lg hidden sm:block">星心相印 (Stars in My Heart)</span>
            </div>
            <div className="flex items-center gap-4">
                 <button 
                    onClick={() => setShowAiTutor(!showAiTutor)}
                    className="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
                 >
                    {showAiTutor ? '關閉 (Close)' : 'AI 導師 (AI Tutor)'}
                 </button>
            </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8 relative">
        {/* Main Content */}
        <div className={`transition-all duration-300 ${showAiTutor ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <ProgressBar currentStage={stage} setStage={setStage} />

            <div className="mt-8">
                {stage === AppStage.INTRO && <IntroView />}
                {stage === AppStage.MYTHS && <MythGame onComplete={() => advanceStage(AppStage.SCENARIOS)} />}
                {stage === AppStage.SCENARIOS && <ScenarioGame onComplete={() => advanceStage(AppStage.QUIZ)} />}
                {stage === AppStage.QUIZ && <QuizView onPass={() => advanceStage(AppStage.BADGE_MAKER)} />}
                {stage === AppStage.BADGE_MAKER && <BadgeMaker />}
            </div>
        </div>

        {/* AI Tutor Overlay */}
        {showAiTutor && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-0">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowAiTutor(false)}></div>
                <div className="relative w-full max-w-2xl z-50 animate-fade-in-up">
                    <AiTutor />
                    <button 
                        onClick={() => setShowAiTutor(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>
            </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Autism Awareness Education.</p>
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes bounce {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(5%); }
        }
      `}</style>
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { askGeminiTutor } from '../services/geminiService';
import { Button } from './Button';

export const AiTutor: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const result = await askGeminiTutor(question);
      setAnswer(result);
    } catch (err) {
      setError("Failed to get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-indigo-50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🤖</span>
        </div>
        <h2 className="text-2xl font-bold text-indigo-900">詢問 AI 導師</h2>
        <p className="text-gray-500 text-sm mb-2">Ask the AI Tutor</p>
        <p className="text-gray-500 mt-2">
          對內容有疑問嗎？在這裡提問！
          <br/><span className="text-xs text-gray-400">(Requires API_KEY)</span>
        </p>
      </div>

      <form onSubmit={handleAsk} className="mb-6">
        <div className="relative">
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="例如：自閉症會遺傳嗎？ (e.g., Is autism hereditary?)"
                className="w-full p-4 pr-32 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
            <div className="absolute right-2 top-2 bottom-2">
                <Button type="submit" size="sm" isLoading={loading} disabled={!question.trim()}>
                    提問 / Ask
                </Button>
            </div>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-4 text-center">
            {error}
        </div>
      )}

      {answer && (
        <div className="bg-indigo-50 rounded-2xl p-6 animate-fade-in">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">AI Answer:</h3>
            <p className="text-indigo-900 leading-relaxed whitespace-pre-line">
                {answer}
            </p>
        </div>
      )}
    </div>
  );
};

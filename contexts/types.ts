
export enum AppStage {
  INTRO = 'INTRO',
  MYTHS = 'MYTHS',
  SCENARIOS = 'SCENARIOS',
  QUIZ = 'QUIZ',
  SURVEY = 'SURVEY',
  BADGE_MAKER = 'BADGE_MAKER',
  AI_TUTOR = 'AI_TUTOR'
}

export interface TrilingualContent {
  zh: string;
  en: string;
  vi: string;
}

export interface Myth {
  id: number;
  statement: TrilingualContent;
  isTrue: boolean;
  explanation: TrilingualContent;
}

export interface Scenario {
  id: number;
  title: TrilingualContent;
  description: TrilingualContent;
  options: {
    text: TrilingualContent;
    isCorrect: boolean;
    feedback: TrilingualContent;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: TrilingualContent;
  options: TrilingualContent[];
  correctIndex: number;
}

export interface BadgeConfig {
  color: string;
  icon: string;
  text: string;
  pattern: string;
}
export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItemData {
  value: string;
  numericPart: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface BentoCardData {
  id: string;
  title?: string;
  description: string;
  icon?: string;
  tag?: string;
  image?: string;
  className?: string;
}

export interface TrainingProgram {
  id: string;
  number: string;
  title: string;
  visual: string;
  focus: string;
  difficulty: 'Beginner' | 'Beginner to intermediate' | 'Beginner to advanced' | 'Intermediate';
  duration: string;
  description: string;
  details: string[];
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  unit?: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  sets: number;
  reps: string;
  targetWeight: string;
  completed: boolean;
}

export interface MemberStory {
  id: string;
  quote: string;
  name: string;
  role: string;
  program: string;
  weeksTraining: number;
  highlight: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  tag: string;
  url: string;
  aspect: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

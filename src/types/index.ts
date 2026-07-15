// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions for Dheeraj Kumar Portfolio
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  availability: string;
  englishLevel: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  date: string;
  highlights: string[];
  category: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badge?: string;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'work' | 'achievement';
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  details?: string[];
  grade?: string;
}

export interface Strength {
  label: string;
  icon: string;
  desc: string;
}

export interface HomeCard {
  title: string;
  icon: string;
  desc: string;
  link: string;
}

export interface ProfileData {
  hero: HeroConfig;
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  timeline: TimelineItem[];
  strengths: Strength[];
  homeCards: HomeCard[];
}

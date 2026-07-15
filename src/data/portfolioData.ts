// ─────────────────────────────────────────────────────────────────────────────
// Portfolio Data — Dheeraj Kumar
// ─────────────────────────────────────────────────────────────────────────────

import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  hero: {
    name: 'Dheeraj Kumar',
    title: 'AI Trainer & Frontend Developer',
    subtitle: 'MCA Graduate · RLHF Specialist · React JS Developer',
    tagline: 'Bridging human intelligence with machine learning — crafting high-quality training data and building elegant web interfaces.',
    email: 'dheerajkumar7135227@gmail.com',
    phone: '+91 9801657880',
    linkedin: 'https://linkedin.com/in/dheerajkumar45',
    github: 'https://github.com/Dheerajkumar129',
    location: 'Jalandhar, Punjab, India',
    availability: 'Open to Opportunities',
    englishLevel: 'C1 Advanced',
  },

  homeCards: [
    { title: 'Projects', icon: '🚀', desc: 'ML systems, web apps, and more', link: '/projects' },
    { title: 'Skills', icon: '⚡', desc: 'AI, Python, React & beyond', link: '/skills' },
    { title: 'Timeline', icon: '📅', desc: 'My education & experience', link: '/timeline' },
    { title: 'Certifications', icon: '🏆', desc: 'Verified credentials', link: '/certifications' },
    { title: 'Contact', icon: '📨', desc: 'Let\'s collaborate', link: '/contact' },
  ],

  projects: [
    {
      id: 'isl',
      title: 'Indian Sign Language Recognition System',
      description:
        'A real-time hand gesture detection and classification system that recognizes ISL alphabet signs, builds words/sentences with auto-correction, and converts text to speech.',
      tech: ['Python', 'CNN', 'ANN', 'RNN', 'SVM', 'LSTM', 'Mediapipe', 'cvzone', 'pyttsx3', 'Tkinter'],
      date: 'May 2025',
      category: 'AI / ML',
      highlights: [
        'Real-time hand gesture detection using CNN and Mediapipe',
        'Classifies ISL alphabet signs with a pre-trained CNN model',
        'Builds words/sentences with auto-correction suggestions',
        'Converts recognized text to speech using pyttsx3',
        'User-friendly Tkinter GUI for accessibility',
      ],
    },
    {
      id: 'inventory',
      title: 'Inventory Management System',
      description:
        'A full CRUD desktop application with robust input validation, error handling, and a responsive Tkinter interface backed by SQLite.',
      tech: ['Python', 'Tkinter', 'SQLite'],
      date: 'Oct 2024',
      category: 'Desktop App',
      highlights: [
        'Full CRUD operations with robust input validation',
        'Responsive interface using Tkinter: labels, entries, buttons, Treeview',
        'SQLite database backend for persistent data storage',
        'Error handling and user feedback mechanisms',
      ],
    },
    {
      id: 'payroll',
      title: 'Employee & Payroll Management System',
      description:
        'A C++ system to manage employee data, calculate salaries, generate pay reports, and maintain HR records efficiently.',
      tech: ['C++'],
      date: 'Aug 2024',
      category: 'Systems',
      highlights: [
        'Manages employee data with add/update/delete operations',
        'Salary calculation engine with configurable components',
        'Generates detailed payroll reports',
        'Clean OOP design with proper encapsulation',
      ],
    },
    {
      id: 'vva',
      title: 'Virtual Voice Assistant',
      description:
        'A Python voice assistant with voice recognition and NLP for hands-free query answering, web browsing, and Wikipedia lookups.',
      tech: ['Python', 'pyttsx3', 'speech_recognition', 'wikipedia', 'webbrowser', 'os'],
      date: 'Apr 2023',
      category: 'AI / NLP',
      highlights: [
        'Voice recognition using speech_recognition library',
        'Text-to-speech output with pyttsx3',
        'Wikipedia integration for knowledge queries',
        'Web browser control and OS-level commands',
        'Hands-free operation with high accuracy',
      ],
    },
    {
      id: 'hospital',
      title: 'Hospital Management System',
      description:
        'A web-based hospital management system with user authentication, patient records, appointment booking, and doctor management.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      date: 'May 2022',
      category: 'Web App',
      highlights: [
        'User authentication and role-based access control',
        'Patient record management and appointment scheduling',
        'Responsive design with Bootstrap framework',
        'Clean and intuitive UI for healthcare staff',
      ],
    },
  ],

  skills: [
    {
      category: 'AI & Data Annotation',
      icon: '🤖',
      skills: [
        'RLHF (Reinforcement Learning from Human Feedback)',
        'Data Annotation',
        'Content Quality Evaluation',
        'LLM Output Review',
        'Prompt Engineering',
        'Fact-Checking',
      ],
    },
    {
      category: 'Programming Languages',
      icon: '💻',
      skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'C', 'C++', 'Java', 'HTML5', 'CSS3', 'SQL', 'R', 'MySQL'],
    },
    {
      category: 'Frameworks & Libraries',
      icon: '⚛️',
      skills: ['React JS', 'Machine Learning Basics', 'Data Structures & Algorithms', 'Responsive Web Design', 'CNN', 'SVM', 'LSTM'],
    },
    {
      category: 'Tools & Platforms',
      icon: '🛠️',
      skills: ['Git', 'GitHub', 'Tableau', 'Excel', 'Linux', 'Tkinter', 'SQLite', 'Mediapipe', 'Vite'],
    },
    {
      category: 'Writing & Communication',
      icon: '✍️',
      skills: [
        'Technical Writing',
        'Instructional Content',
        'Style Guide Adherence',
        'C1 Advanced English',
        'Academic Writing',
      ],
    },
    {
      category: 'Soft Skills',
      icon: '🌟',
      skills: ['Attention to Detail', 'Adaptability', 'Time Management', 'Leadership', 'Collaboration', 'Independent Work'],
    },
  ],

  strengths: [
    { label: 'AI Training', icon: '🤖', desc: 'RLHF & LLM output evaluation expert' },
    { label: 'React Developer', icon: '⚛️', desc: 'Building responsive web UIs' },
    { label: 'Data Annotation', icon: '🏷️', desc: 'High-quality annotation at scale' },
    { label: 'Python', icon: '🐍', desc: 'ML, automation, and backend scripts' },
    { label: 'Technical Writing', icon: '✍️', desc: 'Clear, fact-checked content' },
    { label: 'C1 English', icon: '🌐', desc: 'Advanced English proficiency' },
  ],

  certifications: [
    {
      title: 'Python for Data Science, AI & Development',
      issuer: 'Coursera (IBM)',
      date: 'Sep 2024',
    },
    {
      title: 'Object Oriented Programming Specialization (C++)',
      issuer: 'Coursera',
      date: 'Jul 2024',
    },
    {
      title: 'CPP & Data Structures Bootcamp',
      issuer: 'CipherSchools',
      date: 'Aug 2024',
    },
    {
      title: 'Software Development Certificate',
      issuer: 'Simplilearn (SkillUp)',
      date: 'Jan 2024',
    },
    {
      title: 'Hack Quest Participation',
      issuer: 'upGrad Campus',
      date: 'Mar 2024',
    },
    {
      title: 'C Programming Certificate',
      issuer: 'Google Developers Launchpad',
      date: 'Aug 2021',
    },
  ],

  timeline: [
    {
      id: 'alignerr',
      type: 'work',
      title: 'AI Trainer / Data Annotator',
      organization: 'Alignerr',
      period: 'Sep 2025 – Mar 2026',
      description: 'Contributed to AI alignment projects by annotating and evaluating model-generated content across text, reasoning, and instruction-following tasks.',
      details: [
        'Annotated and evaluated AI-generated content for alignment quality',
        'Produced structured, high-quality written content following strict editorial guidelines',
        'Maintained consistency across large volumes of annotation tasks',
        'Flagged edge cases to improve annotation guidelines and dataset integrity',
      ],
    },
    {
      id: 'outlier',
      type: 'work',
      title: 'AI Trainer / RLHF Contributor & Data Annotator',
      organization: 'Outlier.ai',
      period: 'Dec 2024 – Jun 2025',
      description: 'Performed RLHF tasks including ranking, rating, and rewriting AI-generated responses to improve model accuracy and output quality.',
      details: [
        'Performed RLHF: ranking, rating, and rewriting AI responses',
        'Crafted original, fact-checked responses contributing to LLM training datasets',
        'Evaluated AI outputs for coherence, accuracy, tone, and safety',
        'Worked across creative writing, technical explanations, and coding evaluations',
      ],
    },
    {
      id: 'deloitte',
      type: 'work',
      title: 'Data Analytics Job Simulation',
      organization: 'Deloitte Australia (via Forage)',
      period: 'Jul 2025',
      description: 'Completed a professional consulting simulation involving data analysis and forensic technology.',
      details: [
        'Built interactive Tableau dashboard for stakeholder reporting',
        'Applied Excel for data classification and generating business insights',
        'Completed forensic data analysis in a consulting environment',
      ],
    },
    {
      id: 'mca',
      type: 'education',
      title: 'Master of Computer Applications (MCA)',
      organization: 'Lovely Professional University',
      location: 'Jalandhar, Punjab',
      period: 'Aug 2023 – Jul 2025',
      description: 'Specialized in AI, machine learning, web development, and advanced programming.',
      grade: 'CGPA: 7.4',
    },
    {
      id: 'bca',
      type: 'education',
      title: 'Bachelor of Computer Applications (BCA)',
      organization: 'Aryabhatta Knowledge University',
      location: 'Patna, Bihar',
      period: 'Aug 2020 – Jun 2023',
      description: 'Foundational computing, programming, mathematics, and software engineering.',
      grade: 'CGPA: 8.57',
    },
    {
      id: 'article',
      type: 'achievement',
      title: 'Published Article – "Self-Reliance"',
      organization: 'Swavlamban College Journal',
      period: 'Sep 2021',
      description: 'Selected through a competitive review process for outstanding writing, research, and creativity. Demonstrated meaningful academic and creative contributions to the college community.',
    },
    {
      id: 'intermediate',
      type: 'education',
      title: 'Intermediate (Mathematics)',
      organization: 'S.P.Y. Inter College',
      location: 'Gaya, Bihar',
      period: 'Apr 2018 – Mar 2020',
      description: 'Mathematics stream with focus on analytical and logical reasoning.',
      grade: '71%',
    },
  ],
};

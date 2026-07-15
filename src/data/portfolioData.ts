import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  hero: {
    badge: 'AI Alignment & Frontend Developer',
    titleName: 'Dheeraj Kumar',
    headline: 'Refining LLM Coherence & Building Immersive Interfaces',
    subtext: 'Detail-oriented MCA graduate with 1+ year of professional experience in AI data annotation, RLHF (Reinforcement Learning from Human Feedback), and LLM response validation. Passionate about prompt engineering, AI alignment, and crafting beautiful responsive React user interfaces.',
    trustRow: [
      'RLHF & Alignment',
      'React JS',
      'Python',
      'Prompt Engineering',
      'C1 English Proficiency'
    ]
  },

  projects: [
    {
      id: 'isl-recognition-system',
      title: 'Indian Sign Language Recognition System',
      description: 'Engineered a real-time hand gesture detection and classification system for accessibility. Implemented deep learning (CNN, LSTM) for ISL alphabet sign translation, complete with word construction, auto-correction suggestions, and text-to-speech feedback.',
      technologies: ['Python', 'CNN', 'LSTM', 'Mediapipe', 'cvzone', 'pyttsx3', 'Tkinter'],
      metrics: [
        { label: 'Gesture Accuracy', value: '94%' },
        { label: 'Latency Rate', value: '30fps' }
      ],
      githubUrl: 'https://github.com/Dheerajkumar129',
      status: 'Deployed',
      featured: true,
      priority: { general: 1 }
    },
    {
      id: 'inventory-management',
      title: 'Desktop Inventory Management System',
      description: 'Developed a full CRUD desktop inventory tracking application. Features a responsive Tkinter layout with custom search filter components, input validations, error-handling diagnostics, and a persistent SQLite database engine.',
      technologies: ['Python', 'Tkinter', 'SQLite'],
      metrics: [
        { label: 'Query Latency', value: '<5ms' }
      ],
      githubUrl: 'https://github.com/Dheerajkumar129',
      status: 'Deployed',
      featured: false,
      priority: { general: 2 }
    },
    {
      id: 'payroll-management',
      title: 'Employee & Payroll Management System',
      description: 'Implemented a robust C++ payroll calculations application. Manages employee database records, automated salary component calculations (allowances, tax deductions), and generates clean audit reports.',
      technologies: ['C++', 'Object-Oriented Programming'],
      metrics: [],
      githubUrl: 'https://github.com/Dheerajkumar129',
      status: 'Deployed',
      featured: false,
      priority: { general: 3 }
    },
    {
      id: 'voice-assistant',
      title: 'Virtual Voice Assistant',
      description: 'Developed a voice assistant with speech recognition and NLP capabilities for hands-free operations. Configured integrations with web search services, Wikipedia queries, and local OS commands.',
      technologies: ['Python', 'pyttsx3', 'Speech Recognition', 'NLP'],
      metrics: [],
      githubUrl: 'https://github.com/Dheerajkumar129',
      status: 'Deployed',
      featured: false,
      priority: { general: 4 }
    },
    {
      id: 'hospital-portal',
      title: 'Web-Based Hospital Management System',
      description: 'Created a responsive web portal prototype with patient registration logs, secure appointment booking flows, medical catalogue views, and Bootstrap grid styling layouts.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      metrics: [],
      githubUrl: 'https://github.com/Dheerajkumar129',
      status: 'Deployed',
      featured: false,
      priority: { general: 5 }
    }
  ],

  skills: [
    {
      title: 'AI & Data Annotation',
      skills: [
        { name: 'RLHF Training', level: 'Expert' },
        { name: 'Data Annotation', level: 'Expert' },
        { name: 'LLM Output Review', level: 'Expert' },
        { name: 'Prompt Engineering', level: 'Expert' },
        { name: 'Fact-Checking', level: 'Expert' }
      ],
      priority: { general: 1 }
    },
    {
      title: 'Languages & Web Core',
      skills: [
        { name: 'Python', level: 'Expert' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'SQL', level: 'Advanced' },
        { name: 'C++', level: 'Advanced' }
      ],
      priority: { general: 2 }
    },
    {
      title: 'Frameworks & Technologies',
      skills: [
        { name: 'React JS', level: 'Advanced' },
        { name: 'TailwindCSS', level: 'Advanced' },
        { name: 'Vite', level: 'Advanced' },
        { name: 'CNN / LSTM Basics', level: 'Intermediate' }
      ],
      priority: { general: 3 }
    },
    {
      title: 'Tools & Utilities',
      skills: [
        { name: 'Git & GitHub', level: 'Expert' },
        { name: 'Tableau', level: 'Advanced' },
        { name: 'Excel / Sheets', level: 'Expert' },
        { name: 'SQLite', level: 'Advanced' }
      ],
      priority: { general: 4 }
    },
    {
      title: 'Professional Communication',
      skills: [
        { name: 'Technical Writing', level: 'Expert' },
        { name: 'Style Guide Adherence', level: 'Expert' },
        { name: 'Instructional Content', level: 'Expert' },
        { name: 'C1 Advanced English', level: 'Expert' }
      ],
      priority: { general: 5 }
    }
  ],

  certifications: [
    {
      id: 'ibm-python-ds-ai',
      title: 'Python for Data Science, AI & Development',
      issuer: 'Coursera (IBM)',
      date: 'Sep 2024',
      featured: true,
      priority: { general: 1 }
    },
    {
      id: 'cpp-oop',
      title: 'Object Oriented Programming Specialization (C++)',
      issuer: 'Coursera',
      date: 'Jul 2024',
      featured: true,
      priority: { general: 2 }
    },
    {
      id: 'cipherschools-cpp-dsa',
      title: 'CPP & Data Structures Bootcamp',
      issuer: 'CipherSchools',
      date: 'Aug 2024',
      featured: false,
      priority: { general: 3 }
    },
    {
      id: 'simplilearn-software-dev',
      title: 'Software Development Certificate',
      issuer: 'Simplilearn (SkillUp)',
      date: 'Jan 2024',
      featured: false,
      priority: { general: 4 }
    },
    {
      id: 'upgrad-hack-quest',
      title: 'Hack Quest Participation',
      issuer: 'upGrad Campus',
      date: 'Mar 2024',
      featured: false,
      priority: { general: 5 }
    },
    {
      id: 'google-c-prog',
      title: 'C Programming Certificate',
      issuer: 'Google Developers Launchpad',
      date: 'Aug 2021',
      featured: false,
      priority: { general: 6 }
    }
  ],

  journey: [
    {
      id: 'alignerr-trainer',
      era: 'Professional Practice',
      title: 'AI Trainer / Data Annotator',
      subtitle: 'Alignerr · Remote Contract',
      period: 'Sep 2025 – Mar 2026',
      description: 'Contributed to advanced AI alignment tasks, ranking and evaluating model-generated outputs. Produced high-quality prompts and logical proofs adhering to editorial guidelines to train LLM models.',
      emphasis: { 'AI Alignment': true, 'Quality Assurance': true }
    },
    {
      id: 'outlier-rlhf',
      era: 'Professional Practice',
      title: 'AI Trainer & RLHF Contributor',
      subtitle: 'Outlier.ai · Remote Contract',
      period: 'Dec 2024 – Jun 2025',
      description: 'Evaluated LLMs on factuality, coherence, and safety standards. Authored reference responses, evaluated reasoning steps, and provided detailed critique summaries to guide model adjustments.',
      emphasis: { 'RLHF': true, 'Coherence Review': true }
    },
    {
      id: 'deloitte-simulation',
      era: 'Experiential Training',
      title: 'Data Analytics Simulation participant',
      subtitle: 'Deloitte Australia (via Forage)',
      period: 'Jul 2025',
      description: 'Completed data cleansing, modeling, and client presentation simulations. Built an interactive Tableau dashboard visualizing key business metrics.',
      emphasis: { 'Data Visualization': true, 'Analytics Reporting': true }
    },
    {
      id: 'lpu-mca',
      era: 'Postgraduate Education',
      title: 'Master of Computer Applications (MCA)',
      subtitle: 'Lovely Professional University',
      period: 'Aug 2023 – Jul 2025',
      description: 'Focused on advanced database systems, machine learning basics, responsive web development, and algorithms. Graduated with a CGPA of 7.4.',
      emphasis: { 'MCA degree': true, 'LPU': true }
    },
    {
      id: 'aku-bca',
      era: 'Undergraduate Education',
      title: 'Bachelor of Computer Applications (BCA)',
      subtitle: 'Aryabhatta Knowledge University',
      period: 'Aug 2020 – Jun 2023',
      description: 'Acquired foundational skills in C, C++, Java, DBMS, and web markup. Graduated with a CGPA of 8.57.',
      emphasis: { 'BCA degree': true, 'AKU': true }
    }
  ],

  blogs: [],

  homeCards: [
    {
      id: 'ai-assistant',
      badge: 'Addy Twin',
      title: 'RAG AI Digital Twin',
      subtitle: 'Interactive Grounded Chatbot',
      description: 'Chat with "Addy", an AI digital twin grounded on Dheeraj\'s resume CV knowledge base. Ask about project architectures, tech skills, and availability.',
      buttonText: 'Initialize Agent',
      extra: ['Powered by client-side semantic index', 'Zero server dependencies']
    },
    {
      id: 'availability',
      badge: 'Status: Active',
      title: 'Professional Contracts',
      subtitle: 'Open for Engagements',
      description: 'Available for prompt engineering, RLHF annotations, frontend development contract roles, and remote technical tasks.',
      buttonText: 'Discuss Projects',
      extra: ['Advanced English (C1)', 'Flexible remote hours']
    },
    {
      id: 'featured-stack',
      badge: 'Capabilities',
      title: 'Primary Core Stack',
      subtitle: 'AI Tools & Web Techs',
      description: 'Skilled in building responsive glassmorphic React interfaces, programming in Python for data utilities, and structuring annotations.',
      buttonText: 'View Grid',
      extra: ['React JS', 'Python & C++', 'SQL & SQLite']
    },
    {
      id: 'quick-connect',
      badge: 'Outreach Channel',
      title: 'Get in Touch Directly',
      subtitle: 'Fast Response Times',
      description: 'Reach out directly for freelance contracts, recruitment inquiries, or pair-programming collaborations.',
      buttonText: 'Contact gateway',
      extra: ['dheerajkumar7135227@gmail.com', '+91 9801657880']
    }
  ],

  coordinates: {
    email: 'dheerajkumar7135227@gmail.com',
    linkedin: 'https://linkedin.com/in/dheerajkumar45',
    github: 'https://github.com/Dheerajkumar129',
    location: 'Jalandhar, Punjab, India',
    hours: 'Flexible / Remote'
  },

  strengths: [
    {
      id: 'rlhf',
      title: 'RLHF & Annotation',
      desc: 'Expert in checking LLM logic, instruction following, and output validation.',
      signal: 'Expertise',
      icon: 'Cpu'
    },
    {
      id: 'react-dev',
      title: 'React Front-End',
      desc: 'Building responsive, animated web layouts using React, TailwindCSS, and motion.',
      signal: 'Framework',
      icon: 'Layers'
    },
    {
      id: 'python-dev',
      title: 'Python Scripting',
      desc: 'Familiar with data processing tools, machine learning pipelines, and automations.',
      signal: 'Programming',
      icon: 'Database'
    }
  ],

  philosophy: 'I believe in bridging human intelligence and machine learning—crafting high-quality annotation data and clean, responsive UI layouts.'
};

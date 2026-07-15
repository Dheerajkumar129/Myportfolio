import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Search, 
  Calendar 
} from 'lucide-react';
import type { Certification } from '../types';
import SEO from '../components/SEO';

interface CertificationsProps {
  certifications?: Certification[];
  isDark: boolean;
}

// Brand SVGs for verified credentials
const GoogleCloudLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 20.73L3.82 16v-9.5l8.22-4.73 8.22 4.73V16l-8.22 4.73z" fill="#F4B400" opacity="0.15" />
    <path d="M12.04 2.23L3.82 6.97v9.49l8.22 4.75 8.22-4.75V6.97l-8.22-4.74zm0 2.87l5.72 3.3v6.61l-5.72 3.3-5.72-3.3V8.4l5.72-3.3z" fill="#4285F4" />
    <path d="M12.04 5.1L6.32 8.4v6.61l5.72 3.3V5.1z" fill="#34A853" />
    <path d="M12.04 11.7l5.72-3.3v6.61l-5.72 3.3v-6.61z" fill="#EA4335" />
  </svg>
);

const CourseraLogo = ({ className = "w-5.5 h-5.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="#0056B3"/>
    <path d="M14.5 15.5a3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 1 3.5-3.5h1v-2h-1a5.5 5.5 0 0 0-5.5 5.5 5.5 5.5 0 0 0 5.5 5.5h1v-2h-1z" fill="#FFFFFF"/>
  </svg>
);

const getIssuerTheme = (issuer: string) => {
  const norm = (issuer || '').toLowerCase();
  
  if (norm.includes('google') || norm.includes('gcp') || norm.includes('cloud')) {
    return {
      glow: 'hover:shadow-[0_0_35px_-5px_rgba(66,133,244,0.18)]',
      borderHover: 'hover:border-[#4285F4]/40 dark:hover:border-[#4285F4]/55',
      logoBtn: (
        <div className="w-12 h-12 rounded-2xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4] transition-all duration-300">
          <GoogleCloudLogo />
        </div>
      ),
      accentColor: '#4285F4'
    };
  }
  
  if (norm.includes('coursera')) {
    return {
      glow: 'hover:shadow-[0_0_35px_-5px_rgba(0,86,179,0.18)]',
      borderHover: 'hover:border-[#0056B3]/40 dark:hover:border-[#0056B3]/55',
      logoBtn: (
        <div className="w-12 h-12 rounded-2xl bg-[#0056B3]/10 border border-[#0056B3]/25 flex items-center justify-center text-[#0056B3] transition-all duration-300">
          <CourseraLogo />
        </div>
      ),
      accentColor: '#0056B3'
    };
  }
  
  return {
    glow: 'hover:shadow-[0_0_35px_-5px_rgba(0,122,255,0.18)]',
    borderHover: 'hover:border-[#007AFF]/40 dark:hover:border-[#007AFF]/55',
    logoBtn: (
      <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center text-[#007AFF] transition-all duration-300">
        <Award className="w-5 h-5" />
      </div>
    ),
    accentColor: '#007AFF'
  };
};

export default function Certifications({ certifications = [], isDark }: CertificationsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort certifications by title or issuer
  const filteredCerts = certifications.filter(c => {
    const titleMatch = (c.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const issuerMatch = (c.issuer || '').toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || issuerMatch;
  });

  const certsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://Dheerajkumar129.github.io/Myportfolio/certifications/#webpage",
        "url": "https://Dheerajkumar129.github.io/Myportfolio/certifications",
        "name": "Verified Professional Credentials | Dheeraj Kumar",
        "description": "Directory of machine learning, programming, and web development credentials verified by IBM, Google, and Coursera."
      }
    ]
  };

  return (
    <div className={`min-h-screen py-28 px-6 md:px-12 transition-colors duration-1000 ${
      isDark ? 'bg-[#050505] text-white' : 'bg-slate-50 text-neutral-900'
    }`}>
      <SEO 
        title="Professional Certifications & Accreditations | Dheeraj Kumar"
        description="Verified professional accreditations, software programming courses, and machine learning credentials completed by Dheeraj Kumar."
        keywords="IBM Python, OOP C++, DSA Bootcamp, Google C Programming, Coursera, Professional Credentials"
        canonicalUrl="https://Dheerajkumar129.github.io/Myportfolio/certifications"
        schema={certsSchema}
      />
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Page Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#007AFF] block mb-2">
              Credentials
            </span>
            <h1 className="text-4xl font-bold font-sans tracking-tight mb-4">
              Certifications &amp; Accreditations
            </h1>
            <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Industry-validated credentials proving competence in python scripting, software development, data science, and object-oriented C++ architectures.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10 w-full max-w-md">
          <div className={`relative flex items-center rounded-full border transition-all duration-300 ${
            isDark 
              ? 'bg-neutral-900/60 border-white/10 focus-within:border-white/20 focus-within:shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
              : 'bg-white border-neutral-200 focus-within:border-neutral-300'
          }`}>
            <Search className="absolute left-4 w-4.5 h-4.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title or issuer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Certifications Cards Grid */}
        {filteredCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => {
              const theme = getIssuerTheme(cert.issuer);
              const fallbackId = `fallback-badge-${cert.id}`;
              
              return (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`p-6 rounded-[28px] border relative overflow-hidden transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    isDark
                      ? 'bg-neutral-900/40 border-white/5'
                      : 'bg-white border-neutral-200/60'
                  } ${theme.glow} ${theme.borderHover}`}
                >
                  {/* Subtle brand glow on hover */}
                  <div 
                    className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-transparent to-transparent group-hover:from-current group-hover:to-transparent opacity-[0.03] transition-all duration-500 pointer-events-none" 
                    style={{ color: theme.accentColor }} 
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      {cert.badgeUrl ? (
                        <>
                          <img 
                            src={cert.badgeUrl} 
                            alt="Badge" 
                            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = document.getElementById(fallbackId);
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div id={fallbackId} style={{ display: 'none' }}>
                            {theme.logoBtn}
                          </div>
                        </>
                      ) : (
                        theme.logoBtn
                      )}

                      {cert.featured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-semibold font-sans tracking-tight mb-1 group-hover:text-[#007AFF] transition-colors">
                      {cert.title}
                    </h3>
                    <span className={`text-xs block font-medium mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {cert.issuer}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800/10 relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-[#007AFF]" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed rounded-[32px] border-neutral-800">
            <span className="block text-slate-500 text-xs font-mono mb-2">No credentials found matching your search.</span>
          </div>
        )}

      </div>
    </div>
  );
}

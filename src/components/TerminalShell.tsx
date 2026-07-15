import React, { useState, useEffect, useRef } from 'react';
import type { Project, SkillCategory } from '../types';

interface TerminalShellProps {
  projects: Project[];
  skills: SkillCategory[];
}

interface CommandLog {
  type: 'input' | 'output';
  text: string;
  isHtml?: boolean;
}

export default function TerminalShell({ projects, skills }: TerminalShellProps) {
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [theme, setTheme] = useState<'green' | 'amber'>('green');
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const asciiLogo = `
██████╗ ██╗  ██╗███████╗███████╗██████╗  █████╗      ██╗██╗  ██╗
██╔══██╗██║  ██║██╔════╝██╔════╝██╔══██╗██╔══██╗     ██║██║  ██║
██║  ██║███████║█████╗  █████╗  ██████╔╝███████║     ██║███████║
██║  ██║██╔══██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║██   ██║██╔══██║
██████╔╝██║  ██║███████╗███████╗██║  ██║██║  ██║╚█████╔╝██║  ██║
╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝
  SYSTEM BIND: DHEERAJ KUMAR v2.0.8-LTS
  ENTER COMMAND: 'help' FOR LIST OF EXECUTABLES
  `;

  // Initialize terminal MOTD
  useEffect(() => {
    setHistory([
      { type: 'output', text: asciiLogo },
      { type: 'output', text: "Ready. Enter system command below:" }
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim();
    if (command === '') return;

    const newLogs: CommandLog[] = [
      ...history,
      { type: 'input', text: `dheeraj_kernel@guest:~$ ${command}` }
    ];

    const lowerCmd = command.toLowerCase();

    if (lowerCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lowerCmd === 'help') {
      newLogs.push({
        type: 'output',
        text: `Available executables in bin/:\n` +
          `  * **motd**      - Print the system Welcome Header.\n` +
          `  * **about**     - Print Dheeraj's biography profile.\n` +
          `  * **skills**    - Print ASCII skills proficiency bars.\n` +
          `  * **projects**  - List verified projects catalog.\n` +
          `  * **contact**   - Show coordinates and contact info.\n` +
          `  * **theme**     - Toggle terminal color theme (green/amber).\n` +
          `  * **clear**     - Clear stdout scroll buffers.`
      });
    } else if (lowerCmd === 'motd') {
      newLogs.push({ type: 'output', text: asciiLogo });
    } else if (lowerCmd === 'about') {
      newLogs.push({
        type: 'output',
        text: `### profile_summary.json\n` +
          `{\n` +
          `  "name": "Dheeraj Kumar",\n` +
          `  "role": "AI Trainer & Frontend Developer",\n` +
          `  "education": "Master of Computer Applications (MCA) @ LPU",\n` +
          `  "core_competency": "RLHF instruction following, LLM fact-checking, React UI modules, Python automation",\n` +
          `  "english_level": "C1 Advanced Proficiency (Certified)"\n` +
          `}`
      });
    } else if (lowerCmd === 'skills') {
      let skillsAscii = `### SYSTEM PROFICIENCY CHART\n`;
      skills.forEach(cat => {
        skillsAscii += `\n[${cat.title.toUpperCase()}]\n`;
        cat.skills.forEach(s => {
          const levelVal = s.level.toLowerCase().includes('expert') ? 95 : s.level.toLowerCase().includes('advanced') ? 85 : 70;
          const barLength = Math.round(levelVal / 5);
          const bar = '='.repeat(barLength) + ' '.repeat(20 - barLength);
          skillsAscii += `  ${s.name.padEnd(16)} [${bar}] ${levelVal}%\n`;
        });
      });
      newLogs.push({ type: 'output', text: skillsAscii });
    } else if (lowerCmd === 'projects') {
      let projList = `### BINARY PROJECTS CATALOG\n`;
      projects.forEach(p => {
        projList += `\n* **${p.title}** [${p.status}]\n` +
          `  Tech: ${p.technologies.join(', ')}\n` +
          `  Source: ${p.githubUrl}\n`;
      });
      newLogs.push({ type: 'output', text: projList });
    } else if (lowerCmd === 'contact') {
      newLogs.push({
        type: 'output',
        text: `### outreach_coordinates.sh\n` +
          `EMAIL="dheerajkumar7135227@gmail.com"\n` +
          `LINKEDIN="linkedin.com/in/dheerajkumar45"\n` +
          `GITHUB="github.com/Dheerajkumar129"\n` +
          `PHONE="+91 9801657880"\n` +
          `LOCATION="Jalandhar, Punjab, India"`
      });
    } else if (lowerCmd === 'theme') {
      const nextTheme = theme === 'green' ? 'amber' : 'green';
      setTheme(nextTheme);
      newLogs.push({ type: 'output', text: `Terminal palette shifted to: ${nextTheme.toUpperCase()}` });
    } else {
      newLogs.push({
        type: 'output',
        text: `sh: command not found: ${command}. Type 'help' for support list.`
      });
    }

    setHistory(newLogs);
    setInputVal('');
  };

  const themeTextClass = theme === 'green' ? 'text-emerald-400' : 'text-amber-500';
  const themeBorderClass = theme === 'green' ? 'border-emerald-500/20' : 'border-amber-500/20';
  const themeBgClass = theme === 'green' ? 'bg-emerald-500/5' : 'bg-amber-500/5';

  return (
    <div 
      onClick={focusInput}
      className={`crt-screen rounded-2xl p-5 font-mono text-xs md:text-sm text-left h-[380px] flex flex-col justify-between border cursor-text select-text ${themeTextClass} ${themeBorderClass} ${themeBgClass}`}
    >
      {/* Top Console bar */}
      <div className={`flex items-center justify-between pb-3 border-b mb-3 ${themeBorderClass} shrink-0 opacity-80 select-none`}>
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${theme === 'green' ? 'bg-emerald-500/30' : 'bg-amber-500/30'}`} />
          <span className="font-bold tracking-wider">SYSTEM SHELL (dheeraj_kernel.sh)</span>
        </div>
        <span className="text-[10px] opacity-60">Session: GUEST // PORT: 5173</span>
      </div>

      {/* Stdout Log scroll */}
      <div className="flex-grow overflow-y-auto mb-3 space-y-2 pr-2 custom-scrollbar">
        {history.map((log, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text">
            {log.type === 'input' ? (
              <span className="opacity-75">{log.text}</span>
            ) : (
              // Basic markdown formatter inside terminal shell
              <span>
                {log.text.split('\n').map((line, lIdx) => {
                  if (line.trim().startsWith('* ')) {
                    return (
                      <span key={lIdx} className="block pl-3 text-[#38bdf8] dark:text-cyan-400">
                        {line}
                      </span>
                    );
                  }
                  return <span key={lIdx} className="block">{line}</span>;
                })}
              </span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input prompt line */}
      <form onSubmit={handleCommand} className="flex items-center gap-1.5 shrink-0 select-none">
        <span className="opacity-80">dheeraj_kernel@guest:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className={`flex-grow bg-transparent border-none outline-none font-mono text-xs md:text-sm p-0 focus:ring-0 ${themeTextClass}`}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck="false"
        />
        <span className={`terminal-cursor ${theme === 'amber' ? 'terminal-cursor-amber' : ''}`} />
      </form>
    </div>
  );
}

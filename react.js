import React, { useState, useRef, useEffect } from 'react';

const CommandPrompt = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const commands = {
    home: {
      description: 'Return to home page',
      execute: () => {
        return 'Welcome to the Developer Command Prompt!\nType "help" to see available commands.';
      }
    },
    help: {
      description: 'Show available commands',
      execute: () => {
        return Object.entries(commands)
          .map(([cmd, info]) => `${cmd}: ${info.description}`)
          .join('\n');
      }
    },
    projects: {
      description: 'List developer projects',
      execute: () => {
        return `Current Projects:
1. Command Prompt Website
2. E-commerce Platform
3. Mobile Game Development
4. AI Chat Application`;
      }
    },
    discord: {
      description: 'Get Discord server link',
      execute: () => {
        return 'Join our Discord server: https://discord.gg/devteam';
      }
    },
    devs: {
      description: 'View developer profiles',
      execute: (args) => {
        const profiles = {
          john: 'John Doe - Lead Developer\nExpertise: Full-stack development\nYears of experience: 8',
          jane: 'Jane Smith - UI/UX Designer\nExpertise: Frontend development\nYears of experience: 5',
          mike: 'Mike Johnson - Backend Developer\nExpertise: System architecture\nYears of experience: 6'
        };

        if (args.length === 0) {
          return 'Available profiles: ' + Object.keys(profiles).join(', ') + '\nUse "devs <name>" to view specific profile';
        }

        const profile = profiles[args[0].toLowerCase()];
        return profile || 'Profile not found. Use "devs" to see available profiles.';
      }
    },
    clear: {
      description: 'Clear the terminal',
      execute: () => {
        setCommandHistory([]);
        return '';
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1);

    if (command === '') return;

    const output = commands[command]
      ? commands[command].execute(commandArgs)
      : `Command not found: ${command}. Type "help" for available commands.`;

    setCommandHistory(prev => [...prev, { input: cmd, output }]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div 
        ref={containerRef}
        className="overflow-y-auto max-h-[calc(100vh-2rem)]"
      >
        {commandHistory.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex">
              <span className="text-blue-400">{currentPath}</span>
              <span className="text-white mx-2">$</span>
              <span>{entry.input}</span>
            </div>
            <div className="whitespace-pre-line">{entry.output}</div>
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-blue-400">{currentPath}</span>
          <span className="text-white mx-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none border-none text-green-500"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default CommandPrompt;
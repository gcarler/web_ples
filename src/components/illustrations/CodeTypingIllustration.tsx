
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define styles for syntax highlighting to be used in JSX
const SyntaxHighlight = ({ children, type }: { children: React.ReactNode, type: 'keyword' | 'function' | 'string' | 'comment' | 'number' | 'default' }) => {
    const colorMap = {
        keyword: 'text-[#C586C0]', // Magenta for keywords like import, from, const
        function: 'text-[#DCDCAA]', // Yellow for function names
        string: 'text-[#CE9178]', // Orange for strings
        comment: 'text-[#6A9955]', // Green for comments
        number: 'text-[#B5CEA8]', // Light green/blue for numbers
        default: 'text-foreground/90',
    };
    return <span className={cn(colorMap[type])}>{children}</span>;
};

// Data structure for code snippets with color highlighting
const codeSnippets = [
  {
    lang: 'Python',
    color: 'text-[#3776AB]', // Blue
    code: [
      { type: 'keyword', content: 'import ' }, { type: 'default', content: 'tensorflow ' }, { type: 'keyword', content: 'as ' }, { type: 'default', content: 'tf\n\n' },
      { type: 'comment', content: '# Define a simple sequential model\n' },
      { type: 'default', content: 'model = tf.keras.Sequential([\n' },
      { type: 'default', content: '    tf.keras.layers.Dense(' }, { type: 'number', content: '128' }, { type: 'default', content: ', activation=' }, { type: 'string', content: "'relu'" }, { type: 'default', content: ', input_shape=(' }, { type: 'number', content: '784' }, { type: 'default', content: ',)),\n' },
      { type: 'default', content: '    tf.keras.layers.Dropout(' }, { type: 'number', content: '0.2' }, { type: 'default', content: '),\n' },
      { type: 'default', content: '    tf.keras.layers.Dense(' }, { type: 'number', content: '10' }, { type: 'default', content: ', activation=' }, { type: 'string', content: "'softmax'" }, { type: 'default', content: ')\n' },
      { type: 'default', content: '])\n\n' },
      { type: 'default', content: 'model.' }, { type: 'function', content: 'compile' }, { type: 'default', content: '(optimizer=' }, { type: 'string', content: "'adam'" }, { type: 'default', content: ')' },
    ],
  },
  {
    lang: 'JavaScript',
    color: 'text-[#F7DF1E]', // Yellow
    code: [
        { type: 'keyword', content: 'import ' }, { type: 'default', content: '{ ai } ' }, { type: 'keyword', content: 'from ' }, { type: 'string', content: "'@/ai/genkit'" }, { type: 'default', content: ';\n' },
        { type: 'keyword', content: 'import ' }, { type: 'default', content: '{ z } ' }, { type: 'keyword', content: 'from ' }, { type: 'string', content: "'genkit'" }, { type: 'default', content: ';\n\n' },
        { type: 'comment', content: '// Define a generative AI flow\n' },
        { type: 'keyword', content: 'export const ' }, { type: 'default', content: 'storyFlow = ai.' }, { type: 'function', content: 'defineFlow' }, { type: 'default', content: '({\n' },
        { type: 'default', content: '  name: ' }, { type: 'string', content: "'storyFlow'" }, { type: 'default', content: ',\n' },
        { type: 'default', content: '  inputSchema: z.' }, { type: 'function', content: 'string' }, { type: 'default', content: '(),\n' },
        { type: 'keyword', content: '  async ' }, { type: 'default', content: '(prompt) => {\n' },
        { type: 'keyword', content: '    const ' }, { type: 'default', content: 'llmResponse = ' }, { type: 'keyword', content: 'await ' }, { type: 'default', content: 'ai.' }, { type: 'function', content: 'generate' }, { type: 'default', content: '({ ... });\n' },
        { type: 'keyword', content: '    return ' }, { type: 'default', content: 'llmResponse.text();\n' },
        { type: 'default', content: '  }\n' },
        { type: 'default', content: '});' },
    ],
  },
   {
    lang: 'Go',
    color: 'text-[#00ADD8]', // Cyan
    code: [
      { type: 'keyword', content: 'package ' }, { type: 'default', content: 'main\n\n' },
      { type: 'keyword', content: 'import ' }, { type: 'default', content: '(\n' },
      { type: 'string', content: '    "fmt"\n' },
      { type: 'string', content: '    "sync"\n' },
      { type: 'default', content: ')\n\n' },
      { type: 'comment', content: '// Worker pool for concurrent processing\n' },
      { type: 'keyword', content: 'func ' }, { type: 'function', content: 'worker' }, { type: 'default', content: '(id ' }, { type: 'keyword', content: 'int' }, { type: 'default', content: ', jobs ' }, { type: 'keyword', content: '<-' }, { type: 'keyword', content: 'chan int' }, { type: 'default', content: ') {\n' },
      { type: 'keyword', content: '    for ' }, { type: 'default', content: 'j := ' }, { type: 'keyword', content: 'range ' }, { type: 'default', content: 'jobs {\n' },
      { type: 'default', content: '        fmt.' }, { type: 'function', content: 'Printf' }, { type: 'default', content: '(' }, { type: 'string', content: `"w:%d j:%d"` }, { type: 'default', content: ', id, j)\n' },
      { type: 'default', content: '    }\n' },
      { type: 'default', content: '}' },
    ],
  },
  {
    lang: 'SQL',
    color: 'text-[#4479A1]', // Another Blue
    code: [
      { type: 'keyword', content: 'SELECT\n' },
      { type: 'default', content: '    sale_date,\n' },
      { type: 'default', content: '    revenue,\n' },
      { type: 'comment', content: '    -- 7-day moving average\n' },
      { type: 'function', content: '    AVG' }, { type: 'default', content: '(revenue) ' }, { type: 'keyword', content: 'OVER ' }, { type: 'default', content: '(\n' },
      { type: 'keyword', content: '        ORDER BY ' }, { type: 'default', content: 'sale_date\n' },
      { type: 'keyword', content: '        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW' }, { type: 'default', content: '\n' },
      { type: 'default', content: '    ) ' }, { type: 'keyword', content: 'AS ' }, { type: 'default', content: 'moving_avg\n' },
      { type: 'keyword', content: 'FROM ' }, { type: 'default', content: 'daily_sales;' },
    ],
  },
];

const BlinkingCursor = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
      className="inline-block h-4 w-0.5 bg-accent ml-0.5"
    />
);

export const CodeTypingIllustration = () => {
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [displayedCode, setDisplayedCode] = useState<any[]>([]);
    const [typingStatus, setTypingStatus] = useState('typing'); // typing, pausing, deleting

    const currentSnippet = codeSnippets[snippetIndex];
    const fullCodeString = currentSnippet.code.map(s => s.content).join('');

    useEffect(() => {
        let charIndex = 0;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            if (charIndex < fullCodeString.length) {
                const newChar = fullCodeString[charIndex];
                
                // Find which segment the character belongs to
                let accumulatedLength = 0;
                const segment = currentSnippet.code.find(s => {
                    const nextLength = accumulatedLength + s.content.length;
                    if (charIndex < nextLength) return true;
                    accumulatedLength = nextLength;
                    return false;
                });

                // Update displayed code
                setDisplayedCode(prev => {
                    const last = prev[prev.length - 1];
                    // If the new char is part of the same style segment, append it
                    if (last && last.type === segment?.type) {
                        const allButLast = prev.slice(0, -1);
                        return [...allButLast, { ...last, content: last.content + newChar }];
                    }
                    // Otherwise, start a new segment
                    return [...prev, { type: segment?.type, content: newChar }];
                });

                charIndex++;
                timeoutId = setTimeout(type, 30 + Math.random() * 30); // Typing speed
            } else {
                // Finished typing, start pausing
                setTypingStatus('pausing');
                timeoutId = setTimeout(() => setTypingStatus('deleting'), 2000); // Pause duration
            }
        };

        const deleteCode = () => {
            if (displayedCode.length > 0) {
                 setDisplayedCode(prev => {
                    const last = prev[prev.length - 1];
                    if (last.content.length > 1) {
                         const allButLast = prev.slice(0, -1);
                         return [...allButLast, { ...last, content: last.content.slice(0, -1) }];
                    }
                    return prev.slice(0, -1);
                });
                timeoutId = setTimeout(deleteCode, 20); // Deleting speed
            } else {
                 // Finished deleting, switch to next snippet
                 setTypingStatus('typing');
                 setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
            }
        };

        if (typingStatus === 'typing') {
            type();
        } else if (typingStatus === 'deleting') {
            deleteCode();
        }

        return () => clearTimeout(timeoutId);

    }, [snippetIndex, typingStatus]);
    
    // Reset displayed code when snippet changes
    useEffect(() => {
        setDisplayedCode([]);
    }, [snippetIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg aspect-[4/3] rounded-lg border bg-background/50 p-2 shadow-2xl backdrop-blur-sm"
    >
      {/* Window Header */}
      <div className="flex items-center gap-1.5 p-2 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs font-mono text-muted-foreground">
          <motion.span 
              key={currentSnippet.lang}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className={cn('font-bold', currentSnippet.color)}
          >
            {currentSnippet.lang}
          </motion.span>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 font-mono text-xs md:text-sm overflow-hidden h-[calc(100%-2.5rem)]">
        <pre className="whitespace-pre-wrap">
          <code>
            {displayedCode.map((segment, index) => (
              <SyntaxHighlight key={index} type={segment.type}>
                {segment.content}
              </SyntaxHighlight>
            ))}
            <BlinkingCursor />
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

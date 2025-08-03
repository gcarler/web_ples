
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const codeSnippets = [
  {
    lang: 'Python',
    color: 'text-[#3776AB]', // Blue
    code: [
      <><SyntaxHighlight type="keyword">import</SyntaxHighlight><SyntaxHighlight type="default"> tensorflow </SyntaxHighlight><SyntaxHighlight type="keyword">as</SyntaxHighlight><SyntaxHighlight type="default"> tf</SyntaxHighlight></>,
      <></>,
      <><SyntaxHighlight type="comment"># Define a simple sequential model</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">model = tf.keras.Sequential([</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    tf.keras.layers.Dense(</SyntaxHighlight><SyntaxHighlight type="number">128</SyntaxHighlight><SyntaxHighlight type="default">, activation=</SyntaxHighlight><SyntaxHighlight type="string">'relu'</SyntaxHighlight><SyntaxHighlight type="default">, input_shape=(</SyntaxHighlight><SyntaxHighlight type="number">784</SyntaxHighlight><SyntaxHighlight type="default">,)),</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    tf.keras.layers.Dropout(</SyntaxHighlight><SyntaxHighlight type="number">0.2</SyntaxHighlight><SyntaxHighlight type="default">),</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    tf.keras.layers.Dense(</SyntaxHighlight><SyntaxHighlight type="number">10</SyntaxHighlight><SyntaxHighlight type="default">, activation=</SyntaxHighlight><SyntaxHighlight type="string">'softmax'</SyntaxHighlight><SyntaxHighlight type="default">)</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">])</SyntaxHighlight></>,
      <></>,
      <><SyntaxHighlight type="default">model.</SyntaxHighlight><SyntaxHighlight type="function">compile</SyntaxHighlight><SyntaxHighlight type="default">(optimizer=</SyntaxHighlight><SyntaxHighlight type="string">'adam'</SyntaxHighlight><SyntaxHighlight type="default">, loss=</SyntaxHighlight><SyntaxHighlight type="string">'categorical_crossentropy'</SyntaxHighlight><SyntaxHighlight type="default">, metrics=[</SyntaxHighlight><SyntaxHighlight type="string">'accuracy'</SyntaxHighlight><SyntaxHighlight type="default">])</SyntaxHighlight></>
    ],
  },
  {
    lang: 'JavaScript',
    color: 'text-[#F7DF1E]', // Yellow
    code: [
        <><SyntaxHighlight type="keyword">import</SyntaxHighlight> <SyntaxHighlight type="default">{'{ ai }'} </SyntaxHighlight><SyntaxHighlight type="keyword">from</SyntaxHighlight><SyntaxHighlight type="string"> '@/ai/genkit'</SyntaxHighlight><SyntaxHighlight type="default">;</SyntaxHighlight></>,
        <><SyntaxHighlight type="keyword">import</SyntaxHighlight> <SyntaxHighlight type="default">{'{ z }'} </SyntaxHighlight><SyntaxHighlight type="keyword">from</SyntaxHighlight><SyntaxHighlight type="string"> 'genkit'</SyntaxHighlight><SyntaxHighlight type="default">;</SyntaxHighlight></>,
        <></>,
        <><SyntaxHighlight type="comment">{'// Define a generative AI flow'}</SyntaxHighlight></>,
        <><SyntaxHighlight type="keyword">export const</SyntaxHighlight><SyntaxHighlight type="default"> storyFlow = ai.</SyntaxHighlight><SyntaxHighlight type="function">defineFlow</SyntaxHighlight><SyntaxHighlight type="default">({'{'}</SyntaxHighlight></>,
        <><SyntaxHighlight type="default">  name: </SyntaxHighlight><SyntaxHighlight type="string">'storyFlow'</SyntaxHighlight><SyntaxHighlight type="default">,</SyntaxHighlight></>,
        <><SyntaxHighlight type="default">  inputSchema: z.</SyntaxHighlight><SyntaxHighlight type="function">string</SyntaxHighlight><SyntaxHighlight type="default">(),</SyntaxHighlight></>,
        <><SyntaxHighlight type="keyword">  async</SyntaxHighlight><SyntaxHighlight type="default"> (prompt) ={'>'} {'{'}</SyntaxHighlight></>,
        <><SyntaxHighlight type="keyword">    const</SyntaxHighlight><SyntaxHighlight type="default"> llmResponse = </SyntaxHighlight><SyntaxHighlight type="keyword">await</SyntaxHighlight><SyntaxHighlight type="default"> ai.</SyntaxHighlight><SyntaxHighlight type="function">generate</SyntaxHighlight><SyntaxHighlight type="default">({'{'}</SyntaxHighlight></>,
        <><SyntaxHighlight type="default">      prompt: </SyntaxHighlight><SyntaxHighlight type="string">{`Write a story about \${prompt}`}</SyntaxHighlight><SyntaxHighlight type="default">,</SyntaxHighlight></>,
        <><SyntaxHighlight type="default">      model: </SyntaxHighlight><SyntaxHighlight type="string">'googleai/gemini-pro'</SyntaxHighlight><SyntaxHighlight type="default">,</SyntaxHighlight></>,
        <><SyntaxHighlight type="default">    {'}'});</SyntaxHighlight></>,
        <></>,
        <><SyntaxHighlight type="keyword">    return</SyntaxHighlight><SyntaxHighlight type="default"> llmResponse.text();</SyntaxHighlight></>,
        <><SyntaxHighlight type="default">  {'}})'}</SyntaxHighlight></>
    ],
  },
  {
    lang: 'Go',
    color: 'text-[#00ADD8]', // Cyan
    code: [
      <><SyntaxHighlight type="keyword">package</SyntaxHighlight><SyntaxHighlight type="default"> main</SyntaxHighlight></>,
      <></>,
      <><SyntaxHighlight type="keyword">import</SyntaxHighlight><SyntaxHighlight type="default"> ({"\n"}</SyntaxHighlight><SyntaxHighlight type="string">    "fmt"</SyntaxHighlight>{"\n"}<SyntaxHighlight type="string">    "sync"</SyntaxHighlight>{"\n"}<SyntaxHighlight type="default">{')'}</SyntaxHighlight></>,
      <></>,
      <><SyntaxHighlight type="comment">{'// Worker pool for concurrent processing'}</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">func</SyntaxHighlight><SyntaxHighlight type="function"> worker</SyntaxHighlight><SyntaxHighlight type="default">(id </SyntaxHighlight><SyntaxHighlight type="keyword">int</SyntaxHighlight><SyntaxHighlight type="default">, jobs </SyntaxHighlight><SyntaxHighlight type="keyword">{'<-chan int'}</SyntaxHighlight><SyntaxHighlight type="default">, results </SyntaxHighlight><SyntaxHighlight type="keyword">{'chan<- int'}</SyntaxHighlight><SyntaxHighlight type="default">, wg *sync.WaitGroup) {'{'}</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">    defer</SyntaxHighlight><SyntaxHighlight type="default"> wg.Done()</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">    for</SyntaxHighlight><SyntaxHighlight type="default"> j := </SyntaxHighlight><SyntaxHighlight type="keyword">range</SyntaxHighlight><SyntaxHighlight type="default"> jobs {'{'}</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">        fmt.</SyntaxHighlight><SyntaxHighlight type="function">Printf</SyntaxHighlight><SyntaxHighlight type="default">(</SyntaxHighlight><SyntaxHighlight type="string">"Worker %d started job %d\\n"</SyntaxHighlight><SyntaxHighlight type="default">, id, j)</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">        results </SyntaxHighlight><SyntaxHighlight type="keyword">{'<-'}</SyntaxHighlight><SyntaxHighlight type="default"> j * </SyntaxHighlight><SyntaxHighlight type="number">2</SyntaxHighlight><SyntaxHighlight type="comment"> // Simulate work</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    {'}'}</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">{'}'}</SyntaxHighlight></>
    ],
  },
  {
    lang: 'SQL',
    color: 'text-[#4479A1]', // Another Blue
    code: [
      <><SyntaxHighlight type="keyword">SELECT</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    sale_date,</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    revenue,</SyntaxHighlight></>,
      <><SyntaxHighlight type="comment">    -- Calculate 7-day moving average</SyntaxHighlight></>,
      <><SyntaxHighlight type="function">    AVG</SyntaxHighlight><SyntaxHighlight type="default">(revenue) </SyntaxHighlight><SyntaxHighlight type="keyword">OVER</SyntaxHighlight><SyntaxHighlight type="default"> (</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">        ORDER BY</SyntaxHighlight><SyntaxHighlight type="default"> sale_date</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">        ROWS BETWEEN</SyntaxHighlight><SyntaxHighlight type="number"> 6</SyntaxHighlight><SyntaxHighlight type="keyword"> PRECEDING AND CURRENT ROW</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    ) </SyntaxHighlight><SyntaxHighlight type="keyword">AS</SyntaxHighlight><SyntaxHighlight type="default"> moving_avg_7_days</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">FROM</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    daily_sales</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">WHERE</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    sale_date {'>'}= </SyntaxHighlight><SyntaxHighlight type="string">'2024-01-01'</SyntaxHighlight></>,
      <><SyntaxHighlight type="keyword">ORDER BY</SyntaxHighlight></>,
      <><SyntaxHighlight type="default">    sale_date;</SyntaxHighlight></>
    ],
  },
];

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger animation for each line
      duration: 0.3,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -10,
     transition: {
      delay: i * 0.05, // Stagger exit animation
      duration: 0.2,
    },
  })
};

const BlinkingCursor = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
      className="inline-block h-4 w-0.5 bg-accent"
    />
)

export const CodeTypingIllustration = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const totalDuration = (codeSnippets[snippetIndex].code.length * 150) + 3000; // time per line + pause
    const timeout = setTimeout(() => {
        setIsExiting(true);
        // Start changing the snippet after exit animation completes
        setTimeout(() => {
            setSnippetIndex((prevIndex) => (prevIndex + 1) % codeSnippets.length);
            setIsExiting(false);
        }, codeSnippets[snippetIndex].code.length * 50 + 500); // Wait for all lines to exit
    }, totalDuration);

    return () => clearTimeout(timeout);
  }, [snippetIndex]);


  const currentSnippet = codeSnippets[snippetIndex];

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
            <AnimatePresence initial={false}>
            {!isExiting && currentSnippet.code.map((line, i) => (
                <motion.div
                  key={`${snippetIndex}-${i}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="block min-h-[1.2em]" // Ensure line takes up space
                >
                  {line}
                  {/* Show cursor only on the last line as it types */}
                  {i === currentSnippet.code.length - 1 && <BlinkingCursor />}
                </motion.div>
              ))}
            </AnimatePresence>
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

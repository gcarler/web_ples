
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const codeSnippets = [
  {
    lang: 'Python',
    color: 'text-[#3776AB]', // Blue
    code: `import tensorflow as tf

# Define a simple sequential model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.summary()`,
  },
  {
    lang: 'JavaScript',
    color: 'text-[#F7DF1E]', // Yellow
    code: `import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define a generative AI flow
export const storyFlow = ai.defineFlow(
  {
    name: 'storyFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: \`Write a story about \${prompt}\`,
      model: 'googleai/gemini-pro',
    });

    return llmResponse.text();
  }
);`,
  },
  {
    lang: 'Go',
    color: 'text-[#00ADD8]', // Cyan
    code: `package main

import (
    "fmt"
    "sync"
)

// Worker pool for concurrent processing
func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
    defer wg.Done()
    for j := range jobs {
        fmt.Printf("Worker %d started job %d\\n", id, j)
        results <- j * 2 // Simulate work
        fmt.Printf("Worker %d finished job %d\\n", id, j)
    }
}
`,
  },
  {
    lang: 'SQL',
    color: 'text-[#4479A1]', // Another Blue
    code: `SELECT
    sale_date,
    revenue,
    -- Calculate 7-day moving average
    AVG(revenue) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7_days
FROM
    daily_sales
WHERE
    sale_date >= '2024-01-01'
ORDER BY
    sale_date;`,
  },
];

export const CodeTypingIllustration = () => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [typedCode, setTypedCode] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippetIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (typedCode.length > 0) {
        timeoutId = setTimeout(() => {
          setTypedCode((prev) => prev.slice(0, -1));
        }, 20); // Faster deleting speed
      } else {
        setIsDeleting(false);
        setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
      }
    } else {
      if (typedCode.length < snippet.code.length) {
        timeoutId = setTimeout(() => {
          setTypedCode((prev) => snippet.code.slice(0, prev.length + 1));
        }, 35); // Typing speed
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 3000); // Pause before deleting
      }
    }

    return () => clearTimeout(timeoutId);
  }, [typedCode, isDeleting, currentSnippetIndex]);

  const currentLang = codeSnippets[currentSnippetIndex];

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
          <span className={cn('font-bold', currentLang.color)}>
            {currentLang.lang}
          </span>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 font-mono text-xs md:text-sm overflow-hidden">
        <pre className="whitespace-pre-wrap">
          <code className="text-foreground/90">
            {typedCode}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
              className="inline-block h-4 w-0.5 bg-accent"
            />
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

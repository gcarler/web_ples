'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const codeSnippets = [
  {
    lang: 'JavaScript',
    color: 'text-[#F7DF1E]', // Yellow
    code: `import { Button } from '@/components/ui/button';

function App() {
  return (
    <Button onClick={() => alert('Hello, PLES!')}>
      Click me
    </Button>
  );
}`,
  },
  {
    lang: 'Python',
    color: 'text-[#3776AB]', // Blue
    code: `import pandas as pd

# Load data from a CSV file
df = pd.read_csv('sales_data.csv')

# Calculate total revenue
total_revenue = (df['price'] * df['quantity']).sum()

print(f"Total Revenue: ${total_revenue:,.2f}")`,
  },
  {
    lang: 'SQL',
    color: 'text-[#4479A1]', // Another Blue
    code: `SELECT 
    c.customer_name,
    COUNT(o.order_id) AS total_orders,
    SUM(o.order_value) AS total_spent
FROM 
    customers c
JOIN 
    orders o ON c.customer_id = o.customer_id
WHERE 
    c.signup_date > '2023-01-01'
GROUP BY 
    c.customer_name
ORDER BY 
    total_spent DESC;`,
  },
  {
    lang: 'CloudFormation',
    color: 'text-[#FF9900]', // Orange (AWS)
    code: `Resources:
  MyEC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: 't2.micro'
      ImageId: 'ami-0c55b159cbfafe1f0' # Example AMI
      Tags:
        - Key: 'Name'
          Value: 'Ples-Web-Server'
      SecurityGroups:
        - !Ref WebServerSecurityGroup`,
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

    
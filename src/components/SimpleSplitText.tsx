import React from 'react';
import { motion } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  splitType = 'chars',
  tag: Tag = 'p',
  textAlign = 'left',
}) => {
  const splitText = () => {
    if (splitType === 'words') {
      return text.split(' ');
    } else if (splitType === 'chars') {
      return text.split('');
    } else {
      return [text];
    }
  };

  const parts = splitText();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay / 1000,
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ textAlign }}
      className={className}
    >
      <Tag className="inline-block">
        {parts.map((part, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className="inline-block"
            style={{
              marginRight: splitType === 'words' ? '0.25em' : '0',
            }}
          >
            {part === ' ' ? '\u00A0' : part}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
};

export default SplitText;

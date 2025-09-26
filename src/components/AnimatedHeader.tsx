import React from 'react';
// Tạm thời không dùng react-bits, sẽ tạo animation custom
// import { TextReveal } from 'react-bits';

interface AnimatedHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center space-y-3 md:space-y-4 px-4 ${className}`}>
      {/* Animated main title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-fade-in leading-tight">
        {title}
      </h1>

      {/* Subtitle nếu có */}
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto animate-fade-in animation-delay-500 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative gradient line */}
      <div className="w-16 sm:w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse" />
    </div>
  );
};

export default AnimatedHeader;

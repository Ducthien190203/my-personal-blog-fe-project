import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BadgeTagProps {
  name: string;
  count?: number;
  type: 'category' | 'tag';
  onClick?: () => void;
  className?: string;
}

const BadgeTag: React.FC<BadgeTagProps> = ({
  name,
  count,
  type,
  onClick,
  className,
}) => {
  return (
    <Badge
      variant={type}
      className={cn(
        'cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <span>{name}</span>
      {count !== undefined && (
        <span className="ml-1 opacity-75">({count})</span>
      )}
    </Badge>
  );
};

export default BadgeTag;

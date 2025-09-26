import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    name: string;
    avatar?: string;
  };
  slug: string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  publishedAt,
  category,
  tags,
  slug,
  coverImage,
  author,
}) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20 isolate">
      <Link to={`/posts/${slug}`}>
        {/* Cover Image */}
        <div className="relative overflow-hidden isolate">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 isolate"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center isolate">
              <span className="text-white/80 text-6xl font-thin">✨</span>
            </div>
          )}

          {/* Category Badge overlay */}
          <div className="absolute top-3 left-3">
            <Badge variant="category" className="shadow-md isolate">
              {category.name}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3 isolate bg-background/95">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3 isolate bg-background/95">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="tag" className="text-xs isolate">
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs isolate">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground isolate bg-background/95">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{author.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(publishedAt).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default PostCard;

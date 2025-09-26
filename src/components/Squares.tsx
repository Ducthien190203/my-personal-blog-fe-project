import React, { useEffect, useRef } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'horizontal' | 'vertical';
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.5,
  squareSize = 40,
  borderColor = '#fff',
  hoverFillColor = '#222',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const squaresRef = useRef<
    Array<{
      x: number;
      y: number;
      rotation: number;
      opacity: number;
      scale: number;
      hovered: boolean;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();

    // Initialize squares
    const initSquares = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const cols = Math.ceil(parent.offsetWidth / squareSize) + 2;
      const rows = Math.ceil(parent.offsetHeight / squareSize) + 2;
      squaresRef.current = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          squaresRef.current.push({
            x: i * squareSize - squareSize,
            y: j * squareSize - squareSize,
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.6 + 0.4, // Tăng opacity từ 0.1-0.4 lên 0.4-1.0
            scale: Math.random() * 0.5 + 0.5,
            hovered: false,
          });
        }
      }
    };

    initSquares();

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      ctx.clearRect(0, 0, parent.offsetWidth, parent.offsetHeight);

      squaresRef.current.forEach((square) => {
        // Update position based on direction
        switch (direction) {
          case 'diagonal':
            square.x += speed * 0.5;
            square.y += speed * 0.3;
            break;
          case 'horizontal':
            square.x += speed;
            break;
          case 'vertical':
            square.y += speed;
            break;
        }

        // Wrap around screen
        if (square.x > parent.offsetWidth + squareSize) {
          square.x = -squareSize;
        }
        if (square.y > parent.offsetHeight + squareSize) {
          square.y = -squareSize;
        }

        // Update rotation
        square.rotation += speed * 0.5;

        // Check hover state
        const distance = Math.sqrt(
          Math.pow(mouseX - square.x - squareSize / 2, 2) +
            Math.pow(mouseY - square.y - squareSize / 2, 2)
        );
        square.hovered = distance < squareSize;

        // Draw square
        ctx.save();
        ctx.translate(square.x + squareSize / 2, square.y + squareSize / 2);
        ctx.rotate((square.rotation * Math.PI) / 180);
        ctx.scale(square.scale, square.scale);

        if (square.hovered) {
          // Filled square on hover
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(
            -squareSize / 2,
            -squareSize / 2,
            squareSize,
            squareSize
          );
        } else {
          // Border only
          ctx.strokeStyle = borderColor;
          ctx.globalAlpha = square.opacity;
          ctx.lineWidth = 2; // Tăng từ 1 lên 2 để rõ hơn
          ctx.strokeRect(
            -squareSize / 2,
            -squareSize / 2,
            squareSize,
            squareSize
          );
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
      initSquares();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, speed, squareSize, borderColor, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
};

export default Squares;

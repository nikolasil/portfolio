'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

interface Star {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  baseAlpha: number;
  alpha: number;
  alphaDirection: number;
}

const StarDotsBackground = ({
  starCount,
  maxSpeed,
  twinkle,
}: {
  starCount: number;
  maxSpeed: number;
  twinkle: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const starsRef = useRef<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const createStars = (
      width: number,
      height: number,
      count: number
    ): Star[] => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.2,
          speedX: (Math.random() - 0.5) * maxSpeed,
          speedY: (Math.random() - 0.5) * maxSpeed,
          baseAlpha: Math.random() * 0.6 + 0.4,
          alpha: 1,
          alphaDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
      return stars;
    };

    const draw = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      stars: Star[]
    ) => {
      ctx.clearRect(0, 0, width, height);
      const starColor =
        theme.palette.mode === 'dark' ? '255, 255, 255' : '34, 34, 34';

      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        else if (star.y > height) star.y = 0;

        if (twinkle) {
          star.alpha += 0.01 * star.alphaDirection;
          if (star.alpha >= 1) {
            star.alpha = 1;
            star.alphaDirection = -1;
          } else if (star.alpha <= star.baseAlpha) {
            star.alpha = star.baseAlpha;
            star.alphaDirection = 1;
          }
        } else {
          star.alpha = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${star.alpha.toFixed(2)})`;
        ctx.shadowColor = `rgba(${starColor}, ${star.alpha.toFixed(2)})`;
        ctx.shadowBlur = 2;
        ctx.fill();
      });
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    starsRef.current = createStars(width, height, starCount);

    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      draw(ctx, width, height, starsRef.current);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      starsRef.current = createStars(width, height, starCount);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [theme.palette.mode, starCount, maxSpeed, twinkle]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarDotsBackground;

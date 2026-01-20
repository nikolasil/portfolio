'use client';

import { usePathname } from 'next/navigation'; // Add this
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// UI Imports
import {
  IconButton,
  Tooltip,
  Paper,
  Typography,
  Divider,
  Box,
  Fade,
} from '@mui/material';

// --- Icons ---
const IconAttract = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3v12" />
    <path d="M18 3v12" />
    <path d="M3 9l3 3 3-3" />
    <path d="M15 9l3 3 3-3" />
  </svg>
);
const IconRepulse = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 15v-6" />
    <path d="M18 15v-6" />
    <path d="M3 15l3-3 3 3" />
    <path d="M15 15l3-3 3 3" />
  </svg>
);
const IconNone = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);
const IconPlus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconSettings = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconClose = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconMeteor = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 22l1-1" />
    <path d="M5 19l1-1" />
    <path d="M8 16l1-1" />
    <circle cx="17" cy="7" r="5" />
    <path d="M12 12l2.5 2.5" />
  </svg>
);

interface StarDotsBackgroundProps {
  starCount?: number;
  maxSpeed?: number;
  twinkle?: boolean;
  connectDistance?: number;
  shootingStarFrequency?: number;
  initialInteractionMode?: 'repulse' | 'attract' | 'none';
  starColor?: string;
  bgColor?: string;
  showControls?: boolean;
}

interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  size: number;
  color: string;
}

const MIN_STARS = 200;
const MAX_STARS = 600;
const STEP_STARS = 20;

const StarDotsBackground = React.memo(
  ({
    starCount = 400,
    maxSpeed = 0.8,
    twinkle = true,
    connectDistance = 160,
    shootingStarFrequency = 0.005,
    initialInteractionMode = 'attract',
    starColor,
    bgColor,
    showControls = true,
  }: StarDotsBackgroundProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname(); // Get current path
    const isHomePage = pathname === '/'; // Check if on root
    const finalConnectDist = isMobile ? connectDistance / 2 : connectDistance;
    const finalMaxSpeed = isMobile ? maxSpeed / 2 : maxSpeed;

    const [mode, setMode] = useState<'repulse' | 'attract' | 'none'>(
      initialInteractionMode,
    );
    const [displayCount, setDisplayCount] = useState(
      isMobile ? Math.floor(starCount / 2) : starCount,
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const modeRef = useRef(mode);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000, clickBurst: false });
    const dimsRef = useRef({ w: 0, h: 0 });

    useEffect(() => {
      modeRef.current = mode;
    }, [mode]);

    const handleAdjustStars = useCallback(
      (amount: number) => {
        const currentLen = starsRef.current.length;
        let newLen = currentLen + amount;
        if (newLen < MIN_STARS) newLen = MIN_STARS;
        if (newLen > MAX_STARS) newLen = MAX_STARS;

        if (newLen === currentLen) return;

        if (newLen > currentLen) {
          const starsToAdd = newLen - currentLen;
          for (let i = 0; i < starsToAdd; i++) {
            starsRef.current.push({
              x: Math.random() * (dimsRef.current.w || window.innerWidth),
              y: Math.random() * (dimsRef.current.h || window.innerHeight),
              r: Math.random() * 1.2 + 0.5,
              vx: (Math.random() - 0.5) * finalMaxSpeed,
              vy: (Math.random() - 0.5) * finalMaxSpeed,
              phase: Math.random() * Math.PI * 2,
            });
          }
        } else {
          starsRef.current.splice(newLen);
        }
        setDisplayCount(newLen);
      },
      [finalMaxSpeed],
    );

    const handleSpawnMeteor = useCallback(() => {
      const isDark = theme.palette.mode === 'dark';
      const color = starColor
        ? starColor
        : isDark
          ? '200, 220, 255'
          : '60, 60, 80';

      shootingStarsRef.current.push({
        x: Math.random() * (dimsRef.current.w || window.innerWidth),
        y: -50,
        len: Math.random() * 150 + 100,
        speed: Math.random() * 15 + 12,
        size: Math.random() * 2 + 1,
        color: color,
      });
    }, [theme.palette.mode, starColor]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const isDark = theme.palette.mode === 'dark';
      const finalRgb = starColor
        ? starColor
        : isDark
          ? '200, 220, 255'
          : '60, 60, 80';
      const finalBg = bgColor ? bgColor : isDark ? '#050508' : '#f0f2f5';

      const createStarSprite = (color: string) => {
        const sprite = document.createElement('canvas');
        sprite.width = 32;
        sprite.height = 32;
        const sCtx = sprite.getContext('2d')!;
        const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, `rgba(${color}, 1)`);
        grad.addColorStop(0.2, `rgba(${color}, 0.3)`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 32, 32);
        return sprite;
      };
      const starSprite = createStarSprite(finalRgb);

      const initStars = () => {
        if (starsRef.current.length === 0) {
          const count = isMobile ? Math.floor(starCount / 2) : starCount;
          setDisplayCount(count);
          starsRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.2 + 0.5,
            vx: (Math.random() - 0.5) * finalMaxSpeed,
            vy: (Math.random() - 0.5) * finalMaxSpeed,
            phase: Math.random() * Math.PI * 2,
          }));
        }
      };

      const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        dimsRef.current.w = window.innerWidth;
        dimsRef.current.h = window.innerHeight;
        canvas.width = dimsRef.current.w * dpr;
        canvas.height = dimsRef.current.h * dpr;
        ctx.scale(dpr, dpr);
      };

      handleResize();
      initStars();

      let frameId: number;

      const render = (time: number) => {
        const { w, h } = dimsRef.current;
        const stars = starsRef.current;
        const currentMode = modeRef.current;

        ctx.fillStyle = finalBg;
        ctx.fillRect(0, 0, w, h);

        // --- Improved Shooting Stars & Interaction ---
        if (Math.random() < shootingStarFrequency) {
          shootingStarsRef.current.push({
            x: Math.random() * w,
            y: 0, // Start from top
            len: Math.random() * 100 + 50,
            speed: Math.random() * 12 + 10,
            size: Math.random() * 1.5 + 0.5,
            color: finalRgb,
          });
        }

        for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
          const s = shootingStarsRef.current[i];
          s.x += s.speed; // Moving diagonally
          s.y += s.speed;

          // Interaction: Push nearby stars
          for (let j = 0; j < stars.length; j++) {
            const star = stars[j];
            const dx = star.x - s.x;
            const dy = star.y - s.y;
            const distSq = dx * dx + dy * dy;
            const influenceRadius = 80;
            if (distSq < influenceRadius * influenceRadius) {
              const dist = Math.sqrt(distSq);
              const force = (influenceRadius - dist) / influenceRadius;
              // Push stars away from the meteor head with a slight velocity kick
              star.vx += (dx / dist) * force * 3;
              star.vy += (dy / dist) * force * 3;
            }
          }

          // Visuals: Gradient trail
          const trailGrad = ctx.createLinearGradient(
            s.x,
            s.y,
            s.x - s.len,
            s.y - s.len,
          );
          trailGrad.addColorStop(0, `rgba(${s.color}, 0.8)`);
          trailGrad.addColorStop(1, `rgba(${s.color}, 0)`);

          ctx.beginPath();
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = s.size;
          ctx.lineCap = 'round';
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.len, s.y - s.len);
          ctx.stroke();

          // Visuals: Bright Head
          ctx.beginPath();
          ctx.fillStyle = `rgba(${s.color}, 1)`;
          ctx.arc(s.x, s.y, s.size * 1.2, 0, Math.PI * 2);
          ctx.fill();

          if (s.x > w + 200 || s.y > h + 200)
            shootingStarsRef.current.splice(i, 1);
        }

        // --- Grid & Standard Interactions ---
        const gridSize = finalConnectDist || 100;
        const cols = Math.ceil(w / gridSize);
        const rows = Math.ceil(h / gridSize);
        const grid: number[][] = new Array(cols * rows);
        const mouseRadius = 150;

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          if (!isMobile && currentMode !== 'none') {
            const dx = mouseRef.current.x - s.x;
            const dy = mouseRef.current.y - s.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadius * mouseRadius) {
              const dist = Math.sqrt(distSq);
              const force = (mouseRadius - dist) / mouseRadius;
              const direction = currentMode === 'repulse' ? 1 : -1;
              s.vx -= (dx / dist) * force * 0.5 * direction;
              s.vy -= (dy / dist) * force * 0.5 * direction;
            }
          }

          if (!isMobile && mouseRef.current.clickBurst) {
            const dx = mouseRef.current.x - s.x;
            const dy = mouseRef.current.y - s.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 300 * 300) {
              const dist = Math.sqrt(distSq);
              const force = (300 - dist) / 300;
              s.vx -= (dx / dist) * force * 10;
              s.vy -= (dy / dist) * force * 10;
            }
          }

          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.98;
          s.vy *= 0.98;

          if (s.x < 0) s.x = w;
          else if (s.x > w) s.x = 0;
          if (s.y < 0) s.y = h;
          else if (s.y > h) s.y = 0;

          if (Math.abs(s.vx) < 0.1 && Math.abs(s.vy) < 0.1) {
            const angle = Math.random() * Math.PI * 2;
            s.vx += Math.cos(angle) * 0.05;
            s.vy += Math.sin(angle) * 0.05;
          }

          const cx = Math.floor(s.x / gridSize);
          const cy = Math.floor(s.y / gridSize);
          if (cx >= 0 && cx < cols && cy >= 0 && cy < rows) {
            const index = cy * cols + cx;
            if (!grid[index]) grid[index] = [];
            grid[index].push(i);
          }
        }
        mouseRef.current.clickBurst = false;

        // Lines & Nova logic
        const avgStarsPerCell = stars.length / (cols * rows || 1);
        const cleverThreshold = Math.max(6, Math.ceil(avgStarsPerCell * 3));
        const neighborOffsets = [0, 1, cols - 1, cols, cols + 1];
        ctx.lineWidth = 0.5;

        for (let i = 0; i < grid.length; i++) {
          const cellStars = grid[i];
          if (!cellStars) continue;

          if (cellStars.length > cleverThreshold) {
            const centerX = (i % cols) * gridSize + gridSize / 2;
            const centerY = Math.floor(i / cols) * gridSize + gridSize / 2;

            // --- Improved Nova Visuals ---
            // Scale intensity and size based on how many stars over the threshold
            const intensity = Math.min(
              2,
              (cellStars.length - cleverThreshold) / 5,
            );
            const novaSize = gridSize * (1.2 + intensity * 0.5);

            const novaGrad = ctx.createRadialGradient(
              centerX,
              centerY,
              0,
              centerX,
              centerY,
              novaSize,
            );

            // Multi-stop gradient for a "hot" center and soft energy dissipation
            novaGrad.addColorStop(0, `rgba(255, 255, 255, ${0.7 * intensity})`);
            novaGrad.addColorStop(0.2, `rgba(${finalRgb}, ${0.4 * intensity})`);
            novaGrad.addColorStop(0.6, `rgba(${finalRgb}, ${0.1 * intensity})`);
            novaGrad.addColorStop(1, `rgba(${finalRgb}, 0)`);

            ctx.fillStyle = novaGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, novaSize, 0, Math.PI * 2);
            ctx.fill();

            for (const idx of cellStars) {
              const s = stars[idx];
              const dx = s.x - centerX;
              const dy = s.y - centerY;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              // Dynamic explosion force
              const explosionForce = 3.5 + intensity * 2;
              s.vx += (dx / dist) * explosionForce;
              s.vy += (dy / dist) * explosionForce;
              s.phase += 0.3; // Distort twinkle on explosion
            }
          }

          for (const idx1 of cellStars) {
            const s1 = stars[idx1];
            for (const offset of neighborOffsets) {
              const neighborIdx = i + offset;
              if (neighborIdx < 0 || neighborIdx >= grid.length) continue;
              const neighborCell = grid[neighborIdx];
              if (!neighborCell) continue;
              for (const idx2 of neighborCell) {
                if (idx1 >= idx2) continue;
                const s2 = stars[idx2];
                const dx = s1.x - s2.x;
                const dy = s1.y - s2.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < finalConnectDist * finalConnectDist) {
                  const alpha = 1 - Math.sqrt(distSq) / finalConnectDist;
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(${finalRgb}, ${alpha * 0.15})`;
                  ctx.moveTo(s1.x, s1.y);
                  ctx.lineTo(s2.x, s2.y);
                  ctx.stroke();
                }
              }
            }
          }
        }

        for (const s of stars) {
          ctx.globalAlpha = twinkle
            ? 0.3 + Math.abs(Math.sin(time * 0.001 + s.phase)) * 0.7
            : 1;
          const drawSize = s.r * 8;
          ctx.drawImage(
            starSprite,
            s.x - drawSize / 2,
            s.y - drawSize / 2,
            drawSize,
            drawSize,
          );
        }
        ctx.globalAlpha = 1;
        frameId = requestAnimationFrame(render);
      };

      frameId = requestAnimationFrame(render);

      const onMouseMove = (e: MouseEvent) => {
        if (isMobile) return;
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      };
      const onMouseDown = () => {
        if (isMobile) return;
        mouseRef.current.clickBurst = true;
      };

      window.addEventListener('resize', handleResize);
      if (!isMobile) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseDown);
        cancelAnimationFrame(frameId);
      };
    }, [
      theme.palette.mode,
      finalConnectDist,
      finalMaxSpeed,
      twinkle,
      shootingStarFrequency,
      starColor,
      bgColor,
      isMobile,
      starCount
    ]);

    return (
      <>
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            background: bgColor
              ? bgColor
              : theme.palette.mode === 'dark'
                ? '#050508'
                : '#f0f2f5',
          }}
        />

        {!isMobile && showControls && isHomePage && (
          <>
            <Tooltip
              title={isMenuOpen ? 'Close Controls' : 'Configure Stars'}
              placement="left"
            >
              <IconButton
                onClick={() => setIsMenuOpen((prev) => !prev)}
                sx={{
                  position: 'fixed',
                  bottom: 24,
                  right: 24,
                  zIndex: 21,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid',
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                  color: theme.palette.text.primary,
                  transition: 'all 0.3s ease',
                  opacity: 0.6,
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.1) rotate(90deg)',
                  },
                }}
              >
                {isMenuOpen ? <IconClose /> : <IconSettings />}
              </IconButton>
            </Tooltip>

            <Fade in={isMenuOpen} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                sx={{
                  position: 'fixed',
                  bottom: 32,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                  padding: '8px 24px',
                  borderRadius: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  backdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(20, 20, 35, 0.4)'
                      : 'rgba(255, 255, 255, 0.4)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                }}
              >
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      opacity: 0.6,
                      fontSize: '0.65rem',
                      mr: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    MODE
                  </Typography>
                  <Tooltip title="Attract" arrow>
                    <IconButton
                      size="small"
                      onClick={() => setMode('attract')}
                      sx={{
                        color:
                          mode === 'attract'
                            ? theme.palette.primary.main
                            : 'inherit',
                        opacity: mode === 'attract' ? 1 : 0.5,
                        transition: 'all 0.2s',
                      }}
                    >
                      <IconAttract />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Repulse" arrow>
                    <IconButton
                      size="small"
                      onClick={() => setMode('repulse')}
                      sx={{
                        color:
                          mode === 'repulse'
                            ? theme.palette.secondary.main
                            : 'inherit',
                        opacity: mode === 'repulse' ? 1 : 0.5,
                        transition: 'all 0.2s',
                      }}
                    >
                      <IconRepulse />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="None" arrow>
                    <IconButton
                      size="small"
                      onClick={() => setMode('none')}
                      sx={{
                        opacity: mode === 'none' ? 1 : 0.5,
                        transition: 'all 0.2s',
                      }}
                    >
                      <IconNone />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, borderColor: 'rgba(150,150,150,0.3)' }}
                />
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      opacity: 0.6,
                      fontSize: '0.65rem',
                      mr: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    STARS
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleAdjustStars(-STEP_STARS)}
                    disabled={displayCount <= MIN_STARS}
                    sx={{ opacity: displayCount <= MIN_STARS ? 0.3 : 0.7 }}
                  >
                    <IconMinus />
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 40,
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    {displayCount}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleAdjustStars(STEP_STARS)}
                    disabled={displayCount >= MAX_STARS}
                    sx={{ opacity: displayCount >= MAX_STARS ? 0.3 : 0.7 }}
                  >
                    <IconPlus />
                  </IconButton>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, borderColor: 'rgba(150,150,150,0.3)' }}
                />
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      opacity: 0.6,
                      fontSize: '0.65rem',
                      mr: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    SPAWN
                  </Typography>
                  <Tooltip title="Spawn Meteor" arrow>
                    <IconButton
                      size="small"
                      onClick={handleSpawnMeteor}
                      sx={{
                        opacity: 0.7,
                        '&:hover': {
                          opacity: 1,
                          color: theme.palette.warning.main,
                        },
                      }}
                    >
                      <IconMeteor />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Fade>
          </>
        )}
      </>
    );
  },
);

StarDotsBackground.displayName = 'StarDotsBackground';
export default StarDotsBackground;

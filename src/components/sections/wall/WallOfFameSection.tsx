'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Grow,
  Stack,
  alpha,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Avatar,
  Container,
  Snackbar,
  Alert,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckIcon from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import BugReportIcon from '@mui/icons-material/BugReport';

const EMOJIS = ['🔥', '💻', '🎨', '✨', '🤘', '🚀', '🌈', '💎', '🍦', '👾'];
const COLORS = [
  '#FF4D4D',
  '#FF9F43',
  '#FECA57',
  '#1DD1A1',
  '#61dafb',
  '#5F27CD',
  '#F368E0',
];

interface Entry {
  id: string;
  name: string;
  message: string;
  emoji: string;
  color: string;
  timestamp: number;
  ip: string;
}

const WallOfFameSection = () => {
  const theme = useTheme();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [selectedColor, setSelectedColor] = useState(COLORS[5]);
  const [mounted, setMounted] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);
  const [initialCooldown, setInitialCooldown] = useState<number>(0);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(
        () => setCooldownSeconds(cooldownSeconds - 1),
        1000,
      );
      return () => clearTimeout(timer);
    } else {
      setInitialCooldown(0);
    }
  }, [cooldownSeconds]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wall');
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || cooldownSeconds > 0) return;
    setSubmitting(true);

    const newEntry = {
      name,
      message,
      emoji: selectedEmoji,
      color: selectedColor,
      timestamp: new Date().toISOString(),
      id: `tmp_${Date.now()}`,
    };

    try {
      const res = await fetch('/api/wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          message,
          emoji: selectedEmoji,
          color: selectedColor,
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        const secondsMatch = data.error.match(/(\d+)/);
        const seconds = secondsMatch ? parseInt(secondsMatch[0]) : 5;
        setCooldownSeconds(seconds);
        setInitialCooldown(seconds);
        setErrorMsg(data.error);
      } else if (!res.ok) {
        setErrorMsg(data.error || 'Failed to post message.');
      } else {
        setEntries((prev) => [data.entry || newEntry, ...prev]);
        setName('');
        setMessage('');
      }
    } catch {
      setErrorMsg('Connection error. Is the server running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        background: `linear-gradient(135deg, ${alpha(selectedColor, 0.05)} 0%, ${alpha(theme.palette.background.default, 1)} 50%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 8 }}
        >
          <RocketLaunchIcon sx={{ fontSize: '2rem' }} color="primary" />
          <Typography
            variant="h3"
            fontWeight="900"
            letterSpacing="-0.02em"
            fontSize="2rem"
          >
            Wall of Fame
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 10,
            borderRadius: 8,
            border: `2px solid ${alpha(selectedColor, 0.1)}`,
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(20px)',
            boxShadow: `0 24px 80px ${alpha(theme.palette.common.black, 0.08)}`,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                  placeholder="What's your name?"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 4,
                      fontWeight: 600,
                    },
                  }}
                />

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 4,
                      bgcolor: alpha(theme.palette.action.hover, 0.05),
                      border: `1px dashed ${theme.palette.divider}`,
                      display: 'flex',
                    }}
                  >
                    {EMOJIS.slice(0, 5).map((emo) => (
                      <IconButton
                        key={emo}
                        onClick={() => setSelectedEmoji(emo)}
                        sx={{
                          transform:
                            selectedEmoji === emo ? 'scale(1.2)' : 'scale(1)',
                          filter:
                            selectedEmoji === emo ? 'none' : 'grayscale(1)',
                        }}
                      >
                        {emo}
                      </IconButton>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 4,
                      bgcolor: alpha(theme.palette.action.hover, 0.05),
                      border: `1px dashed ${theme.palette.divider}`,
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    {COLORS.map((col) => (
                      <Box
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: col,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border:
                            selectedColor === col ? '2px solid white' : 'none',
                          boxShadow:
                            selectedColor === col ? `0 0 0 2px ${col}` : 'none',
                        }}
                      >
                        {selectedColor === col && (
                          <CheckIcon sx={{ color: 'white', fontSize: 14 }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Stack>
              </Stack>

              <TextField
                placeholder="Share something awesome..."
                multiline
                rows={3}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5 } }}
              />

              <Box
                sx={{
                  position: 'relative',
                  alignSelf: 'center',
                  width: 'fit-content',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    submitting || !name || !message || cooldownSeconds > 0
                  }
                  endIcon={
                    submitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : cooldownSeconds > 0 ? (
                      <TimerIcon />
                    ) : (
                      <SendIcon />
                    )
                  }
                  sx={{
                    py: 2,
                    px: 6,
                    minWidth: 240,
                    borderRadius: 4,
                    fontWeight: 800,
                    textTransform: 'none',
                    bgcolor:
                      cooldownSeconds > 0
                        ? theme.palette.action.disabledBackground
                        : selectedColor,
                    '&:hover': {
                      bgcolor: selectedColor,
                      filter: 'brightness(0.9)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {submitting
                    ? 'Sending...'
                    : cooldownSeconds > 0
                      ? `Wait ${formatTime(cooldownSeconds)}`
                      : 'Drop it on the Wall'}
                </Button>
                {cooldownSeconds > 0 && (
                  <LinearProgress
                    variant="determinate"
                    value={(cooldownSeconds / initialCooldown) * 100}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 10,
                      right: 10,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'transparent',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: selectedColor,
                        borderRadius: 2,
                      },
                    }}
                  />
                )}
              </Box>
            </Stack>
          </form>
        </Paper>

        {loading ? (
          <Stack alignItems="center" py={10}>
            <CircularProgress thickness={5} size={60} />
          </Stack>
        ) : (
          <Box sx={{ columnCount: { xs: 1, sm: 2, md: 3 }, columnGap: 3 }}>
            {entries.map((entry, idx) => (
              <Grow in key={entry.id || idx} timeout={idx * 50}>
                <Paper
                  sx={{
                    display: 'inline-block',
                    width: '100%',
                    mb: 3,
                    p: 4,
                    pb: 6, // Added extra padding for the ID at the bottom
                    borderRadius: 7,
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${alpha(entry.color || theme.palette.divider, 0.2)}`,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02) rotate(1deg)',
                      boxShadow: `0 20px 40px ${alpha(entry.color || '#000', 0.15)}`,
                      '& .debug-id': { opacity: 0.8 }, // Make ID clearer on hover
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: entry.color || theme.palette.primary.main,
                        fontWeight: 800,
                      }}
                    >
                      {entry.name?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="800">
                        {entry.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {mounted
                          ? new Date(entry.timestamp).toLocaleString(
                              undefined,
                              {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : '...'}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ ml: 'auto !important', fontSize: '1.5rem' }}
                    >
                      {entry.emoji}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.primary', lineHeight: 1.7 }}
                  >
                    {entry.message}
                  </Typography>

                  {/* DEBUG ID LABEL */}
                  <Box
                    className="debug-id"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      opacity: 0.3, // Subtle by default
                      transition: 'opacity 0.2s',
                      pointerEvents: 'none',
                      userSelect: 'all', // Allows you to triple-click and copy the ID easily
                    }}
                  >
                    <BugReportIcon sx={{ fontSize: 12 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                      }}
                    >
                      ID: {entry.id}
                    </Typography>
                  </Box>
                </Paper>
              </Grow>
            ))}
          </Box>
        )}
      </Container>

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="warning"
          variant="filled"
          onClose={() => setErrorMsg(null)}
          sx={{ borderRadius: 4 }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WallOfFameSection;

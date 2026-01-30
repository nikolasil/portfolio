'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  CircularProgress,
  Avatar,
  Container,
  Snackbar,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckIcon from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PushPinIcon from '@mui/icons-material/PushPin';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const EMOJIS = [
  '🔥',
  '💻',
  '🎨',
  '✨',
  '🤘',
  '🚀',
  '🍕',
  '❤️',
  '💡',
  '⚡',
  '🧠',
  '👾',
];
const COLORS = [
  '#FF4D4D', // Red
  '#FF9F43', // Orange
  '#FECA57', // Yellow
  '#1DD1A1', // Green
  '#48DBFB', // Light Blue
  '#5F27CD', // Purple
  '#F368E0', // Pink
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

const getRotation = (id: string) => {
  if (!id) return 0;
  const num = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (num % 6) - 3;
};

const WallOfFameSection = () => {
  const theme = useTheme();
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [selectedColor, setSelectedColor] = useState(COLORS[5]);
  const [mounted, setMounted] = useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
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

  // Remove the scroll logic from handleSubmit and use this:
  useEffect(() => {
    if (entries.length > 0 && mounted) {
      scrollAnchorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [mounted, entries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || cooldownSeconds > 0) return;
    setSubmitting(true);

    const newEntryStub = {
      name,
      message,
      emoji: selectedEmoji,
      color: selectedColor,
      timestamp: Date.now(),
      id: `tmp_${Date.now()}`,
      ip: '127.0.0.1',
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
        setEntries((prev) => [data.entry || newEntryStub, ...prev]);
        setName('');
        setMessage('');
        setAccordionExpanded(false);
        setSuccessMsg('Thank you for adding a post to the wall!');
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
        py: 4,
        px: { xs: 2, sm: 4, md: 10 },
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: `radial-gradient(${alpha(theme.palette.text.primary, 0.1)} 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ mb: 6 }}
        >
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

          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 600, fontWeight: 500, lineHeight: 1.6 }}
          >
            Leave your mark on the digital wall. <br />
            Inspire, joke, or just say hello!
          </Typography>
        </Stack>

        {/* Accordion Submission Form */}
        <Accordion
          elevation={0}
          expanded={accordionExpanded}
          onChange={(_, expanded) => setAccordionExpanded(expanded)}
          sx={{
            mb: { xs: 6, md: 8 },
            borderRadius: '24px !important',
            border: `1px solid ${theme.palette.divider}`,
            background: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(20px)',
            boxShadow: theme.shadows[4],
            overflow: 'hidden',
            '&:before': { display: 'none' },
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: theme.shadows[10],
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: { xs: 2, md: 4 },
              py: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <SendIcon fontSize="small" />
              </Avatar>
              <Typography fontWeight="700" color="text.primary">
                Write something new
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              px: { xs: 2, sm: 3, md: 5 },
              pb: { xs: 2, sm: 3, md: 5 },
              pt: 4,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{
                        ml: 1,
                        mb: 1,
                        display: 'block',
                        color: 'text.secondary',
                      }}
                    >
                      YOUR NAME
                    </Typography>
                    <TextField
                      placeholder="Captain Anonymous"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          bgcolor: 'background.paper',
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{
                        ml: 1,
                        mb: 1,
                        display: 'block',
                        color: 'text.secondary',
                      }}
                    >
                      PICK A COLOR
                    </Typography>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
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
                            transition: 'transform 0.2s',
                            transform:
                              selectedColor === col ? 'scale(1.2)' : 'scale(1)',
                            boxShadow:
                              selectedColor === col
                                ? `0 0 10px ${col}`
                                : 'none',
                            border:
                              selectedColor === col
                                ? '2px solid white'
                                : 'none',
                          }}
                        >
                          {selectedColor === col && (
                            <CheckIcon
                              sx={{
                                color: 'white',
                                fontSize: 14,
                                filter:
                                  'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
                              }}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Stack>

                <Box>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{
                      ml: 1,
                      mb: 1,
                      display: 'block',
                      color: 'text.secondary',
                    }}
                  >
                    VIBE CHECK
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      border: `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    {EMOJIS.map((emo) => (
                      <Button
                        key={emo}
                        onClick={() => setSelectedEmoji(emo)}
                        sx={{
                          minWidth: 40,
                          height: 40,
                          borderRadius: 2,
                          fontSize: '1.2rem',
                          bgcolor:
                            selectedEmoji === emo
                              ? alpha(theme.palette.primary.main, 0.1)
                              : 'transparent',
                          border:
                            selectedEmoji === emo
                              ? `1px solid ${theme.palette.primary.main}`
                              : '1px solid transparent',
                          filter:
                            selectedEmoji === emo
                              ? 'grayscale(0)'
                              : 'grayscale(1)',
                          opacity: selectedEmoji === emo ? 1 : 0.6,
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            filter: 'grayscale(0)',
                            opacity: 1,
                          },
                        }}
                      >
                        {emo}
                      </Button>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{
                      ml: 1,
                      mb: 1,
                      display: 'block',
                      color: 'text.secondary',
                    }}
                  >
                    YOUR MESSAGE
                  </Typography>
                  <TextField
                    placeholder="Share something awesome..."
                    multiline
                    rows={3}
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
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
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      fontWeight: 800,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: `0 8px 20px ${alpha(selectedColor, 0.4)}`,
                      bgcolor:
                        cooldownSeconds > 0
                          ? theme.palette.action.disabledBackground
                          : selectedColor,
                      '&:hover': {
                        bgcolor: selectedColor,
                        filter: 'brightness(0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 24px ${alpha(selectedColor, 0.5)}`,
                      },
                    }}
                  >
                    {submitting
                      ? 'Sending...'
                      : cooldownSeconds > 0
                        ? `Wait ${formatTime(cooldownSeconds)}`
                        : 'Post to Wall'}
                  </Button>
                  {cooldownSeconds > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={(cooldownSeconds / initialCooldown) * 100}
                      sx={{
                        mt: 2,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.grey[500], 0.2),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: selectedColor,
                          borderRadius: 3,
                        },
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </form>
          </AccordionDetails>
        </Accordion>

        <div ref={scrollAnchorRef} />
        
        {loading ? (
          <Stack alignItems="center" py={10}>
            <CircularProgress
              thickness={5}
              size={60}
              sx={{ color: theme.palette.text.secondary }}
            />
          </Stack>
        ) : (
          <Box
            sx={{
              columnCount: { xs: 1, sm: 2, md: 3 },
              columnGap: 3,
            }}
          >
            {entries.map((entry, idx) => {
              // Determine rotation once based on ID
              const rotation = getRotation(entry.id || idx.toString());

              return (
                <Grow in key={entry.id || idx} timeout={idx * 100 + 200}>
                  <Box
                    sx={{
                      breakInside: 'avoid',
                      mb: 4,
                      position: 'relative',
                      pt: 2, // Space for the pin
                    }}
                  >
                    {/* The Push Pin */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        filter: 'drop-shadow(2px 4px 2px rgba(0,0,0,0.2))',
                      }}
                    >
                      <PushPinIcon
                        sx={{
                          color: '#E74C3C',
                          fontSize: 32,
                          transform: 'rotate(15deg)',
                        }}
                      />
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        position: 'relative',
                        borderRadius: 4,
                        background: alpha(theme.palette.background.paper, 0.7),
                        backdropFilter: 'blur(10px)',
                        borderTop: `6px solid ${entry.color}`, // The glowing top border
                        boxShadow: theme.shadows[3],
                        transform: `rotate(${rotation}deg)`,
                        transition:
                          'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: `scale(1.03) rotate(0deg)`,
                          zIndex: 10,
                          boxShadow: `0 20px 40px -10px ${alpha(entry.color || '#000', 0.3)}`,
                          '& .quote-icon': {
                            transform: 'scale(1.2) rotate(-10deg)',
                            opacity: 0.15,
                          },
                        },
                      }}
                    >
                      {/* Watermark Icon */}
                      <FormatQuoteIcon
                        className="quote-icon"
                        sx={{
                          position: 'absolute',
                          bottom: -10,
                          right: 10,
                          fontSize: 80,
                          color: entry.color,
                          opacity: 0.05,
                          transform: 'rotate(0deg)',
                          transition: 'all 0.5s ease',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Header */}
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                        sx={{ mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: alpha(entry.color, 0.15),
                            color: entry.color,
                            fontWeight: 900,
                            width: 44,
                            height: 44,
                            border: `2px solid ${alpha(entry.color, 0.3)}`,
                          }}
                        >
                          {entry.name?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box sx={{ pt: 0.5 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="800"
                            lineHeight={1.1}
                          >
                            {entry.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontWeight="600"
                            color="text.secondary"
                            sx={{ opacity: 0.7 }}
                          >
                            {mounted
                              ? new Date(entry.timestamp).toLocaleString(
                                  undefined,
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                  },
                                )
                              : '...'}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: '2rem', ml: 'auto !important' }}
                        >
                          {entry.emoji}
                        </Typography>
                      </Stack>

                      {/* Message */}
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          sx={{
                            lineHeight: 1.6,
                            fontWeight: 500,
                            wordBreak: 'break-word',
                            fontSize: '1.05rem',
                          }}
                        >
                          &quot;{entry.message}&quot;
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Grow>
              );
            })}
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
          sx={{ borderRadius: 3, width: '100%' }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>

      {/* Success Snackbar (Thank you message) */}
      <Snackbar
        open={!!successMsg}
        autoHideDuration={5000}
        onClose={() => setSuccessMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMsg(null)}
          sx={{ borderRadius: 3, width: '100%', bgcolor: '#1DD1A1' }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WallOfFameSection;

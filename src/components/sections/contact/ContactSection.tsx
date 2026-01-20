'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Grow,
  IconButton,
} from '@mui/material';
import { Send, LinkedIn, GitHub } from '@mui/icons-material';

type ContactErrors = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const lastSentRef = useRef(0); // client-side rate limit

  const validate = () => {
    let valid = true;
    const newErrors: ContactErrors = { name: '', email: '', message: '' };

    // Name
    if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
      valid = false;
    }

    if (form.name.length > 60) {
      newErrors.name = 'Name is too long.';
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format.';
      valid = false;
    }

    if (form.email.length > 120) {
      newErrors.email = 'Email is too long.';
      valid = false;
    }

    // Message
    if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
      valid = false;
    }

    if (form.message.length > 2000) {
      newErrors.message = 'Message is too long.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error for that field
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limit: 1 message every 20 seconds
    const now = Date.now();
    if (now - lastSentRef.current < 20000) {
      alert('Please wait a moment before sending another message.');
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);

      lastSentRef.current = Date.now(); // update rate limit

      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send email.');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100dvh - 64px)',
        overflowY: isMobile ? 'auto' : 'visible',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 4,
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          📬 Contact Me
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Feel free to reach me out with questions, ideas, or collaboration
          opportunities.
        </Typography>

        <Grow in timeout={800}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              maxWidth: 600,
              margin: '0 auto',
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  required
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  name="message"
                  multiline
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                  size="large"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grow>

        <Stack direction="column" alignItems="center" spacing={1} mt={4}>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Or email me directly at{' '}
            <Box
              component="a"
              href="mailto:iliopoulos.info@gmail.com"
              sx={{
                textDecoration: 'underline',
                color: 'primary.main',
              }}
            >
              iliopoulos.info@gmail.com
            </Box>
          </Typography>

          <Stack direction="row" spacing={2} mt={1}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/nikolasiliopoulos/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{
                '&:hover': { color: theme.palette.primary.dark },
              }}
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/nikolasil"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                '&:hover': { color: theme.palette.text.primary },
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactSection;

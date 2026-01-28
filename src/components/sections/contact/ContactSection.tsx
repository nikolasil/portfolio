'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  useTheme,
  Paper,
  Grow,
  IconButton,
  alpha,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Send,
  LinkedIn,
  GitHub,
  Email,
  LocationOn,
  Phone,
} from '@mui/icons-material';

// --- Types ---
type ContactErrors = {
  name: string;
  email: string;
  message: string;
};

// --- Sub-components for cleaner JSX ---
const InfoItem = ({
  icon,
  title,
  value,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  color: string;
}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton
        sx={{
          bgcolor: alpha(color, 0.1),
          color: color,
          '&:hover': { bgcolor: alpha(color, 0.2) },
        }}
      >
        {icon}
      </IconButton>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {title}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          component={href ? 'a' : 'p'}
          href={href}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

const ContactSection = () => {
  const theme = useTheme();

  // --- State ---
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    _honeypot: '',
  });
  const [errors, setErrors] = useState<ContactErrors>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const lastSentRef = useRef(0);

  // --- Logic ---
  const validate = () => {
    let valid = true;
    const newErrors: ContactErrors = { name: '', email: '', message: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.name.trim().length < 2) {
      newErrors.name = 'Name is too short';
      valid = false;
    }
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (form.message.trim().length < 10) {
      newErrors.message = 'Please write a bit more (min 10 chars)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();

    if (now - lastSentRef.current < 20000) {
      setSnackbar({
        open: true,
        message: 'Slow down! Please wait 20s.',
        severity: 'error',
      });
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

      if (!res.ok) throw new Error();

      setSnackbar({
        open: true,
        message: 'Message sent successfully! 🚀',
        severity: 'success',
      });
      lastSentRef.current = Date.now();
      setForm({ name: '', email: '', message: '', _honeypot: '' });
    } catch (err) {
      console.debug(err);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Try again later.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, md: 8 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Phone sx={{ fontSize: '2rem' }} color="primary" />
        <Typography
          variant="h3"
          fontWeight="900"
          letterSpacing="-0.02em"
          fontSize="2rem"
        >
          Contact
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={8}
        alignItems="center"
      >
        {/* Left Side: Contact Info */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            fontWeight="900"
            gutterBottom
            sx={{ letterSpacing: '-0.02em' }}
          >
            Let&apos;s{' '}
            <span style={{ color: theme.palette.primary.main }}>Connect</span>!
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: '1rem', lineHeight: 1.6 }}
          >
            I&apos;m currently open to new opportunities and collaborations.
            Whether you have a question or just want to say hi, I&apos;ll try my
            best to get back to you!
          </Typography>

          <Stack spacing={3} mb={6}>
            <InfoItem
              icon={<Email />}
              title="Email Me"
              value="iliopoulos.info@gmail.com"
              href="mailto:iliopoulos.info@gmail.com"
              color={theme.palette.primary.main}
            />
            <InfoItem
              icon={<Phone />}
              title="Call Me"
              value="+1 (516) 263 5151"
              href="tel:+15162635151"
              color={theme.palette.success.main}
            />
            <InfoItem
              icon={<LocationOn />}
              title="Location"
              value="New York, United States"
              color={theme.palette.secondary.main}
            />
          </Stack>

          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Follow Me:
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/nikolasiliopoulos/"
                target="_blank"
                color="primary"
                sx={{
                  p: 0,
                  '&:hover': { transform: 'translateY(-2px)' },
                  transition: '0.2s',
                }}
              >
                <LinkedIn fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://github.com/nikolasil"
                target="_blank"
                sx={{
                  p: 0,
                  '&:hover': { transform: 'translateY(-2px)' },
                  transition: '0.2s',
                }}
              >
                <GitHub fontSize="large" />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {[
                {
                  href: 'https://stackoverflow.com/users/13285897',
                  src: 'https://img.shields.io/badge/-StackOverflow-FE7A16?style=flat&logo=stack-overflow&logoColor=white',
                  alt: 'Stack Overflow',
                },
                {
                  href: 'https://kaggle.com/nikolasil2000',
                  src: 'https://img.shields.io/badge/-Kaggle-20BEFF?style=flat&logo=kaggle&logoColor=white',
                  alt: 'Kaggle',
                },
                {
                  href: 'https://www.leetcode.com/nikolasil2000',
                  src: 'https://img.shields.io/badge/-LeetCode-FFA116?style=flat&logo=leetcode&logoColor=white',
                  alt: 'LeetCode',
                },
                {
                  href: 'https://discord.com/users/nikolasil#9639',
                  src: 'https://img.shields.io/badge/-Discord-5865F2?style=flat&logo=discord&logoColor=white',
                  alt: 'Discord',
                },
              ].map((badge, idx) => (
                <Box
                  key={idx}
                  component="a"
                  href={badge.href}
                  target="_blank"
                  sx={{
                    display: 'inline-block',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                    lineHeight: 0,
                  }}
                >
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    height={25}
                    width={100}
                    unoptimized
                    style={{ height: '25px', width: 'auto' }}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Right Side: Contact Form */}
        <Box sx={{ flex: 1.2, width: '100%' }}>
          <Grow in timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.05)}`,
                },
              }}
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="_honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  value={form._honeypot}
                  onChange={handleChange}
                />
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    variant="filled"
                    value={form.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    variant="filled"
                    value={form.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={4}
                    variant="filled"
                    value={form.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Send />
                      )
                    }
                    sx={{
                      py: 1.8,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grow>
        </Box>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;

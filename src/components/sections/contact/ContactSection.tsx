'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import { Email, Send } from '@mui/icons-material';
import SectionWrapper from '@/components/SectionWrapper';
import StarDotsBackground from '@/components/StarDotsBackground';

const ContactSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate an email service like EmailJS or Formspree here
    console.log('Form submitted:', form);
  };

  return (
    <SectionWrapper id="contact">
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100dvh - 64px)',
          overflowY: isMobile ? 'auto' : 'visible',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 0,
          }}
        >
          <StarDotsBackground
            starCount={isMobile ? 200 : 800}
            maxSpeed={0.8}
            twinkle
          />
        </Box>

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
            Feel free to reach out with questions, ideas, or collaboration
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
                  >
                    Send Message
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grow>

          <Typography
            variant="body2"
            textAlign="center"
            mt={4}
            color="text.secondary"
          >
            Or email me directly at{' '}
            <Box
              component="a"
              href="mailto:nicolas@example.com"
              sx={{
                textDecoration: 'underline',
                color: 'primary.main',
              }}
            >
              nicolas@example.com
            </Box>
          </Typography>
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default ContactSection;

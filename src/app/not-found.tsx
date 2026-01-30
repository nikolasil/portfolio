'use client';

import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

const NotFoundSection = () => {
  return (
    <Box
      sx={{
        height: 'calc(100dvh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontSize: { xs: '8rem', md: '12rem' },
          lineHeight: 1,
          background: (theme) =>
            `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={400} mb={4}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" component={Link} href="/">
          Go Home
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/contact?form_id=bug_report"
        >
          Report bug
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundSection;

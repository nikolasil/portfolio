'use client';

import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

const NotFoundSection = () => {
  return (
    <Box
      sx={{
        height: 'calc(100dvh - 64px)', // full viewport minus navbar height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        textAlign: 'center',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={{ fontSize: { xs: 80, sm: 120 } }}
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
          href="/contact"
        >
          Contact Us
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundSection;

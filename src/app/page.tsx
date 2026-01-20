'use client';

import IntroSection from '@/components/sections/intro/IntroSection';
import { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export default function IntroPage() {
  const theme = useTheme();
  // Detects if the screen is NOT mobile (md and up)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if it's the first visit
    const hasSeenNotice = localStorage.getItem('has-seen-mobile-notice');

    if (!hasSeenNotice && isMobile) {
      setOpen(true);
    }
  }, [isMobile]); // Re-run if screen size changes

  const handleClose = () => {
    localStorage.setItem('has-seen-mobile-notice', 'true');
    setOpen(false);
  };

  return (
    <>
      <IntroSection />
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        // Use a longer duration so they have time to read
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={handleClose}>
              DISMISS
            </Button>
          }
          sx={{ width: '100%', boxShadow: 3 }}
        >
          <strong>Mobile Mode Detected:</strong>
          Note that some features may be limited on smaller screens.
        </Alert>
      </Snackbar>
    </>
  );
}

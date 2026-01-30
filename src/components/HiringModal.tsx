'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useRouter } from 'next/navigation';

export default function HiringModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user has already dismissed this recently
    const isDismissed = localStorage.getItem('hiring_modal_dismissed');

    if (!isDismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (persist = false) => {
    setOpen(false);
    if (persist) {
      // Prevents the modal from showing up for 7 days
      localStorage.setItem('hiring_modal_dismissed', 'true');
    }
  };

  const handleNavigation = () => {
    handleClose(false);
    router.push('/contact?form_id=hiring_inquiry');
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      TransitionComponent={Fade}
      transitionDuration={500}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 1,
          maxWidth: '440px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pt: 1 }}>
        <IconButton onClick={() => handleClose(false)} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogTitle sx={{ textAlign: 'center', pt: 0 }}>
        <WorkOutlineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h5" fontWeight="800">
          Open to Opportunities
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          I’m currently seeking new opportunities in{' '}
          <strong>Software Engineering</strong>. Whether you have a role in mind
          or just want to talk tech, my inbox is open.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ flexDirection: 'column', gap: 1, px: 3, pb: 3 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleNavigation}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.2,
          }}
        >
          Get in Touch
        </Button>
        <Button
          fullWidth
          onClick={() => handleClose(true)}
          color="inherit"
          sx={{ textTransform: 'none', fontSize: '0.85rem', opacity: 0.7 }}
        >
          Don&apos;t show this again
        </Button>
      </DialogActions>
    </Dialog>
  );
}

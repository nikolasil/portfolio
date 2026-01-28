'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Snackbar,
  Alert,
  Button,
  Typography,
  Box,
  IconButton,
  Slide,
  SlideProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

function TransitionUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function WallPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 1. Always close the popup when the route changes
    setOpen(false);

    // 2. If the user is currently on the wall, mark it as visited in storage
    if (pathname === '/wall') {
      localStorage.setItem('hasVisitedWall', 'true');
      return;
    }

    // 3. Check if the user has EVER visited the wall previously
    const hasVisited = localStorage.getItem('hasVisitedWall');
    if (hasVisited) {
      return;
    }

    // 4. If they haven't visited and aren't on the wall, trigger popup
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleNavigate = () => {
    // Optional: Set it immediately upon click, though the useEffect will catch it anyway
    localStorage.setItem('hasVisitedWall', 'true');
    setOpen(false);
    router.push('/wall');
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      TransitionComponent={TransitionUp}
      sx={{ mb: { xs: 2, sm: 4 }, mr: { xs: 0, sm: 2 } }}
    >
      <Alert
        icon={<MapsUgcIcon fontSize="medium" />}
        severity="info"
        variant="outlined"
        sx={{
          width: '100%',
          minWidth: '300px',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 6,
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiAlert-icon': {
            color: 'primary.main',
          },
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleNavigate}
              sx={{ textTransform: 'none', fontWeight: 'bold', px: 2 }}
            >
              Visit
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            Check out the Wall of Fame!
          </Typography>
          <Typography variant="caption" color="text.secondary">
            See what other have leaved behind. Leave your own message too!
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}

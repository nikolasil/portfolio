'use client';

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import DesktopMenu from './DesktopMenu';
import MobileDrawer from './MobileDrawer';
import ThemeToggle from '../ThemeToggle';

export const pages = [
  {text: 'Home', navLink: '/'},
  { text: 'About', navLink: '/about' },
  { text: 'Education', navLink: '/education' },
  { text: 'Experience', navLink: '/experience' },
  { text: 'Skills', navLink: '/skills' },
  { text: 'Portfolio', navLink: '/portfolio' },
  { text: 'Contact', navLink: '/contact' },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: 2,
          flexWrap: 'wrap',
        }}
      >
        {!isMobile && <DesktopMenu />}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && <ThemeToggle />}

          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {isMobile && (
        <MobileDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
      )}
    </AppBar>
  );
};

export default Navbar;

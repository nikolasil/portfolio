'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DesktopMenu from './DesktopMenu';
import MobileDrawer from './MobileDrawer';
import ThemeToggle from '../ThemeToggle';
import Link from 'next/link';

// Exported as a constant for reuse in other components
export const NAV_ITEMS = [
  { text: 'Home', navLink: '/' },
  { text: 'About', navLink: '/about' },
  { text: 'Education', navLink: '/education' },
  { text: 'Experience', navLink: '/experience' },
  { text: 'Skills', navLink: '/skills' },
  { text: 'Portfolio', navLink: '/portfolio' },
  { text: 'Contact', navLink: '/contact' },
] as const;

const Navbar = () => {
  const theme = useTheme();
  // Using 'sm' or 'md' depending on how many nav items you have
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo / Brand Name */}
          <Typography
            variant="h6"
            component={Link} // Use Link as the underlying component
            href="/" // Link uses href
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none', // Remove default underline
              color: 'inherit', // Keep your branding color
            }}
          >
            &lt;Nikolas /&gt;
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DesktopMenu items={NAV_ITEMS} />
              <ThemeToggle />
            </Box>
          )}

          {/* Mobile Actions */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Drawer rendered outside Toolbar for cleaner DOM structure */}
      <MobileDrawer
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        items={NAV_ITEMS}
      />
    </AppBar>
  );
};

export default Navbar;

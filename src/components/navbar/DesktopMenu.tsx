'use client';

import { Box, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  text: string;
  navLink: string;
}

interface DesktopMenuProps {
  items: readonly NavItem[];
}

const DesktopMenu = ({ items }: DesktopMenuProps) => {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { md: 3, lg: 4 }, // Responsive spacing
      }}
    >
      {items.map((page) => {
        const isActive = pathname === page.navLink;

        return (
          <MuiLink
            key={page.text}
            component={Link}
            href={page.navLink}
            underline="none"
            sx={{
              position: 'relative',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: isActive ? 'primary.main' : 'text.secondary',
              transition: 'color 0.3s ease',

              // Smooth hover effect
              '&:hover': {
                color: 'primary.main',
              },

              // Animated Underline instead of static border
              '&::after': {
                content: '""',
                position: 'absolute',
                width: isActive ? '100%' : '0%',
                height: '2px',
                bottom: -4,
                left: 0,
                backgroundColor: 'primary.main',
                transition: 'width 0.3s ease-in-out',
              },

              '&:hover::after': {
                width: '100%',
              },

              // Accessibility: High contrast focus for keyboard users
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '4px',
                borderRadius: '4px',
              },
            }}
          >
            {page.text}
          </MuiLink>
        );
      })}
    </Box>
  );
};

export default DesktopMenu;

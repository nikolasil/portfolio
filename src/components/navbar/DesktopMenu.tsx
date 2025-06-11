'use client';

import { Box, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pages } from './NavBar';

const DesktopMenu = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {pages.map((page) => {
        const isActive = pathname === page.navLink;

        return (
          <MuiLink
            key={page.text}
            component={Link}
            href={page.navLink}
            color={isActive ? 'primary' : 'inherit'}
            underline="none"
            sx={{
              fontWeight: isActive ? 700 : 500,
              fontSize: '1rem',
              borderBottom: isActive ? '2px solid' : 'none',
              borderColor: 'primary.main',
              pb: '2px',
              transition: 'all 0.2s',
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

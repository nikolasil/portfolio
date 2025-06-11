'use client';

import {
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import { pages } from './NavBar';

interface Props {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ open, onClose }: Props) => {
  const pathname = usePathname();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 260,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <List>
          {pages.map((page) => {
            const isActive = pathname === page.navLink;

            return (
              <ListItem key={page.text} disableGutters onClick={onClose}>
                <MuiLink
                  component={Link}
                  href={page.navLink}
                  underline="none"
                  sx={{
                    px: 2,
                    py: 1.5,
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1rem',
                    width: '100%',
                    color: isActive ? 'primary.main' : 'text.primary',
                    backgroundColor: isActive ? 'action.hover' : 'transparent',
                    borderLeft: isActive
                      ? '4px solid'
                      : '4px solid transparent',
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {page.text}
                </MuiLink>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <ThemeToggle />
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;

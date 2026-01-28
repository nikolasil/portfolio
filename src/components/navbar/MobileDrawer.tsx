'use client';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';

interface NavItem {
  text: string;
  navLink: string;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

const MobileDrawer = ({ open, onClose, items }: MobileDrawerProps) => {
  const pathname = usePathname();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      // Ensure the drawer stays on top of other elements
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: 'background.default',
          backgroundImage: 'none', // Removes default MUI overlay tint in dark mode
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Menu
        </Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation List */}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {items.map((page) => {
          const isActive = pathname === page.navLink;

          return (
            <ListItem key={page.text} disablePadding>
              <ListItemButton
                component={Link}
                href={page.navLink}
                onClick={onClose}
                selected={isActive}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderLeft: '4px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  // Styling for the active/selected state
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter', // Use custom theme color or alpha(primary.main, 0.08)
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={page.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer / Bottom Actions */}
      <Box sx={{ p: 3, bgcolor: 'action.hover' }}>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          gutterBottom
        >
          Appearance
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">Theme Mode</Typography>
          <ThemeToggle />
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;

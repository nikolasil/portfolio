'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  Grow,
  Chip,
  Fab,
  Zoom,
  Stack,
  alpha,
  TextField,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WebIcon from '@mui/icons-material/Web';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ConstructionIcon from '@mui/icons-material/Construction';

// --- Data Structure ---
const SKILLS_DATA = [
  {
    category: 'Distributed Systems',
    icon: <SettingsSuggestIcon />,
    items: [
      'Spring Boot',
      'Apache Kafka',
      'Redis',
      'Concurrency',
      'System Design',
    ],
    color: '#61dafb', // Custom color for category branding
  },
  {
    category: 'Backend Engineering',
    icon: <TerminalIcon />,
    items: [
      'Java',
      'Python (FastAPI)',
      'Node.js',
      'RESTful API',
      'ETL Pipelines',
    ],
    color: '#4caf50',
  },
  {
    category: 'Frontend Engineering',
    icon: <WebIcon />,
    items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'MUI'],
    color: '#2196f3',
  },
  {
    category: 'DevOps & Cloud',
    icon: <CloudQueueIcon />,
    items: ['Docker', 'CI/CD', 'Grafana', 'Prometheus', 'AWS (EC2, S3)'],
    color: '#ff9800',
  },
  {
    category: 'Data & Storage',
    icon: <StorageIcon />,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch'],
    color: '#9c27b0',
  },
  {
    category: 'Architecture',
    icon: <IntegrationInstructionsIcon />,
    items: [
      'High Availability',
      'Fault-tolerance',
      'Caching',
      'Load Balancing',
      'Microservices',
    ],
    color: '#f44336',
  },
];

const SkillsSection = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Handle Scroll logic
  React.useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Logic: Filter groups if the category OR any item matches the search
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter(
      (group) =>
        group.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.items.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
  }, [searchTerm]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 10 }, minHeight: '100vh' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 8 }}
      >
        <ConstructionIcon sx={{ fontSize: '2rem' }} color="primary" />
        <Typography
          variant="h3"
          fontWeight="900"
          letterSpacing="-0.02em"
          fontSize="2rem"
        >
          Skills
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <TextField
          variant="outlined"
          placeholder="Search (e.g. Kafka, React)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: { xs: '100%', sm: '400px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              backdropFilter: 'blur(8px)',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Grid container spacing={4}>
        {filteredSkills.map((skillGroup, idx) => (
          <Grid key={skillGroup.category} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Grow in timeout={300 + idx * 100}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 6,
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.background.paper, 0.9)}, 
                    ${alpha(theme.palette.background.paper, 0.7)})`,
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                    '& .category-icon': {
                      transform: 'scale(1.2) rotate(10deg)',
                      color: skillGroup.color,
                    },
                  },
                }}
              >
                {/* Decorative background blob */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: alpha(
                      skillGroup.color || theme.palette.primary.main,
                      0.1,
                    ),
                    filter: 'blur(40px)',
                    zIndex: 0,
                  }}
                />

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  mb={3}
                  sx={{ zIndex: 1, position: 'relative' }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      color: 'text.secondary',
                      display: 'flex',
                      transition: 'all 0.3s ease',
                      fontSize: '2rem',
                    }}
                  >
                    {skillGroup.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="800"
                    sx={{ letterSpacing: 0.5 }}
                  >
                    {skillGroup.category}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    zIndex: 1,
                    position: 'relative',
                  }}
                >
                  {skillGroup.items.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="medium"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.text.primary, 0.03),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        '&:hover': {
                          bgcolor: alpha(
                            skillGroup.color || theme.palette.primary.main,
                            0.15,
                          ),
                          borderColor: skillGroup.color,
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s',
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <Stack alignItems="center" sx={{ mt: 10, opacity: 0.5 }}>
          <ConstructionIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6">
            No skills found matching &quot;{searchTerm}&quot;
          </Typography>
        </Stack>
      )}

      {/* Scroll Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          aria-label="scroll back to top"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            boxShadow: theme.shadows[10],
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default SkillsSection;

'use client';

import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WebIcon from '@mui/icons-material/Web';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ConstructionIcon from '@mui/icons-material/Construction';

const skillsData = [
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
  },
  {
    category: 'Frontend Engineering',
    icon: <WebIcon />,
    items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'MUI'],
  },
  {
    category: 'DevOps & Cloud',
    icon: <CloudQueueIcon />,
    items: ['Docker', 'CI/CD', 'Grafana', 'Prometheus', 'AWS (EC2, S3)'],
  },
  {
    category: 'Data & Storage',
    icon: <StorageIcon />,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch'],
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
  },
  {
    category: 'Testing',
    icon: <ConstructionIcon />,
    items: [
      'Spock',
      'Unit Testing',
      'Integration Testing',
      'TDD',
      'Automation',
    ],
  },
];

const SkillsSection = () => {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <Grid container spacing={3}>
        {skillsData.map((skillGroup, idx) => (
          /* Remove 'item' and wrap breakpoints in 'size' */
          <Grid key={idx} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Grow in timeout={500 + idx * 100}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  transition: 'all 0.3s ease-in-out',
                  // '&:hover': {
                  //   borderColor: theme.palette.primary.main,
                  //   transform: 'translateY(-5px)',
                  //   boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.1)}`,
                  // },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>
                    {skillGroup.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {skillGroup.category}
                  </Typography>
                </Stack>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skillGroup.items.map((item, i) => (
                    <Chip
                      key={i}
                      label={item}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        // '&:hover': {
                        //   bgcolor: 'primary.main',
                        //   color: 'white',
                        // },
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="medium"
          sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default SkillsSection;

'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
  Grow,
  useMediaQuery,
} from '@mui/material';
import SectionWrapper from '@/components/SectionWrapper';
import StarDotsBackground from '@/components/StarDotsBackground';

const skillsData = [
  {
    category: 'Distributed Systems & Microservices',
    items: [
      'Spring Boot',
      'Apache Kafka',
      'Redis',
      'Concurrency & Multithreading',
      'System Design Patterns',
    ],
  },
  {
    category: 'Backend Engineering',
    items: [
      'Java',
      'Python (FastAPI)',
      'Node.js (Express)',
      'RESTful API Design',
      'ETL & data pipelines',
    ],
  },
  {
    category: 'Frontend Engineering',
    items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'DevOps & Cloud',
    items: [
      'Docker',
      'CI/CD',
      'Observability (Grafana, Prometheus)',
      'AWS (EC2, S3)',
    ],
  },
  {
    category: 'Data & Storage',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'AWS S3'],
  },
  {
    category: 'Architectural & System Design',
    items: [
      'High Availability Systems',
      'Fault-tolerance',
      'Caching Strategies',
      'Load Balancing',
      'Modular Service Architecture',
      'Deisgn Patterns',
      'Short Circuiting',
    ],
  },
  {
    category: 'Testing',
    items: [
      'Spock',
      'Automation frmeworks',
      'Unit Testing',
      'Integration Testing',
      'End-to-End Testing',
      'Test-Driven Development (TDD)',
    ],
  },
];

const SkillsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SectionWrapper
      id="skills"
      backgroundElement={
        <StarDotsBackground
          starCount={isMobile ? 200 : 800}
          maxSpeed={0.8}
          twinkle={true}
        />
      }
    >
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100dvh - 64px)',
          overflowY: isMobile ? 'auto' : 'visible',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            py: 4,
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            🎯 Skills
          </Typography>

          <Stack spacing={6} mt={4}>
            {skillsData.map((skillGroup, idx) => (
              <Grow
                in
                key={idx}
                style={{ transformOrigin: '0 0 0' }}
                timeout={500 + idx * 200}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {skillGroup.category}
                  </Typography>

                  <ul style={{ paddingLeft: theme.spacing(3), margin: 0 }}>
                    {skillGroup.items.map((item, i) => (
                      <li key={i}>
                        <Typography variant="body2" color="text.primary">
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grow>
            ))}
          </Stack>
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default SkillsSection;

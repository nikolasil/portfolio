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
    category: 'Backend Development',
    items: [
      'Spring Boot',
      'Maven & Gradle',
      'Spring Data JPA',
      'Spring Security',
      'Apache Kafka',
      'Apache Tika',
      'Apache POI',
      'Node.js & Express.js',
      'FastAPI',
    ],
  },
  {
    category: 'Databases & Storage',
    items: [
      'SQL',
      'NoSQL (MongoDB, PostgreSQL, Db2, MySQL, Oracle)',
      'Redis',
      'Elasticsearch',
    ],
  },
  {
    category: 'Frontend Development',
    items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Programming Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'Python'],
  },
  {
    category: 'DevOps & Monitoring',
    items: [
      'Docker & Docker Compose',
      'Kubernetes',
      'Grafana',
      'Prometheus',
      'CI/CD Pipelines',
    ],
  },
  {
    category: 'Testing',
    items: ['Spock (Unit & Integration Testing)'],
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
            🛠 Skills
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

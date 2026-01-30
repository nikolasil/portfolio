'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
  Grow,
  Divider,
  alpha,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

// Simplified types for cleaner logic
export type Role = {
  title: string;
  date: string;
};

export type ExperienceEntry = {
  company: string;
  location: string;
  dateRange: string;
  roles: Role[];
  details: string[];
};

const experienceData: ExperienceEntry[] = [
  {
    company: 'TÜV AUSTRIA',
    location: 'Athens, Greece',
    dateRange: '06/2024 – 11/2025',
    roles: [{ title: 'Senior Software Engineer', date: '06/2024 – 11/2025' }],
    details: [
      'Collaborate in an agile engineering team to design and build a scalable client portal, enabling users to securely access and manage their data in a distributed environment.',
      'Accelerated platform evolution by integrating multiple tools and services into a unified ecosystem, applying system design principles such as modularization, API standardization and clear service boundaries.',
      'Drive architectural discussions and feature planning, ensuring solutions follow distributed system best practices, support horizontal scalability and use effective design patterns.',
      'Deliver end-to-end technical ownership across frontend and backend systems using Javascript and Java Spring Boot, leveraging caching layers (Redis/in-memeory caches) to reduce latency and improve system responsiveness.',
      'Address complex tenchnical challenges through performance tuning, dependency refactoring and iterative improvements.',
      'Deploy services using Docker to ensure consistent and portable runtime environments.',
      'Developed robust ETL pipelines using Python and FastAPI, optimizing distributed data extraction, tranformation and loading workflows to improve throughput, data cosnistency and reliability across systems.',
    ],
  },
  {
    company: 'Agile Actors',
    location: 'Athens, Greece',
    dateRange: '02/2022 – 06/2024',
    roles: [
      { title: 'Medior Software Engineer', date: '12/2022 – 06/2024' },
      { title: 'Junior Software Engineer', date: '02/2022 – 12/2022' },
    ],
    details: [
      'Led the migration from a monolithic system to a distributed microservice architecture, improving scalability, reliability and maintainability significantly.',
      'Designed and implemented system design components, including caching strategies with Redis and fault-tolerant services.',
      'Built a distributed web-crawler service for large-scale data enrichment, integrated into an event-driven architecture using Kafka.',
      'Optimized Spring Boot services with multithreading and custom thread pools to increase throughput and performance.',
      'Developed CI/CD pipelines using Jenkins and Docker and strengthened backend quality through unit testing with Spock.',
    ],
  },
];

const ExperienceSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4, md: 10 },
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {/* Header with Title and Summary */}
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 8 }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <WorkIcon sx={{ fontSize: '2rem' }} color="primary" />
          <Typography
            variant="h3"
            fontWeight="900"
            letterSpacing="-0.02em"
            fontSize="2rem"
          >
            Experience
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '700px', lineHeight: 1.6 }}
        >
          Senior Software Engineer with extensive experience in architecting
          distributed systems, migrating monoliths to microservices, and
          delivering high-performance backend solutions across various
          industries.
        </Typography>
      </Stack>

      <Stack spacing={4}>
        {experienceData.map((exp, idx) => (
          <Grow in key={idx} timeout={500 + idx * 200}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '6px',
                  height: '100%',
                  bgcolor: 'primary.main',
                },
              }}
            >
              {/* Company Header */}
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ md: 'center' }}
                mb={3}
              >
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <BusinessIcon color="primary" fontSize="small" />
                    <Typography variant="h5" fontWeight="800">
                      {exp.company}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: 'text.secondary', mt: 0.5 }}
                  >
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{exp.location}</Typography>
                  </Stack>
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{
                    color: 'primary.main',
                    mt: { xs: 1, md: 0 },
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    px: 2,
                    py: 0.5,
                    borderRadius: 10,
                  }}
                >
                  {exp.dateRange}
                </Typography>
              </Stack>

              {/* Roles Timeline */}
              <Box sx={{ mb: 3, pl: 1 }}>
                {exp.roles.map((role, rIdx) => (
                  <Box
                    key={rIdx}
                    sx={{
                      position: 'relative',
                      pl: 3,
                      pb: rIdx === exp.roles.length - 1 ? 0 : 2,
                    }}
                  >
                    {exp.roles.length > 1 && rIdx !== exp.roles.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '7px',
                          top: '20px',
                          bottom: 0,
                          width: '2px',
                          bgcolor: 'divider',
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '6px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        bgcolor: 'background.paper',
                      }}
                    />

                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      lineHeight={1.2}
                    >
                      {role.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {role.date}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Work Details */}
              <Box
                component="ul"
                sx={{ pl: 2, m: 0, '& li': { mb: 1.5, color: 'text.primary' } }}
              >
                {exp.details.map((detail, i) => (
                  <Box component="li" key={i}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {detail}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grow>
        ))}
      </Stack>
    </Box>
  );
};

export default ExperienceSection;

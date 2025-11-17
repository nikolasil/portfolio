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


export type Role = {
  title: string;
  date: string;
};

export type RoleGroup = {
  group?: Role[]; // optional, used if there are multiple roles in a company
  title?: string; // optional, for single roles
  date?: string; // optional, for single roles
  details: string[];
};

export type ExperienceEntry = {
  company: string;
  location: string;
  dateRange: string;
  roles: RoleGroup[];
};

export type ExperienceData = ExperienceEntry[];

const experienceData: ExperienceData = [
  {
    company: 'TÜV AUSTRIA',
    location: 'Athens, Greece',
    dateRange: '08/2024 – 10/2025',
    roles: [
      {
        title: 'Senior Software Engineer',
        date: '08/2024 – 10/2025',
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
    ],
  },
  {
    company: 'Agile Actors',
    location: 'Athens, Greece',
    dateRange: '02/2022 – 08/2024',
    roles: [
      {
        group: [
          {
            title: 'Medior Software Engineer',
            date: '12/2022 – 08/2024',
          },
          {
            title: 'Junior Software Engineer',
            date: '02/2022 – 12/2022',
          },
        ],
        details: [
          'Led the migration from a monolithic system to a distributed microservice architecture, improving scalability, reliability and maintainability significantly.',
          'Designed and implemented system design components, including caching strategies with Redis and fault-tolerant services.',
          'Built a distributed web-crawler service for large-scale data enrichment, integrated into an event-driven architecture using Kafka.',
          'Optimized Spring Boot services with multithreading and custom thread pools to increase throughput and performance.',
          'Developed CI/CD pipelines using Jenkins and Docker and strengthened backend quality through unit testing with Spock.',
        ],
      },
    ],
  },
];


const ExperienceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SectionWrapper
      id="experience"
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
            💼 Experience
          </Typography>

          <Stack spacing={6} mt={4}>
            {experienceData.map((exp, idx) => {
              const isSingle = exp.roles.length === 1;
              const isGroup = Boolean(exp.roles[0]?.group);

              return (
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
                    {/* 1️⃣ Single role, not grouped */}
                    {isSingle && !isGroup && (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {exp.roles[0].title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {exp.company} | {exp.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={2}
                        >
                          {exp.roles[0].date}
                        </Typography>
                        <ul
                          style={{ paddingLeft: theme.spacing(3), margin: 0 }}
                        >
                          {exp.roles[0].details.map((item, i) => (
                            <li key={i}>
                              <Typography variant="body2" color="text.primary">
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* 2️⃣ Single role object that contains a group (rare edge case) */}
                    {isSingle && isGroup && (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {exp.company}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {exp.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={2}
                        >
                          {exp.dateRange}
                        </Typography>
                        <Box mt={2} mb={2}>
                          {exp.roles[0].group?.map((role, rIdx) => (
                            <Typography
                              key={rIdx}
                              variant="body1"
                              fontWeight="bold"
                              sx={{ display: 'block' }}
                            >
                              {role.title}{' '}
                              <span
                                style={{
                                  fontWeight: 400,
                                  color: theme.palette.text.secondary,
                                }}
                              >
                                — {role.date}
                              </span>
                            </Typography>
                          ))}
                        </Box>
                        <ul
                          style={{ paddingLeft: theme.spacing(3), margin: 0 }}
                        >
                          {exp.roles[0].details.map((item, i) => (
                            <li key={i}>
                              <Typography variant="body2" color="text.primary">
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* 3️⃣ Multiple roles grouped under one object */}
                    {!isSingle && isGroup && (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {exp.company}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {exp.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={3}
                        >
                          {exp.dateRange}
                        </Typography>
                        <Box mt={2} mb={3}>
                          {exp.roles[0].group?.map((role, rIdx) => (
                            <Typography
                              key={rIdx}
                              variant="body1"
                              fontWeight="bold"
                              sx={{ display: 'block' }}
                            >
                              {role.title}{' '}
                              <span
                                style={{
                                  fontWeight: 400,
                                  color: theme.palette.text.secondary,
                                }}
                              >
                                — {role.date}
                              </span>
                            </Typography>
                          ))}
                        </Box>
                        <ul
                          style={{ paddingLeft: theme.spacing(3), margin: 0 }}
                        >
                          {exp.roles[0].details.map((item, i) => (
                            <li key={i}>
                              <Typography variant="body2" color="text.primary">
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* 4️⃣ Multiple roles, not grouped */}
                    {!isSingle && !isGroup && (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {exp.company}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {exp.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={3}
                        >
                          {exp.dateRange}
                        </Typography>
                        {exp.roles.map((role, rIdx) => (
                          <Box key={rIdx} mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {role.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mb={1}
                            >
                              {role.date}
                            </Typography>
                            <ul
                              style={{
                                paddingLeft: theme.spacing(3),
                                margin: 0,
                              }}
                            >
                              {role.details.map((item, i) => (
                                <li key={i}>
                                  <Typography
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {item}
                                  </Typography>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        ))}
                      </>
                    )}
                  </Paper>
                </Grow>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default ExperienceSection;

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

const experienceData = [
  {
    title: 'Senior Software Engineer',
    subtitle: 'TÜV AUSTRIA | Athens, Greece',
    date: '08/2024 – Present',
    details: [
      'Collaborating in an agile team to develop and enhance a client portal, enabling users to securely access and manage their data.',
      'Drove the platform’s evolution by integrating various tools and functionalities, transforming it into a comprehensive multifunctional solution that consolidates multiple services within a unified interface.',
      'Actively contributed in feature discussions and architectural decisions.',
      'Providing technical expertise to both frontend and backend services, ensuring seamless integration and performance across the entire stack using JavaScript and Java Spring Boot.',
      'Addressing complex technical challenges, optimizing system performance, and implementing iterative improvements based on user feedback and evolving needs.',
      'Created ETL workflows using Python with FastAPI to extract, transform, and load data to the database.',
    ],
  },
  {
    title: 'Medior Software Engineer',
    subtitle: 'Agile Actors | Athens, Greece',
    date: '07/2022 – 08/2024',
    details: [
      'Took ownership of key projects, demonstrating strong problem-solving skills and delivering high-quality results.',
      'Led the transformation of a monolithic system into a web services-oriented architecture, improving scalability and maintainability.',
      'Developed a web crawler service to enrich the database, integrated via event-driven architecture using Apache Kafka.',
      'Built and deployed a company-wide CI/CD pipeline, utilizing Jenkins and Docker, ensuring efficient, reliable, and scalable deployments.',
      'Introduced unit tests with Spock, improving backend component reliability and reducing bugs.',
      'Played a key role in architectural decisions and implemented solutions using Java (versions 6–21) and Spring Boot.',
    ],
  },
  {
    title: 'Junior Software Engineer',
    subtitle: 'Agile Actors | Athens, Greece',
    date: '02/2022 – 07/2022 | Internship (6 Months)',
    details: [
      'Contributed to backend and frontend development tasks under senior guidance.',
      'Supported CI/CD pipeline development and deployment processes.',
      'Gained practical experience with Java, Spring Boot, and modern development practices.',
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
            {experienceData.map((exp, idx) => (
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
                  <Typography variant="h6" fontWeight="bold">
                    {exp.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {exp.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {exp.date}
                  </Typography>

                  {exp.details.length > 1 ? (
                    <ul style={{ paddingLeft: theme.spacing(3), margin: 0 }}>
                      {exp.details.map((item, i) => (
                        <li key={i}>
                          <Typography variant="body2" color="text.primary">
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2" color="text.primary">
                      {exp.details[0]}
                    </Typography>
                  )}
                </Paper>
              </Grow>
            ))}
          </Stack>
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default ExperienceSection;

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

const educationData = [
  {
    title: 'National and Kapodistrian University of Athens',
    subtitle:
      'BSc in Computer Science, Department of Informatics and Telecommunications',
    date: '09/2018 – 02/2023',
    details: [
      'Grade: 7.36/10 (~3.0 GPA)',
      'Languages: C, C++, Java, Python, JavaScript',
      'Data Structures, Algorithms & Problem Solving',
      'Artificial Intelligence & Machine Learning',
      'Web Development',
      'Multithreading & Shared Memory',
      'Computer Networks',
      'Mathematics: Linear Algebra, Probabilities, Calculus II',
    ],
  },
  {
    title: 'High School',
    subtitle: 'Science Direction',
    date: '2016 – 2018',
    details: ['General studies with a science focus.'],
  },
];

const EducationSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100dvh - 64px)', // subtract navbar height
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
          🎓 Education
        </Typography>

        <Stack spacing={6} mt={4}>
          {educationData.map((edu, idx) => (
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
                  {edu.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {edu.subtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {edu.date}
                </Typography>

                {edu.details.length > 1 ? (
                  <ul style={{ paddingLeft: theme.spacing(3), margin: 0 }}>
                    {edu.details.map((item, i) => (
                      <li key={i}>
                        <Typography variant="body2" color="text.primary">
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" color="text.primary">
                    {edu.details[0]}
                  </Typography>
                )}
              </Paper>
            </Grow>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default EducationSection;

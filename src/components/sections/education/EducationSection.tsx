'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
  Grow,
  Chip,
  Divider,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School'; 

const educationData = [
  {
    title: 'National and Kapodistrian University of Athens',
    subtitle: 'BSc in Computer Science',
    department: 'Department of Informatics and Telecommunications',
    date: '09/2018 – 02/2023',
    grade: '7.36/10 (~3.0 GPA)',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'React'],
    details: [
      'Data Structures, Algorithms & Problem Solving',
      'Artificial Intelligence & Machine Learning',
      'Multithreading & Shared Memory',
      'Computer Networks',
    ],
  },
  {
    title: 'High School',
    subtitle: 'Science Direction',
    date: '2016 – 2018',
    details: ['General studies with a science focus.'],
  },
];

const EducationItem = ({
  edu,
  index,
}: {
  edu: (typeof educationData)[0];
  index: number;
}) => {
  const theme = useTheme();

  return (
    <Grow in timeout={500 + index * 200}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          // '&:hover': {
          //   transform: 'translateY(-4px)',
          //   boxShadow: theme.shadows[8],
          //   borderColor: theme.palette.primary.main,
          // },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="800"
              color="primary.main"
              gutterBottom
              fontSize="1.3rem"
            >
              {edu.title}
            </Typography>
            <Typography variant="subtitle1" fontWeight="600">
              {edu.subtitle}
            </Typography>
            {edu.department && (
              <Typography variant="body2" color="text.secondary">
                {edu.department}
              </Typography>
            )}
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ color: 'text.secondary', minWidth: 'fit-content' }}
          >
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="caption" fontWeight="bold">
              {edu.date}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {edu.grade && (
          <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Grade:{' '}
            <Box component="span" color="primary.main">
              {edu.grade}
            </Box>
          </Typography>
        )}

        {/* Skills/Languages as Chips */}
        {edu.skills && (
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {edu.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        )}

        <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 0.5 } }}>
          {edu.details.map((detail, i) => (
            <Box component="li" key={i}>
              <Typography variant="body2" color="text.secondary">
                {detail}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Grow>
  );
};

const EducationSection = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4, md: 10 },
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 8 }}
      >
        <SchoolIcon sx={{ fontSize: '2rem' }} color="primary" />
        <Typography
          variant="h3"
          fontWeight="900"
          letterSpacing="-0.02em"
          fontSize="2rem"
        >
          Education
        </Typography>
      </Stack>

      <Stack spacing={4} position="relative">
        {/* Vertical Line for Timeline effect (hidden on mobile) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            left: -24,
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: 'divider',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: -4,
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'primary.main',
            },
          }}
        />

        {educationData.map((edu, idx) => (
          <EducationItem key={idx} edu={edu} index={idx} />
        ))}
      </Stack>
    </Box>
  );
};

export default EducationSection;

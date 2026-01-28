'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  useTheme,
  Grid,
  Chip,
  alpha,
  Skeleton,
  Tooltip,
  Button,
  Divider,
} from '@mui/material';
import {
  Storage,
  Code,
  Person,
  AutoAwesome,
  Security,
  Speed,
  LocationOn,
  Cake,
  School,
  FileDownload,
  Public
} from '@mui/icons-material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TerminalIcon from '@mui/icons-material/Terminal';
import projectsData from '../portfolio/PortfolioSection';

const AboutSection = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [commitCount, setCommitCount] = useState('1k+');
  const [repoCount, setRepoCount] = useState('20+');

  const skills = [
    {
      label: 'Java Spring Boot',
      icon: <Storage fontSize="small" />,
      detail: 'Microservices & Enterprise Logic',
    },
    {
      label: 'Distributed Systems',
      icon: <SettingsSuggestIcon fontSize="small" />,
      detail: 'Kafka, Redis, & Event-Driven Arch',
    },
    {
      label: 'CS Foundations',
      icon: <IntegrationInstructionsIcon fontSize="small" />,
      detail: 'C++, Assembly, & Algorithms',
    },
    {
      label: 'React / Next.js',
      icon: <Code fontSize="small" />,
      detail: 'Modern UI & SSR',
    },
    {
      label: 'Python / FastAPI / AI',
      icon: <TerminalIcon fontSize="small" />,
      detail: 'Automation, ETL & ML Pipelines',
    },
    {
      label: 'Cloud & DevOps',
      icon: <CloudQueueIcon fontSize="small" />,
      detail: 'Docker, AWS, CI/CD & Testing',
    },
  ];

  const principles = [
    {
      title: 'Under the Hood',
      desc: 'Deep understanding of internals, from memory management to thread synchronization.',
      icon: <Security color="primary" />,
    },
    {
      title: 'Scalability',
      desc: 'Architecting distributed systems that grow seamlessly with demand.',
      icon: <Speed color="primary" />,
    },
    {
      title: 'Production Grade',
      desc: 'Prioritizing maintainability, robust testing, and clean documentation.',
      icon: <AutoAwesome color="primary" />,
    },
  ];

  useEffect(() => {
    const fetchGithubData = async () => {
      const username = 'nikolasil';
      try {
        const [commitRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/search/commits?q=author:${username}`, {
            headers: { Accept: 'application/vnd.github.cloak-preview' },
          }),
          fetch(`https://api.github.com/users/${username}`),
        ]);
        const commitData = await commitRes.json();
        if (commitData.total_count) {
          const count = commitData.total_count;
          setCommitCount(
            count >= 1000 ? `${(count / 1000).toFixed(1)}k+` : `${count}+`,
          );
        }
        const userData = await userRes.json();
        if (userData.public_repos) setRepoCount(`${userData.public_repos}+`);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGithubData();
  }, []);

  const totalProjectsCount = Object.values(projectsData).flat().length;

  const stats = [
    { label: 'Years Exp.', value: new Date().getFullYear() - 2022 + '+' },
    { label: 'Commits', value: commitCount },
    { label: 'Repos', value: repoCount },
    {
      label: 'Portfolio',
      value: (totalProjectsCount > 0 ? totalProjectsCount : 20) + '+',
    },
  ];

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const myAge = calculateAge('2000-11-28');

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4, md: 10 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 8 }}
      >
        <Person sx={{ fontSize: "2rem" }} color="primary" />
        <Typography variant="h3" fontWeight="900" letterSpacing="-0.02em" fontSize="2rem">
          About Me
        </Typography>
      </Stack>

      <Grid container spacing={8}>
        {/* Left Column: Bio & Experience */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography
            variant="h4"
            fontWeight="800"
            gutterBottom
            sx={{ lineHeight: 1.2 }}
            fontSize="1.3rem"
          >
            Engineering scalable solutions with{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              purpose
            </Box>
            !
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, fontSize: '1rem', lineHeight: 1.8 }}
          >
            I&apos;m a <strong>Senior Software Engineer</strong> with a deep focus
            on Distributed Systems and Microservices architecture. I thrive on
            turning complex technical challenges into seamless, high-performance
            reality.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, fontSize: '1rem', lineHeight: 1.8 }}
          >
            I don&apos;t just memorize syntax. I focus on perspective. Whether
            it&apos;s
            <strong> Java Spring Boot, Python, or React</strong>, I engineer
            production-grade systems that solve real human headaches.
          </Typography>

          {/* Stats Row */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, sm: 3 }} key={index}>
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  {loading ? (
                    <Skeleton width="60%" height={40} />
                  ) : (
                    <Typography variant="h4" fontWeight="800" color="primary">
                      {stat.value}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    fontWeight="700"
                    color="text.secondary"
                    sx={{ letterSpacing: 1 }}
                  >
                    {stat.label.toUpperCase()}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Principles */}
          <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>
            Core Engineering Principles
          </Typography>
          <Grid container spacing={3}>
            {principles.map((p) => (
              <Grid size={{ xs: 12, sm: 4 }} key={p.title}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {p.icon}
                    <Typography variant="subtitle2" fontWeight="700">
                      {p.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {p.desc}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column: Quick Facts & Resume */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              py: 2,
              px: 3,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              border: `1px solid ${theme.palette.divider}`,
              position: 'sticky',
              top: 100,
            }}
          >
            <Typography variant="h6" fontWeight="800" gutterBottom>
              Quick Facts
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2.5} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Cake color="primary" fontSize="small" />
                <Typography variant="body2">
                  <strong>Age:</strong> {myAge} Years Old
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Public color="primary" fontSize="small" />
                <Typography variant="body2">
                  <strong>Born:</strong> Athens, Greece
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <LocationOn color="primary" fontSize="small" />
                <Typography variant="body2">
                  <strong>Based in:</strong> New York City, NY
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <School color="primary" fontSize="small" />
                <Typography variant="body2">
                  <strong>Education:</strong> B.S. Computer Science
                </Typography>
              </Stack>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<FileDownload />}
              href="/resume/Nikolas Iliopoulos.pdf"
              target="_blank"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: theme.shadows[4],
              }}
            >
              Download Resume
            </Button>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" fontWeight="800" gutterBottom>
                Technical Toolbelt
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill) => (
                  <Tooltip key={skill.label} title={skill.detail} arrow>
                    <Chip
                      label={skill.label}
                      size="small"
                      sx={{
                        borderRadius: 1,
                        fontWeight: 600,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Focus Badge */}
      <Box
        sx={{
          mt: 8,
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderLeft: `6px solid ${theme.palette.primary.main}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AutoAwesome color="primary" />
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          <strong>Current Focus:</strong> Architecting event-driven pipelines
          with Kafka and exploring RAG patterns in AI-integrated applications.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutSection;

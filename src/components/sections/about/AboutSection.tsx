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
} from '@mui/material';
import {
  Storage,
  Code,
  Person,
  AutoAwesome,
  Security,
  Speed,
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

  // Updated principles to match the "Production Grade" & "Under the hood" philosophy
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
        if (userData.public_repos) {
          setRepoCount(`${userData.public_repos}+`);
        }
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

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, sm: 4, md: 10 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="900"
        textAlign="center"
        gutterBottom
        sx={{ mb: 8 }}
      >
        <Person
          sx={{ fontSize: 35, verticalAlign: 'middle', mr: 1, mb: 0.5 }}
          color="primary"
        />{' '}
        About Me
      </Typography>

      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          {/* Hero Text */}
          <Typography variant="h3" fontWeight="900" gutterBottom>
            Engineering scalable solutions with{' '}
            <span style={{ color: theme.palette.primary.main }}>purpose</span>.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
          >
            I&apos;m a Senior Software Engineer with a Bachelor’s in Computer
            Science and a passion for engineering scalable, high-availability
            solutions. My expertise spans the full stack, with a deep focus on
            Distributed Systems and Microservices architecture. I thrive on
            turning complex technical challenges into seamless, high-performance
            reality.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
          >
            I don&apos;t just memorize syntax; I focus on perspective. Whether it&apos;s{' '}
            <strong>Java Spring Boot, Python, or React</strong>, I engineer
            production-grade systems that solve real human headaches—automating
            the boring stuff so users can focus on their goals.
          </Typography>
          {/* Stats Row with Skeleton Support */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 6 }}
            sx={{ mb: 6 }}
          >
            {stats.map((stat, index) => (
              <Box key={index}>
                {loading ? (
                  <Skeleton width={60} height={40} />
                ) : (
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stat.value}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{ letterSpacing: 1 }}
                >
                  {stat.label.toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* Core Principles Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {principles.map((p) => (
              <Grid size={{ xs: 12, sm: 4 }} key={p.title}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  {p.icon}
                  <Typography variant="subtitle1" fontWeight="bold">
                    {p.title}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {p.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Technical Toolbelt Overview*/}
          <Typography
            variant="subtitle2"
            fontWeight="900"
            gutterBottom
            sx={{ letterSpacing: 1, mb: 2 }}
          >
            Technical Toolbelt Overview:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 6 }}>
            {skills.map((skill) => (
              <Tooltip
                key={skill.label}
                title={skill.detail}
                enterTouchDelay={0}
                leaveTouchDelay={2000}
              >
                <Chip
                  icon={skill.icon}
                  label={skill.label}
                  sx={{
                    py: 2.5,
                    px: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    border: `1px solid ${theme.palette.divider}`,
                    transition: '0.3s',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      borderColor: theme.palette.primary.main,
                    },
                    '& .MuiChip-icon': { color: theme.palette.primary.main },
                  }}
                />
              </Tooltip>
            ))}
          </Box>

          {/* Current Focus Badge */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              <strong>Current Focus:</strong> Architecting event-driven
              pipelines with Kafka and exploring RAG patterns in AI-integrated
              applications.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutSection;

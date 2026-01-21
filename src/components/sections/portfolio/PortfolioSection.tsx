'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  Grow,
  Collapse,
  Paper,
  Stack,
  Typography,
  Badge,
  IconButton,
  Grid,
  alpha,
  useTheme,
  Switch,
  FormControlLabel,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';

export type Project = {
  cat: string;
  id: string;
  title: string;
  dec: string;
  url: string;
  tags: string[];
  important?: boolean;
  context?: string;
};

export type ProjectsData = {
  [category: string]: Project[];
};

const projectsData: ProjectsData = {
  ai_ml: [
    {
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'ai-email-assistant',
      title: 'Async AI Property Assistant',
      dec: 'An industrial-grade backend service using Python Asyncio and OpenAI to automate property management. Features a concurrent workflow engine that parses tenant requests, classifies intent, and generates structured action tickets.',
      url: 'https://github.com/nikolasil/property-management-assistant-ai',
      tags: ['Python', 'Asyncio', 'OpenAI', 'LLMs', 'System Design'],
      important: true,
    },
    {
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'transformer-qa-bert',
      important: true,
      title: 'Question Answering with Transformer Architectures',
      dec: 'Fine-tuned BERT and DistilBERT models for Extractive Question Answering. Performed cross-dataset validation between SQuAD 2.0 and TriviaQA, optimizing sequence lengths and memory management for Tesla P100 GPUs.',
      url: 'https://github.com/nikolasil/transformer-qa-bert-squad',
      tags: [
        'PyTorch',
        'Transformers',
        'BERT',
        'HuggingFace',
        'Transfer Learning',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'nlp-sentiment-evolution',
      title: 'NLP Evolution: Logistic Regression to LSTMs',
      dec: 'An end-to-end comparative study of sentiment classification. Progressed from classical ML (TF-IDF, Softmax) to Deep Learning (PyTorch FFNN) and Sequential Modeling (LSTM/GRU).',
      url: 'https://github.com/nikolasil?tab=repositories&q=nlp-sentiment-analysis',
      tags: ['PyTorch', 'NLP', 'LSTMs', 'Scikit-Learn', 'Deep Learning'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'berkeley-pacman-master',
      title: 'Berkeley Pacman AI Suite',
      dec: 'Implementation of core AI foundations including Algorithmic Search (DFS, BFS, A*), Heuristic Design, and Adversarial Search (Minimax, Alpha-Beta Pruning, Expectimax).',
      url: 'https://github.com/nikolasil?tab=repositories&q=Berkeley-Pacman',
      tags: ['Python', 'Algorithms', 'Game Theory', 'State-Space Search'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  systems: [
    {
      cat: 'Systems Programming & Operating Systems',
      id: 'parallel-inverted-index',
      important: true,
      title: 'Parallel Inverted Search Engine',
      dec: 'A high-performance C++ search engine using a custom thread-pool and job scheduler. Implements BK-Trees for fuzzy matching and lock-free Inverted Hash Tables for near-linear scalability.',
      url: 'https://github.com/nikolasil/InvertedSearchEngine',
      tags: ['C++', 'Multithreading', 'Lock-Free', 'Low-Level', 'Concurrency'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming & Operating Systems',
      id: 'networked-vaccine-monitor',
      important: true,
      title: 'Networked TCP Monitor System',
      dec: 'A high-concurrency distributed system over TCP/IP. Implements a thread-pooled server with a synchronized Cyclic Buffer (Producer-Consumer) for real-time parallel data ingestion.',
      url: 'https://github.com/nikolasil/vaccineMonitor_3',
      tags: ['C++', 'Sockets', 'TCP/IP', 'Pthreads', 'Distributed Systems'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming & Operating Systems',
      id: 'db-file-structures',
      title: 'Storage Engine: Heap & Hash Structures',
      dec: 'A low-level storage engine implementation in C. Developed custom Block-level management for Heap files and Primary/Secondary Hash Tables with overflow handling.',
      url: 'https://github.com/nikolasil/FileStructure-BlockHeapHashFiles-SecondaryIndex',
      tags: ['C', 'Database Internals', 'File Systems', 'Data Structures'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming & Operating Systems',
      id: 'os-ram-pagination',
      title: 'Virtual Memory & Pagination Simulator',
      dec: 'Architectural simulation of an MMU. Implements Hashed Page Tables and evaluates LRU vs. Second Chance (Clock) algorithms using real-world memory traces.',
      url: 'https://github.com/nikolasil/HashedPagedTable-LRU-SecondChange',
      tags: ['C', 'Memory Management', 'Operating Systems', 'Algorithms'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming & Operating Systems',
      id: 'ipc-shared-mem',
      title: 'IPC: Shared Memory & Semaphores',
      dec: 'Multi-process system utilizing POSIX Shared Memory and Semaphores. Features custom packet framing with checksums and thread-managed non-blocking UI.',
      url: 'https://github.com/nikolasil/ipc-shared-memory-synchronization',
      tags: ['C', 'POSIX', 'IPC', 'Semaphores', 'System Programming'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  compilers: [
    {
      cat: 'Compilers & Language Engineering',
      id: 'comp-llvm-gen',
      important: true,
      title: 'MiniJava to LLVM IR Compiler',
      dec: 'Full compiler backend for MiniJava. Implements Virtual Tables (VTables) for dynamic dispatch, heap allocation, and automated LLVM IR generation.',
      url: 'https://github.com/nikolasil/compiler-llvm-generator',
      tags: ['Java', 'LLVM', 'Compilers', 'Static Analysis'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Compilers & Language Engineering',
      id: 'comp-minijava-check',
      title: 'MiniJava Semantic Analyzer',
      dec: 'Multi-pass static analysis tool. Implements a Symbol Table to handle class inheritance, method overriding, and nested scopes for type safety.',
      url: 'https://github.com/nikolasil/compiler-minijava-check',
      tags: ['Java', 'Visitor Pattern', 'Typesetting', 'Software Verification'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  data_science: [
    {
      cat: 'Data Science & Mining',
      id: 'nyc-taxi-duration-predictor',
      title: 'NYC Taxi Geospatial Predictor',
      dec: 'End-to-end spatial-temporal regression. Uses Random Forest and K-Means to predict trip durations via geospatial outlier filtering and Manhattan distance calculations.',
      url: 'https://github.com/nikolasil/nyc-taxi-duration-predictor',
      tags: [
        'Scikit-Learn',
        'Pandas',
        'Geospatial',
        'Python',
        'Data Visualization',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Data Science & Mining',
      id: 'vaccine-sentiment-lda',
      title: 'COVID-19 Vaccine Topic Modeling',
      dec: 'Large-scale discourse analysis using LDA to extract hidden discussion topics, optimized via Coherence Score analysis and time-series sentiment tracking.',
      url: 'https://github.com/nikolasil/vaccine-sentiment-lda-mining',
      tags: ['NLP', 'LDA', 'Python', 'Topic Modeling'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  security: [
    {
      cat: 'Cybersecurity',
      id: 'sec-eclass-attack',
      important: true,
      title: 'Defensive Patching & Pentesting',
      dec: 'Security audit of Open eClass CMS. Implemented defenses against OWASP Top 10 and conducted penetration tests for SQLi, XSS, and CSRF.',
      url: 'https://github.com/nikolasil/security-1-openeclass',
      tags: ['PHP', 'Web Security', 'Pentesting', 'Docker', 'OWASP'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  web: [
    {
      cat: 'Web Applications',
      id: 'web-portfolio',
      important: true,
      title: 'Engineering Portfolio',
      dec: 'A modern, responsive portfolio built with Next.js and MUI to showcase complex software engineering projects.',
      url: 'https://github.com/nikolasil/portfolio',
      tags: ['Next.js', 'MaterialUI', 'React', 'JavaScript'],
    },
    {
      cat: 'Web Applications',
      id: 'iliopoulosrent',
      title: 'Luxury Vacation Rental Platform',
      dec: 'High-performance Next.js platform with SSR and advanced image optimization. Focused on SEO and conversion to reduce third-party booking dependency.',
      url: 'https://github.com/nikolasil/iliopoulosrent',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    },
  ],
};

const ProjectCard = ({ proj, index }: { proj: Project; index: number }) => {
  const theme = useTheme();

  return (
    <Grow in timeout={400 + index * 100}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          border: `1px solid ${proj.important ? alpha(theme.palette.primary.main, 0.3) : theme.palette.divider}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: proj.important
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.05)}`,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box>
            <Stack direction="row" spacing={1} mb={1}>
              {proj.important && (
                <Chip
                  icon={<StarIcon sx={{ fontSize: '12px !important' }} />}
                  label="Featured"
                  size="small"
                  color="primary"
                  sx={{
                    height: 18,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    px: 0.5,
                  }}
                />
              )}
              {proj.context && (
                <Chip
                  icon={<SchoolIcon sx={{ fontSize: '12px !important' }} />}
                  label="University"
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 18,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    px: 0.5,
                  }}
                />
              )}
            </Stack>
            <Typography variant="h6" fontWeight="800" lineHeight={1.3}>
              {proj.title}
            </Typography>
            {proj.context && (
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ display: 'block', mt: 0.5, fontWeight: 600 }}
              >
                {proj.context}
              </Typography>
            )}
          </Box>
          {proj.url?.includes('github') && (
            <GitHubIcon sx={{ color: 'text.disabled', fontSize: 20, ml: 1 }} />
          )}
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 'auto', minHeight: '60px' }}
        >
          {proj.dec}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 2 }}
          >
            {proj.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                }}
              />
            ))}
          </Stack>

          <Button
            fullWidth
            href={proj.url}
            target="_blank"
            variant="contained"
            disableElevation
            endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
          >
            View Source
          </Button>
        </Box>
      </Paper>
    </Grow>
  );
};

const PortfolioSection = () => {
  const theme = useTheme();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedTags, setselectedTags] = useState<string[]>([]);
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    Object.values(projectsData).forEach((projects) => {
      projects.forEach((proj) => proj.tags.forEach((t) => tagSet.add(t)));
    });
    return Array.from(tagSet).sort();
  }, []);

  const filteredProjectsData = useMemo(() => {
    const filtered: ProjectsData = {};
    Object.entries(projectsData).forEach(([key, projects]) => {
      const matches = projects.filter((proj) => {
        const matchesTag =
          selectedTags.length === 0 ||
          selectedTags.every((t) => proj.tags.includes(t));
        const matchesImportance = !showImportantOnly || proj.important;
        return matchesTag && matchesImportance;
      });
      if (matches.length > 0) filtered[key] = matches;
    });
    return filtered;
  }, [selectedTags, showImportantOnly]);

  const availableTags = useMemo(() => {
    const available = new Set<string>();
    const allProjects = Object.values(projectsData).flat();

    allTags.forEach((tag) => {
      if (selectedTags.includes(tag)) {
        available.add(tag);
        return;
      }
      const potentialSelection = [...selectedTags, tag];
      const hasResults = allProjects.some(
        (proj) =>
          potentialSelection.every((t) => proj.tags.includes(t)) &&
          (!showImportantOnly || proj.important),
      );
      if (hasResults) available.add(tag);
    });
    return available;
  }, [allTags, selectedTags, showImportantOnly]);

  const toggleTag = (tag: string) => {
    if (!availableTags.has(tag) && !selectedTags.includes(tag)) return;
    setselectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, sm: 4, md: 8 },
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <Stack alignItems="center" mb={6}>
        <Typography variant="h4" fontWeight="900" gutterBottom>
          💼 Portfolio
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: 600 }}
        >
          A collection of my work ranging from Low-Level Systems in C to Modern
          AI Applications.
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mb={4}
      >
        <Stack direction="row" spacing={2}>
          <Badge badgeContent={selectedTags.length} color="primary">
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => setFiltersVisible(!filtersVisible)}
              sx={{ borderRadius: 10, px: 4 }}
            >
              Filter Tags
            </Button>
          </Badge>
          {selectedTags.length > 0 && (
            <IconButton onClick={() => setselectedTags([])} color="error">
              <ClearAllIcon />
            </IconButton>
          )}
        </Stack>

        <Box
          sx={{
            borderLeft: { sm: `1px solid ${theme.palette.divider}` },
            pl: { sm: 2 },
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={showImportantOnly}
                onChange={(e) => setShowImportantOnly(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" fontWeight="700">
                Featured Only
              </Typography>
            }
          />
        </Box>
      </Stack>

      <Collapse in={filtersVisible}>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mb: 6,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.01),
          }}
        >
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1}
            useFlexGap
            justifyContent="center"
          >
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => toggleTag(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                disabled={
                  !availableTags.has(tag) && !selectedTags.includes(tag)
                }
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Stack>
        </Paper>
      </Collapse>

      {Object.entries(filteredProjectsData).map(([key, projects]) => (
        <Box key={key} sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {projects[0].cat}
            </Typography>
            <Box
              sx={{ ml: 2, height: '1px', width: '100%', bgcolor: 'divider' }}
            />
          </Box>

          <Grid container spacing={3}>
            {projects.map((proj, pIdx) => (
              <Grid key={proj.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ProjectCard proj={proj} index={pIdx} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {Object.keys(filteredProjectsData).length === 0 && (
        <Stack alignItems="center" py={10}>
          <Typography variant="h6" color="text.disabled">
            No projects found matching these filters.
          </Typography>
          <Button
            sx={{ mt: 2 }}
            onClick={() => {
              setselectedTags([]);
              setShowImportantOnly(false);
            }}
          >
            Reset All Filters
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default PortfolioSection;

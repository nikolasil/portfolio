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
  ai: [
    {
      cat: 'Artificial Intelligence',
      id: 'ai-email-assistant',
      title: 'Async AI Property Assistant',
      dec: 'An industrial-grade backend service using Python Asyncio and OpenAI to automate property management. Features a concurrent workflow engine that parses tenant requests, classifies intent, and generates structured action tickets.',
      url: 'https://github.com/nikolasil/property-management-assistant-ai',
      tags: ['Python', 'Asyncio', 'OpenAI', 'System Design'],
      important: true,
    },
    {
      cat: 'Artificial Intelligence',
      id: 'berkeley-pacman-master',
      title: 'Berkeley Pacman AI Suite (0-2)',
      dec: 'A comprehensive implementation of AI foundations including Algorithmic Search (DFS, BFS, A*, UCS), Heuristic Design for TSP problems, and Adversarial Search (Minimax, Alpha-Beta Pruning, Expectimax) within the Berkeley framework.',
      url: 'https://github.com/nikolasil?tab=repositories&q=Berkeley-Pacman',
      tags: [
        'Python',
        'Algorithms',
        'Game Theory',
        'Heuristic Analysis',
        'State-Space Search',
      ],
      important: true,
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  ml: [
    {
      cat: 'Machine Learning',
      id: 'nlp-sentiment-evolution',
      important: true,
      title: 'NLP Evolution: From Logistic Regression to Sequential LSTMs',
      dec: 'An end-to-end comparative study of sentiment classification. Progressed from classical ML (TF-IDF, Softmax) to Deep Learning (PyTorch FFNN) and Sequential Modeling (LSTM/GRU). Features extensive hyperparameter optimization and ablation studies on GloVe embeddings.',
      url: 'https://github.com/nikolasil?tab=repositories&q=nlp-sentiment-analysis',
      tags: ['PyTorch', 'NLP', 'LSTMs', 'Scikit-Learn', 'GloVe'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Machine Learning',
      id: 'transformer-qa-bert',
      important: true,
      title: 'Question Answering with Transformer Architectures',
      dec: 'Fine-tuned BERT and DistilBERT models for Extractive Question Answering. Performed cross-dataset validation between SQuAD 2.0 and TriviaQA, optimizing sequence lengths and memory management for Tesla P100 GPUs.',
      url: 'https://github.com/nikolasil/transformer-qa-bert-squad',
      tags: [
        'BERT',
        'Transformers',
        'PyTorch',
        'Transfer Learning',
        'HuggingFace',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  dm: [
    {
      cat: 'Data Mining',
      id: 'vaccine-sentiment-lda',
      title: 'Data Mining: Sentiment & Topic Modeling Evolution',
      dec: 'Exploratory study on large-scale COVID-19 vaccine discourse. Performed time-series sentiment analysis and utilized Latent Dirichlet Allocation (LDA) to extract hidden discussion topics, optimized via Coherence Score analysis.',
      url: 'https://github.com/nikolasil/vaccine-sentiment-lda-mining',
      tags: [
        'Python',
        'LDA Topic Modeling',
        'SVM/RandomForest',
        'Data Visualization',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Data Mining',
      id: 'nyc-taxi-duration-predictor',
      title:
        'NYCTaxi-Predictor: End-to-End Spatial-Temporal Regression & Geospatial Analysis',
      dec: 'A data science project that predicts New York City taxi trip durations using a Random Forest Regressor and complex feature engineering. The pipeline includes geospatial outlier filtering, custom Manhattan distance calculations, and temporal analysis to transform raw pickup/dropoff coordinates into high-accuracy travel time estimates.',
      url: 'https://github.com/nikolasil/nyc-taxi-duration-predictor',
      tags: [
        'Scikit-Learn',
        'Pandas',
        'Geospatial Analysis',
        'Random Forest',
        'K-Means',
        'Folium',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  'os|dt': [
    {
      cat: 'Operating Systems',
      id: 'ipc-shared-mem',
      title: 'IPC: Shared Memory Synchronization & Noise Simulation',
      dec: 'A multi-process system utilizing POSIX Shared Memory and Semaphores for synchronized communication. Features a simulated noisy channel, custom packet framing with checksums, and a thread-managed non-blocking UI.',
      url: 'https://github.com/nikolasil/ipc-shared-memory-synchronization',
      tags: ['C', 'System Programming', 'POSIX Threads', 'IPC', 'Semaphores'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Operating Systems',
      id: 'os-ram-pagination',
      important: true,
      title: 'Virtual Memory & Pagination Simulator',
      dec: 'An architectural simulation of a Memory Management Unit (MMU). It implements Hashed Page Tables for address translation and evaluates the efficiency of LRU vs. Second Chance (Clock) algorithms using real-world memory traces (gcc/bzip).',
      url: 'https://github.com/nikolasil/HashedPagedTable-LRU-SecondChange',
      tags: ['C', 'Data Structures', 'Algorithms', 'Memory Management'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Database Systems | Low-Level Engineering',
      id: 'db-file-structures',
      important: true,
      title: 'Storage Engine: Heap & Hashed File Structures',
      dec: 'A low-level storage engine implementation in C. Developed custom Block-level management for Heap files, Primary Hash Tables (ID-based), and Secondary Hash Tables (Surname-based) with overflow handling and performance analytics.',
      url: 'https://github.com/nikolasil/FileStructure-BlockHeapHashFiles-SecondaryIndex',
      tags: ['C', 'Database Internals', 'File Systems', 'Hashing'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming | Algorithms',
      id: 'os-vaccine-monitor',
      important: true,
      title: 'High-Performance Vaccine Monitoring System',
      dec: 'A distributed-style data management system using C++. Implements custom Skip Lists and Bloom Filters for O(log N) search and O(1) membership testing. Features an AVL Tree backbone to ensure balanced data distribution across large citizen datasets.',
      url: 'https://github.com/nikolasil/vaccineMonitor_1',
      tags: [
        'C++',
        'Data Structures',
        'Bloom Filters',
        'Skip Lists',
        'STL-Free',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming | Distributed Systems',
      id: 'ipc-vaccine-monitor',
      important: true,
      title: 'Distributed Vaccine Monitoring & IPC Framework',
      dec: 'A multi-process distributed system using a Master-Worker architecture. Implements low-level IPC via Named Pipes (FIFOs) with a custom packet-chunking protocol, signal handling (SIGCHLD, SIGUSR1), and synchronized data aggregation.',
      url: 'https://github.com/nikolasil/vaccineMonitor_2',
      tags: [
        'C++',
        'IPC',
        'Named Pipes',
        'Process Management',
        'Parallel Computing',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming | Distributed Computing',
      id: 'networked-vaccine-monitor',
      important: true,
      title: 'Networked Monitoring System: Multithreaded TCP Servers',
      dec: 'A high-concurrency distributed system utilizing a Client-Server architecture over TCP/IP sockets. Implements a thread-pooled Monitor Server with a synchronized Cyclic Buffer (Producer-Consumer model) for parallel data ingestion and real-time request processing.',
      url: 'https://github.com/nikolasil/vaccineMonitor_3',
      tags: [
        'C++',
        'Sockets',
        'Multithreading',
        'Pthreads',
        'Distributed Systems',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Systems Programming | Parallel Computing',
      id: 'parallel-inverted-index',
      important: true,
      title: 'High-Throughput Parallel Inverted Search Engine',
      dec: 'A high-performance C++ inverted search engine utilizing a custom thread-pool and job scheduler for real-time document matching. Implements BK-Trees for fuzzy matching (Edit/Hamming distance) and Inverted Hash Tables with lock-free read paths, achieving near-linear scalability across multi-core architectures.',
      url: 'https://github.com/nikolasil/InvertedSearchEngine',
      tags: [
        'C++',
        'Multithreading',
        'Lock-Free Design',
        'BK-Trees',
        'Systems Optimization',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  comp: [
    {
      cat: 'Compilers | Language Engineering',
      id: 'comp-calc-transpiler',
      important: true,
      title: 'Java Transpiler & LL(1) Parser',
      dec: 'A two-part compiler suite featuring a manual LL(1) recursive descent parser for arithmetic operations and a JFlex/CUP-based transpiler that converts a custom string-manipulation language into executable Java code.',
      url: 'https://github.com/nikolasil/compiler-calc-transpiler-LL1-parser',
      tags: ['Java', 'JFlex', 'CUP', 'Compilers', 'Context-Free Grammars'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Compilers | Software Verification',
      id: 'comp-minijava-check',
      important: true,
      title: 'MiniJava Semantic Analyzer & Type Checker',
      dec: 'A multi-pass static analysis tool for the MiniJava language. Implements a sophisticated Symbol Table to handle class inheritance, method overriding, and nested scopes, ensuring complete type safety before intermediate code generation.',
      url: 'https://github.com/nikolasil/compiler-minijava-check',
      tags: ['Java', 'Static Analysis', 'Visitor Pattern', 'Symbol Tables'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      cat: 'Compilers | Backend Engineering',
      id: 'comp-llvm-gen',
      important: true,
      title: 'MiniJava to LLVM IR Code Generator',
      dec: 'A full-featured compiler backend for MiniJava. Implements Virtual Tables (VTables) for dynamic dispatch, heap allocation logic, and automated generation of LLVM Intermediate Representation (IR) including control-flow labels and bounds checking.',
      url: 'https://github.com/nikolasil/compiler-llvm-generator',
      tags: ['Java', 'LLVM IR', 'Compilers', 'VTable', 'Memory Management'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  sec: [
    {
      cat: 'Cybersecurity | Full-Stack',
      id: 'sec-eclass-attack',
      important: true,
      title: 'Cybersecurity: Defensive Patching & Pentesting',
      dec: 'A comprehensive security audit of the Open eClass CMS. Implemented robust defenses against OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF) and conducted successful penetration tests involving cookie hijacking, privilege escalation, and site defacement.',
      url: 'https://github.com/nikolasil/security-1-openeclass',
      tags: [
        'PHP',
        'Web Security',
        'SQL Injection',
        'Penetration Testing',
        'Docker',
      ],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  web: [
    {
      cat: 'Web Applications',
      id: 'iliopoulosrent',
      important: true,
      title: 'Custom Vacation Rental Website',
      dec: 'Developed a high-performance, SEO-optimized web platform for a luxury rental property using Next.js to drive direct user acquisitions and reduce third-party platform dependency. By implementing server-side rendering and advanced image optimization, I achieved near-perfect Lighthouse scores and a seamless, mobile-first booking experience.',
      url: 'https://github.com/nikolasil/iliopoulosrent',
      tags: ['Next.js', 'React', 'Tailwind CSS'],
    },
    {
      cat: 'Web Applications',
      id: 'web-portfolio',
      important: true,
      title: 'Personal Portfolio',
      dec: 'A modern, responsive portfolio (the one you are seeing now!) built with Next.js and MUI to showcase my software engineering journey.',
      url: 'https://github.com/nikolasil/portfolio',
      tags: ['Next.js', 'React', 'Javascript', 'MaterialUI', 'Git'],
    }
  ]
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

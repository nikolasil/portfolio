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
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Fab,
  Zoom,
  useScrollTrigger,
  Tooltip,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ComputerIcon from '@mui/icons-material/Computer';

export type Project = {
  catShort: string;
  cat: string;
  id: string;
  title: string;
  desc: string;
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
      catShort: 'AI & ML',
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'ai-email-assistant',
      title: 'Async AI Property Assistant',
      desc: 'An industrial-grade backend service using Python Asyncio and OpenAI to automate property management. Features a concurrent workflow engine that parses tenant requests, classifies intent, and generates structured action tickets.',
      url: 'https://github.com/nikolasil/property-management-assistant-ai',
      tags: ['Python', 'AI', 'LLMs', 'System Design'],
      important: true,
    },
    {
      catShort: 'AI & ML',
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'transformer-qa-bert',
      important: true,
      title: 'Question Answering with Transformer Architectures',
      desc: 'Fine-tuned BERT and DistilBERT models for Extractive Question Answering. Performed cross-dataset validation between SQuAD 2.0 and TriviaQA, optimizing sequence lengths and memory management for Tesla P100 GPUs.',
      url: 'https://github.com/nikolasil/transformer-qa-bert-squad',
      tags: ['Python', 'AI', 'Deep Learning', 'PyTorch', 'NLP'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'AI & ML',
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'nlp-sentiment-evolution',
      title: 'NLP Evolution: Logistic Regression to LSTMs',
      desc: 'An end-to-end comparative study of sentiment classification. Progressed from classical ML (TF-IDF, Softmax) to Deep Learning (PyTorch FFNN) and Sequential Modeling (LSTM/GRU).',
      url: 'https://github.com/nikolasil?tab=repositories&q=nlp-sentiment-analysis',
      tags: ['Python', 'AI', 'Deep Learning', 'PyTorch', 'NLP'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'AI & ML',
      cat: 'Artificial Intelligence & Machine Learning',
      id: 'berkeley-pacman-master',
      title: 'Berkeley Pacman AI Suite',
      desc: 'Implementation of core AI foundations including Algorithmic Search (DFS, BFS, A*), Heuristic Design, and Adversarial Search (Minimax, Alpha-Beta Pruning, Expectimax).',
      url: 'https://github.com/nikolasil?tab=repositories&q=Berkeley-Pacman',
      tags: ['Python', 'AI', 'Algorithms'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  web: [
    {
      catShort: 'Web',
      cat: 'Web Applications',
      id: 'web-portfolio',
      important: true,
      title: 'Engineering Portfolio',
      desc: 'A modern, responsive web portfolio built with Next.js and MUI to showcase complex software engineering projects.',
      url: 'https://github.com/nikolasil/portfolio',
      tags: [
        'Web',
        'React',
        'Frontend',
        'Next.js',
        'TypeScript',
        'Docker',
        'AWS EC2',
      ],
    },
    {
      catShort: 'Web',
      cat: 'Web Applications',
      id: 'iliopoulosrent',
      title: 'Luxury Vacation Rental Platform',
      desc: 'High-performance Next.js web platform with SSR and advanced image optimization. Focused on SEO and conversion to reduce third-party booking dependency.',
      url: 'https://github.com/nikolasil/iliopoulosrent',
      tags: [
        'Web',
        'React',
        'Frontend',
        'Next.js',
        'TypeScript',
        'Docker',
        'AWS EC2',
      ],
    },
    {
      catShort: 'Web',
      cat: 'Web Applications',
      id: 'bidpoint-auction-platform',
      important: true,
      title: 'BidPoint Auction Platform',
      desc: 'BidPoint is a full-stack auction web platform that enables real-time bidding, item management, and personalized user experiences. Built with a focus on scalability and security, it leverages Spring Boot for a robust backend and React.js for a dynamic, responsive frontend.',
      url: 'https://github.com/nikolasil/bidpoint-auction-platform',
      tags: [
        'Web',
        'React',
        'Frontend',
        'Backend',
        'JavaScript',
        'Java Spring Boot',
        'PostgreSQL',
        'Docker',
      ],
    },
  ],
  security: [
    {
      catShort: 'Cybersecurity',
      cat: 'Cybersecurity',
      id: 'sec-eclass-attack',
      important: true,
      title: 'Defensive Patching & Pentesting',
      desc: 'Security audit of Open eClass CMS. Implemented defenses against OWASP Top 10 and conducted penetration tests for SQLi, XSS, and CSRF.',
      url: 'https://github.com/nikolasil/security-1-openeclass',
      tags: ['Web', 'Security', 'Systems', 'Docker'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  systems: [
    {
      catShort: 'Low-Level Systems',
      cat: 'Systems Programming & Operating Systems',
      id: 'parallel-inverted-index',
      important: true,
      title: 'Parallel Inverted Search Engine',
      desc: 'A high-performance C++ search engine using a custom thread-pool and job scheduler. Implements BK-Trees for fuzzy matching and lock-free Inverted Hash Tables for near-linear scalability.',
      url: 'https://github.com/nikolasil/InvertedSearchEngine',
      tags: ['C++', 'Systems', 'Concurrency', 'Algorithms'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'Low-Level Systems',
      cat: 'Systems Programming & Operating Systems',
      id: 'networked-vaccine-monitor',
      important: true,
      title: 'Networked TCP Monitor System',
      desc: 'A high-concurrency distributed system over TCP/IP. Implements a thread-pooled server with a synchronized Cyclic Buffer (Producer-Consumer) for real-time parallel data ingestion.',
      url: 'https://github.com/nikolasil/vaccineMonitor_3',
      tags: ['C++', 'Systems', 'Networking', 'Concurrency'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'Low-Level Systems',
      cat: 'Systems Programming & Operating Systems',
      id: 'db-file-structures',
      title: 'Storage Engine: Heap & Hash Structures',
      desc: 'A low-level storage engine implementation in C. Developed custom Block-level management for Heap files and Primary/Secondary Hash Tables with overflow handling.',
      url: 'https://github.com/nikolasil/FileStructure-BlockHeapHashFiles-SecondaryIndex',
      tags: ['C', 'Systems', 'Data Structures'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'Low-Level Systems',
      cat: 'Systems Programming & Operating Systems',
      id: 'os-ram-pagination',
      title: 'Virtual Memory & Pagination Simulator',
      desc: 'Architectural simulation of an MMU. Implements Hashed Page Tables and evaluates LRU vs. Second Chance (Clock) algorithms using real-world memory traces.',
      url: 'https://github.com/nikolasil/HashedPagedTable-LRU-SecondChange',
      tags: ['C', 'Systems', 'Algorithms'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'Low-Level Systems',
      cat: 'Systems Programming & Operating Systems',
      id: 'ipc-shared-mem',
      title: 'IPC: Shared Memory & Semaphores',
      desc: 'Multi-process system utilizing POSIX Shared Memory and Semaphores. Features custom packet framing with checksums and thread-managed non-blocking UI.',
      url: 'https://github.com/nikolasil/ipc-shared-memory-synchronization',
      tags: ['C', 'Systems', 'Concurrency'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  compilers: [
    {
      catShort: 'Compilers',
      cat: 'Compilers & Language Engineering',
      id: 'comp-llvm-gen',
      important: true,
      title: 'MiniJava to LLVM IR Compiler',
      desc: 'Full compiler backend for MiniJava. Implements Virtual Tables (VTables) for dynamic dispatch, heap allocation, and automated LLVM IR generation.',
      url: 'https://github.com/nikolasil/compiler-llvm-generator',
      tags: ['Java', 'Compilers', 'Language Design'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'Compilers',
      cat: 'Compilers & Language Engineering',
      id: 'comp-minijava-check',
      title: 'MiniJava Semantic Analyzer',
      desc: 'Multi-pass static analysis tool. Implements a Symbol Table to handle class inheritance, method overriding, and nested scopes for type safety.',
      url: 'https://github.com/nikolasil/compiler-minijava-check',
      tags: ['Java', 'Compilers', 'Language Design'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
  data_science: [
    {
      catShort: 'Data Science',
      cat: 'Data Science & Mining',
      id: 'nyc-taxi-duration-predictor',
      title: 'NYC Taxi Geospatial Predictor',
      desc: 'End-to-end spatial-temporal regression. Uses Random Forest and K-Means to predict trip durations via geospatial outlier filtering and Manhattan distance calculations.',
      url: 'https://github.com/nikolasil/nyc-taxi-duration-predictor',
      tags: ['Python', 'Data Science', 'Algorithms'],
      context: 'National and Kapodistrian University of Athens',
    },
    {
      catShort: 'Data Science',
      cat: 'Data Science & Mining',
      id: 'vaccine-sentiment-lda',
      title: 'COVID-19 Vaccine Topic Modeling',
      desc: 'Large-scale discourse analysis using LDA to extract hidden discussion topics, optimized via Coherence Score analysis and time-series sentiment tracking.',
      url: 'https://github.com/nikolasil/vaccine-sentiment-lda-mining',
      tags: ['Python', 'Data Science', 'NLP'],
      context: 'National and Kapodistrian University of Athens',
    },
  ],
};
// Scroll-to-top component
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

const ProjectCard = ({ proj, index }: { proj: Project; index: number }) => {
  const theme = useTheme();

  return (
    <Grow in timeout={400 + index * 100}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
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
            transform: { md: 'translateY(-4px)', xs: 'none' },
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
            <Typography
              variant="h6"
              fontWeight="800"
              lineHeight={1.3}
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
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
          {proj.desc}
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
                  fontSize: '0.65rem',
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
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1,
            }}
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    Object.values(projectsData).forEach((projects) => {
      projects.forEach((proj) => proj.tags.forEach((t) => tagSet.add(t)));
    });
    return Array.from(tagSet).sort();
  }, []);

  const filteredProjectsData = useMemo(() => {
    const filtered: ProjectsData = {};
    const query = searchQuery.toLowerCase();
    if (query.length == 1) return projectsData; // Skip filtering for very short queries

    Object.entries(projectsData).forEach(([key, projects]) => {
      const matches = projects.filter((proj) => {
        const matchesTag =
          selectedTags.length === 0 ||
          selectedTags.every((t) => proj.tags.includes(t));
        const matchesImportance = !showImportantOnly || proj.important;
        const matchesSearch =
          proj.title.toLowerCase().includes(query) ||
          proj.desc.toLowerCase().includes(query);

        return matchesTag && matchesImportance && matchesSearch;
      });
      if (matches.length > 0) filtered[key] = matches;
    });
    return filtered;
  }, [selectedTags, showImportantOnly, searchQuery]);

  const scrollToCategory = (id: string, index: number) => {
    setActiveCategory(index);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Adjusted for mobile sticky header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth',
      });
    }
  };

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
    setselectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4, md: 8 },
        maxWidth: '1400px',
        margin: '0 auto',
        overflowX: 'hidden',
      }}
    >
      <Stack alignItems="center" mb={6}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 4 }}
        >
          <ComputerIcon sx={{ fontSize: '2rem' }} color="primary" />
          <Typography
            variant="h3"
            fontWeight="900"
            letterSpacing="-0.02em"
            fontSize="2rem"
          >
            Portfolio
          </Typography>
        </Stack>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: 600, px: 2 }}
        >
          A collection of my work ranging from Low-Level Systems in C to Modern
          AI Applications.
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: { xs: 3, md: 4 },
          border: `1px solid ${theme.palette.divider}`,
          position: 'sticky',
          top: { xs: 10, md: 20 },
          zIndex: 10,
          backdropFilter: 'blur(10px)',
          bgcolor: alpha(theme.palette.background.paper, 0.8),
        }}
      >
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 10 },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'space-between', md: 'flex-end' }}
              alignItems="center"
            >
              <Badge badgeContent={selectedTags.length} color="primary">
                <Button
                  variant={filtersVisible ? 'contained' : 'outlined'}
                  startIcon={<FilterAltIcon />}
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  sx={{
                    borderRadius: 10,
                    px: { xs: 2, md: 3 },
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                  }}
                >
                  Tags
                </Button>
              </Badge>
              <FormControlLabel
                sx={{ mr: 0 }}
                control={
                  <Switch
                    size="small"
                    checked={showImportantOnly}
                    onChange={(e) => setShowImportantOnly(e.target.checked)}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    fontWeight="700"
                    sx={{ fontSize: '0.8rem' }}
                  >
                    Featured
                  </Typography>
                }
              />
              {(selectedTags.length > 0 ||
                searchQuery ||
                showImportantOnly) && (
                <Tooltip title="Clear All Filters">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setselectedTags([]);
                      setSearchQuery('');
                      setShowImportantOnly(false);
                    }}
                    color="error"
                  >
                    <ClearAllIcon />
                  </IconButton>
                </Tooltip>
              )}
              {!(
                selectedTags.length > 0 ||
                searchQuery ||
                showImportantOnly
              ) && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setselectedTags([]);
                    setSearchQuery('');
                    setShowImportantOnly(false);
                  }}
                  color="success"
                  disabled
                >
                  <ClearAllIcon />
                </IconButton>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Collapse in={filtersVisible}>
          <Box
            sx={{
              pt: 2,
              mt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
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
                  sx={{ borderRadius: 1, fontSize: '0.75rem' }}
                />
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Paper>

      <Box
        sx={{ mb: 4, display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <Tabs
          value={activeCategory}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            maxWidth: '100%',
            '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
          }}
        >
          {Object.keys(projectsData).map((key, index) => {
            // Get category name safely from the original data source
            const categoryName = projectsData[key][0].catShort;
            // Get count from filtered data, default to 0 if category is filtered out
            const count = filteredProjectsData[key]
              ? filteredProjectsData[key].length
              : 0;

            return (
              <Tab
                key={key}
                label={`${categoryName} (${count})`}
                // Disable tab if there are no results, as there is no section to scroll to
                disabled={count === 0}
                onClick={() => {
                  if (count > 0) scrollToCategory(key, index);
                }}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 2,
                }}
              />
            );
          })}
        </Tabs>
      </Box>

      {Object.entries(filteredProjectsData).map(([key, projects]) => (
        <Box key={key} id={key} sx={{ mb: 10 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              gap: 1,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {projects[0].cat}
              <Chip
                label={projects.length}
                size="small"
                sx={{
                  ml: 2,
                  fontWeight: 'bold',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              />
            </Typography>
            <Box
              sx={{
                height: '1px',
                flexGrow: 1,
                bgcolor: 'divider',
                minWidth: { xs: '100%', sm: 'auto' },
              }}
            />
          </Box>
          <Grid container spacing={3}>
            {projects.map((proj, pIdx) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={proj.id}>
                <ProjectCard proj={proj} index={pIdx} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <ScrollTop />
    </Box>
  );
};

export default PortfolioSection;

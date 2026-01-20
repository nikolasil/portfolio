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
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import GitHubIcon from '@mui/icons-material/GitHub';

export type Project = {
  cat: string;
  id: string; // Changed from number to string for descriptive slugs
  title: string;
  dec: string;
  url: string;
  used: string[];
  emoji?: string;
};

export type ProjectsData = {
  [category: string]: Project[];
};

const projectsData: ProjectsData = {
  ai: [
    {
      cat: 'Artificial Intelligence',
      id: 'ai-email-assistant',
      title: 'AI-Powered Property Management Email Assistant',
      dec: 'Python-based AI system to automate property management emails, parsing tenant requests, generating LLM-powered replies, and creating workflow tickets with asynchronous IMAP/SMTP handling.',
      url: 'https://github.com/nikolasil/property-management-assistant-ai',
      used: ['Python', 'Git'],
    },
    {
      cat: 'Artificial Intelligence',
      id: 'pacman-0',
      title: 'Berkeley Pacman Project 0',
      dec: 'Short UNIX/Python tutorial covering the Python environment and basic UNIX commands.',
      url: 'https://github.com/nikolasil/Berkeley-Pacman-Project-0',
      used: ['Python', 'Git'],
    },
    {
      cat: 'Artificial Intelligence',
      id: 'pacman-1',
      title: 'Berkeley Pacman Project 1',
      dec: 'Implemented depth-first, breadth-first, uniform cost, and A* search algorithms to solve navigation and traveling salesman problems in Pacman.',
      url: 'https://github.com/nikolasil/Berkeley-Pacman-Project-1',
      used: ['Python', 'Git'],
    },
    {
      cat: 'Artificial Intelligence',
      id: 'pacman-2',
      emoji: '⭐',
      title: 'Berkeley Pacman Project 2',
      dec: 'Implementation of multiagent minimax and expectimax algorithms, along with custom evaluation functions for game state analysis.',
      url: 'https://github.com/nikolasil/Berkeley-Pacman-Project-2',
      used: ['Python', 'Git'],
    },
  ],
  ml: [
    {
      cat: 'Machine Learning',
      id: 'ml-logistic-regression',
      title: 'Vaccination Classifier with Logistic Regression',
      dec: 'A classifier to identify sentiment in vaccination tweets using Logistic Regression. Experimented with hyperparameters, vectorizers, and preprocessing evaluated with F1 score.',
      url: 'https://github.com/nikolasil/ai_2_exercise_1',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
    {
      cat: 'Machine Learning',
      id: 'ml-ffnn',
      title: 'Vaccination Classifier with FeedForward NN',
      dec: 'A classifier using FeedForward Neural Networks and pre-trained GloVe embeddings. Optimized hidden layers, units, and loss functions for performance.',
      url: 'https://github.com/nikolasil/ai_2_exercise_2',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
    {
      cat: 'Machine Learning',
      id: 'ml-rnn-lstm',
      title: 'Vaccination Classifier with Stacked RNN',
      dec: 'Bidirectional Stacked RNN (LSTM & GRU) for tweet classification. Compared Vanilla RNN against GRU/LSTM cells and analyzed the impact of dropout.',
      url: 'https://github.com/nikolasil/ai_2_exercise_3',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
    {
      cat: 'Machine Learning',
      id: 'ml-transformers',
      emoji: '⭐',
      title: 'Question Answering with Transformers',
      dec: 'Fine-tuned BERT-base models on SQUAD2 & TriviaQA. Experimented with sequence length, gradient clipping, and various optimizers.',
      url: 'https://github.com/nikolasil/ai_2_exercise_4',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
  ],
  dm: [
    {
      cat: 'Data Mining',
      id: 'dm-sentiment-lda',
      title: 'Data Mining 1',
      dec: 'Sentiment Analysis using Bag-of-words and TF-IDF with SVM and Random Forest. Utilized LDA for topic modeling on large-scale vaccination datasets.',
      url: 'https://github.com/nikolasil/data-mining-1',
      used: ['Python', 'scikit-learn', 'pandas', 'numpy'],
    },
  ],
  'os|dt': [
    {
      cat: 'Operating Systems | Data Structures',
      id: 'os-shared-mem',
      title: 'Shared Memory | Semaphores',
      dec: 'Process communication via a shared memory channel using semaphores to ensure synchronization in a server-client architecture.',
      url: 'https://github.com/nikolasil/SharedMemory-Semaphores-MessagePassing',
      used: ['C', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 'os-ram-pagination',
      title: 'RAM Pagination Simulator',
      dec: 'Simulates memory management using Hashed Page Tables and page replacement algorithms like LRU and Second Chance.',
      url: 'https://github.com/nikolasil/HashedPagedTable-LRU-SecondChange',
      used: ['C', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 'os-file-structure',
      title: 'File Structure in Disk',
      dec: 'Low-level implementation of Heap File Blocks, Hash File Blocks, and Secondary Hash File structures.',
      url: 'https://github.com/nikolasil/FileStructure-BlockHeapHashFiles-SecondaryIndex',
      used: ['C', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 'os-vaccine-1',
      title: 'Vaccine Monitor 1',
      dec: 'A single-process application utilizing Bloom Filters and Skip Lists to manage and query vaccination records efficiently.',
      url: 'https://github.com/nikolasil/vaccineMonitor_1',
      used: ['C++', 'Shell', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 'os-vaccine-2',
      title: 'Vaccine Monitor 2',
      dec: 'Extended the monitor into a multi-process system using named pipes for communication between master and worker processes.',
      url: 'https://github.com/nikolasil/vaccineMonitor_2',
      used: ['C++', 'Shell', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 'os-vaccine-3',
      emoji: '⭐',
      title: 'Vaccine Monitor 3',
      dec: 'Advanced version featuring multi-threading and network communication using web-sockets and signals.',
      url: 'https://github.com/nikolasil/vaccineMonitor_3',
      used: ['C++', 'Shell', 'Git'],
    },
  ],
  comp: [
    {
      cat: 'Compilers',
      id: 'comp-calc-parser',
      title: 'LL(1) Calculator Parser',
      dec: 'A translator that converts custom language string operations and arithmetic into Java code using LL(1) parsing.',
      url: 'https://github.com/nikolasil/compilers1',
      used: ['Java', 'Git'],
    },
    {
      cat: 'Compilers',
      id: 'comp-minijava-check',
      title: 'MiniJava Semantic Analysis',
      dec: 'Implemented a static checker for the MiniJava language, ensuring semantic correctness before compilation.',
      url: 'https://github.com/nikolasil/compilers2',
      used: ['Java', 'Git'],
    },
    {
      cat: 'Compilers',
      id: 'comp-llvm-gen',
      emoji: '⭐',
      title: 'MiniJava -> LLVM IR Generator',
      dec: 'Visitor-based implementation to transform MiniJava source code into LLVM intermediate representation.',
      url: 'https://github.com/nikolasil/compilers3',
      used: ['Java', 'llvm', 'Git'],
    },
  ],
  sec: [
    {
      cat: 'Security',
      id: 'sec-eclass-attack',
      emoji: '⭐',
      title: 'Security Defence & Attack',
      dec: 'Fixed vulnerabilities (XSS, SQLi, CSRF) in Open Eclass 2.3 and performed penetration testing on competing environments.',
      url: 'https://github.com/nikolasil/security-1-openeclass',
      used: ['PHP', 'Docker', 'Git'],
    },
  ],
  web: [
    {
      cat: 'Web Applications',
      id: 'web-portfolio',
      emoji: '⭐',
      title: 'Personal Portfolio',
      dec: 'A modern, responsive portfolio built with React and MUI to showcase my software engineering journey.',
      url: 'https://github.com/nikolasil/portfolio',
      used: ['React', 'Sass', 'Javascript', 'MaterialUI', 'Git'],
    },
    {
      cat: 'Web Applications',
      id: 'web-doatap',
      title: 'Doatap Reformation',
      dec: 'A complete UX/UI overhaul of the Doatap website using the MERN stack for better usability and modern performance.',
      url: 'https://github.com/nikolasil/doatap-reformation',
      used: [
        'React',
        'Node',
        'Express',
        'Javascript',
        'Redux',
        'MongoDB',
        'Git',
      ],
    },
  ],
  mobile: [
    {
      cat: 'Mobile Applications',
      id: 'mob-hvac-app',
      emoji: '⭐',
      title: 'Altemco HVAC',
      dec: 'Android application for HVAC error codes. Reached 5,000+ downloads and ~2,500 monthly active users.',
      url: 'https://play.google.com/store/apps/details?id=appinventor.ai_nikolasil2000.hvac2',
      used: ['Android', 'AppInventor', 'GooglePlay'],
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
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
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
          <Typography variant="h6" fontWeight="800" lineHeight={1.3}>
            {proj.emoji && (
              <Box component="span" sx={{ mr: 1 }}>
                {proj.emoji}
              </Box>
            )}
            {proj.title}
          </Typography>
          {proj.url?.includes('github') && (
            <GitHubIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
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
            {proj.used.map((tech) => (
              <Chip
                key={tech}
                label={tech}
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
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    Object.values(projectsData).forEach((projects) => {
      projects.forEach((proj) => proj.used.forEach((t) => techSet.add(t)));
    });
    return Array.from(techSet).sort();
  }, []);

  const filteredProjectsData = useMemo(() => {
    if (selectedTechs.length === 0) return projectsData;
    const filtered: ProjectsData = {};
    Object.entries(projectsData).forEach(([key, projects]) => {
      const matches = projects.filter((proj) =>
        selectedTechs.every((t) => proj.used.includes(t)),
      );
      if (matches.length > 0) filtered[key] = matches;
    });
    return filtered;
  }, [selectedTechs]);

  const availableTechs = useMemo(() => {
    const available = new Set<string>();
    const allProjects = Object.values(projectsData).flat();

    allTechs.forEach((tech) => {
      if (selectedTechs.includes(tech)) {
        available.add(tech);
        return;
      }
      const potentialSelection = [...selectedTechs, tech];
      const hasResults = allProjects.some((proj) =>
        potentialSelection.every((t) => proj.used.includes(t)),
      );
      if (hasResults) available.add(tech);
    });
    return available;
  }, [allTechs, selectedTechs]);

  const toggleTech = (tech: string) => {
    if (!availableTechs.has(tech) && !selectedTechs.includes(tech)) return;
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
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

      <Stack direction="row" justifyContent="center" spacing={2} mb={4}>
        <Badge badgeContent={selectedTechs.length} color="primary">
          <Button
            variant="outlined"
            startIcon={<FilterAltIcon />}
            onClick={() => setFiltersVisible(!filtersVisible)}
            sx={{ borderRadius: 10, px: 4 }}
          >
            Filter Stack
          </Button>
        </Badge>
        {selectedTechs.length > 0 && (
          <IconButton onClick={() => setSelectedTechs([])} color="error">
            <ClearAllIcon />
          </IconButton>
        )}
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
            {allTechs.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                onClick={() => toggleTech(tech)}
                color={selectedTechs.includes(tech) ? 'primary' : 'default'}
                variant={selectedTechs.includes(tech) ? 'filled' : 'outlined'}
                disabled={
                  !availableTechs.has(tech) && !selectedTechs.includes(tech)
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
    </Box>
  );
};

export default PortfolioSection;

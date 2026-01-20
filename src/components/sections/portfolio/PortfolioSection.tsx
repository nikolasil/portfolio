'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  Grow,
  Collapse,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  Badge,
  IconButton,
  Tooltip,
  Fab,
  Zoom,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export type Project = {
  cat: string;
  id: number;
  title: string;
  dec: string;
  url: string;
  used: string[];
  emoji?: string; // optional
};

export type ProjectsData = {
  [category: string]: Project[];
};

const projectsData: ProjectsData = {
  ai: [
    {
      cat: 'Artificial Inteligence',
      id: 0,
      title: 'AI-Powered Property Management Email Assistant',
      dec: 'Python-based AI system to automate property management emails, parsing tenant requests, generating LLM-powered replies, classifying intents (maintenance, lockout, rent), and creating workflow action tickets with fully asynchronous IMAP/SMTP handling.',
      url: 'https://github.com/nikolasil/property-management-assistant-ai',
      used: ['Python', 'Git'],
    },
    {
      cat: 'Artificial Inteligence',
      id: 1,
      title: 'Berkeley Pacman Project 0',
      dec: 'Short UNIX/Python tutorial in Python and the UNIX environment.',
      url: 'https://github.com/nikolasil/Berkeley-Pacman-Project-0',
      used: ['Python', 'Git'],
    },
    {
      cat: 'Artificial Inteligence',
      id: 2,
      title: 'Berkeley Pacman Project 1',
      dec: 'Implement depth-first, breadth-first, uniform cost, and A* search algorithms. These algorithms are used to solve navigation and traveling salesman problems in the Pacman world.',
      url: 'https://github.com/nikolasil/Berkeley-Pacman-Project-1',
      used: ['Python', 'Git'],
    },
    {
      cat: 'Artificial Inteligence',
      id: 3,
      title: 'Berkeley Pacman Project 2',
      emoji: '⭐',
      dec: 'Implement multiagent minimax and expectimax algorithms, as well as designing evaluation functions.',
      url: 'https://github.com/nikolasil/Berkeley-Pacman-Project-2',
      used: ['Python', 'Git'],
    },
  ],
  ml: [
    {
      cat: 'Machine Learning',
      id: 100,
      title: 'Vaccination Clasifier with Logistic Regression',
      dec: 'A classifier to identify anti-vax | pro-vax tweets using Logistic Regression. Experimented with different hyperparameters, vectorizers and pre processing. Evaluated with F1 score, precision and recall.',
      url: 'https://github.com/nikolasil/ai_2_exercise_1',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
    {
      cat: 'Machine Learning',
      id: 101,
      title: 'Vaccination Clasifier with FeedForward Neural Network',
      dec: 'A classifier to identify anti-vax | pro-vax tweets using FeedForward Neural Network. Experimented with pre-trained word embedding vector (GloVe), optimizers, number of hidden layers and the number of their units. Also experimented with different loss functions and metrics.',
      url: 'https://github.com/nikolasil/ai_2_exercise_2',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
    {
      cat: 'Machine Learning',
      id: 102,
      title:
        'Vaccination Clasifier with Bidirectional Stacked RNN (LSTM & GRU Cells)',
      dec: 'A classifier to identify anti-vax | pro-vax tweets using Bidirectional Stacked RNN (LSTM & GRU Cells). Experimented with Vanillia RNN and then compared it with RNN using GRU and LSTM Cells. Also experimented with dropout propability, GloVe sizes and different number of layers and the number of hidden size.',
      url: 'https://github.com/nikolasil/ai_2_exercise_3',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
    {
      cat: 'Machine Learning',
      id: 103,
      title: 'Question Answering with Transformers on SQUAD2 & TriviaQA',
      emoji: '⭐',
      dec: 'Question Answering using Transformers. Fine-tuning a BERT-base model and expirimented with number of epochs, batch sizes, sequence length, gradient clipping, learning rate, and different optimizers.',
      url: 'https://github.com/nikolasil/ai_2_exercise_4',
      used: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'numpy'],
    },
  ],
  dm: [
    {
      cat: 'Data Mining',
      id: 200,
      title: 'Data Mining 1',
      dec: 'Sentiment Analysis on vaccination tweets. Created vectorizers Bag-of-words, Tf-idf, Word Embeddings. Tested the vectorizers with SVM, Random Forest, KNN. Used the LDA (Latent Dirichlet Allocation) algorithm to split the data into topics.',
      url: 'https://github.com/nikolasil/data-mining-1',
      used: ['Python', 'scikit-learn', 'pandas', 'numpy'],
    },
  ],
  'os|dt': [
    {
      cat: 'Operating Systems | Data Structures',
      id: 300,
      title: 'Shared memory | Semaphores',
      dec: 'Two Processes sends each other mesages (server-client aproach) by a third process that simulates the channel. The messages are stored and passed from shared memory with the use of semaphores.',
      url: 'https://github.com/nikolasil/SharedMemory-Semaphores-MessagePassing',
      used: ['C', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 301,
      title: 'RAM Pagination',
      dec: 'This is a programm that simmulates 2 programms (bzip and gcc) with pages that are stored in ram using Hashed Paged Table and when the frames of the ram are full the page replacement happens with LRU or Second Change Algorithm.',
      url: 'https://github.com/nikolasil/HashedPagedTable-LRU-SecondChange',
      used: ['C', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 302,
      title: 'File Structure in Disk',
      dec: 'Implementation of Heap File Block, Hash File Block, Secondary Hash File Block.',
      url: 'https://github.com/nikolasil/FileStructure-BlockHeapHashFiles-SecondaryIndex',
      used: ['C', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 303,
      title: 'Vaccine Monitor 1',
      dec: 'This Application is a single Process that holds records of vaccinations. It has structures (Bloom Filter | Skip List) and answers commands based on the records given.',
      url: 'https://github.com/nikolasil/vaccineMonitor_1',
      used: ['C++', 'Shell', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 304,
      title: 'Vaccine Monitor 2',
      dec: 'Extends the Vaccine Monitor 1 by making sub Processes(a sub Process takes some countries that it is responsible). The communication between the main Process and the sub Processes is made with named-pipes.',
      url: 'https://github.com/nikolasil/vaccineMonitor_2',
      used: ['C++', 'Shell', 'Git'],
    },
    {
      cat: 'Operating Systems | Data Structures',
      id: 305,
      title: 'Vaccine Monitor 3',
      emoji: '⭐',
      dec: 'Extends the Vaccine Monitor 2 by making the sub Processes multi threading. The communication is also changed from named-pipes to web-sockets and signals.',
      url: 'https://github.com/nikolasil/vaccineMonitor_3',
      used: ['C++', 'Shell', 'Git'],
    },
  ],
  comp: [
    {
      cat: 'Compilers',
      id: 400,
      title: 'LL(1) Calculator Parser - Translator to Java',
      dec: 'Implements a simple calculator. It supports addition, subtraction, and exponentiation operators, as well as parentheses. Also implements a parser and translator for a language supporting string operations. It supports the concatenation, function definitions, function calls and conditionals.',
      url: 'https://github.com/nikolasil/compilers1',
      used: ['Java', 'Git'],
    },
    {
      cat: 'Compilers',
      id: 401,
      title: 'MiniJava Static Checking (Semantic Analysis)',
      dec: 'Impliments a compiler for MiniJava, a subset of Java. MiniJava is designed so that its programs can be compiled by a full Java compiler like javac.',
      url: 'https://github.com/nikolasil/compilers2',
      used: ['Java', 'Git'],
    },
    {
      cat: 'Compilers',
      id: 402,
      title: 'Generating intermediate code (MiniJava -> LLVM)',
      emoji: '⭐',
      dec: 'Impliments visitors who transform MiniJava code into the intermediate representation used by the LLVM compiler project.',
      url: 'https://github.com/nikolasil/compilers3',
      used: ['Java', 'llvm', 'Git'],
    },
  ],
  sec: [
    {
      cat: 'Security',
      id: 500,
      title: 'Seuruty (Open Eclass) Defence & Attack',
      emoji: '⭐',
      dec: "The purpose was to fix the vunerabilities of the Open Eclass 2.3 (XSS, SQL Injections, CSRF Token, RFI) & attack the others teams website's trying to deface them.",
      url: 'https://github.com/nikolasil/security-1-openeclass',
      used: ['PHP', 'Docker', 'Git'],
    },
  ],
  web: [
    {
      cat: 'Web Applications',
      id: 600,
      title: 'My Website Portfolio',
      emoji: '⭐',
      dec: 'To gain experience in web development, I developed this portfolio.',
      url: 'https://github.com/nikolasil/portfolio',
      used: ['React', 'Sass', 'Javascript', 'MaterialUI', 'Git'],
    },
    {
      cat: 'Web Applications',
      id: 601,
      title: 'Doatap Reformation',
      dec: 'Recreated Doatap https://www.doatap.gr/ website. The concept was to fix the faults, make it more user friendly and in the same time more usable.',
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
      id: 700,
      title: 'Altemco HVAC',
      emoji: '⭐',
      dec: 'An android application that assists users in finding air conditioning error codes and receiving helpful advice on how to resolve the issue. [Monthly Users ~2.500, Total Downloads ~5.000]',
      url: 'https://play.google.com/store/apps/details?id=appinventor.ai_nikolasil2000.hvac2',
      used: ['Android', 'AppInventor', 'GooglePlay'],
    },
  ],
};

const PortfolioSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle showing the scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    Object.values(projectsData).forEach((projects) => {
      projects.forEach((proj) => {
        proj.used.forEach((t: string) => techSet.add(t));
      });
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

  // Clever Logic: Calculate which techs would result in 0 projects if clicked
  const availableTechs = useMemo(() => {
    const available = new Set<string>();
    const allProjects = Object.values(projectsData).flat();

    allTechs.forEach((tech) => {
      // If already selected, it's "available" (to deselect)
      if (selectedTechs.includes(tech)) {
        available.add(tech);
        return;
      }

      // Check if adding this tech to the current selection returns any results
      const potentialSelection = [...selectedTechs, tech];
      const hasResults = allProjects.some((proj) =>
        potentialSelection.every((t) => proj.used.includes(t)),
      );

      if (hasResults) {
        available.add(tech);
      }
    });
    return available;
  }, [allTechs, selectedTechs]);

  const toggleTech = (tech: string) => {
    // Prevent selection if it's not available and not already selected
    if (!availableTechs.has(tech) && !selectedTechs.includes(tech)) return;

    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const clearFilters = () => setSelectedTechs([]);

  return (
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
          textAlign="center"
          gutterBottom
        >
          💼 Portfolio
        </Typography>

        {/* Toggle Filters Button */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          mb={3}
        >
          <Badge
            badgeContent={selectedTechs.length}
            color="primary"
            sx={{ '& .MuiBadge-badge': { right: 5, top: 5 } }}
          >
            <Button
              variant={filtersVisible ? 'contained' : 'outlined'}
              startIcon={<FilterAltIcon />}
              onClick={() => setFiltersVisible((v) => !v)}
              sx={{
                borderRadius: 4,
                px: 3,
                transition: 'all 0.3s ease',
                boxShadow: filtersVisible ? theme.shadows[4] : 'none',
              }}
            >
              {filtersVisible ? 'Hide Filters' : 'Filter by Tech'}
            </Button>
          </Badge>

          {selectedTechs.length > 0 && (
            <Tooltip title="Clear All Filters">
              <IconButton onClick={clearFilters} color="error" size="small">
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {/* Filters Section */}
        <Collapse in={filtersVisible}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 5,
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1}
              useFlexGap
              justifyContent="center"
            >
              {allTechs.map((tech) => {
                const isSelected = selectedTechs.includes(tech);
                const isDisabled = !availableTechs.has(tech);

                return (
                  <Chip
                    key={tech}
                    label={tech}
                    clickable={!isDisabled}
                    disabled={isDisabled}
                    icon={
                      isSelected ? (
                        <CheckCircleIcon style={{ fontSize: '1.2rem' }} />
                      ) : undefined
                    }
                    variant={isSelected ? 'filled' : 'outlined'}
                    color={isSelected ? 'primary' : 'default'}
                    onClick={() => toggleTech(tech)}
                    sx={{
                      py: 2,
                      px: 1,
                      borderRadius: 2,
                      fontWeight: isSelected ? 'bold' : 'normal',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: isDisabled ? 0.4 : 1,
                      '&:hover': {
                        transform: isDisabled ? 'none' : 'translateY(-2px)',
                        boxShadow: isDisabled ? 'none' : theme.shadows[2],
                        backgroundColor: isSelected
                          ? theme.palette.primary.dark
                          : isDisabled
                            ? 'transparent'
                            : alpha(theme.palette.primary.main, 0.1),
                      },
                      '&:active': {
                        transform: isDisabled ? 'none' : 'scale(0.95)',
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </Paper>
        </Collapse>

        {/* Projects */}
        {Object.entries(filteredProjectsData).map(([key, projects]) => (
          <Box key={key} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 4, mb: 2 }}
            >
              {projects[0]?.cat || key}
            </Typography>

            <Stack spacing={4}>
              {projects.map((proj, pIdx: number) => (
                <Grow
                  in
                  key={proj.id}
                  style={{ transformOrigin: '0 0 0' }}
                  timeout={500 + pIdx * 150}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: theme.shadows[3],
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {proj.emoji ? `${proj.emoji} ${proj.title}` : proj.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      {proj.dec}
                    </Typography>

                    {/* Tech stack chips */}
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mb: 2 }}
                    >
                      {proj.used.map((tech: string, tIdx: number) => (
                        <Chip
                          key={tIdx}
                          label={tech}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Stack>

                    {/* GitHub / Demo link */}
                    {proj.url && (
                      <Button
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        endIcon={<LaunchIcon />}
                      >
                        View Project
                      </Button>
                    )}
                  </Paper>
                </Grow>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Back to Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 10,
            boxShadow: theme.shadows[10],
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default PortfolioSection;

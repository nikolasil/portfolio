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
          // '&:hover': {
          //   borderColor: theme.palette.primary.main,
          //   transform: 'translateY(-6px)',
          //   boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.1)}`,
          // },
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
            {proj.used.map((tech: string) => (
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

      {/* Toolbar */}
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

      {/* Grid Rendering */}
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
              /* Remove 'item' and use the 'size' prop instead */
              <Grid key={proj.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ProjectCard proj={proj} index={pIdx} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Scroll to top component here... */}
    </Box>
  );
};;

export default PortfolioSection;

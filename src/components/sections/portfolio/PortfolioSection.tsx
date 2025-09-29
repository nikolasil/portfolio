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
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import SectionWrapper from '@/components/SectionWrapper';
import StarDotsBackground from '@/components/StarDotsBackground';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const projectsData = {
  "ai": [
    {
      "cat": "Artificial Inteligence",
      "id": 0,
      "title": "Berkeley Pacman Project 0",
      "dec": "Short UNIX/Python tutorial in Python and the UNIX environment.",
      "url": "https://github.com/nikolasil/Berkeley-Pacman-Project-0",
      "used": ["Python", "Git"]
    },
    {
      "cat": "Artificial Inteligence",
      "id": 1,
      "title": "Berkeley Pacman Project 1",
      "dec": "Implement depth-first, breadth-first, uniform cost, and A* search algorithms. These algorithms are used to solve navigation and traveling salesman problems in the Pacman world.",
      "url": "https://github.com/nikolasil/Berkeley-Pacman-Project-1",
      "used": ["Python", "Git"]
    },
    {
      "cat": "Artificial Inteligence",
      "id": 2,
      "title": "Berkeley Pacman Project 2",
      "emoji": "⭐",
      "dec": "Implement multiagent minimax and expectimax algorithms, as well as designing evaluation functions.",
      "url": "https://github.com/nikolasil/Berkeley-Pacman-Project-2",
      "used": ["Python", "Git"]
    }
  ],
  "ml": [
    {
      "cat": "Machine Learning",
      "id": 100,
      "title": "Vaccination Clasifier with Logistic Regression",
      "dec": "A classifier to identify anti-vax | pro-vax tweets using Logistic Regression. Experimented with different hyperparameters, vectorizers and pre processing. Evaluated with F1 score, precision and recall.",
      "url": "https://github.com/nikolasil/ai_2_exercise_1",
      "used": ["Python", "PyTorch", "scikit-learn", "pandas", "numpy"]
    },
    {
      "cat": "Machine Learning",
      "id": 101,
      "title": "Vaccination Clasifier with FeedForward Neural Network",
      "dec": "A classifier to identify anti-vax | pro-vax tweets using FeedForward Neural Network. Experimented with pre-trained word embedding vector (GloVe), optimizers, number of hidden layers and the number of their units. Also experimented with different loss functions and metrics.",
      "url": "https://github.com/nikolasil/ai_2_exercise_2",
      "used": ["Python", "PyTorch", "scikit-learn", "pandas", "numpy"]
    },
    {
      "cat": "Machine Learning",
      "id": 102,
      "title": "Vaccination Clasifier with Bidirectional Stacked RNN (LSTM & GRU Cells)",
      "dec": "A classifier to identify anti-vax | pro-vax tweets using Bidirectional Stacked RNN (LSTM & GRU Cells). Experimented with Vanillia RNN and then compared it with RNN using GRU and LSTM Cells. Also experimented with dropout propability, GloVe sizes and different number of layers and the number of hidden size.",
      "url": "https://github.com/nikolasil/ai_2_exercise_3",
      "used": ["Python", "PyTorch", "scikit-learn", "pandas", "numpy"]
    },
    {
      "cat": "Machine Learning",
      "id": 103,
      "title": "Question Answering with Transformers on SQUAD2 & TriviaQA",
      "emoji": "⭐",
      "dec": "Question Answering using Transformers. Fine-tuning a BERT-base model and expirimented with number of epochs, batch sizes, sequence length, gradient clipping, learning rate, and different optimizers.",
      "url": "https://github.com/nikolasil/ai_2_exercise_4",
      "used": ["Python", "PyTorch", "scikit-learn", "pandas", "numpy"]
    }
  ],
  "dm": [
    {
      "cat": "Data Mining",
      "id": 200,
      "title": "Data Mining 1",
      "dec": "Sentiment Analysis on vaccination tweets. Created vectorizers Bag-of-words, Tf-idf, Word Embeddings. Tested the vectorizers with SVM, Random Forest, KNN. Used the LDA (Latent Dirichlet Allocation) algorithm to split the data into topics.",
      "url": "https://github.com/nikolasil/data-mining-1",
      "used": ["Python", "scikit-learn", "pandas", "numpy"]
    }
  ],
  "os|dt": [
    {
      "cat": "Operating Systems | Data Structures",
      "id": 300,
      "title": "Shared memory | Semaphores",
      "dec": "Two Processes sends each other mesages (server-client aproach) by a third process that simulates the channel. The messages are stored and passed from shared memory with the use of semaphores.",
      "url": "https://github.com/nikolasil/SharedMemory-Semaphores-MessagePassing",
      "used": ["C", "Git"]
    },
    {
      "cat": "Operating Systems | Data Structures",
      "id": 301,
      "title": "RAM Pagination",
      "dec": "This is a programm that simmulates 2 programms (bzip and gcc) with pages that are stored in ram using Hashed Paged Table and when the frames of the ram are full the page replacement happens with LRU or Second Change Algorithm.",
      "url": "https://github.com/nikolasil/HashedPagedTable-LRU-SecondChange",
      "used": ["C", "Git"]
    },
    {
      "cat": "Operating Systems | Data Structures",
      "id": 302,
      "title": "File Structure in Disk",
      "dec": "Implementation of Heap File Block, Hash File Block, Secondary Hash File Block.",
      "url": "https://github.com/nikolasil/FileStructure-BlockHeapHashFiles-SecondaryIndex",
      "used": ["C", "Git"]
    },
    {
      "cat": "Operating Systems | Data Structures",
      "id": 303,
      "title": "Vaccine Monitor 1",
      "dec": "This Application is a single Process that holds records of vaccinations. It has structures (Bloom Filter | Skip List) and answers commands based on the records given.",
      "url": "https://github.com/nikolasil/vaccineMonitor_1",
      "used": ["C++", "Shell", "Git"]
    },
    {
      "cat": "Operating Systems | Data Structures",
      "id": 304,
      "title": "Vaccine Monitor 2",
      "dec": "Extends the Vaccine Monitor 1 by making sub Processes(a sub Process takes some countries that it is responsible). The communication between the main Process and the sub Processes is made with named-pipes.",
      "url": "https://github.com/nikolasil/vaccineMonitor_2",
      "used": ["C++", "Shell", "Git"]
    },
    {
      "cat": "Operating Systems | Data Structures",
      "id": 305,
      "title": "Vaccine Monitor 3",
      "emoji": "⭐",
      "dec": "Extends the Vaccine Monitor 2 by making the sub Processes multi threading. The communication is also changed from named-pipes to web-sockets and signals.",
      "url": "https://github.com/nikolasil/vaccineMonitor_3",
      "used": ["C++", "Shell", "Git"]
    }
  ],
  "comp": [
    {
      "cat": "Compilers",
      "id": 400,
      "title": "LL(1) Calculator Parser - Translator to Java",
      "dec": "Implements a simple calculator. It supports addition, subtraction, and exponentiation operators, as well as parentheses. Also implements a parser and translator for a language supporting string operations. It supports the concatenation, function definitions, function calls and conditionals.",
      "url": "https://github.com/nikolasil/compilers1",
      "used": ["Java", "Git"]
    },
    {
      "cat": "Compilers",
      "id": 401,
      "title": "MiniJava Static Checking (Semantic Analysis)",
      "dec": "Impliments a compiler for MiniJava, a subset of Java. MiniJava is designed so that its programs can be compiled by a full Java compiler like javac.",
      "url": "https://github.com/nikolasil/compilers2",
      "used": ["Java", "Git"]
    },
    {
      "cat": "Compilers",
      "id": 402,
      "title": "Generating intermediate code (MiniJava -> LLVM)",
      "emoji": "⭐",
      "dec": "Impliments visitors who transform MiniJava code into the intermediate representation used by the LLVM compiler project.",
      "url": "https://github.com/nikolasil/compilers3",
      "used": ["Java", "llvm", "Git"]
    }
  ],
  "sec": [
    {
      "cat": "Security",
      "id": 500,
      "title": "Seuruty (Open Eclass) Defence & Attack",
      "emoji": "⭐",
      "dec": "The purpose was to fix the vunerabilities of the Open Eclass 2.3 (XSS, SQL Injections, CSRF Token, RFI) & attack the others teams website's trying to deface them.",
      "url": "https://github.com/nikolasil/security-1-openeclass",
      "used": ["PHP", "Docker", "Git"]
    }
  ],
  "web": [
    {
      "cat": "Web Applications",
      "id": 600,
      "title": "My Website Portfolio",
      "emoji": "⭐",
      "dec": "To gain experience in web development, I developed this portfolio.",
      "url": "https://github.com/nikolasil/portfolio",
      "used": ["React", "Sass", "Javascript", "MaterialUI", "Git"]
    },
    {
      "cat": "Web Applications",
      "id": 601,
      "title": "Doatap Reformation",
      "dec": "Recreated Doatap https://www.doatap.gr/ website. The concept was to fix the faults, make it more user friendly and in the same time more usable.",
      "url": "https://github.com/nikolasil/doatap-reformation",
      "used": [
        "React",
        "Node",
        "Express",
        "Javascript",
        "Redux",
        "MongoDB",
        "Git"
      ]
    }
  ],
  "mobile": [
    {
      "cat": "Mobile Applications",
      "id": 700,
      "title": "Altemco HVAC",
      "emoji": "⭐",
      "dec": "An android application that assists users in finding air conditioning error codes and receiving helpful advice on how to resolve the issue. [Monthly Users ~2.500, Total Downloads ~5.000]",
      "url": "https://play.google.com/store/apps/details?id=appinventor.ai_nikolasil2000.hvac2",
      "used": ["Android", "AppInventor", "GooglePlay"]
    }
  ]
};

const PortfolioSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // Collect all unique technologies across projects
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    Object.values(projectsData).forEach((projects: any) => {
      projects.forEach((proj: any) => {
        proj.used.forEach((t: string) => techSet.add(t));
      });
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects by selected techs
  const filteredProjectsData = useMemo(() => {
    if (selectedTechs.length === 0) return projectsData;
    const filtered: any = {};
    Object.entries(projectsData).forEach(([key, projects]) => {
      const matches = (projects as any).filter((proj: any) =>
        selectedTechs.every((t) => proj.used.includes(t))
      );
      if (matches.length > 0) filtered[key] = matches;
    });
    return filtered;
  }, [projectsData, selectedTechs]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <SectionWrapper
      id="portfolio"
      backgroundElement={
        <StarDotsBackground
          starCount={isMobile ? 200 : 800}
          maxSpeed={0.8}
          twinkle={true}
        />
      }
    >
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
          <Box textAlign="center" mb={2}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => setFiltersVisible((v) => !v)}
            >
              {filtersVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>

          {/* Filters Section */}
          <Collapse in={filtersVisible}>
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1}
              justifyContent="center"
              mb={4}
            >
              {allTechs.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  clickable
                  color={selectedTechs.includes(tech) ? 'primary' : 'default'}
                  onClick={() => toggleTech(tech)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
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
                {(projects as any)[0]?.cat || key}
              </Typography>

              <Stack spacing={4}>
                {(projects as any).map((proj: any, pIdx: number) => (
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
                        {proj.emoji
                          ? `${proj.emoji} ${proj.title}`
                          : proj.title}
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
      </Box>
    </SectionWrapper>
  );
};

export default PortfolioSection;
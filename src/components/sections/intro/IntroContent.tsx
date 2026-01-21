import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { ReactTyped } from 'react-typed';
import Link from 'next/link';

const IntroContent = () => (
  <Box
    sx={{
      height: 'calc(100dvh - 64px)', // subtract navbar height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'text.primary',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}
      >
        👋 Hello
      </Typography>

      <Typography
        variant="h3"
        fontWeight={600}
        gutterBottom
        sx={{ textShadow: '0 0 8px rgba(0,0,0,0.4)' }}
      >
        I&apos;m Nikolas Eliopoulos
      </Typography>

      <Typography
        variant="h5"
        color="text.secondary"
        gutterBottom
        sx={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}
      >
        <ReactTyped
          strings={['Software Engineer', 'Software Developer']}
          typeSpeed={60}
          backSpeed={40}
          loop
        />
      </Typography>

      <Typography
        variant="body1"
        mt={3}
        maxWidth="md"
        sx={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}
      >
        I love tackling complex problems and crafting efficient, scalable
        solutions.
        <br />
        I’m always eager to learn new data structures and algorithms that help
        me solve challenges more elegantly and effectively.
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mt={4}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/contact"
        >
          Contact Me
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href="/resume/Nikolas Iliopoulos.pdf"
          target="_blank"
        >
          View Resume
        </Button>
      </Stack>
    </Box>
  </Box>
);

export default IntroContent;

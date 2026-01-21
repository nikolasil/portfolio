import React from 'react';
import { Box, Typography, Button, Stack, keyframes } from '@mui/material';
import { ReactTyped } from 'react-typed';
import Link from 'next/link';

// Define the waving animation
const waveAnimation = keyframes`
  0% { transform: rotate( 0.0deg) }
  10% { transform: rotate(14.0deg) }
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
`;

const IntroContent = () => (
  <Box
    sx={{
      height: 'calc(100dvh - 64px)',
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
        sx={{
          textShadow: '0 0 5px rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            animation: `${waveAnimation} 2.5s infinite`,
            transformOrigin: '70% 70%', // Pivot point at the wrist
          }}
        >
          👋
        </Box>
        Hello
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
          sx={{ borderRadius: 2, px: 3 }}
        >
          Contact Me
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href="/resume/Nikolas Iliopoulos.pdf"
          target="_blank"
          sx={{ borderRadius: 2, px: 3 }}
        >
          View Resume
        </Button>
      </Stack>
    </Box>
  </Box>
);

export default IntroContent;

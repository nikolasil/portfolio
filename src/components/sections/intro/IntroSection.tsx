import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  keyframes,
  Container,
} from '@mui/material';
import { ReactTyped } from 'react-typed';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FileDownload, Phone } from '@mui/icons-material';

// Refined waving animation
const waveAnimation = keyframes`
  0% { transform: rotate(0deg) }
  15% { transform: rotate(14deg) }
  30% { transform: rotate(-8deg) }
  40% { transform: rotate(14deg) }
  50% { transform: rotate(-4deg) }
  60% { transform: rotate(10deg) }
  70% { transform: rotate(0deg) }
  100% { transform: rotate(0deg) }
`;

const IntroSection = () => {
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const myAge = calculateAge('2000-11-28');

  return (
    <Box
      component="section"
      sx={{
        minHeight: 'calc(100dvh - 64px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 4,
          }}
        >
          {/* Greeting */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
              color: 'text.secondary',
              fontSize: '1rem',
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                animation: `${waveAnimation} 2.5s infinite`,
                transformOrigin: '70% 70%',
                fontSize: '1rem',
              }}
            >
              👋
            </Box>
            Hello, I&apos;m
          </Typography>

          {/* Name with Gradient */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              mb: 1,
              fontSize: { xs: '1.5rem', md: '3rem' },
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Nikolas Eliopoulos
          </Typography>

          {/* Typing Effect */}
          <Box sx={{ height: 40, mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 400,
                color: 'text.primary',
                fontSize: { xs: '1rem', md: '1.5rem' },
              }}
            >
              <ReactTyped
                strings={['Software Engineer', 'Full-Stack Developer']}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            </Typography>
          </Box>

          {/* Bio Text */}
          <Typography
            variant="body1"
            sx={{
              maxWidth: '600px',
              color: 'text.secondary',
              lineHeight: 1.7,
              fontSize: '1rem',
              mb: 5,
            }}
          >
            A <strong>{myAge}-year-old</strong> software engineer based in{' '}
            <strong>NYC</strong> with over <strong>4 years</strong> of
            professional experience both in backend and frontend. I hold a
            Bachelor&apos;s degree in Computer Science and a passion for clean
            code.
          </Typography>

          {/* Call to Actions */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              component={Link}
              href="/contact"
              startIcon={<Phone />}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,118,255,0.23)',
                },
              }}
            >
              Contact Me
            </Button>

            <Button
              variant="outlined"
              href="/resume/Nikolas Iliopoulos.pdf"
              target="_blank"
              startIcon={<FileDownload />}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
              }}
            >
              Resume
            </Button>
          </Stack>

          {/* Secondary Link */}
          <Box sx={{ mt: 4 }}>
            <Typography
              component={Link}
              href="/about"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                  '& .arrow': { transform: 'translateX(4px)' },
                },
              }}
            >
              Get to know me better
              <ArrowForwardIosIcon
                className="arrow"
                sx={{ fontSize: 12, ml: 1, transition: 'transform 0.2s' }}
              />
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IntroSection;

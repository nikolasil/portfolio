import { Box, Container } from '@mui/material';
import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  bgColor?: string;
  backgroundElement?: React.ReactNode; // <-- Accept background component
}

const SectionWrapper = ({
  id,
  children,
  bgColor,
  backgroundElement,
}: SectionWrapperProps) => {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: bgColor || 'background.default',
      }}
    >
      {/* Full-width background layer */}
      {backgroundElement && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        >
          {backgroundElement}
        </Box>
      )}

      {/* Content layer */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;

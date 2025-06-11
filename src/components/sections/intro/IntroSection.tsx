import React from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import IntroContent from './IntroContent';
import StarDotsBackground from '../../StarDotsBackground';
import { useMediaQuery, useTheme } from '@mui/material';

const IntroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <SectionWrapper
      id="intro"
      backgroundElement={
        <StarDotsBackground
          starCount={isMobile ? 200 : 800}
          maxSpeed={0.8}
          twinkle={true}
        />
      }
    >
      <IntroContent />
    </SectionWrapper>
  );
};

export default IntroSection;

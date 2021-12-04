import React from 'react';
import './about.scss';
import { isMobile } from 'react-device-detect';

export default function About() {
  const ts = '<';
  const te = '>';
  const q21 = 'Not ';
  return (
    <div className="about" id="about">
      <div className="container">
        <div className="header">
          <h1 className="t">{ts}</h1>
          <h1 className="main">About Me</h1>
          <h1 className="t">{te}</h1>
        </div>
        <div className="content">
          <div className="top">
            <span>
              I am a 21-year-old college student. I am currently enrolled in my
              fourth and last year of University.
            </span>
            <span>Greece is where I was born and raised.</span>
          </div>
          <div className={'quoteContainer ' + (isMobile && 'mobile')}>
            <h2>
              ~ "Programming is <mark className="typing">Thinking</mark>,
            </h2>
            <h2>
              Not <mark className="typing">Typing</mark>" ~
            </h2>
          </div>
          <div className="bottom">
            <span>
              I consider myself to be a dedicated, hardworking and motivated
              individual.
            </span>
            <span>
              Programming is my passion, and I'm always seeking for new
              challenges.
            </span>
            <span>
              Space, travel, and technology are some of my other interests.
            </span>
            <span>
              I'm always looking for new opportunities to learn and grow my
              talents.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

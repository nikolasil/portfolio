import React from 'react';
import './about.scss';
import { isMobile } from 'react-device-detect';

export default function About() {
  const ts = '<';
  const te = '>';
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
              I am a <mark>21-year-old</mark> college student.
            </span>
            <span>
              I am currently enrolled in my fourth and <mark>last year </mark>
              of University.
            </span>
            <span>Greece is where I was born and raised.</span>
            <span>Also, I have a driver's license and own a car.</span>
          </div>
          <div className={'quoteContainer ' + (isMobile && 'mobile')}>
            <h2>
              ~ "Programming is <mark className="color">Thinking</mark>,
            </h2>
            <h2>
              Not <mark className="color">Typing</mark>" ~
            </h2>
          </div>
          <div className="bottom">
            <span>
              I consider myself to be a dedicated, hardworking and motivated
              individual.
            </span>
            <span>
              Programming is my <mark>passion </mark>, and I'm always seeking
              for new challenges.
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
        <div className="header">
          <h1 className="t">{ts + '/'}</h1>
          <h1 className="main">About Me</h1>
          <h1 className="t">{te}</h1>
        </div>
      </div>
    </div>
  );
}

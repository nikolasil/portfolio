import React from 'react';
import './about.scss';
import { isMobile } from 'react-device-detect';
import DownloadIcon from '@mui/icons-material/Download';

function getWorkingExperience() {
  var today = new Date();
  var firstJobDate = new Date('2022-02-01');
  var years = today.getFullYear() - firstJobDate.getFullYear();

  if (today.getMonth() >= 9) {
    years++;
  }

  return years;
}

function getAge() {
  var today = new Date();
  var birthDate = new Date('2000-11-18');
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    if (today.getMonth() < 6) {
      age--;
    }
  }
  return age;
}

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
              I am a <mark>{getAge()}-year-old</mark> software engineer.
            </span>
            <span>
              I acquired my 4 years bachelor's degree at <mark>02/2023</mark>{' '}
              and I have <mark>{getWorkingExperience()} years </mark> of work
              experience
            </span>
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
              Programming is my <mark>passion </mark> and I'm always seeking for
              new challenges.
            </span>
            <span>
              Space, travel, and technology are some of my other interests.
            </span>
            <span>
              I'm always looking for new opportunities to learn and grow my
              talents.
            </span>
            <div className="resume">
              <span
                onClick={() => {
                  const a = document.createElement('a');
                  const url = '/resume/Nikolas Iliopoulos.pdf';
                  a.href = url;
                  a.download = url.split('/').pop();
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
              >
                Checkout my up to date resume
              </span>
              <DownloadIcon
                className="downloadIcon"
                onClick={() => {
                  const a = document.createElement('a');
                  const url = '/resume/Nikolas Iliopoulos.pdf';
                  a.href = url;
                  a.download = url.split('/').pop();
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
              />
            </div>
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

import React from 'react';
import './about.scss';

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
      </div>
    </div>
  );
}

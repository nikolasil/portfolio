import React from 'react';
import './experience.scss';
import ExperienceItem from './ExperienceItem';
import items from './items.json';
import { isMobile } from 'react-device-detect';

export default function Experience() {
  const ts = '<';
  const te = '>';
  return (
    <div className="experience" id="experience">
      <div className="container">
        <div className="header">
          <h1 className="t">{ts}</h1>
          <h1 className="main">Experience</h1>
          <h1 className="t">{te}</h1>
        </div>
        <div className="content">
          {items.map((item) => (
            <ExperienceItem key={item.id} item={item} />
          ))}
        </div>
        <div className="header">
          <h1 className="t">{ts + '/'}</h1>
          <h1 className="main">Experience</h1>
          <h1 className="t">{te}</h1>
        </div>
      </div>
    </div>
  );
}

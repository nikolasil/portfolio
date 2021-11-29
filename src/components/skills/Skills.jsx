import React from 'react';
import './skills.scss';
import items from './items.json';

export default function Skills() {
    const k = true;
  return (
    <div className="skills" id="skills">
      <div className="container">
        <div className="header">
          <h1>Skills</h1>
        </div>
        <div className="content">
          <h3>Languages</h3>
          <div>
            {items['languages'].map((i) => (
              <img src={'assets/portfolio/' + i + '.svg'} alt={i} />
            ))}
          </div>
          <h3>Frameworks</h3>
          <div>
            {items['frameworks'].map((i) => (
              <img src={'assets/portfolio/' + i + '.svg'} alt={i} />
            ))}
          </div>
          <h3>Others</h3>
          <div>
            {items['others'].map((i) => (
              <img src={'assets/portfolio/' + i + '.svg'} alt={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

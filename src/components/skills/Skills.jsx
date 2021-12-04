import React from 'react';
import './skills.scss';
import items from './items.json';

export default function Skills() {
  const ts = '<';
  const te = '>';
  return (
    <div className="skills" id="skills">
      <div className="container">
        <div className="header">
          <h1 className="t">{ts}</h1>
          <h1 className="main">Skills</h1>
          <h1 className="t">{te}</h1>
        </div>
        <div className="content">
          <div className="title">
            <h3>Languages</h3>
          </div>
          <div className="items">
            {items['languages'].map((i) => (
              <img src={'assets/badges/' + i + '.svg'} alt={i} />
            ))}
          </div>
          <div className="title">
            <h3>Frameworks</h3>
          </div>
          <div className="items">
            {items['frameworks'].map((i) => (
              <img src={'assets/badges/' + i + '.svg'} alt={i} />
            ))}
          </div>
          <div className="title">
            <h3>Others</h3>
          </div>
          <div className="items">
            {items['others'].map((i) => (
              <img src={'assets/badges/' + i + '.svg'} alt={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

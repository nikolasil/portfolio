import React from 'react';
import './skills.scss';
import items from './items.json';
import sections from './sections.json';

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
          {sections.map((section, index) => (
            <>
              <div className="title">
                <h3>{section['title']}</h3>
              </div>
              <div className="items">
                {items[section['id']] && items[section['id']].map((i) => (
                  <img
                    src={'assets/badges/' + i + '.svg'}
                    alt={i}
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          ))}
        </div>
        <div className="header">
          <h1 className="t">{ts + '/'}</h1>
          <h1 className="main">Skills</h1>
          <h1 className="t">{te}</h1>
        </div>
      </div>
    </div>
  );
}

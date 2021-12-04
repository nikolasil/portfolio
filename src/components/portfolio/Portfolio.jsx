import React, { useState } from 'react';
import './portfolio.scss';
import PortfolioItem from './PortfolioItem';
import PortfolioList from './PortfolioMenu';
import projects from './items.json';
import menu from './menu.json';

export default function Portfolio() {
  const [selected, setSelected] = useState('os|dt');
  const ts = '<';
  const te = '>';
  return (
    <div className="portfolio" id="portfolio">
      <div className="container">
        <div className="header">
          <h1 className="t">{ts}</h1>
          <h1 className="main">Portfolio</h1>
          <h1 className="t">{te}</h1>
        </div>
        <div className="header2">
          <ul>
            {menu.map((item) => (
              <PortfolioList
                id={item.id}
                title={item.title}
                active={selected === item.id}
                setSelected={setSelected}
              />
            ))}
          </ul>
          <div className="seperator"></div>
        </div>
        <div className="content">
          {projects[selected].map((item) => (
            <PortfolioItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

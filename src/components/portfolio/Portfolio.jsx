import React, { useEffect, useState } from 'react';
import './portfolio.scss';
import PortfolioItem from './PortfolioItem';
import PortfolioList from './PortfolioMenu';
import projects from './items.json';
import menu from './menu.json';

export default function Portfolio() {
  const [selected, setSelected] = useState('os|dt');

  return (
    <div className="portfolio" id="portfolio">
      <div className="container">
        <div className="header">
          <h1>Portfolio</h1>
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

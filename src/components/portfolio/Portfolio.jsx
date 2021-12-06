import React, { useState, useEffect } from 'react';
import './portfolio.scss';
import PortfolioItem from './PortfolioItem';
import PortfolioMenu from './PortfolioMenu';
import projects from './items.json';
import menu from './menu.json';

export default function Portfolio() {
  const [selected, setSelected] = useState('featured');
  const [flashing, setFlashing] = useState('');
  const ts = '<';
  const te = '>';
  useEffect(() => {
    console.log(flashing);
  });
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
              <PortfolioMenu
                id={item.id}
                title={item.title}
                emoji={item.emoji}
                active={selected === item.id}
                flash={flashing === item.id}
                setSelected={setSelected}
              />
            ))}
          </ul>
          <div className="seperator"></div>
        </div>
        <div className="content">
          {projects[selected].map((item) => (
            <PortfolioItem
              item={item}
              setSelected={setSelected}
              setFlashing={setFlashing}
            />
          ))}
        </div>
        <div className="header">
          <h1 className="t bottom">{ts + '/'}</h1>
          <h1 className="main bottom">Portfolio</h1>
          <h1 className="t bottom">{te}</h1>
        </div>
      </div>
    </div>
  );
}

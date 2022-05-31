import React, { useState, useEffect } from 'react';
import './portfolio.scss';
import PortfolioItem from './PortfolioItem';
import PortfolioMenu from './PortfolioMenu';
import projects from './items.json';
import menu from './menu.json';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { isMobile } from 'react-device-detect';
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
            {!isMobile && (
              <li className="iconWrapper">
                <FilterAltIcon className="icon" />
              </li>
            )}
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
          {selected !== 'featured' &&
            projects[selected] &&
            projects[selected].map((item) => (
              <PortfolioItem
                item={item}
                setSelected={setSelected}
                setFlashing={setFlashing}
              />
            ))}
          {selected === 'featured' &&
            Object.entries(projects).map((item) =>
              item[1]
                .filter((item) => item.emoji === '⭐')
                .map((proj) => (
                  <PortfolioItem
                    item={proj}
                    setSelected={setSelected}
                    setFlashing={setFlashing}
                    category={proj.cat}
                    redirect={item[0]}
                  />
                ))
            )}
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

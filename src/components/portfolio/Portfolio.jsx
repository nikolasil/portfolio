import React from 'react';
import './portfolio.scss';
import PortfolioList from './PortfolioList';
export default function Portfolio() {
  const list = [
    { id: 'ai/ml', title: 'Artificial Inteligence / Machine Learning' },
    { id: 'os', title: 'Operating Systems' },
    { id: 'web', title: 'Web Apps' },
    { id: 'mobile', title: 'Mobile Apps' },
  ];
  return (
    <div className="portfolio" id="portfolio">
      <h1>Portfolio</h1>
      <ul>
        {list.map((item) => (
          <PortfolioList id={item.id} title={item.title} />
        ))}
      </ul>
      <div className="container">
        <div className="item">
          <img src="" alt="" />
          <h3>Pacman 1</h3>
        </div>
      </div>
    </div>
  );
}

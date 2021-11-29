import React from 'react';
import './portfolioItem.scss';
import { isMobile } from 'react-device-detect';
export default function PortfolioItem({ item }) {
  return (
    <div
      className={'portfolioItem ' + (isMobile && 'mobile')}
      key={item.id}
      onClick={() => {
        window.open(item.url, '_blank');
      }}
    >
      <div className="top">
        <h3>{item.title}</h3>
        <span>{item.dec}</span>
      </div>

      <div className="bottom">
        {item.used.map((i) => (
          <img src={'assets/portfolio/' + i + '.svg'} alt={i} />
        ))}
      </div>
    </div>
  );
}

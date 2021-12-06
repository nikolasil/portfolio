import React from 'react';
import './portfolioItem.scss';
import { isMobile } from 'react-device-detect';

export default function PortfolioItem({ item, setSelected, setFlashing }) {
  return (
    <div
      className={'portfolioItem ' + (isMobile && 'mobile')}
      key={item.id}
      onClick={() => {
        window.open(item.url, '_blank');
      }}
    >
      <div className="top">
        <span className="title">
          {item.cat ? <span>[</span> : ''}

          <mark
            onClick={(e) => {
              e.stopPropagation();
              setSelected(item.redirect);
              setFlashing('');
            }}
            onMouseEnter={(e) => {
              setFlashing(item.redirect);
            }}
            onMouseOut={(e) => {
              setFlashing('');
            }}
          >
            {item.cat}
          </mark>
          {item.cat ? <span>] </span> : ''}
          {item.title}
          <span>{item.emoji}</span>
        </span>
        <span className="dec">{item.dec}</span>
      </div>

      <div className="bottom">
        {item.used.map((i) => (
          <img src={'assets/badges/' + i + '.svg'} alt={i} />
        ))}
      </div>
    </div>
  );
}

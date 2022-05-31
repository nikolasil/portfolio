import React from 'react';
import './portfolioItem.scss';
import { isMobile } from 'react-device-detect';

export default function PortfolioItem({
  item,
  setSelected,
  setFlashing,
  category,
  redirect,
}) {
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
          {category ? <span>[</span> : ''}

          <mark
            onClick={(e) => {
              e.stopPropagation();
              setSelected(redirect);
              setFlashing('');
            }}
            onMouseEnter={(e) => {
              setFlashing(redirect);
            }}
            onMouseOut={(e) => {
              setFlashing('');
            }}
          >
            {category}
          </mark>
          {category ? <span>] </span> : ''}
          {item.title}
          <span>{item.emoji}</span>
        </span>
        <span className="dec">{item.dec}</span>
      </div>

      <div className="bottom">
        {item.used.map((i) => (
          <img src={'assets/badges/' + i + '.svg'} alt={i} loading="lazy" />
        ))}
      </div>
    </div>
  );
}

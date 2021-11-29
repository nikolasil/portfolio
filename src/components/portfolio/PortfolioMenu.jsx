import React, { useEffect } from 'react';
import './portfolioMenu.scss';

export default function PortfolioMenu({ id, title, active, setSelected }) {
  return (
    <li
      id={id}
      className={'portfolioMenu ' + (active && 'active')}
      onClick={() => {
        setSelected(id);
      }}
    >
      {title}
    </li>
  );
}

import React, { useEffect } from 'react';
import './portfolioMenu.scss';

export default function PortfolioMenu({
  id,
  title,
  emoji,
  active,
  flash,
  setSelected,
}) {
  useEffect(() => {
    console.log(flash);
  });
  return (
    <li
      id={id}
      className={
        'portfolioMenu ' + (active ? 'active ' : ' ') + (flash && 'flash')
      }
      onClick={() => {
        setSelected(id);
      }}
    >
      <span>{emoji}</span>
      {title}
    </li>
  );
}

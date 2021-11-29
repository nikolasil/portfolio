import React from 'react';
import './menu.scss';
import list from './items.json';

export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={'menu ' + (menuOpen && 'active')}>
      <ul>
        {list.map((i) => (
          <li
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <a href={i.location} class={'' + (menuOpen && 'active')}>
              {i.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
import './menu.scss';

export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={'menu ' + (menuOpen && 'active')}>
      <ul>
        <li
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <a href="#intro" class={'' + (menuOpen && 'active')}>
            Home
          </a>
        </li>
        <li
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <a href="#portfolio" class={'' + (menuOpen && 'active')}>
            Portfolio
          </a>
        </li>
        <li
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <a href="#projects" class={'' + (menuOpen && 'active')}>
            Projects
          </a>
        </li>
        <li
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <a href="#projects" class={'' + (menuOpen && 'active')}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

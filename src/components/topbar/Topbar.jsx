import React from 'react';
import { Person, Mail, Menu, Close } from '@material-ui/icons';
import './topbar.scss';

export default function Topbar({ menuOpen, setMenuOpen }) {
  return (
    <div className={'topbar ' + (menuOpen && 'active')}>
      <div className="wrapper">
        <div className="left">
          <a href="#intro" className="logo">
            Iliopoulos Nikolas
          </a>
          <div className="itemContainer">
            <Person className="icon" />
            <span>+30 694 294 88 51</span>
          </div>
          <div className="itemContainer">
            <Mail className="mail" />
            <span>nikolasil2000@gmail.com</span>
          </div>
        </div>
        <div className="right">
          {menuOpen && (
            <Close className="closeButton" onClick={() => setMenuOpen(false)} />
          )}

          {!menuOpen && (
            <Menu
              className="menuButton"
              onClick={() => {
                setMenuOpen(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

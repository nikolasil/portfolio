import React from 'react';
import './menu.scss';
import list from './items.json';
import { isMobile } from 'react-device-detect';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={'menu ' + (menuOpen && 'active')}>
      <div className="container">
        <div className="spacer"></div>
        <ul>
          {list.map((i) => (
            <li
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {i.location === '#intro' ? (
                <HomeIcon className="icon" />
              ) : i.location === '#about' ? (
                <PersonIcon className="icon" />
              ) : i.location === '#portfolio' ? (
                <ComputerIcon className="icon" />
              ) : i.location === '#education' ? (
                <SchoolIcon className="icon" />
              ) : i.location === '#skills' ? (
                <FormatListBulletedIcon className="icon" />
              ) : i.location === '#contact' ? (
                <PhoneIcon className="icon" />
              ) : (
                ''
              )}
              <a href={i.location} class={'' + (menuOpen && 'active')}>
                {!isMobile ? i.name : i.mobileName}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="closer"
          onClick={() => {
            setMenuOpen(false);
          }}
        ></div>
      </div>
    </div>
  );
}

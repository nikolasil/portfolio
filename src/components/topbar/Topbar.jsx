import React from 'react';
import { Menu, Close } from '@mui/icons-material';
import './topbar.scss';
import { isMobile } from 'react-device-detect';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Topbar({ menuOpen, setMenuOpen }) {
  return (
    <div className={'topbar ' + (menuOpen && 'active')}>
      <div className="wrapper">
        <div className="left">
          {' '}
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
        <div className="middle">
          <a href="#intro" className="logo">
            Iliopoulos Nikolas
          </a>
        </div>
        <div className="right">
          {!isMobile && (
            <GitHubIcon
              className="gitHubIcon"
              onClick={() => {
                window.open('https://github.com/nikolasil', '_blank');
              }}
            />
          )}
          {!isMobile && (
            <LinkedInIcon
              className="linkedInIcon"
              onClick={() => {
                window.open(
                  'https://www.linkedin.com/in/nikolasiliopoulos/',
                  '_blank'
                );
              }}
            />
          )}
          {/* {!isMobile && (
            <FacebookIcon
              className="facebookIcon"
              onClick={() => {
                window.open('https://www.facebook.com/nikolasil/', '_blank');
              }}
            />
          )}
          {!isMobile && (
            <InstagramIcon
              className="instagramIcon"
              onClick={() => {
                window.open(
                  'https://www.instagram.com/iliopoulos_nikolas/',
                  '_blank'
                );
              }}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

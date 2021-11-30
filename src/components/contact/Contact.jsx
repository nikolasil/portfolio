import React from 'react';
import './contact.scss';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import CityIcon from '@mui/icons-material/Home';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { isMobile } from 'react-device-detect';

export default function Contact() {
  return (
    <div className="contact" id="contact">
      <div className="container">
        <div className="header">
          <h1>Contact</h1>
        </div>
        <div className={'content ' + (!isMobile && 'desktop')}>
          <div className="item">
            <span className="title">City:</span>
            <CityIcon className="icon" />
            <span
              className="data"
              onClick={() => {
                window.open(
                  'https://www.google.com/maps/place/Nea+Makri+190+05/@38.0694376,23.9424477,13z/data=!3m1!4b1!4m5!3m4!1s0x14a182c1ac72aab5:0xb38f8f26c5b7e893!8m2!3d38.0878845!4d23.9761139',
                  '_blank'
                );
              }}
            >
              Nea Makri, Attiki, Greece
            </span>
          </div>
          <div className="item">
            <span className="title">Phone:</span>
            <PhoneIcon className="icon" />
            <a className="data" href="tel:+30 694 294 88 51">
              +30 694 294 88 51
            </a>
          </div>
          <div className="item">
            <span className="title">Email:</span>
            <EmailIcon className="icon" />
            <a className="data" href="mailto:iliopoulos.info@gmail.com">
              iliopoulos.info@gmail.com
            </a>
          </div>
          <div className="item">
            <span className="title">LinkedIn:</span>
            <LinkedInIcon className="icon" />
            <span
              className="data"
              onClick={() => {
                window.open(
                  'https://www.linkedin.com/in/nikolasiliopoulos/',
                  '_blank'
                );
              }}
            >
              Νικόλας Ηλιόπουλος
            </span>
          </div>
          <div className="item">
            <span className="title">Github:</span>
            <GitHubIcon className="icon" />
            <span
              className="data"
              onClick={() => {
                window.open('https://github.com/nikolasil', '_blank');
              }}
            >
              nikolasil
            </span>
          </div>
          <div className="item">
            <span className="title">Facebook:</span>
            <FacebookIcon className="icon" />
            <span
              className="data"
              onClick={() => {
                window.open('https://www.facebook.com/nikolasil/', '_blank');
              }}
            >
              Νικόλας Ηλιόπουλος
            </span>
          </div>
          <div className="item">
            <span className="title">Instagram:</span>
            <InstagramIcon className="icon" />
            <span
              className="data"
              onClick={() => {
                window.open(
                  'https://www.instagram.com/iliopoulos_nikolas/',
                  '_blank'
                );
              }}
            >
              iliopoulos_nikolas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

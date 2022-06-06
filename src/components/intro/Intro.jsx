import React, { useEffect, useRef } from 'react';
import './intro.scss';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { init } from 'ityped';
import { isMobile } from 'react-device-detect';

export default function Intro() {
  const textRef = useRef();
  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      cursorChar: '|',
      backDelay: 1500,
      backSpeed: 60,
      strings: ['Developer', 'Designer'],
    });
  }, []);
  return (
    <div className="intro" id="intro">
      {!isMobile && (
        <div className="left">
          <div className="imgContainer">
            <img src="assets/iliopoulos.png" alt="Me" />
          </div>
        </div>
      )}

      <div className={'right ' + (isMobile && 'mobile')}>
        <div className={'wrapper ' + (isMobile && 'mobile')}>
          <h2>Hi There, I'm</h2>
          <h1>Nikolas Iliopoulos</h1>

          {!isMobile && (
            <h3>
              Computer Scientist / <span ref={textRef}></span>
            </h3>
          )}
          {isMobile && (
            <>
              <h3>Computer Scientist /</h3>
              <h3>
                <span ref={textRef}></span>
              </h3>
            </>
          )}
        </div>
        <a class={'' + (!isMobile && 'mobile')} href="#portfolio">
          <KeyboardDoubleArrowDownIcon className="arrow" />
        </a>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import './intro.scss';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { init } from 'ityped';

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
      <div className="left">
        <div className="imgContainer">
          <img src="assets/iliopoulos.png" alt="" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>Hi There, I'm</h2>
          <h1>Nikolas Iliopoulos</h1>
          <h3>
            Computer Scientist / <span ref={textRef}></span>
          </h3>
        </div>
        <a href="#portfolio">
          <KeyboardDoubleArrowDownIcon className="arrow" />
        </a>
      </div>
    </div>
  );
}

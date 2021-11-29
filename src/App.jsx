import React from 'react';
import { useState } from 'react';
import Topbar from './components/topbar/Topbar';
import Intro from './components/intro/Intro';
import Portfolio from './components/portfolio/Portfolio';
import Education from './components/education/Education';
import Skills from './components/skills/Skills';
import './app.scss';
import Menu from './components/menu/Menu';
import { isMobile } from 'react-device-detect';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={'sections ' + (isMobile && 'mobile')}>
        <Intro />
        <Portfolio />
        <Education />
        <Skills />
      </div>
    </div>
  );
}

export default App;

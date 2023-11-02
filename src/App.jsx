import React from 'react';
import { useState } from 'react';
import Topbar from './components/topbar/Topbar';
import Intro from './components/intro/Intro';
import Portfolio from './components/portfolio/Portfolio';
import Education from './components/education/Education';
import Skills from './components/skills/Skills';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Menu from './components/menu/Menu';
import './app.scss';
import { isMobile } from 'react-device-detect';
import Experience from './components/experience/Experience';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={'sections ' + (isMobile && 'mobile')}>
        <Intro className="intro" />
        <About className="about" />
        <Experience className="experience" />
        <Education className="education" />
        <Portfolio className="portfolio" />
        <Skills className="skills" />
        <Contact className="contact" />
      </div>
    </div>
  );
}

export default App;

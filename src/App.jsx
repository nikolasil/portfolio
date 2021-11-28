import React from 'react';
import { useState } from 'react';
import Topbar from './components/topbar/Topbar';
import Intro from './components/intro/Intro';
import Portfolio from './components/portfolio/Portfolio';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import './app.scss';

function App() {
  // const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <div className="sections">
        <Intro />
        <Portfolio />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;

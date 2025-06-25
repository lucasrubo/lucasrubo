import React from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import About from '../components/About';
import Resume from '../components/Resume';
import Portfolio from '../components/Portfolio';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

function Home() {
  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <About />
        <Resume />
        <Portfolio />
        <Blog />
        <Contact />
      </div>
    </main>
  );
}

export default Home;
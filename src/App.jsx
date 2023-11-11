import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { builder } from "@builder.io/react";
import RegisterComponents from './components/register.jsx';
import MenuBar from './components/MenuBar.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import CatchAllPage from './pages/CatchAllPage.jsx';
import BUILDER_API_KEY from './config';
import './App.css';

function App() {

  const [navLinks, setNavLinks] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Register componets and initialize builder once
    RegisterComponents();
    builder.init(BUILDER_API_KEY);

    async function fetchLinks() {
      // Obtain the links from builder.io once
      const allLinks = await builder.getAll("nav-links", {});
      setNavLinks(allLinks);
      setLinks([]);
      allLinks.forEach((elem) => {
        links.push(...elem.data.links);
      });
    }
    fetchLinks();
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <header>
          <MenuBar appName="Playtrader" links={navLinks}/>
        </header>
        <Routes>
          <Route path="/login" element={<BuilderPage path="/login"/>}/>
          <Route path="/about" element={<BuilderPage path="/about"/>}/>
          <Route path="/learn" element={<BuilderPage path="/learn"/>}/>
          <Route path="/profile" element={<BuilderPage path="/profile"/>}/>
          <Route path="/account" element={<BuilderPage path="/account"/>}/>
          <Route path="/dashboard" element={<BuilderPage path="/dashboard"/>}/>
          <Route path="/logout" element={<BuilderPage path="/logout"/>}/>
          <Route path="/" element={<BuilderPage path="/"/>}/>
          <Route element = {<CatchAllPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

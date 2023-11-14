import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { builder } from "@builder.io/react";
import RegisterComponents from './components/register.jsx';
import MenuBar from './components/MenuBar.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import CatchAllPage from './pages/CatchAllPage.jsx';
import BUILDER_API_KEY from './config';
import './App.css';
import DynamicStockTable from './components/DynamicStockTable.jsx';

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
      let vals = []
      allLinks.forEach((elem) => {
        vals.push(...elem.data.links);
      });
      setLinks(vals);
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
          {links.toReversed().map((link) => (
            <Route path={link.url} element={<BuilderPage path={link.url}/>}/>
          ))}
          <Route path="/login" element={<BuilderPage path="/login"/>}/>
          <Route element = {<CatchAllPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

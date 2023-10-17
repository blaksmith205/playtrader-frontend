
import React, { useEffect, useState } from "react";
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { builder } from "@builder.io/react";
import BUILDER_API_KEY from '../config';

builder.init(BUILDER_API_KEY);

export default function NavigationBar() {
  const contacts = [
    { url: "/", text: "Home" },
    { url: "/leaderboards", text: "Leaderboards" },
    { url: "/about", text: "About Us" }
  ];
  const [show, setShow] = useState(null);
  const [links, setLinks] = useState(contacts);

  // Get the CMS data from Builder
  // useEffect(() => {
  //   async function fetchContent() {
  //     const nav_links = await builder.getAll("nav-links", {});
  //     setLinks(nav_links);
  //     console.log(nav_links)
  //   }
  //   fetchContent();
  // }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" href="/">
          <img src="https://via.placeholder.com/50"/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Playtrader
        </Typography>
        <Button color="inherit">Stocks</Button>
        <Button color="inherit" href="/login">Login</Button>
      </Toolbar>
      <Drawer anchor="left" open={show} onClose={() => setShow(false)}>
        <List>
          {links.map((link, index) => {
            console.log(index)
            return (
            <ListItemButton key='{index}' href={link.url}>
              <ListItemText primary={link.text} />
            </ListItemButton>
            )
          })}
        </List>
      </Drawer>
    </AppBar>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function MenuBar({user, appName, links}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [pages, setPages] = useState(null);
  const [settings, setSettings] = useState(null);
  
  const logout = () => {
    if (user) {
      navigate("/", {replace:true});
      getAuth().signOut()
      .catch(console.error)
    }
  }

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (url, isUser) => {
    if (isUser) {
      handleCloseUserMenu();
    } else{
      handleCloseNavMenu();
    }
    if (url==="/logout") {
      logout();
    } else {
      navigate(url);
    }
  };

  const renderLogin = () => {
    return (
    <Button
      key="login"
      onClick={() => navigate("login")}
      sx={{ my: 2, color: 'white', display: 'block' }}>
      Login
    </Button>);
  }

  const renderProfile = () => {
    return (
      <>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user?.displayName} src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>
            {settings?.map((setting) => (
              <MenuItem key={setting.label} onClick={() => handleNavigate(setting.url, true)}>
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </>
    );
  }

  useEffect(() => {
    links.forEach((elem) => {
      switch (elem.name) {
          case "main-pages":
              setPages(elem.data.links);
              break;
          case "account-settings":
              setSettings(elem.data.links);
              break;
          default:
            console.log("Links for " + elem.name + " is unknown. Code needs to be updated.");
            break;
      }
    });
  }, [links]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShowChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages?.map((page) => (
                <MenuItem key={page.label} onClick={() => handleNavigate(page.url, false)}>
                  <Typography textAlign="center" href={page.url}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShowChartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages?.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigate(page.url, false)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? renderProfile() : renderLogin()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuBar;
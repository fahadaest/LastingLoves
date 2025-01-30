import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import AdbIcon from '@mui/icons-material/Adb';
import MenuButton from '../Dashboard/MenuButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SideMenuMobile from '../Dashboard/SideMenuMobile';

const pages = ['Home', 'About', 'Services', 'Pricing', 'How it Works'];
const settings = ['Profile', 'Upload Memory', 'Sign in'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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

  const handleNavigate = (page) => {
    if (page === 'Home') {
      navigate('/');
    }
    if (page === 'About') {
      navigate('/about');
    }
    if (page === 'Services') {
      navigate('/Services');
    }
    if (page === 'Pricing') {
      navigate('/Pricing');
    }
    if (page === 'How it Works') {
      navigate('/how-it-works');
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#fff", zIndex: "1500" }} position="fixed">
      <Container className='bg-header-white min-h-[9vh] flex items-center justify-center' maxWidth="xl">
        <Toolbar sx={{ minWidth: { xs: '100%', md: '80%' }, padding: 0 }} disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'poppins',
              fontSize: "26.4px",
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#020402',
              textDecoration: 'none',
            }}
          >
            SHOWINGILOVEYOU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuRoundedIcon />
            </MenuButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'poppins',
              fontSize: { xs: '20.4px', md: '26.4px' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#020402',
              textDecoration: 'none',
              backgroundColor: "white",
            }}
          >
            SHOWINGILOVEYOU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: '#595959', fontFamily: 'poppins', fontWeight: '500', display: 'block', textTransform: 'none', }}
              >
                {page}
              </Button>
            ))}
            <Button onClick={() => navigate('/Contact')} sx={{ my: 2, mr: 2, ml: 2, color: '#32AA27', fontFamily: 'poppins', fontWeight: '500', border: '1px solid #32AA27', borderRadius: '0px' }}>
              contact
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', zIndex: "2000" }}
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  if (setting === 'Profile') {
                    navigate('/profile');
                  }
                  if (setting === 'Sign in') {
                    navigate('/sign-in');
                  }
                  handleCloseUserMenu();
                }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

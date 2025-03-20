import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import { styled, alpha, keyframes } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import SearchIcon from '@mui/icons-material/Search';

// Create a sparkle animation
const sparkle = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Create a styled component for the logo with sparkle effect
const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Pacifico", cursive',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  letterSpacing: '1px',
  background: `linear-gradient(90deg, 
    ${theme.palette.primary.main}, 
    #f48fb1, 
    #90caf9, 
    ${theme.palette.primary.main})`,
  backgroundSize: '300% 300%',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${sparkle} 4s ease infinite`,
  display: 'inline-block',
  '&:hover': {
    animationDuration: '2s',
  }
}));

// Styled search component (Instagram-like)
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  border: '1px solid #eee',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, order: 1 }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <HomeIcon sx={{ mr: 1 }} /> Home
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/tags">
                <TagIcon sx={{ mr: 1 }} /> Tags
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, order: 2, flexGrow: 0, justifyContent: 'center' }}>
            <LogoText
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Smaller font on very small screens
              }}
            >
              DH Blog
            </LogoText>
          </Box>

          {/* User avatar for mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, order: 3, flexGrow: 0 }}>
            <Tooltip title="Blog owner">
              <Avatar alt="Blog Owner" sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>ĐH</Avatar>
            </Tooltip>
          </Box>

          {/* Desktop layout */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
            {/* Logo for desktop */}
            <LogoText
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                textDecoration: 'none',
              }}
            >
              DH Blog
            </LogoText>

            {/* Desktop navigation */}
            <Box sx={{ display: 'flex' }}>
              <IconButton
                component={Link}
                to="/"
                sx={{ mx: 1, color: 'text.primary' }}
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                component={Link}
                to="/tags"
                sx={{ mx: 1, color: 'text.primary' }}
              >
                <TagIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Search bar - desktop and tablet only */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'flex-end', mr: 2 }}>
            <Search sx={{ maxWidth: { sm: '200px', md: '300px' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search tags..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          {/* User avatar for desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0 }}>
            <Tooltip title="Blog owner">
              <Avatar alt="Blog Owner" sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>ĐH</Avatar>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

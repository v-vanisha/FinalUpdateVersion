import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import { styled, alpha } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import nexumLogo from "../assets/nexumLogo.jpg";
import NexumNewLogo from "../assets/NexumNewLogo.png";
// import HomeIcon from "@mui/icons-material/Home";
// import LanguageIcon from "@mui/icons-material/Language";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import SearchIcon from "@mui/icons-material/Search";
// import "./navbar.css";
// import QuestionModal from './QuestionModal';
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Link, useNavigate} from "react-router-dom";
const pages = ["Home", "Create Post"];
// const settings = ["Profile"];




const Navbar = ({userData}) => {
  console.log(userData);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const handleLogout = async () => {
    await logout();
    navigate("/login");
    // console.log("done");
  };

  function handleMouseEnter(e) {
    e.target.style.color = 'white';
  }
  const handleMouseLeave = e => {
    e.target.style.color = "#3b486b"
  }


  return (
    <AppBar
      position="static"
      className="navbar-container"
      style={{ backgroundColor: "#9abed8" ,maxHeight:"65px"}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
          <Link to ="/">
          <img
              src={NexumNewLogo}
              alt="nexum"
              style={{ height: "55px",width:"auto",marginTop:"5px",marginLeft:"60px" }}
            />
          </Link>
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img
              src={NexumNewLogo}
              alt="nexum"
              style={{ height: "55px",width:"auto",marginTop:"5px",marginLeft:"60px" }}
            />
          </Typography>

          <Box
            mr={2}
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
          {/* <Link to ="/">
          <HomeIcon fontSize="large" sx={{ mx: 2, color: "black" }} />
          </Link> */}
            
            {/* <NotificationsActiveIcon
              fontSize="large"
              sx={{ mx: 2, color: "black" }}
            /> */}
            {/* <LanguageIcon fontSize="large" sx={{ mx: 2, color: "black" }} /> */}
            {/* <Search sx={{ mr: 2 }}>
              <SearchIconWrapper style={{ textAlign: "center" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus 
              // selected="true"
                placeholder="Search…"
                type="text"
                onChange={(e)=>{handleSearchData(e.target.value)}}
                value={searchData}
                />
              
            </Search> */}
            {/* <Link to ="/BlogHome">
              <Button
                variant="contained"
                color="success"
                style={{ height: "50px" }}
                onClick = {()=>{handleOpen()}}
              >
              Blogs
              </Button>
            </Link> */}
            <Link to="/BlogHome" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{marginRight:"30px",color:"#3b486b",fontSize:"18px",fontFamily:"initial",fontWeight:"bold"}}>
            {/* <Button
              variant="contained"
              color="success"
              style={{ height: "50px" }}
            > */}
              HOME
            {/* </Button> */}
            </Link>
            <Link to ="/createpost" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{marginRight:"30px",color:"#3b486b",fontSize:"18px",fontFamily:"initial",fontWeight:"bold"}}>
            {/* <Button
              variant="contained"
              color="success"
              style={{ height: "50px" }}
            > */}
              CREATE POST
            {/* </Button> */}
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

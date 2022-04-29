import React, { useState, useEffect, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth,storage } from "../firebase";
import { useNavigate,Link} from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./blog-createpost.css";
import { AuthContext } from "../context/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
const pages = ["Home", "Create Post"];


function BlogCreatePost(userData) {
// Navbar
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
// navbar

  const [name,setName] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [subTitle,setSubTitle] = useState("");
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const [file, setFile] = useState("");

  // useEffect(() => {
  //   if (Children) {
  //     navigate("/");
  //   }
  // }, []);
 
const createPost = async () => {
if(file == null){
  const cover = "default";
  await addDoc(postsCollectionRef, {
    title, 
    subTitle, 
    postText,
    cover,
    author: { name: name, id: auth.currentUser.uid} 
  });
}else{
  const cover = file.name + v4() ;
  var storageRef = await ref(storage, `blog-images/${cover}`);
  uploadBytesResumable(storageRef,file).then(
    () =>{
      getDownloadURL(storageRef).then(function(url){
        console.log(url);
        
      
      addDoc(postsCollectionRef, {
        title, 
        subTitle, 
        postText,
        cover: { url},
        author: {name: name, id: auth.currentUser.uid} 
      });
    }
  );
  });
}
navigate("/BlogHome");
};

function SubmitButton(){
  if (title && subTitle && postText ){
    return <button onClick={createPost}>Submit Post</button>
  } else {
    return <button type="button" disabled>Submit Post</button>
  };
}


  return (
    <div className="createPostPage">
      {/* Navbar */}
      <AppBar
      position="static"
      className="navbar-container"
      style={{ backgroundColor: "white" }}
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
              src={nexumLogo}
              alt="nexum"
              style={{ height: "40px", width: "150px" }}
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
              src={nexumLogo}
              alt="nexum"
              style={{ height: "40px", width: "150px" }}
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
            <Link to ="/BlogHome">
            <Button
              variant="contained"
              color="success"
              style={{ height: "50px" }}
            >
              Home
            </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userData?.photoUrl}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
              
              <Link to="/profile" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Profile</Typography>
              </Link>
                </MenuItem>

                <MenuItem key="Blogs" onClick={handleCloseUserMenu}>
              
              <Link to="/BlogHome" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Blogs Section</Typography>
              </Link>
                </MenuItem>

                <MenuItem key="Notes" onClick={handleCloseUserMenu}>
              
              <Link to="/Notes" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Notes Section</Typography>
              </Link>
                </MenuItem>

              <MenuItem 
              key={"Logout"} 
              onClick={()=>{
                handleLogout();
                handleCloseUserMenu();
              }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      {/* Navbar */}
      <div className="cpContainer">
        <div className="heading_post">
          <h1>Create Post</h1>
        </div>
        <div className="inputGp">
          <label> Author Name</label>
          <input
            placeholder="Your Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGp">
          <label> Sub Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setSubTitle(event.target.value);
            }}
            require="required"
          />
        </div>
        <div className="inputGp">
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <SubmitButton/>
        {/* <button disabled={!title} disabled={!subTitle} disabled={!postText} disabled = {!file} onClick={createPost}> Submit Post</button> */}
      </div>
    </div>
  );
}

export default BlogCreatePost;

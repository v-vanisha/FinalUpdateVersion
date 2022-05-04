import React, { useState, useEffect, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
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
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import NexumNewLogo from "../assets/NexumNewLogo.png";
import background from "../assets/createpost_bg.png";
import Footer from "./Footer";
const pages = ["Home", "Create Post"];

function BlogCreatePost() {
  // Navbar
  const { logout } = useContext(AuthContext);
  // const {user} = useContext(AuthContext)
  // console.log(user);
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
    e.target.style.color = "white";
  }
  const handleMouseLeave = (e) => {
    e.target.style.color = "#3b486b";
  };
  // navbar

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const [Blogfile, setBlogFile] = useState("");

  // useEffect(() => {
  //   if (Children) {
  //     navigate("/");
  //   }
  // }, []);

  const createPost = async () => {
    if (Blogfile == null) {
      const cover = "default";
      await addDoc(postsCollectionRef, {
        title,
        subTitle,
        postText,
        cover,
        author: { name: name, id: auth.currentUser.uid },
      });
    } else {
      const cover = Blogfile.name + v4();
      var storageRef = await ref(storage, `blog-images/${cover}`);
      uploadBytesResumable(storageRef, Blogfile).then(() => {
        getDownloadURL(storageRef).then(function (url) {
          console.log(url);

          addDoc(postsCollectionRef, {
            title,
            subTitle,
            postText,
            cover: { url },
            author: { name: name, id: auth.currentUser.uid },
          });
        });
      });
    }
    navigate("/BlogHome");
  };

  function SubmitButton() {
    if (title && subTitle && postText && Blogfile) {
      return <button onClick={createPost}>Submit Post</button>;
    } else {
      return (
        <button type="button" disabled>
          Submit Post
        </button>
      );
    }
  }

  return (
    <div className="createPostPage">
      {/* navbar */}
      <AppBar
        position="static"
        className="navbar-container"
        style={{ backgroundColor: "#9abed8", maxHeight: "65px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/">
                <img
                  src={NexumNewLogo}
                  alt="nexum"
                  style={{
                    height: "55px",
                    width: "auto",
                    marginTop: "5px",
                    marginLeft: "60px",
                  }}
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
                style={{
                  height: "55px",
                  width: "auto",
                  marginTop: "5px",
                  marginLeft: "60px",
                }}
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
              <Link
                to="/BlogHome"
                onMouseOver={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  marginRight: "30px",
                  color: "#3b486b",
                  fontSize: "18px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              >
                {/* <Button
              variant="contained"
              color="success"
              style={{ height: "50px" }}
            > */}
                HOME
                {/* </Button> */}
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* navbar */}
      <div className="heading_post">
        <h3>Create your blog</h3>
        <p>Conversation is king. Content is just something to talk about. <span>~Cory Doctorow</span></p>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div className="cpContainer">
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
              placeholder="Title of Blog"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              required="required"
            />
          </div>
          <div className="inputGp">
            <label> Sub Title:</label>
            <input
              placeholder="Sub Title of Blog"
              onChange={(event) => {
                setSubTitle(event.target.value);
              }}
              require="required"
            />
          </div>
          <div className="inputGp_file">
            <input
              type="file"
              onChange={(event) => {
                setBlogFile(event.target.files[0]);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Post:</label>
            <textarea
              placeholder="Write you blog here!"
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          </div>
          <SubmitButton />
          {/* <button disabled={!title} disabled={!subTitle} disabled={!postText} disabled = {!file} onClick={createPost}> Submit Post</button> */}
        </div>
        <div className="backgroundImage">
          <img src={background} alt="" />
        </div>
      </Grid>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
}

export default BlogCreatePost;

import React, { useEffect, useState, useContext } from "react";
import { getDocs, collection, deleteDoc, doc,onSnapshot,query } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { ref, deleteObject } from "firebase/storage";
import "./blog-home.css";
import NexumNewLogo from "../assets/NexumNewLogo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Footer from "./Footer";
import home_bg from "../assets/home_bg.jpg";
const pages = ["Home", "Create Post"];

function BlogHome({ userData }) {
  // Navbar
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

  // Navbar

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id, url) => {
    const postDoc = doc(db, "posts", id);
    console.log(url);
    const postRef = ref(storage, url);
    deleteObject(postRef)
      .then(() => {
        console.log("I'm easy");
      })
      .catch((error) => {
        console.log("error occured");
      });
    // await deleteObject(url);
    await deleteDoc(postDoc);
    // window.location.reload();
  };

  useEffect(() => {
    const postsCollectionRef = collection(db, "posts");
    const q = query(postsCollectionRef);
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setPostList(articles);
      // console.log(articles);
    });
    // const getPosts = async () => {
    //   const data = await getDocs(postsCollectionRef);
    //   console.log("i am running");
    //   setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getPosts();
  }, [deletePost]);

  return (
    <div className="homePage" >
      {/* Navbar */}
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
                to="/createpost"
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
                CREATE POST
                {/* </Button> */}
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Navbar */}
      <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
        {postLists
          .filter((post) => post.author !== undefined)
          .map((post) => {
            return (
              <div className="post" key={post.id}>
                <Stack direction="column" spacing={2}>
                  <div className="postHeader">
                    <div className="title">
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </div>
                    <div className="deletePost">
                      {post.author.id === auth.currentUser.uid && (
                        <button
                          onClick={() => {
                            deletePost(post.id, post.cover.url);
                          }}
                        >
                          {" "}
                          &#128465;
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="subTitle">
                    <p>{post.subTitle}</p>
                  </div>
                  {/* <div className="postTextContainer"> {post.postText} </div> */}
                  <h3>@{post.author.name}</h3>
                </Stack>
              </div>
            );
          })}
      </Grid>
      <div className="footerContainer" style={{width:"100%"}}>
        <Footer />
      </div>
    </div>
  );
}

export default BlogHome;

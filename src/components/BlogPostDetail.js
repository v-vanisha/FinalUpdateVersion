import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Grid from '@mui/material/Grid';
import { useParams,Link } from "react-router-dom";
import blogbackground from "../assets/blog_bg.jpg";
import BlogNavbar from "./BlogNavbar";
import Footer from "./Footer";


function BlogPostDetail() {

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);



  const params = useParams();
  return (
    <div className="DetailContainer" style={{height: "100%",backgroundImage:`url(${blogbackground})`,backgroundSize: "cover",backgroundAttachment: "fixed"}}>
      <div className="DetailPage" >
        <BlogNavbar/>
        {postLists
          .filter(
            (post) => post.author !== undefined && params.id === post.id
          )
          .map((post) => {
            return (
              <div className="content" key={post.id}>
                
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                  <h1 className="heading" style={{display: "flex",justifyContent: "center",fontFamily: "unset",textTransform: "uppercase",fontSize: "40px",marginTop:"50px",color:"#323a42",textShadow:"1px 1px #5041ab"}}>{post.title}</h1>
                  <p className="sub-heading" style={{fontSize:"28px",fontStyle:"italic",fontFamily:"ui-monospace",color:"darkslategrey",marginTop:"-18px"}} >{post.subTitle}</p>
                  <img className="blogImage" style={{width:"40%",marginBottom:"35px",marginTop:"15px"}} src={post.cover.url} alt="blogimage"></img>
                  <p className="textcontainer" style={{justifyContent:"center",width:"80%",marginBottom:"60px",fontSize:"20px",fontFamily:"black"}}>{post.postText}</p>
                </Grid>
              </div>
            );
          })}
        </div>
        <div className="footerContainer">
          <Footer/>
        </div>
        </div>
  );
}

export default BlogPostDetail;

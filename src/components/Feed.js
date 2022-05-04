import React from "react";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from '../context/auth';
import { db } from "../firebase";
import { useEffect, useContext, useState } from 'react'
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import "./feed.css";
import BookIcon from '@mui/icons-material/Book';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Post from './Post';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link} from "react-router-dom";

 
function Feed({userData}) {
  const [questionPosts, setQuestionPosts] = useState([]);
  const {user} = useContext(AuthContext)
  const getAnswer = [];
 
useEffect(()=>{
  onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot)=>{
    let tempArray = []
    snapshot.docs.map((doc)=>{
        tempArray.push(doc.data())
    })
    setQuestionPosts([...tempArray])
 
 
})
},[])
 
  return (
    <>
 
    <div className="feed-cover" style={{height:"100vh"}}>
 
    {/* left div */}
    <div style={{width:"75%"}}>
    <div className="feed-container" >
      <div className="feedUser-info">
        <Avatar src={userData?.photoUrl} 
        // style={{border: "5px solid #e2dbdb",boxShadow: "0px 0px 10px 1px #737380",marginRight:"2px"}}
        />
        <h3>{userData?.name}</h3>
      </div>
 
      <div className="feed-ques">
      {
         questionPosts != [] && questionPosts.map((question)=>{
            return <Post questionData={question} userData={userData} getAnswer={getAnswer}/>})
       
      }
      </div>
    </div>
    </div>
 
       {/* right-div */}
       <div className="feed-compos">
       <div className="up">
       <Link to = "/BlogHome">
       <Button variant="contained" style={{backgroundColor:'#00CCCC'}} startIcon={<HistoryEduIcon />}>
        Blogs Section
      </Button>
      </Link>
       </div>
 
       <div className="down">
       <Link to = "/notes">
       <Button variant="contained" style={{backgroundColor:'#00CCCC'}} startIcon={<BookIcon />}>
        Notes Section
      </Button>
      </Link>
       </div>
    </div>
       
    </div>
    </>
  );
}
 
export default Feed;
 

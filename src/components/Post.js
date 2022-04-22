import React, {useState, useEffect, useContext} from "react";
import Avatar from "@mui/material/Avatar";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import AnswerModal from './AnswerModal';
import { AuthContext } from '../context/auth';
import { arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getDocs, getDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import "./post.css";
import Ans from './Ans';

function Post({questionData, userData}) {
  const {user} = useContext(AuthContext);
  const currQuesId = (questionData?.quesId) ? (questionData.quesId) : ""; 
  const [openAnswer, setOpenAnswer] = useState(false);
  const date = (questionData?.timestamp?.toDate().toDateString());
  const time = (questionData?.timestamp?.toDate().toLocaleTimeString('en-US'));
  
  function handleOpenAnswer(e){
    setOpenAnswer(true);
  }

  function handleCloseAnswer(){
    setOpenAnswer(false);
  }

  return (
    <div className="post-container">
      <div className="post-info">
        <Avatar src={questionData.profileUrl}/>
        <h5>{questionData.profileName}</h5>
        <small>{date}</small>
        <small>{time}</small>
      </div>

      <div className="post-body">
      <div className="post-upper">
      <div className="post-question">
          <p>{questionData.quesContent}</p>         
          {
  (questionData.quesImageUrl) && <div className="docLink">
     <a style={{textDecoration:'none', color:'black', fontSize:'18px'}} target='_blank' href={questionData.quesImageUrl}><InsertPhotoIcon/>{`${questionData.profileName}.pdf`}</a>
    </div>
    }    
        </div>
      </div>
        
      <div className="post-btn-container">
        <Button className = "post-btn"
            variant="contained"
            onClick = {()=>{handleOpenAnswer()}}
            style={{backgroundColor: '#779ecb',
  marginLeft: '850px',
  marginTop: '-90px', padding:'20px 30px', height:'54px'}}
          >
            Add Answer
          </Button>

        </div>
        
        <div className="ans-content">
      {
        
        currQuesId != "" && (questionData.answersContent)?.map((objC)=>{
            return <Ans answerData={objC} userData={userData} questionData={questionData}/>})
      }
      </div>

        <div style={{display:'none'}}>
            <AnswerModal userData={userData} questionData={questionData} openAnswer={openAnswer} handleOpenAnswer={handleOpenAnswer} handleCloseAnswer={handleCloseAnswer}/>
            </div> 
      </div>
    </div>
  );
}
export default Post;

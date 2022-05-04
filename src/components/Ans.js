import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import "./ans.css"
import Avatar from "@mui/material/Avatar";
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from "../context/auth";
import { useContext, useState, useEffect } from "react";
import { getDoc, deleteDoc, arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import AnswerFunction from './AnswerFunction';
 
function Ans({answerData, userData, questionData}){
    const { user} = useContext(AuthContext);
    const [answerPost, setAnswerPost] = useState();
    const [downvote, setDownvote] = useState(false);
    const [updisable, setUpdisable] = useState(false);
    const [upvote, setUpvote] = useState(false);
    const [downdisable, setDowndisable] = useState(false);
    const [run, setRun] = useState(0);
   
 
 
    useEffect(()=>{
        (async()=>{
            const docRef = doc(db, "answers", answerData.ansId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setAnswerPost(docSnap.data());
            }
 
        })();
    }, [answerData])
   
    const handleDelete = async()=>{
        if(user?.uid == answerPost?.uid){
            updateDoc(doc(db, "questions", questionData?.quesId),{
                answersContent : arrayRemove(answerData)
            })
            console.log("hi");
            console.log(user?.uid);
            console.log(answerPost?.ansId);
            updateDoc(doc(db, "users", user?.uid),{
                answers : arrayRemove(answerPost?.ansId)
            })
            await deleteDoc(doc(db, "answers", answerPost?.ansId))
            console.log("document deleted");
        }
       
    }
 
 
    const date = (answerPost?.timestamp?.toDate().toDateString());
    const time = (answerPost?.timestamp?.toDate().toLocaleTimeString('en-US'));
    // console.log("I am speaking from Ans.js");
    return(
        <>
       
            <div className="ans-container" >
            <div className="ans-info">
                <Avatar src={answerPost?.profileUrl}/>
                <h5>{answerPost?.profileName}</h5>
                <small>{date}</small>
                <small>{time}</small>
                </div>
                <div
                className="ans-text"
                style={{fontSize:'17px'}}>{answerData?.ansInput}</div>
         
            <div className="ans-icons">
            <AnswerFunction answerData={answerData} />
                    {
                        (user?.uid == answerPost?.uid) ?
                        <div className="delete-icon" style={{marginLeft:'850px', display:'flex', color:'grey'}}>
                        <Tooltip title="Delete Answer">
                   <DeleteIcon onClick={handleDelete}/>
                   </Tooltip>
                   </div> : ""
                    }  
        </div>
        </div>
        </>      
    )
}
 
export default Ans;

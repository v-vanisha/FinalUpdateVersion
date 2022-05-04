import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import "./answerfunction.css"
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from "../context/auth";
import { useContext, useState, useEffect } from "react";
import { getDoc, deleteDoc, arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';

function AnswerFunction({answerData}){
    const { user} = useContext(AuthContext);
    const [downvote, setDownvote] = useState(false);
    const [upvote, setUpvote] = useState(false);
    const [updisable, setUpdisable] = useState(false);
    const [downdisable, setDowndisable] = useState(false);
    const [answerPost, setAnswerPost] = useState();
    
   
   

    const handleUpvote = async()=>{
        console.log("I am upvote")
        if(updisable == false){
            setDowndisable(true);
        if(!upvote){
            await updateDoc(doc(db, "answers", answerPost?.ansId),{
                upvotes: arrayUnion(user?.uid)
            })
            setUpvote(true);
            // console.log(answerPost?.upvotes?.length)
        }
        else{
            setDowndisable(false);
            await updateDoc(doc(db, "answers", answerPost?.ansId),{
              upvotes: arrayRemove(user?.uid)
            })
            setUpvote(false);
        }
    }
}

    const handleDownvote = async()=>{
        if(downdisable == false){
            setUpdisable(true);
        if(!downvote){
             await updateDoc(doc(db, "answers", answerPost?.ansId),{
                downvotes: arrayUnion(user?.uid)
              })
              setDownvote(true);
        }
        else{
            setUpdisable(false);
            await updateDoc(doc(db, "answers", answerPost?.ansId),{
               downvotes: arrayRemove(user?.uid)
            })
            setDownvote(false);
        }
    }
}
useEffect(()=>{
    // console.log("I'm running");
    (async()=>{
        const docRef = doc(db, "answers", answerData.ansId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setAnswerPost(docSnap.data());
        }

       
    })(); 
}, [upvote, downvote])

useEffect(()=>{
    // console.log("I am running from answerfunction useeffect");
    if(answerPost?.upvotes?.includes(user?.uid)){
           setUpvote(true);
        }
        else{
           setUpvote(false);
        }

        if(answerPost?.downvotes?.includes(user?.uid)){
           setDownvote(true);
        }
        else{
          setDownvote(false);
        }
}, [answerPost])

    // console.log("I am speaking from answerfunction.js");
    return(
        <div>
        <div className="ans-icons">
            <div className="upvote-icon" style={{paddingRight:'10px', display:'flex'}}>
            <Tooltip title="Upvote Ans">
                   <ArrowCircleUpIcon onClick={handleUpvote} style={upvote?{color:"red"}:{color:"grey"}}/>
                   </Tooltip>
                    {answerPost?.upvotes?.length>0 && answerPost?.upvotes?.length}
                   </div>
                    
                    <div className="downvote-icon" style={{paddingLeft:'10px', display:'flex'}}>
                    <Tooltip title="Downvote Ans">
                    <ArrowCircleDownIcon onClick={handleDownvote} style={downvote?{color:"red"}:{color:"grey"}}/>
                    </Tooltip>
                    {answerPost?.downvotes?.length>0 && answerPost?.downvotes?.length}
                    </div> 
                    </div>
        </div>
    )
}
export default AnswerFunction;
import React from "react";
import Navbar from './Navbar';
import Feed from './Feed';
import Post from './Post';
import { AuthContext } from '../context/auth';
import { db } from "../firebase";
import { useEffect, useContext, useState } from 'react'
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import home_bg from "../assets/home_bg.jpg";
import Footer from "./Footer";

function Nexum(){
 
    const {user} = useContext(AuthContext)
    // console.log("Hey"+user.uid);
    const [userData, setUserData] = useState({})
     // Jab bhi user ki state update hogi tab ye useState chalega
     useEffect(()=>{
        // console.log(user.user.uid)
        
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
            // console.log(doc.data());
            setUserData(doc.data())
        })
        return ()=>{
            unsub();
        }
    }, [user])
    // console.log("Nexum is having userData as"+userData);
    return(
        <div className="FeedBg" style={{backgroundImage:`url(${home_bg})`,backgroundSize:"cover",backgroundAttachment:"fixed"}}>
            <Navbar userData={userData}/>
            <Feed userData={userData}/>
            <div className="footer" style={{backgroundColor:"#ffffff",marginTop:"40px"}}>
                <Footer/>
            </div>
        </div>
        
    )
}
export default Nexum;
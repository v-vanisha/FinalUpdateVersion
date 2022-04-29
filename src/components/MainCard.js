import React from 'react'
// import './App.css';
// Using useEffect, bcoz we want to immediately run the function
import { useState, useEffect } from 'react'
import { TextField } from '@mui/material';
import { ContentCutOutlined, ProductionQuantityLimitsSharp, SearchRounded} from '@mui/icons-material';
import { storage } from "../firebase";
import { db } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, addDoc, getDocs, updateDoc, arrayUnion , query, where} from "firebase/firestore";
import { v4 } from "uuid";
import Card from './Card';
import './MainCard.css';
// import { getAuth } from "firebase/auth";
 
 
function MainCard() {
 
      const [subjectName, setSubjectName]  = useState("Select Subject Name for PDF File"); // string ke liye ""
      const [imageUpload, setImageUpload]  = useState(null); // file ke liye null
      // const [imageList, setImageList] = useState([]); // empty array initially
      const [loading, setLoading] = useState(false);
      // const [subName, setSubName] = useState([]);
      const [switchToggled, setSwitchToggled] = useState(false);
      // const [filesRef, setFilesRef] = useState(collection(db, "files"));
      const [files, setFiles] = useState([]);
      const [snapshots, setSnapshots] = useState([]);
      const [posts, setPosts] = useState([]);
     
      // Code for Dropdown
      var selected = document.querySelector(".selected");
      //var optionsContainer = document.querySelector(".options-container");
      // console.log("optionContainer :" + optionsContainer);
      var optionsList = document.querySelectorAll(".option");
     
 
      // https://youtu.be/k4gzE80FKb0
      const setActive_Toggle = ()=> {
        switchToggled ? setSwitchToggled(false) : setSwitchToggled(true);
       
      };
     
 
     
      // single element, so no need of parenthesis
      optionsList.forEach( option => {
          // console.log("option")
          // console.log(option);
 
          // console.log("this " + option.querySelector("label").innerHTML );
          option.addEventListener( "click", ()=>{
          selected.innerHTML = option.querySelector("label").innerHTML;
          setSubjectName(selected.innerHTML);
          // optionsContainer.classList.remove("active");
          setSwitchToggled(false);
        });
      });
      // Code End for Dropdown
 
 
     
 
      const uploadPdf = ()=> {
        console.log(subjectName);
       
 
          if( imageUpload == null || subjectName=="Select Subject Name for PDF File")  
          {
              // If No File Selected
              alert("Please Fill All Fields!!!")
             
          }
          else
          {
              setLoading(true);
              // If File Is Selected
              const subName = subjectName.toUpperCase();
              const imageRef = ref(storage, `PDFS/${imageUpload.name + v4() }` )
              // const pdfCollectionRef = collection(db, "PDFS");
             
              uploadBytes(imageRef, imageUpload).then( (snapshot)=>{
                 
                // as soon as we are uploading we want to display it in the screen
                  alert("PDF Uploaded");
                  getDownloadURL(snapshot.ref).then((url) => {
                   
                    console.log("snapshot ref : " + snapshot.ref);
                    const FileName = `${snapshot.ref}`.split("/")[4];
                    console.log("snapshot ref " + FileName);
                    // // gs://nexum-subpart-notes.appspot.com/PDF's/DATA STRUCTURES/cs_2022.pdf5273882d-4a50-49ac-a971-cf5c4a6a10da
                     
                   
 
                        //----WILL CREATE COLLECTION HERE----
                        // name + url yaha se mil jayega
                        // data [ {fileName, url} , {fileName, url}]
                        let objNew = {
                          fileName : FileName,
                          url : url,
                          subjectName: subName
                        }
                        let fileuid = v4();
                        setDoc(doc(db, "files", fileuid ), objNew)
                       
                        setLoading(false);
                  })
                 
              })  
          }
        // setLoading(false) async hai to kaam nhi karega pehle he false krdega;
 
      }
 
        // Function of listAll is to list all the files in the specific path
        //  to display the pdfs in starting only.
        // NOTE: useEffect me koi await hai to how to resolve, make a function async inside it and call it inside like this
      useEffect( ()=>  {
 
     
        // --------------------------------------------------------------
             
            // Create a query against the collection
              var optionsList = document.querySelectorAll(".option");
 
              console.log("reached");
              console.log("options list " + optionsList.length);
 
             
              // let option = "MICROPROCESSOR";
              var snaps = [];
              optionsList.forEach( (option) => {
 
                    console.log("Entered : ");
                    const filesRef = collection(db, "files");
                   
                    const actOption = option.querySelector("label").innerHTML.toUpperCase();
               
                //  q is the object of the all files collection which matches this
                    console.log("Option " + actOption);
 
                    const filesQuery = query(filesRef, where("subjectName", "==", actOption));
                   
                    console.log("filesQuery : " + filesQuery);
   
                    const fetchSubName = async () => {
 
                          const querySnapshot = await getDocs(filesQuery);
                          console.log("querySnapshot form fetchSubName " + querySnapshot);
                          snaps.push(querySnapshot)
                         
                          console.log("snaps from inside fetchsubName" + snaps);      
                 
                    }                    
                    fetchSubName()  
                    console.log("snaps from outside fetchsubName" + snaps);      
              })
              setSnapshots( snaps);
              console.log("snapshots final "+ snapshots);
        // ----------------------------------------------------------------------------------------------
 
 
          // ( ()=> {
              // display the data from the snaps array
              snapshots.forEach( (querySnapshot) =>
              {
 
                  console.log("querySnapshot from card " + querySnapshot);
                  // console.log("querySnapshot.docs.length " + querySnapshot.docs.length);
 
                  if(querySnapshot.docs.length > 0) // if querySnapshot.docs hai tabhi length nhi to leave it
                  {
                        var allSpecificFiles = [];
           
                            querySnapshot.forEach( doc => {
                            console.log("doc "+ doc);
                         
                            console.log("doc data from card: " + doc.data());
                            var data = doc.data();
                            data.ID = doc.id;
                 
                             allSpecificFiles.push( {...data} );
                           
                        });
                   
                        var uid = v4();
                        setPosts( (prev) => [...prev, <Card key={uid} files = { allSpecificFiles } ></Card>] )
                        console.log("all specific file from card : " + allSpecificFiles);
                     
                  }
                  else
                  {
                      // do nothing
                      console.log("No items Corresponding to this subjec");
                     
                  }
                 
              })
          // })()  
       
      },[]);
 
 
 
  return (
   
    <div className="box">
 
    <h2 className="heading">Subject Notes</h2>
 
    <div className="pdfData">
       
        <div className="Course">
           
            {/* USING RADIO BUTTON and not dropdown or anything as it provide more functionality for css */}
            {/* First Vala iss normal text baki radio button hai jiska display hide kiya hai to ek time pe ek he select hoga */}
 
            {/* Now Active class ko hume Using javascript add or remove karna hai jo display and hide karegihumara pura jo ye box of category hai */}
            <div className="select-box">
 
              <div className={ `options-container ${switchToggled ? "active" : ""}` }>
               
                <div className="option">
                  <input type="radio" class="radio" id="microprocessor" name="category"></input>
                  <label for="microprocessor">Microprocessor</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="DS" name="category"></input>
                  <label for="DS">Data Structures</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="DAA" name="category"></input>
                  <label for="DAA">Design and Analysis of Alogorithms</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="DBMS" name="category"></input>
                  <label for="DBMS">DBMS</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="statistics" name="category"></input>
                  <label for="statistics">Statistics</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="ML" name="category"></input>
                  <label for="ML">Machine Learning</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="DM" name="category"></input>
                  <label for="DM">Discrete Mathematics</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="TOC" name="category"></input>
                  <label for="TOC">Theory of Computation</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="entrepreneurship" name="category"></input>
                  <label for="entrepreneurship">Entrepreneurship</label>
                </div>
 
                <div className="option">
                  <input type="radio" class="radio" id="DE" name="category"></input>
                  <label for="DE">Differential Equations</label>
                </div>
 
              </div>
 
            {/* Keeping it below/last, but by ording bringing to the top */}
            {/* Beacuase in CSS, we dont have selector to select an element before some element , we can select element after an element */}
           
              <div className="selected" onClick={setActive_Toggle}  >
                Select Subject Name for PDF File
              </div>
 
            </div>
 
        </div>
         
        <input className="pdfData" type="file" accept="application/pdf"  onChange = { (e)=> { setImageUpload(e.target.files[0]) } } ></input>
        <button type="submit" disabled={loading} className="submitBtn" onClick={ uploadPdf }>Upload</button>            
 
    </div>
 
    <div className="data">
      {posts}
    </div>
 
 
    {/* <div className="searchBox">
      <SearchRounded className="searchIcon"/>
      <TextField
         
          id="inputSearch"
          label="Search field"
          type="search"
          variant="standard"
          className="inputText"
      />
    </div> */}    
 
 
  </div>  
 
 );
}
 
export default MainCard;

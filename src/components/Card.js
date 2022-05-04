import React, { useState } from 'react'
import "./Card.css";
import { v4 } from "uuid";
 
function Card(props) {
 
  // const [files, setFiles] = useState([]);
  console.log("Called files from card " + props.files);
 
 
  return (
   
    // ye simple hai, component ke andar loop ok,,, but loop ke andar component ko render karane me roblem aati hai
     <div key={v4()} className="card">
           
          <h3 className="subject_title">{ props.files[0].subjectName}</h3>
 
          {
         
              props.files.map( (file) => (
                   <>
                    <span role="img" aria-label="arrow">📙</span>
                    <a className="pdf_link" style={ {textDecoration: 'none', color:'black', fontSize:'18px' , padding:'20px'} } target='_blank' href={file.url} >{ file.fileName.split(".pdf")[0] + ".pdf" } <br></br></a>
                   </>
              ))
 
          }
 
     </div>
 
 
 
 
   /* ----------------------------------------- */
//             props.snapshots.forEach( (querySnapshot) => {
//                 console.log("querySnapshot from card " + querySnapshot);
//                 // console.log("querySnapshot.docs.length " + querySnapshot.docs.length);
 
//                 // if(querySnapshot.docs.length > 0) // if querySnapshot.docs hai tabhi length nhi to leave it
//                 // {
//                     var allSpecificFiles = [];
// //----------------------------------------------------------------
//                     // if(!querySnapshot.empty) {
//                       querySnapshot.forEach( doc => {
//                           console. log("doc "+ doc);
                       
//                           console.log("doc data from card: " + doc.data());
//                           var data = doc.data();
//                           data.ID = doc.id;
               
//                           allSpecificFiles.push( {...data} );
                         
//                         });
//                     // }
//                     // else{
//                     //   console.log("No Data to show");
//                     // }
 
//                     // or
           
//                     // for( var doc of querySnapshot.docs)
//                     //   {
//                     //         console.log("doc "+ doc);
                         
//                     //         console.log("doc data from card: " + doc.data());
//                     //         var data = doc.data();
//                     //         data.ID = doc.id;
 
//                     //         allSpecificFiles.push( {...data} );
                           
//                     //   }
// //----------------------------------------------------------
 
//                       // if(allSpecificFiles.length === querySnapshot.docs.length){
 
//                           console.log("all specific files from card : " + allSpecificFiles);
//                           // if(allSpecificFiles.length === querySnapshot.docs.length)
//                           // {
//                           setFiles(allSpecificFiles);
//                           console.log("file from card component "+ files);
//                       // }
 
                   
//                         <div className="card">
           
//                               {/* { files[0].subjectName } */}
//                               <h3 style={ {textalign:'center'} }>subject name</h3>
                   
 
//                               {
//                                 files.map( (file) => (
                             
//                                   <a style={ {textDecoration: 'none', color:'black', fontSize:'18px' , padding:'20px'} } target='_blank' href={file.url} >{ file.fileName.split(".pdf")[0] }<br></br></a>
                         
//                                 ))
//                               }  
                   
//                         </div>
                   
                   
//                     setFiles([]);
                   
//                 // }
//                 // else
//                 // {
//                 //     // do nothing
//                 //     console.log("No items Corresponding to this subject");
//                 //     setFiles([]);
//                 // }
               
//             })    
 
 
 
 
 
//-----------------------------------------------------------------------------------
 
  )
 
}
 
export default Card
 

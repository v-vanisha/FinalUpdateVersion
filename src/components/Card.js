import React, { useState } from 'react'
import "./Card.css";
import { v4 } from "uuid";
 
function Card(props) {
 
  // const [files, setFiles] = useState([]);
  console.log("Called files from card " + props.files);
 
 
  return (
   
    // ye simple hai, component ke andar loop ok,,, but loop ke andar component ko render karane me roblem aati hai
     <div className="card">
           
           {console.log("num ")}
          <h3 className="subject_title">{ props.files[0].subjectName}</h3>
 
          {
         
              props.files.map( (file) => (
                   <>
                    <span role="img" aria-label="arrow">&nbsp;&nbsp;📙</span>
                    <a className="pdf_link" style={ {textDecoration: 'none', color:'black', fontSize:'18px' , padding:'20px'} } target='_blank' href={file.url} >{ file.fileName.split(".pdf")[0] + ".pdf" } <br></br></a>
                   </>
              ))
 
          }
 
     </div>
 
 
  )
 
}
 
export default Card

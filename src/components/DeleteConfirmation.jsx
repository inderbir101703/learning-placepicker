import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
export default function DeleteConfirmation({ onConfirm, onCancel }) {



  useEffect(()=>{
   
    const interval=setTimeout(()=>{
     
      onConfirm() 

    },3000)
    return ()=>{
      clearTimeout(interval)}
    
  },[onConfirm])

  //in dependency functions and objects usage cause infinite loop
  //by adding function as adependency, we are telling react retrigger useEffect if function changes
  // it is tricker... well code in function always remain same ...
  // functions in js are just objects 
  // every time app is executed , the function and values in app are recreated 
  // in js , even function and object with same code are not same 
  // every time different function and object is there ..cause infinite loop


  // Separating progress bar as all the computations will done in that small componeent and increasing overall optimzation
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <label id="progress">Will removed in</label>
   <ProgressBar maxTimer={3000}/>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}

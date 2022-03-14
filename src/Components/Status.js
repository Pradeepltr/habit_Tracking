// Import all required things
import React  from "react";
import { useEffect,useState } from "react";
import { collection,addDoc, Firestore,getDocs,deleteDoc,doc } from 'firebase/firestore';
import { FirDb } from "../Firebase";
import "./Status.css";
import { Link } from "react-router-dom";



const Status=()=>{
    const [dbData,setdbData]=useState([])
    // Fetch all data present on firebase firestore and add in dbData array
    useEffect(async()=>{
        console.log("welcme");
      const fetch_data=collection(FirDb,"Habit_data");
      const habit_data= await getDocs(fetch_data)
      setdbData(habit_data.docs.map((doc)=>({...doc.data(), id:doc.id})))
      console.log(dbData)
    },[])
    // Display habit name with their seven day status
    return(
        <>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <Link to="/update" className="btn btn-primary"id="btn1">Go to Update</Link>
     {dbData.map((e)=>{
         var i=1;
         return(
         <>
         <h1>{e.habit_name}</h1>
         <table>
             <tr>
         {e.working_days.map((e1)=>{
         return(
             <>
             {/* <div className="flex1">
             <div className="display_day">
                 <h3>Day: {i++}</h3>
                 
                 <h5>Status: {e1.status}</h5>
             </div>
             </div> */}
             <td>
                 <h3>Day : {i++}</h3>
                 <h5>Status : {e1.status}</h5>
             </td>
            
             </>
         )
         })}
         </tr>
         </table>

         
         </>

         )
        
     })}
        </>
    )
}
export default Status;
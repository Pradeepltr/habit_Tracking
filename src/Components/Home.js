// Import all required things for this page
import React from 'react';
import "./Home.css";
import { FirDb } from '../Firebase';
import { collection,addDoc, Firestore,getDocs,deleteDoc,doc } from 'firebase/firestore';
import { useEffect,useState } from 'react';
import { async } from '@firebase/util';
import { Link } from 'react-router-dom';

const Home=()=>{
    // Use react hooks for store data and send firebase firestore
    const [data,setData]=useState({
       habit_name:''
      
      

    })
    const [dbData,setdbData]=useState([]);
  
    
    let name,value;
    // Function for handle input
    const HamdleInput=(e)=>{
        e.preventDefault();
        name=e.target.name;
        value=e.target.value;
        
      setData({
        ...data, [name]:value,
          
          visited_day:0,
          working_days:[
           {
               status:'not visited',
               
           },
           {
            status:'not visited',
            
        },
        {
            status:'not visited',
            
        },
        {
            status:'not visited',
            
        },
        {
            status:'not visited',
            
        },
        {
            status:'not visited',
            
        },
        {
            status:'not visited',
            
        }
            
          ],
          comit:''
          
          
      })
     
    console.log(data)
    }
    // Function for add data into firebase firestore
    const AddData=async(e)=>{
        
    e.preventDefault();
    console.log(data.total_hour)
    try{
        console.log(data)
        if(data.habit_name!=""){
        const new_data=collection(FirDb,"Habit_data")
        addDoc(new_data,data);
        console.log("Data Submited");
        setData({
            habit_name:'',
            target_hour:0

        })
        }else{
            alert("Please fill your Habit")
        }
    }
    catch{
        alert("Data not submitted suceessfully");
    }
    Re_render();
    
    }
    // Function for fetch data from firbase firestore
    const Re_render=async()=>{
        const fetch_data=collection(FirDb,"Habit_data");
        const habit_data= await getDocs(fetch_data)
        setdbData(habit_data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        console.log(dbData)
    }
     // Function for fetch data from firbase firestore on render page
    useEffect(async()=>{
        console.log("welcme");
      const fetch_data=collection(FirDb,"Habit_data");
      const habit_data= await getDocs(fetch_data)
      setdbData(habit_data.docs.map((doc)=>({...doc.data(), id:doc.id})))
      console.log(dbData)
    },[])
    const Delete=async(id)=>{
        console.log(id);
       const del_data= await doc(FirDb,"Habit_data",id);
       console.log(del_data)
       deleteDoc(del_data);
       Re_render();
    }
    // JSX return part
    return(
        <>
        <div className='form'>
            <h1>Add Habit</h1>
        <div class="input-group input-group-sm">
  <span class="input-group-text" id="inputGroup-sizing-sm">Enter Habit</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name='habit_name' value={data.habit_name} onChange={HamdleInput}/>
</div>
<button type='button' className='btn-primary' onClick={AddData}>Add</button>
</div>
<div className='roter-btn'>
    <Link to="/status" className='btn1'>Status check</Link>
    <Link to="/update" className='btn1'>Update data</Link>
    </div>

<div className='Display_Habit'>
    <h2>Habit List</h2>
    {dbData.map((e)=>{
        var status=""
        if(e.visited_day>=3&&e.visited_day<6){
           status="Good well work"
        }else if(e.visited_day>=6)
        {
            status="Nice ! you are Complete your Habit"
        }else{
            status="Please complete your task at time"
        }
        return(
        <>
         <div className='container'>
        <h3><span className='title'>{e.habit_name}</span>
        <span className='button'><button type="button" className='btn-danger' onClick={(event)=>Delete(e.id)}>Delete</button></span>
        </h3>
        <span className='Remark'>{status}</span>
        
        <span className='visited'>Visited Day : {e.visited_day}/7</span>
        </div>
      
    
        </>
        )
    })}
   
    </div>
        </>
    )
}
export default Home;
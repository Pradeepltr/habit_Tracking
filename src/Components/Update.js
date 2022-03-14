// Import all required things
import React from 'react';
import "./Update.css"
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { FirDb } from '../Firebase';
import { collection,doc,getDocs,updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const Update=()=>{
  // Handle all data that required for firebase updation
    const [listdata,setLisdata]=useState([]);
    const [newcol,setnewcol]=useState({
        working_days:[],
        habit_name:'',
        visited_day:0,
        total_hour:''

    })
    const [data,setData]=useState({
      habit_name:'',
      status:'',
      comit:'',
      days:0
        
        
       
    })
    // Fetch firebase data for validation
    useEffect(async()=>{
        console.log("welcme");
      const fetch_data=collection(FirDb,"Habit_data");
      const habit_data= await getDocs(fetch_data)
      setLisdata(habit_data.docs.map((doc)=>({...doc.data(), id:doc.id})))
      
    },[])
    var name1,value
    var newarr=[]
    var j=0;
   const InputHandle=(e1)=>{
       e1.preventDefault();
       name1=e1.target.name;
       value=e1.target.value;
       setData({...data, [name1]:value});
       
     var newVistedDay=0;
     var total_hour=''
     var h_name=''
     var target_hour=''
     listdata.map((e)=>{
      //  Check and update firebase required data
         if(e.habit_name.toLowerCase()===data.habit_name.toLowerCase())
         {
           var arr=e.working_day
           console.log('match')
           h_name=e.habit_name
           total_hour=e.total_hour
           target_hour=e.target_hour
           var visited_day=e.visited_day;
            newVistedDay=visited_day+1;
           console.log(newVistedDay)
           var tar=parseInt(data.days);
           console.log(tar+5)
            
             for(var i=0;i<7;i++)
             {
              if(i+1===tar){
                j=i;
                console.log(data.working_hour)
                newarr[i]={
                  status:data.status,
                  
                  
                }
              }
              else{
                newarr[i]={
                  status:e.working_days[i].status,
                  
                }
              }
             }

          
         }
         
     })
     setnewcol({
       working_days:newarr,
       habit_name:h_name,
       visited_day:newVistedDay,
       comit:data.comit
     
     })
    
   }
   const SubmitData=async(e1)=>{
       e1.preventDefault();
       console.log(data)
     var id=''
     
     listdata.map((e)=>{
      
       if(e.habit_name.toLowerCase()===data.habit_name.toLowerCase()){
         id=e.id
         
        
        
         
       }
     })
    console.log(newcol)
    // Update firebase data through their unique key
    try{
     const newDoc= await doc(FirDb,"Habit_data",id);
     
     updateDoc(newDoc,newcol);
     alert("Data successfully updated")
     setData({
      habit_name:'',
      status:'',
      comit:'',
      days:0
     })
    }
    catch{
     alert("Data not updated")
    }
    
     
   }
  //  JSX return parent
    return(
        <>
       <div className='container1'>
         <h1>Update data</h1>
         <div class="input-group input-group-sm">
  <span class="input-group-text" id="inputGroup-sizing-sm">Enter Habit</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name='habit_name' value={data.habit_name} onChange={InputHandle} />
</div>
     <span className='dropdown'>
         <label for="days">Choose a day:</label>
         <select name='days' id='days'  value={data.days} onChange={InputHandle}>
         <option value=''>Select</option>
             <option value='1'>Day1</option>
             <option value='2'>Day2</option>
             <option value='3'>Day3</option>
             <option value='4'>Day4</option>
             <option value='5'>Day5</option>
             <option value='6'>Day6</option>
             <option value='7'>Day7</option>
             </select>
         </span>
         <span className='radio_button'>
         <label for="status">Choose a status:</label>
         <select name='status' id='status'  value={data.status} onChange={InputHandle}>
             <option value=''>Select</option>
             <option value='completed'>Completed</option>
             <option value='not_completed'>not_complted</option>
            
             </select>
             </span>
             <div class="input-group input-group-sm" id="margine">
  <span class="input-group-text" id="inputGroup-sizing-sm">Enter Comit for today</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name='comit' value={data.comit} onChange={InputHandle} />
</div>
            
            
            
                 <button type='button' className='btn-primary' onClick={SubmitData}>Submit</button>
           </div>
           <div className='back_button'>
          

           <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/status" className="btn btn-primary"id="btn1">status</Link>
           </div>
         
        </>
    )
}
export default Update;
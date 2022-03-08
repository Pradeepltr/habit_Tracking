import React from 'react';
import "./Home.css";

const Home=()=>{
    return(
        <>
        <div className='form'>
            <h1>Add Habit</h1>
        <div class="input-group input-group-sm">
  <span class="input-group-text" id="inputGroup-sizing-sm">Enter Habit</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
</div>
<button type='button' className='btn-primary'>Add</button>
</div>
        </>
    )
}
export default Home;
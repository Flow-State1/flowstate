import React from 'react';
import { useState,useEffect } from 'react';
import "./question.css";
const InAppqs=(props)=>{
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(res.json()).then(data=>console.log(data))
    },[])
    return(
        <div className="a-questions">        
            Hello world
        </div>

        )
}
export default InAppqs
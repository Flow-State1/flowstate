import React from 'react';
import { useState,useEffect } from 'react';
import "./question.css";

const InAppqs=(props)=>{
    const {setState}=props
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res)=>res.json())
        .then((data)=>{
            const fiveFirstTodos=data.slice(0,6);
            setState((state)=>({...state,inAppqs:fiveFirstTodos}))
        });
    },[]);
    renderInAppsqs=()=>{
        props.inAppqs.map(inAppq=>{
        <li className="q-widgets" key={inAppqs.id}></li>
        })
    }
    return(
        <div className="a-questions">   
        <ul className="q-widgets">
        {this.renderInAppsqs()}
        </ul>  
        </div>
        )  
}
export default InAppqs
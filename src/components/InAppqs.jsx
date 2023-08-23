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

    const renderInAppqs=()=>{
        return props.inAppqs.map((inApp) =>{
            return(
                <li className='q-widgets' key={inApp.id}>
                {inApp.title}
            </li>
            );
        });
    };
    return ( <div className="a-questions">   
        <ul className="q-widgets">
        {renderInAppqs()}
        </ul>  
        </div>
    )    
}
export default InAppqs
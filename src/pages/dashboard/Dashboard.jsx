import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import '../styles.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard = () => {

    const [payload,setPayload] = useState([]);
        // Power, Voltage, Current,AEnergy
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
    
    //    let labels = [`${hour}:00`];
    const [labels,setLabels] = useState([`${hour}:00`]);

    
    useEffect(()=>{

        return ()=>{
        //Instance of the WebSocket
        const socket = new WebSocket("ws://localhost:3001") 
        let saved_time = `${hour}:${minutes}`;
        setInterval(() => {

            // This will help us set the labels of the graph using the hour and the current minutes of the hour
            let current_time = new Date();
            let current_hour = current_time.getHours();
            let current_minutes = current_time.getMinutes();
            // console.log(`Saved Time: ${saved_time}`);
            if(saved_time != `${current_hour}:${current_minutes}`){
                saved_time = `${current_hour}:${current_minutes}`
                setLabels(prevLabel => {
                    if (prevLabel !== `${current_hour}:${current_minutes}`) {
                      return [...prevLabel, `${current_hour}:${current_minutes}`];
                    } else {
                      return prevLabel;
                    }
                  });
            }
            socket.send('Send me messages');
        }, 30000);

        //Listen for messages
        socket.addEventListener("message", (event) => {
            const json = JSON.parse(event.data);
            const result = json.result['switch:0'];
            console.log(result);
            // console.log(result);
            setPayload(prevLoad=>[...prevLoad,result]);
        });
        }

    },[])


   
    
    // const labels = [saved_time]

    const dataObject = {
    labels,
    datasets: [
        {
        label: 'Power vs Hour',
        // apower
        data: labels.map(()=>{
            return(
                // ?
                Math.floor(Math.random() * 100) + 1
            );
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
    };

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
        >
        <div className='dashboard-container'>
            <div className='dashboard-content'>
                <div className='dashboard-content-header'>
                    <h2>Dashboard</h2>
                </div>

                <div className='dashboard-content-body'>

                    <div className='dashboard-content-body-summary-graph-card'>
                        <div className='dashboard-content-body-summary-graph-card-header'>
                            <h3>Live Graph</h3>
                        </div>
                        <Line data={dataObject}/>
                    </div>
                    <div className='dashboard-content-body-profile-right-card'>
                        <div className='dashboard-content-body-profile-right-card-avatar'>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />

                            <div className='dashboard-content-body-profile-right-card-avatar-name'>
                                <h3>Hi Andre!</h3>
                                <p>How are you today?</p>
                            </div>
                        </div>
                    </div>

                    <div className='dashboard-content-body-profile-right-summary-card'>
                        <div className='dashboard-content-body-profile-right-summary-card-header'>
                            <h3>Latest Updates</h3>
                        </div>
                    </div>

                    <div className='dashboard-content-body-profile-middle-mini-cards'>
                        <div className='dashboard-content-body-profile-middle-mini-card'>
                            <div className='dashboard-content-body-profile-middle-mini-card-header'>
                                <h3>Voltage</h3>
                            </div>
                        </div>
                        <div className='dashboard-content-body-profile-middle-mini-card'>
                            <div className='dashboard-content-body-profile-middle-mini-card-header'>
                                <h3>Current</h3>
                            </div>
                        </div>

                        <div className='dashboard-content-body-profile-middle-mini-card'>
                            <div className='dashboard-content-body-profile-middle-mini-card-header'>
                                <h3>Power</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default React.memo(Dashboard)
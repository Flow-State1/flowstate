import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import '../styles.css'
import { DashboardContext } from '../../context/DashboardContext'

const Analytics = () => {


    return(
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
        >
        <div className='analytics-container'>
            <div className='analytics-content'>
                <div className='analytics-content-header'>
                    <h2>Analytics</h2>
                </div>

                <div className='analytics-content-body'>

                    <div className='analytics-content-body-summary-graph-card'>
                        <div className='analytics-content-body-summary-graph-card-header'>
                            <h3>Power Consumed</h3>
                        </div>

                        <div className='analytics-content-body-summary-graph-card-body'>
                            <div className='analytics-content-body-summary-graph-card-body-item'>
                                <div className='analytics-content-body-summary-graph-card-body-item-header'>
                                    <h3>7.5kW/hr</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='analytics-content-body-middle-card'>
                        <div className='analytics-content-body-middle-card-header'>
                            <h3>Running Cost</h3>
                        </div>

                        <div className='analytics-content-body-middle-card-body'>
                            <div className='analytics-content-body-middle-card-body-item'>
                                <div className='analytics-content-body-middle-card-body-item-header'>
                                    <h3>R 1,500</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='analytics-content-body-power-right-card'>
                        <div className='analytics-content-body-power-right-card-header'>
                            <h3>Power Saved</h3>
                        </div>

                        <div className='analytics-content-body-power-right-card-body'>
                            <div className='analytics-content-body-power-right-card-body-item'>
                                <div className='analytics-content-body-power-right-card-body-item-header'>
                                    <h3>2.5kW/hr</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='analytics-content-body-consumption-graph-card'>
                        <div className='analytics-content-body-summary-graph-card-header'>
                            <h3>Consumption Vs. Usage</h3>
                            <div className='analytics-content-body-summary-graph-card-header-select'>
                                <select name="" id="">
                                    <option value="">Today</option>
                                    <option value="">Yesterday</option>
                                    <option value="">Last 7 Days</option>
                                    <option value="">Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='analytics-content-body-usage-graph-card'>
                        <div className='analytics-content-body-summary-graph-card-header'>
                            <h3>Consumption/Day</h3>
                            <div className='analytics-content-body-summary-graph-card-header-select'>
                                <select name="" id="">
                                    <option value="">Today</option>
                                    <option value="">Yesterday</option>
                                    <option value="">Last 7 Days</option>
                                    <option value="">Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <a href="annual-report">Annual Report</a>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default Analytics
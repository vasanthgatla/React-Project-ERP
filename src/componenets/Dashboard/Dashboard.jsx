import React from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/navbar';



const Dashboard = () => {

    const totalProducts = 10;
    const totalOrders = 8;
    return (
        <div>
            
            <Navbar/>
            <div className="outer-box">
                <div className="inner1">
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>
                <div className="inner2">
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p> 
                </div>
               
            </div>
            
        </div>
    );
}

export default Dashboard;

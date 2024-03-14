import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/products">Product Management</Link></li>
                <li><Link to="/orders">Order Management</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

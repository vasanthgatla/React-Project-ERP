import React, { useState } from 'react';
import './OrderManagement.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OrderDetailsModal from './../OrderDetails/OrderDetailsModal';
import Navbar from './../Navbar/navbar';

const OrderManagement = () => {
    const initialOrders = [
        { id: 1, customerName: 'Koushik', orderDate: '2024-03-09', status: 'Processing', deliveryDate: '2024-03-20' },
        { id: 2, customerName: 'Ramesh', orderDate: '2024-02-01', status: 'Processing', deliveryDate: '2024-03-25' },
        { id: 3, customerName: 'Varun', orderDate: '2024-03-09', status: 'Processing', deliveryDate: '2024-02-15' },
        { id: 4, customerName: 'Sharath', orderDate: '2024-03-09', status: 'Processing', deliveryDate: '2024-03-05' },
        { id: 5, customerName: 'Vasanth', orderDate: '2024-03-05', status: 'Processing', deliveryDate: '2024-03-23' },
        { id: 6, customerName: 'Ramakrishna', orderDate: '2024-02-05', status: 'Processing', deliveryDate: '2024-03-18' },
        { id: 7, customerName: 'Khaja Pasha', orderDate: '2024-03-01', status: 'Processing', deliveryDate: '2024-04-10' },
        { id: 8, customerName: 'Deekitshith', orderDate: '2024-01-31', status: 'Processing', deliveryDate: '2024-03-10' },
        { id: 9, customerName: 'Rahul Ramakrishna', orderDate: '2024-01-31', status: 'Processing', deliveryDate: '2024-03-26' },
        { id: 10, customerName: 'Karthik', orderDate: '2024-01-31', status: 'Processing', deliveryDate: '2024-03-30' }
    ];

    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deliveryDates = initialOrders.map(order => new Date(order.deliveryDate));

    const handleDelete = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };
    

    const handleViewDetails = (id) => {
        const order = orders.find(order => order.id === id);
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleDeliveryDateClick = (date) => {
    
        const order = orders.find(order => new Date(order.deliveryDate).toDateString() === date.toDateString());

        
        if (order) {
            setSelectedOrder(order);
            setIsModalOpen(true); 
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <h2>Orders Management</h2>
            <div>
                <h3>Orders:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.status}</td>
                                <td>{order.orderDate}</td>
                                <td>
                                    <button className='view-details' onClick={() => handleViewDetails(order.id)}>View Details</button>
                                    <button className='delete' onClick={() => handleDelete(order.id)}>Delete</button>
                                    <button className='pending' onClick={() => handleStatusChange(order.id, 'Pending')}>Pending</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OrderDetailsModal order={selectedOrder} isOpen={isModalOpen} onClose={closeModal} />
            <div className="calendar-container">
                <center><h3>Calendar View:</h3></center>
                <Calendar
                    className="react-calendar"
                    tileContent={({ date, view }) => {
                        if (view === 'month' && deliveryDates.find(deliveryDate => deliveryDate.toDateString() === date.toDateString())) {
                            return <div className="highlight" onClick={() => handleDeliveryDateClick(date)}>Delivery</div>;
                        }
                    }}
                />
            </div>
        </>
    );
};

export default OrderManagement;

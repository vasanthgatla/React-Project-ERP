import React from 'react';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  
    if (!isOpen || !order) {
        return null; 
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Order Details</h2>
                <p>Order ID: {order.id}</p>
                <p>Customer Name: {order.customerName}</p>
                <p>Status: {order.status}</p>
                <p>Delivery Date: {order.deliveryDate}</p>
              
            </div>
        </div>
    );
};

export default OrderDetailsModal;

import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

import Navbar from './../Navbar/navbar';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            const editedProducts = products.map(product =>
                product.id === formData.id
                    ? { ...product, name: formData.name, category: formData.category, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) }
                    : product
            );
            setProducts(editedProducts);
        } else {
            const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            setProducts([
                ...products,
                {
                    id: newId,
                    name: formData.name,
                    category: formData.category,
                    price: parseFloat(formData.price),
                    quantity: parseInt(formData.quantity)
                }
            ]);
        }
        setFormData({
            id: '',
            name: '',
            category: '',
            price: '',
            quantity: ''
        });
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = (product) => {
        setFormData(product);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <>
            <div className="product-management">
                <Navbar />
                <h2 style={{ textAlign: "center" }}>Product Management</h2>
                <form className="product-form" onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <input type="hidden" name="id" value={formData.id} />
                    <input type="text" className="input-field" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required />
                    <input type="text" className="input-field" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required />
                    <input type="number" className="input-field" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                    <input type="number" className="input-field" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} required />
                    <button type="submit" className="submit-button">{formData.id ? 'Edit Product' : 'Add Product'}</button>
                </form>
                <div className="product-list">
                    <h3>Products:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseEditModal}>&times;</span>
                        <h2>Edit Product</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="id" value={formData.id} />
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            <label htmlFor="category">Category:</label>
                            <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
                            <label htmlFor="price">Price:</label>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductManagement;

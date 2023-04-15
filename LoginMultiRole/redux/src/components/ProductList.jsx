import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    //dapetnya dari sini melalui setproduct
    const getProduct = async () => {
        const response = await axios.get('http://localhost:8080/product')
        setProduct(response.data)
    };
    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:8080/product/${productId}`)
        getProduct();
    }
    return (
        <div className=''>
            <h1 className=' title'>Products</h1>
            <h2 className=' subtitle'> List of Products</h2>
            <Link to="/products/add" className=' button is-primary mb-2'>Add New</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th> Product Name</th>
                        <th>Price</th>
                        <th>Created By</th>
                        <th>Actiions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.uuid}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.loginUser.name}</td>
                            <td>
                                <Link to={`/products/edit/${product.uuid}`} className=' button is-small is-info'>Edit</Link>
                                <button onClick={() => deleteProduct(product.uuid)} className=' button is-small is-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
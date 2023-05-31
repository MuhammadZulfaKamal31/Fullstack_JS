import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export const ProductListt = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        const response = await axios.get("http://localhost:5000/product");
        //argumen data yang ada di database biar bisa di mapping di product
        setProduct(response.data);
    }
    //parameter di tulis terserah
    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/product/${productId}`);
            //di panggil kemabali supaya agar bisa di refresh kembali
            getProduct()
        } catch (error) {
            console.log(error)
        }
    }
    //kelemahan disini jika ada gambar yang sama yang sudah dihapus maka sisa slot yang tersisa susah di hapus
    return (
        <div className=' container m-6'>
            <Link to='add' className=' button is-success'>Add New</Link>
            <div className=" columns is-multiline mt-6">
                {product.map((product) => (
                    <div className="columns is-one-quarter m-1" key={product.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={product.url}
                                        alt="image" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{product.name}</p>
                                    </div>
                                </div>
                            </div>
                            <footer className='card-footer'>
                                <Link to={`edit/${product.id}`} className='card-footer-item'>Edit</Link>
                                {/* dipanggil nya disini, boleh di tulisan dulauan gak apa apa */}
                                <a onClick={() => deleteProduct(product.id)} className='card-footer-item'>Delete</a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FormEditProduct = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [msg, setMsg] = useState();
    const navigate = useNavigate();
    const { id } = useParams()

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8080/product/${id}`, {
                name: name,
                price: price
            });
            navigate("/products")
        } catch (error) {
            //cara memilih error consolog, dan lihat daftarnya
            if (error.response) {
                setMsg(error.response.statusText);
            }
            console.log(error)
        }
    }

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${id}`)
                setName(response.data.name)
                setPrice(response.data.price)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.statusText);
                }
            }
        }
        getProductById();
    }, [id])

    return (
        <div>
            <h1 className=' title'>Product</h1>
            <p className=' subtitle'> Edit Product</p>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateProduct}>
                            <p className=' has-text-centered'>{msg}</p>
                            <div className='field'>
                                <label className='label'>Name</label>
                                <div className="control">
                                    <input type="text" className="input"
                                        value={name} onChange={(e) => setName(e.target.value)} placeholder='Product Name' />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Price</label>
                                <div className="control">
                                    <input type="text" className="input"
                                        value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
                                </div>
                            </div>
                            <div className='field'>
                                <div className="control">
                                    <button type='submit' className="button is-success is-fullwidth">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditProduct
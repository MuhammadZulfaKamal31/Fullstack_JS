import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//untuk dispatch atau ambil silce nya, tanpa menggunakan useEffects
import { useDispatch } from 'react-redux';
//terkhir panggil sliceproduct nya disini
import { saveProduct } from '../features/ProductSlice';

export const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createProduct = async (e) => {
        e.preventDefault();
        await dispatch(saveProduct({ title, price }));
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={createProduct} className=' box mt-5' >
                <div className=' field'>
                    <label className=' label'> Title</label>
                    <div className=' control'>
                        <input
                            type="text" className='input'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className=' field'>
                    <label className=' label'> Price</label>
                    <div className=' control'>
                        <input type="text" className='input' placeholder='Price'
                            value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className=' field'>
                    <button className=' button is-success' type='submit'> Submit</button>
                </div>
            </form>
        </div>
    )
}

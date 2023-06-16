import React, { useState, useEffect } from 'react'
//untuk dispatch atau ambil silce nya, tanpa menggunakan useEffects
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, productSelector, updateProduct } from '../features/ProductSlice';
import { useParams, useNavigate } from 'react-router-dom';

export const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    //buat nampilin data yng ingin di update berdasarkan id
    const product = useSelector((state) => productSelector.selectById(state, id))
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    //buat nampilin data
    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
        }
    }, [product])

    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateProduct(id, title, price))
        navigate("/")
    }
    return (
        <div>
            <form className=' box mt-5' >
                <div className=' field'>
                    <label className=' label'> Title</label>
                    <div className=' control'>
                        <input
                            type="text" className='input'
                            placeholder='Title'
                            value={title} onChange={(e) => setTitle(e.target.value)} />
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
                    <button className=' button is-success' type='submit'> Update</button>
                </div>
            </form>
        </div>
    )
}

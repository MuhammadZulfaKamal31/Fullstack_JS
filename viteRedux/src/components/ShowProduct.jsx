import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
//untuk menggunakan store bisa gunakan useSelector
//useSelector fungsinya mengambil data dari state aplikasi
//Dispacth adalah proses mengirimkan action ke store
import { useSelector, useDispatch } from 'react-redux'
//karena kita mmenggunakan useDispatch
import { deleteProduct, getProduct, productSelector } from '../features/ProductSlice'

export const ShowProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector(productSelector.selectAll);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    //ini bukan usestate jadi gunakan json {}
    return (
        <div className=' box mt-5 has-background-black'>
            <Link to="add" className='button is-success'>add New</Link>
            <table className=' table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`edit/${product.id}`} className=' button is-info is-small'> Edit</Link>
                                <button onClick={() => dispatch(deleteProduct(product.id))} className=' button is-danger is-small'> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

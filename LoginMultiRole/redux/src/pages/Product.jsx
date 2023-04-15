import React, { useEffect } from 'react'
import ProductList from '../components/ProductList'
import Layout from './Layout'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice"

const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector(
        (state => state.auth)
    );

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/")
        }
    }, [dispatch, navigate]);
    return (
        <Layout>
            <ProductList />
        </Layout>
    )
}

export default Product
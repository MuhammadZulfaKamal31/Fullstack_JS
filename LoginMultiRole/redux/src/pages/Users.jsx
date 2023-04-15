import React, { useEffect } from 'react'
import UserList from '../components/UserList'
import Layout from './Layout'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice"


const Users = () => {
    //di paste satu satu halamamnya jika kita gak login
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector(
        (state => state.auth)
    );

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    //biar yang bisa kases cuman user saja
    useEffect(() => {
        if (isError) {
            navigate("/")
        }
        if (user && user.role !== "admin") {
            navigate("/dashboard")
        }
    }, [dispatch, user, navigate]);

    return (
        <Layout>
            <UserList />
        </Layout>
    )
}

export default Users
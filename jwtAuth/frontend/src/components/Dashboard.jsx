import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expires, setExpires] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refershToken();
        getUsers()
    }, []);

    const refershToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accesToken);
            const decoded = jwt_decode(response.data.accesToken);
            setName(decoded.name);
            setExpires(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate('/');
            }
        }
    };
    //bisa akses selamanya tanpa reload
    //Dengan membuat instance baru, kita dapat mengkonfigurasi instance tersebut sesuai kebutuhan, seperti menambahkan header atau interceptors yang berbeda.
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        // Membuat objek Date baru dengan waktu saat ini
        const currentDate = new Date();
        // Mengecek apakah token sudah expired atau belum
        if (expires * 1000 < currentDate.getTime()) {
            // Jika sudah expired, melakukan request ke endpoint 'http://localhost:5000/token' menggunakan metode GET
            const response = await axios.get('http://localhost:5000/token');
            // Menambahkan header Authorization pada request config dengan isi value "Bearer <access token>"
            config.headers.Authorization = `Bearer ${response.data.accesToken}`;
            // Mengupdate state token dengan access token baru
            setToken(response.data.accesToken);
            // Mendekode isi token yang baru untuk mendapatkan nama user dan waktu token expired
            const decoded = jwt_decode(response.data.accesToken);
            // Mengupdate state nama dengan nama user yang didapatkan dari hasil decode token
            setName(decoded.name);
            // Mengupdate state expires dengan waktu expired yang didapatkan dari hasil decode token
            setExpires(decoded.exp);
        }
        // Mengembalikan request config
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setUsers(response.data)
    }
    return (
        <div className='container mt-5'>
            <h1>Welcome back: {name}</h1>
            <button onClick={getUsers} className='button is-info'>Get Users</button>
            <table className=' table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;

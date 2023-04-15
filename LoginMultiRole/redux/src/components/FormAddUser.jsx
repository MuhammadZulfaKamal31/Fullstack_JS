import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/user', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role
            });
            navigate("/users")
        } catch (error) {
            //cara memilih error consolog, dan lihat daftarnya
            if (error.response) {
                setMsg(error.response.statusText);
            }
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <h1 className=' title'>Users</h1>
                <p className=' subtitle'> Add New User</p>
                <div className="card is-shadowless">
                    <div className="card-content">
                        <div className="content">
                            <form onSubmit={saveUser}>
                                <p className=' has-text-centered'>{msg}</p>
                                <div className='field'>
                                    <label className='label'>Name</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                            value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Email</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                            value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Password</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder='******' />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Confirm Password</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                            value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='******' />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Role</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                                <option value="admin">Admin</option>
                                                <option value="User">User</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='field'>
                                    <div className="control">
                                        <button type='submit' className="button is-success is-fullwidth">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddUser
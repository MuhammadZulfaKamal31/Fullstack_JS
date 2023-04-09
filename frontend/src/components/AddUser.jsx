import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const navigate = useNavigate()

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/user', {
                name,
                email,
                gender
            });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='column mt-5 is-centered is-0-widescreen-only'>
            <div className='column is-half is-full-widescreen'>
                <form action="" onSubmit={saveUser}>
                    <div className='field is-full-widescreen'>
                        <label className='label'>Name</label>
                        <div className='control'>
                            <input type='text' className='input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'></input>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input type='text' className='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Gender</label>
                        <div className='control'>
                            <div className='select is-fullwidth'>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} >
                                    <option value="Male">Male</option>
                                    <option value="Female">FeMale</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <button type='submit' className='button is-success'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
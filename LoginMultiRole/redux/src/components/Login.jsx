import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSucces, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSucces) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSucces, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    }

    return (
        <div>
            <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className='column is-4'>
                                <form onSubmit={Auth} className=' box'>
                                    {isError && <p className='has-text-centered'>{message}</p>}
                                    <h1 className='title has-text-grey-dark is-2'>Sign In</h1>
                                    <div className='field'>
                                        <label className='label'>Email</label>
                                        <div className="control">
                                            <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className='field'>
                                        <label className='label'>Password</label>
                                        <div className="control">
                                            <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='******' />
                                        </div>
                                    </div>
                                    <div className='field'>
                                        <div className="control">
                                            <button type='submit' className="button is-success is-fullwidth">{isLoading ? 'Loading...' : "Login"}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
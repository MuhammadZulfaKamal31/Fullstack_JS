import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, logOut, reset } from "../features/authSlice";


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const logout = () => {
        dispatch(logOut());
        dispatch(reset());
        navigate("/")
    }
    return (
        <div>
            <aside className="menu has-shadow pl-2">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to='/dashboard'><IoHome />Dashboard</NavLink></li>
                    <li><NavLink to='/products'><IoPricetag /> Product</NavLink></li>
                </ul>
                {user && user.role === "admin" && (
                    <div>
                        <p className="menu-label">
                            Admin
                        </p>
                        <ul className="menu-list">
                            <li>
                                <NavLink to='/users'>
                                    <IoPerson /> Users
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}

                <p className="menu-label">
                    Setting
                </p>
                <ul className="menu-list">
                    <li>
                        <button onClick={logout} className=' button is-white'><IoLogOut />
                            LogOut
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar
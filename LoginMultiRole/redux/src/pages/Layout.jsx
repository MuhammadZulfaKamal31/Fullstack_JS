import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        //layout adalah halaman yang di gunakan secara terus menerus di setiap lading page
        <React.Fragment>
            <Navbar />
            <div className="columns mt-6" style={{ minHeight: "100vh" }}>
                <div className="column is-2"><Sidebar /></div>
                <div className="column has-background-light">
                    <main>{children}</main>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout
import React, { useState, useEffect } from 'react'
import axios from "axios"
import ReactPaginate from "react-paginate"

export const User = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    //perhatikan tipe datanya, kalau gak errornya gak di ketahui
    const [keyword, setKeyword] = useState("");
    //handle pencarian
    const [query, setQuery] = useState("");

    const [msg, setMsg] = useState("");


    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    const getUsers = async () => {
        const response = await axios.get(`http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`);
        setUsers(response.data.result);
        setPage(response.data.page);
        //sesuai yg di set di backend
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);

    }

    //selected adalah bawwan dari reactPaginate
    //Properti selected mengandung indeks halaman yang dipilih oleh pengguna, dimulai dari 0. Jadi, ketika pengguna memilih halaman pertama, nilai selected akan menjadi 0, dan seterusnya.
    const changePage = ({ selected }) => {
        setPage(selected)
        //fungsi membatasi jika datanya ada millyaran pge
        if (selected === 9) {
            setMsg("jika tidak menemukan data yang dicari silahkan cari data dengan kata kunci spesifik")
        } else {
            setMsg("")
        };
    }

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query)
    };

    return (
        <div className="container mt-5 ml-6 columns">
            <div className="column is-centered">
                <form onSubmit={searchData}>
                    <div className=' field has-addons'>
                        <div className="control is-expanded">
                            < input
                                onChange={(e) => setQuery(e.target.value)}
                                type='text'
                                className='input'
                                placeholder='find something here ...' />
                        </div>
                        <div className="control">
                            <button type='submit' className='button is-info'>search</button>
                        </div>
                    </div>
                </form>
                <table className=' table is-striped is-bordered is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* ini akan menampilkan nomor halaman saat ini dan jika tidak akan menamilkan satu */}
                <p>Total Rows : {rows} Page: {rows ? page + 1 : 0} of {pages}</p>
                <p className='has-text-centered has-text-danger'>{msg}</p>
                <nav className="pagination is-centerd"
                    key={rows}
                    role='navigation'
                    aria-label="pagination">
                    {/* bisa di klik karena langsung ngelink */}
                    <ReactPaginate
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        //jika nilainya lebih dr 10 maka yang di ambil cuman 10 kalau kuarang ya sesuai tampilan page
                        pageCount={Math.min(10, pages)}
                        onPageChange={changePage}
                        containerClassName={'pagination-list'}
                        pageLinkClassName={" pagination-link"}
                        previousLinkClassName={"pagination-previous"}
                        nextClassName={"pagination-next"}
                        activeLinkClassName={"pagination-link is-current"}
                        disabledLinkClassName={"pagination-link is-disabled"}
                    />
                </nav>
            </div >
        </div >
    )
}

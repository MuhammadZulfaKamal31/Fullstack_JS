import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom"

export const EditProduct = () => {
    const [title, seTitle] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getProductById()
    }, [])

    //buat lihat prefiew
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        seTitle(response.data.name)
        setFile(response.data.image);
        setPreview(response.data.url);
    }
    //nampilakan gambar
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.patch(`http://localhost:5000/product/${id}`, formData, {
                heeaders: {
                    "Content-type": "multipart/form-data"
                }
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateProduct}>
                    <div className='field'>
                        <label className='label'>Product Name</label>
                        <div className='control'>
                            <input type="text" className="input" value={title} onChange={(e) => seTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className='field'>
                        <label className='label'>Image</label>
                        <div className='control'>
                            <label className='file-label'>
                                {/* untuk memiih file typenya harus file */}
                                <input type="file"
                                    accept="image/*"
                                    className='file-input' onChange={loadImage} />
                                <span className=' file-cta'>
                                    <span className='file-label'>Choose a file ...</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {preview ? (
                        <figure className='image is-128x128'>
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}
                    <div className='field mt-6'>
                        <div className='control'>
                            <button type='submit' className="button is-success" >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

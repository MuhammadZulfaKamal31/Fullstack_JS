import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const AddProduct = () => {
    const [title, seTitle] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('')
    const navigate = useNavigate()
    //di panggil di onchange
    const loadImage = (e) => {
        //array digunakan karena elemen input file HTML dapat menerima multiple files dalam satu pemilihan. Dengan menggunakan array, kita dapat mengakses dan memanipulasi file-file yang dipilih oleh pengguna
        const image = e.target.files[0];
        //menampilkan file
        setFile(image);
        //methode bawaan javscript untuk menampilkan gambar yang dipilih oleh pengguna sebelum mengunggahnya.
        setPreview(URL.createObjectURL(image));
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        //objek bawaan javascript
        const formData = new FormData();
        //me mapping data sesuai alur yang ada di backend atau menambahkan lah
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.post("http://localhost:5000/product", formData, {
                // mengindikasikan bahwa permintaan mengandung data berupa form-data
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
                <form onSubmit={saveProduct}>
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

                    {/* preview nya di panggil disini */}
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
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

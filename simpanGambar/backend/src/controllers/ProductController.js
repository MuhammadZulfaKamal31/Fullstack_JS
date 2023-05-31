const Product = require("../models/ProductModel.js")
const path = require('path')
const fs = require('fs')

exports.getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({});
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

exports.getByProducts = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

exports.saveProducts = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    //bagian title dan file ini di gunakan buat nama di postman, biar bisa masuk lwt body form
    const name = req.body.title;
    const file = req.files.file;
    //mendapatkan ukuran dalam byte
    const fileSize = file.data.length;
    //path.extname() mengembalikan ekstensi file dengan titik (.) di depannya. seperti .jpg gitu dan ini bisa langsung unggah file tipe apapan
    const ext = path.extname(file.name);
    //md 5 itu hash string yng berisi angka unik dengan kata mengubah nama menjadi hash
    const fileName = file.md5 + ext;
    //http://example.com/images/abc123.jpg
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    //bagian ini cuman baut validasi, bukan bikin tipe filenya
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "image must be less than 5 Mb" });
    // (move) adalah metode dari objek file (file) yang memindahkan file ke lokasi yang ditentukan. Dalam kasus ini, file akan dipindahkan ke direktori
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({ name: name, image: fileName, url: url });
            res.status(201).json({ msg: "Product Created Succesfully" });
        } catch (error) {
            console.log(error.message)
        }
    })
}

exports.updateProducts = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    // if else buat validasi update
    if (req.files === null) {
        fileName = Product.image;
    } else {
        const file = req.files.file;
        //mendpatkan ukuran dalam byte
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "image must be less than 5 Mb" });
        //mendapatkan di rektori gambar
        const filePath = `./public/images/${product.image}`;
        //menghapus file di folder public images
        fs.unlinkSync(filePath);
        //setelah itu buat file baru yang di move sesuai direktori tanpa async
        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        })
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    try {
        await Product.update({ name: name, image: fileName, url: url }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product updated succesfully" });
    } catch (error) {
        console.log(error.message)
    }
}

exports.deleteProducts = async (req, res) => {
    //ambil data di database yang di tuju bersasarkan parameter yang berdasarkan id
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    try {
        //ambil data image di database
        const filePath = `./public/images/${product.image}`;
        //menghapus file di folder public images
        fs.unlinkSync(filePath);
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Deleted Succesfull" });
    } catch (error) {
        console.log(error.message);
    }
}

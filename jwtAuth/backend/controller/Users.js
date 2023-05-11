import Users from "../model/UserModel.js";
//fungsinya untuk mengubah kata sandi ke nilai acak
import bcrypt from "bcrypt";
//supaya bisa di jadikan objek harus pakai alias
import Jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            //untuk menampilkan apa yang ingin ditampilkan
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    //untuk inputnya
    const { name, email, password, confPassword } = req.body;
    //bagian json ini sebaiknya di tulis menggunakan json asli untuk mempermudah pengambilan data di front end
    if (password !== confPassword) { return res.status(400).json({ msg: "password dan confirm password tidak cocok" }); }

    // method buat mengacak
    const salt = await bcrypt.genSalt();
    // nilai password yang akan di acak
    const hashPassword = await bcrypt.hash(password, salt);
    //memaping valuenya ke kolom tabel atau suapa bisa menggunakan methode post
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.json({ msg: 'register berhasil' })
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        //walupun menggunakan method post tapi isi methodnya find all ya outputbya pasti menampikan doang
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        //mnggunakan method compare agar bisa menghasilkan nilai boolean jika 2 argumen sama
        // karena array menggunakan 0 sebagai index pertama 
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "password salah" });

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accesToken = Jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        })
        const refreshToken = Jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        //Pada saat pengguna melakukan refresh token, kode tersebut akan memperbarui
        //bagian ini penting di bagian halaman refreshtoken
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accesToken });
    } catch (error) {
        res.status(404).json({ msg: "email tidak di temukan" })
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            //pastikan table refresh token semuanya benar di semua halaman
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
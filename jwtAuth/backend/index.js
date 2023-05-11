import express from "express";
import dotev from 'dotenv'
import db from "./config/dataBase.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
// import Users from "./model/UserModel.js";

dotev.config();
const app = express();


try {
    await db.authenticate();
    console.log('Database Connected..');
    //kita bisa menggunakan cara ini atau db.synch
    // await Users.sync();
} catch (error) {
    console.error(error)
}

//harus pakai tanda kurung mohon periksa dokumentasinya
//untuk menerima data dalam bentuk bentuk json
//default react js adalah 3000
//yang bagian ini sesuaikan dengan frontend yang dipakai
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(cookieParser())
app.use(router)

app.listen(5000, () => console.log('lari terus kawan'))
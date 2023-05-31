require('dotenv').config();

const db = require('./configs/DataBase')
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const ProductRoute = require('./routes/router.js')

const router = require('./routes/router');

const app = express();

try {
    //untuk generate entity
    (async () => {
        // await db.sync({ force: true })
    })();
} catch (error) {
    console.log(error)
}
//pastikan cors di baca pertama karena ini sebagai middleware
//dan fungsi cors sendiri supya frontend bisa akses
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload())
//ketika udah masuk ini baru kelihatan errornya

//express static supaya bisa melihat tampilan gambar di browsernya
app.use(express.static('public'));
app.use(ProductRoute)

app.use('/', router);

app.listen(process.env.SERVER_PORT, () => { console.log('goblok bisa bisanya dirimu bermalas malasan') });

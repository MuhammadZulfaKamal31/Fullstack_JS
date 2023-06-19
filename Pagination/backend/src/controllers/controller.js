const User = require("../models/UserModel.js");
const { Op } = require("sequelize");

exports.getUsers = async (req, res) => {
    //menagmbil input dan menentukan batas data dan halaman yang akan di tampilkan
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    //menghitung jumlah baris dalam tabel yng memenuhi kondisi seperti di bawah 
    const totalRows = await User.count({
        where: {
            [Op.or]: [
                {
                    //pakai ilike karena saya menggunkan postgress
                    //di postgress huruf besar dan kecil itu sensitif
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    email: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            ]
        }
    });

    // menampilkan data pengguna dengan kondisi dan aturan inputan yang akan di gunakan
    const totalPage = Math.ceil(totalRows / limit);
    //yg diatas untuk menampilkan respon total page
    //methode findall selalu mengembalikan tipe data array
    const result = await User.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    email: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            ]
        },
        offset: offset,
        limit: limit,
        order: [["id", 'DESC']]
    });

    //menampilkan respon ketika query berhasil outputnya
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
};

import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        //penulisan slah bagian refreshtoken karena gak pakai h 
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                //pastikan table refresh token semuana=nya benar di semua halaman
                refresh_token: refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(404);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accesToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '50s'
            })
            res.json({ accesToken });
        })
    } catch (error) {
        console.log(error)
    }
}
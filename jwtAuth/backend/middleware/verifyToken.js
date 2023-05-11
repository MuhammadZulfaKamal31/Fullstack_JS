import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // error yang terjadi Seharusnya delimiter yang digunakan adalah spasi (' '), agar header dapat dipisahkan dengan benar
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}
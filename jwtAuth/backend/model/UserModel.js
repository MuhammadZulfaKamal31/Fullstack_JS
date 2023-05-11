import db from "../config/dataBase.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const UsersModel = db.define('pengguna', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default UsersModel;
const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
//belakangnya harus ada s
const { DataTypes } = Sequelize;

const User = db.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
}, {
    freezeTableName: true
});

module.exports = User;

(async () => {
    await db.sync();
})();
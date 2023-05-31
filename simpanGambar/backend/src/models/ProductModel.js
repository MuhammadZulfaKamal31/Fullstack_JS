const { Await } = require("react-router-dom");
const { Sequelize } = require("sequelize");
const db = require('../configs/DataBase.js');

const { DataTypes } = Sequelize;

const Product = db.define('product_gambar', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});

module.exports = Product;



import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db', 'postgres', 'Agustus31', {
    host: 'localhost',
    dialect: 'postgres'
});

export default db;


require("dotenv").config();
const mysql = require("mysql2/promise");

const config = {
    host:"localhost",
    user:"root",
    password:process.env.DB_PASSWORD,
    database:"eduplanet",
}

const createConnection = async () =>{
    return await mysql.createConnection(config)
} 

module.exports = {createConnection};
const db = require("../configs/db.config")
class Buy{
    constructor({id,total,createdAt,updatedAt}){
        this.id=id
        this.total=total
        this.createdAt=createdAt
        this.updatedAt=updatedAt
    }
    async save(){
        const connection = await db.createConnection()

        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO compra (total,created_at) VALUES (?,?)",[this.total,createdAt])

        connection.end()

        if(result.affectedRows == 0){
            throw new Error("no se pudo crear la compra")
        }
        this.id = result.insertId
    }

    async saveWithTransaction(connection){
        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO compra (total,created_at) VALUES (?,?)",[this.total,createdAt])

        if(result.affectedRows == 0){
            throw new Error("no se pudo crear la compra")
        }
        return result.insertId
    }
}
module.exports = Buy
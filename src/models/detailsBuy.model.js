const db = require("../configs/db.config")

class Details{
    constructor({id,idCompra,idProducto,idUsuario,descuento,createdAt,createdBy,updatedAt,updateBy}){
        this.id=id
        this.idCompra=idCompra
        this.idProducto=idProducto
        this.idUsuario=idUsuario
        this.descuento=descuento
        this.createdAt=createdAt
        this.createdBy=createdBy
        this.updatedAt=updatedAt
        this.updateBy=updateBy
    }
    async save(){
        const connection = await db.createConnection()
        
        const createdAt = new Date()

        const [result] = await connection.execute("INSERT INTO detalle_compra (id_compra,id_material,id_usuario,descuento,created_at,created_by) VALUES (?,?,?,?,?,?)",[this.idCompra,this.idProducto,this.idUsuario,this.descuento,createdAt,this.idUsuario])

        connection.end()

        if(result.affectedRows == 0){
            throw new Error("no se pudo crear la compra")
        }
        this.id = result.insertId
    }

    async saveWithTransaction(connection){
        const createdAt = new Date()

        const [result] = await connection.execute("INSERT INTO detalle_compra (id_compra,id_material,id_usuario,descuento,created_at,created_by) VALUES (?,?,?,?,?,?)",[this.idCompra,this.idProducto,this.idUsuario,this.descuento,createdAt,this.idUsuario])

        if(result.affectedRows == 0){
            throw new Error("no se pudo crear la compra")
        }

        return result.insertId
    }

    setIdCompra(idCompra){
        this.idCompra = idCompra
    }
}
module.exports = Details
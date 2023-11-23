const db = require("../configs/db.config")
class Comment{
    constructor({id,idBlog,comentario,idUsuario,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,deleted}){
        this.id=id
        this.idBlog=idBlog
        this.comentario=comentario
        this.idUsuario=
        this.createdBy=createdBy
        this.createdAt=createdAt
        this.updatedBy=updatedBy
        this.updatedAt=updatedAt
        this.deletedBy=deletedBy
        this.deletedAt=deletedAt
        this.deleted=deleted
    }
    static async getAll(id){
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_comentario, id_blog, comentario, id_usuario,created_by,created_at,updated_at,updated_by FROM comentario WHERE id_blog = ? AND deleted = 0",[id])

        connection.end()

        return rows
    }

    async save(){
        const connection = await db.createConnection()

        const createdAt = new Date()

        const [result] = await connection.execute("INSERT INTO comentario (id_blog,comentario,id_usuario,created_by,created_at) VALUES (?,?,?,?,?)",[this.idBlog,this.comentario,this.idUsuario,this.createdBy,createdAt])
        
        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo guardar el comentario")
        }
        this.id = result.insertId
    }
    static async deleteLogic({id,deletedBy}){
        const connection = await db.createConnection()

        const deletedAt = new Date()
        const [result] = await connection.execute("UPDATE comentario SET deleted = 1,deleted_at = ?,deleted_by = ? WHERE id_comentario = ?",[deletedAt,deletedBy,id])

        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo eliminar el comentario")
        }
        return;
    }
    static async getById(id){
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_comentario, id_blog, comentario, id_usuario,created_by,created_at,updated_at,updated_by FROM comentario WHERE id_comentario = ? AND deleted = 0",[id])

        connection.end()

        if(rows.length > 0){
            const row = rows[0]
            return new Comment({
                id: row.id_comentario,
                idBlog: row.id_blog,
                comentario: row.comentario,
                idUsuario: row.id_usuario,
                createdBy: row.created_by,
                createdAt: row.created_at,
                updatedBy: row.updated_by,
                updatedAt: row.updated_at
            })
        }
        return null;
    }
}
module.exports=Comment
require('dotenv').config()
const Comment = require('../models/comment.model')
const jwt = require('jsonwebtoken')
const pusher = require('../configs/pusher.config')
const getAllCommentBlog = async (req,res) => {
    try{
        const {id} = req.params
        const comments = await Comment.getAll(id)
        return res.status(200).json({
            message: "se obtuvieron todos los comentarios",
            data: comments
        })
    }catch(error){
        return res.status(500).json({
            message: "error al obtener los comentarios",
            error: error.message
        })
    }
}
const postComment = async (req,res) =>{
    try{
        const {id} = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        await pusher.trigger("chat","message",{
                idBlog: req.params.id,
                comentario: req.body.comentario,
                idUsuario: id,
                createdBy: id,
                created_at: new Date()
        })
        const comentario =new Comment({
            idBlog: req.params.id,
            comentario: req.body.comentario,
            idUsuario: id,
            createdBy: id
        })
        await comentario.save()
        return res.status(200).json({
            message: "se obtuvieron todos los comentarios",
            data: comentario
        })
    }catch(error){
        return res.status(500).json({
            message: "error al crear el comentarios",
            error: error.message
        })
    }
}
const deletedComment = async (req,res) => {
    try{
        const {id} = jwt.verify(req.headers.token,process.env.SECRET)
        const object = {
            id: req.params.id,
            deletedBy: id
        }
        await Comment.deleteLogic(object)
        
        return res.status(200).json({
            message: "se elimino el comentario correctamente",
        })
    }catch(error){
        return res.status(500).json({
            message: "error al obtener los comentarios",
            error: error.message
        })
    }
}
const getById = async (req,res) =>{
    try{
        const comentario = await Comment.getById(req.params.id)
        return res.status(200).json({
            message: "se obtuvieron todos los comentarios",
            data: comentario
        })
    }catch(error){
        return res.status(500).json({
            message: "error al obtener los comentarios",
            error: error.message
        })    
    }
}
module.exports ={
    getAllCommentBlog,
    postComment,
    deletedComment,
    getById
}
const Blog = require("../models/blog.model");
const fs = require("fs-extra");
const { uploadImage } = require("../configs/cloudinary.config");
const jwt = require("jsonwebtoken");

const postBlog = async (req,res)=>{
    try {
        const token = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        console.log(token);
        let imagen = null
        if(req.files?.imagen){
            imagen = await uploadImage(req.files.imagen.tempFilePath)
            await fs.unlink(req.files.imagen.tempFilePath)
        } 

        const blog = new Blog({
            createdBy: token.id,
            titulo: req.body.titulo,
            imagen: imagen.secure_url,
            contenido: req.body.contenido,
            createdAt: new Date(),
        })
        await blog.save();

        return res.status(201).json({
            message: "se creo el blog correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al crear un blog",
            error: error.message
        })
    }
}
const getBlogs = async (req,res)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        console.log(page, limit, offset);
        const data = await Blog.getAll(limit, offset);

        let response = {
            menssage: "se obtuvieron los datos correctamente",
            data: data,
        }
        
        if (page && limit) {
            const totalBlogs = await Blog.count();
            response = {
                ...response,
                total: totalBlogs,
                totalPages: Math.ceil(totalBlogs / limit),
                currentPage: page
            };
        }
        return res.status(200).json(response)
    }catch(error){
        res.status(500).json({
            message:"error al obtener datos",
            error: error.message,
            total: totalBlogs,
            totalPages: Math.ceil(totalUsuarios / limit),
            currentPage: page
        })
    }
}
const deleteBlog = (req,res)=>{
    try{
        const token = jwt.verify(req.cookies.token,process.env.SECRET_KEY)
        console.log(token)
        const blog={
            id: req.params.id,
            deletedBy: token.id,
        }
        Blog.delete(blog)
        return res.status(200).json({
            message:"se elimino correctamente el blog",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar un blog",
            error:error.message
        })
    }
}
const putBlog = async(req,res)=>{
    try{

        const token = jwt.verify(req.cookies.token,process.env.SECRET_KEY)
        console.log(token)


        let imagen=null
        if(req.files?.imagen){
            imagen=await uploadImage(req.files.imagen.tempFilePath)
            await fs.unlink(req.files.imagen.tempFilePath)
        } 

        const blog = {
            id: req.params.id,
            updatedBy: token.id,
            titulo: req.body.titulo ,
            imagen: imagen.secure_url ,
            contenido: req.body.contenido ,
        }
        Blog.put(blog)
        return res.status(200).json({
            message:"se actualizo correctamente",
            data:blog
        })
    }catch(error){
        return res.status(500).json({
            message:"error al actualizar un blog",
            error:error.message
        })
    }
}
const getByIdBlog = async(req,res)=>{
    try{
    const id = req.params.id
    const usuario = await Blog.getById(id)
    if(!usuario){
        return res.status(404).json({
            message:"no se encontro el blog"
        })
    }
        return res.status(200).json({
            message:"se obtuvo correctamente",
            data:usuario
        })
    }catch(error){
        return res.status(500).json({
            message:"error al obtener un blog",
            error:error.message
        })
    }
}

module.exports = {
    postBlog,
    getBlogs,
    putBlog,
    deleteBlog,
    getByIdBlog,
}
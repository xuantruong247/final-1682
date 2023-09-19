const Blog = require("../models/blog")
const asyncHandler = require("express-async-handler")

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, } = req.body
    if (!title || !description) throw new Error("Missting text")

    const image = req.files.image[0].path
    // console.log(req.files.image[0].path);
    if (image) {
        req.body.image = image
    }
    console.log(image);

    const response = await Blog.create({ title, description, image })
    console.log(response);
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : "Cannot create new blog "
    })
})


const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error("Missting text")
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : "Cannot update blog "
    })
})

const getAllBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        getBlogs: response ? response : "Cannot update blog "
    })
})



const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error("Blog not found")
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id }, }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response
        })
    }
    const isLiked = blog?.likes.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id }, }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id }, }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response
        })
    }
})



const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error("Blog not found")
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id }, }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response
        })
    }
    const isDisliked = blog?.dislikes.find(el => el.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id }, }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id }, }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response
        })
    }
})



const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true }).populate("likes", "firstname lastname").populate("dislikes", "firstname lastname")
    return res.status(200).json({
        success: blog ? true : false,
        message: blog
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (!bid) throw new Error("Blog not found")
    const response = await Blog.findByIdAndDelete(bid)
    return res.status(200).json({
        success: response ? true : false,
        message: response ? "Deleted Blog Successfully" : "Cannot Deleted blog"
    })
})


const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (!req.file) throw new Error("Missting text")
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
    return res.status(200).json({
        status: response ? true : false,
        updatedBlog: response ? response : "Cannot upload images blog"

    })
})

module.exports = {
    createNewBlog,
    updateBlog,
    getAllBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog
}
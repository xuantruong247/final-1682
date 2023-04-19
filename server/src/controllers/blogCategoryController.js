const BlogCategory = require("../models/blogCategory")
const aysncHandler = require("express-async-handler")

const createCategory = aysncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdCategory: response ? response : "Cannot create new blog category"
    })
})


const getCategories = aysncHandler(async (req, res) => {
    const response = await BlogCategory.find().select('title _id')
    return res.status(200).json({
        success: response ? true : false,
        getblogsCategory: response ? response : "Cannot get all blog category"
    })
})


const updatedCategory = aysncHandler(async (req, res) => {
    const { bcid } = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updateBlogCategory: response ? response : "Cannot updated blog category"
    })
})


const deletedCategory = aysncHandler(async (req, res) => {
    const { bcid } = req.params

    const response = await BlogCategory.findByIdAndDelete(bcid)
    return res.status(200).json({
        success: response ? true : false,
        deletedBlogCategory: response ? response : "Cannot delete blog category"
    })
})



module.exports = {
    createCategory,
    getCategories,
    updatedCategory,
    deletedCategory
}
const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")


const createProduct = asyncHandler(async (req, res) => {
    const { title, description, brandId, price, quantity, categoryId } = req.body
    if (!title || !description || !brandId || !price, !quantity, !categoryId) throw new Error('Missing text')
    console.log(req.body);
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    } else {
        req.body.slug = slugify(title)
    }
    const brand = { id: brandId, title: req.body.brand }
    const category = { id: categoryId, title: req.body.category }
    const newProduct = await Product.create({ title, description, brand: { id: brandId }, category: { id: categoryId }, price, quantity, slug: req.body.slug })
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})

const getDetailProduct = asyncHandler(async (req, res) => {

    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot not get product'
    })
})

// Filtering, sorting & pagination
const getAllProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedEl => `$${macthedEl}`)
    const formatedQueries = JSON.parse(queryString)

    /// Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formatedQueries)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    //Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    // Execute query
    // Số lượng sp thoả mãn điều điện !== số lượng sp trả về 1 lần gọi API
    const response = await queryCommand.exec()
    const counts = await Product.find(formatedQueries).countDocuments()
    return res.status(200).json({
        success: response ? true : false,
        counts,
        products: response ? response : 'Cannot get product'
    })
})


const updateProduct = asyncHandler(async (req, res) => {

    const { pid } = req.params

    const { title, description, brandId, price, quantity } = req.body

    const product = await Product.findById(pid)

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }

    if (title) {
        product.slug = slugify(title)
        product.title = title
    }

    if (description) {
        product.description = description
    }

    if (brandId) {
        product.brand.id = brandId
    }

    if (categoryId) {
        product.category.id = categoryId
    }

    if (price) {
        product.price = price
    }

    if (quantity) {
        product.quantity = quantity
    }

    const updatedProduct = await product.save()

    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})


const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error('Missting text')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    console.log({ alreadyRating });
    if (alreadyRating) {
        // update start & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment }
        }, { new: true })
    } else {
        // add start & comment
        await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id } }
        }, { new: true })
    }

    // Sum ratings
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10

    await updatedProduct.save()

    return res.status(200).json({
        status: true,
        updatedProduct

    })
})


const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (!req.files) throw new Error("Missting text")
    const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
    return res.status(200).json({
        status: response ? true : false,
        updatedProduct: response ? response : "Cannot upload images product"

    })
})

module.exports = {
    createProduct,
    getDetailProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct
}
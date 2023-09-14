const Book = require('../models/book')
const Author = require('../models/author')
const PublishingCompany = require('../models/publishingcompany')
const Category = require("../models/category")
exports.addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body)
        await Author.findByIdAndUpdate(book.authorId, {
            $addToSet: {
                books: book._id
            }
        })
        await PublishingCompany.findByIdAndUpdate(book.publishingCompanyId, {
            $addToSet: {
                books: book._id
            }
        })
        await Category.findByIdAndUpdate(book.categoryId, {
            $addToSet: {
                books: book._id
            }
        })
        return res.status(200).json({
            message: 'Thêm sản phẩm sách thành công',
            data: book
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getAllBook = async (req, res) => {
    try {
        const { _limit = 10, _sort = "createAt", _pgae = 1, _order = "asc", q } = req.query
        const options = {
            page: _pgae,
            limit: _limit,
            sort: {
                [_sort]: _order === "desc" ? -1 : 1
            },
            populate: [{ path: "categoryId", select: "name" }, { path: "publishingCompanyId", select: "name" }, { path: "authorId", select: "name story image" }]
        }
        const searchQuery = q ? { name: { $regex: q, $options: "i" } } : {}
        const data = await Book.paginate(searchQuery, options)
        return res.status(200).json(data.docs)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
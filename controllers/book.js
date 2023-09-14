const Book = require('../models/book')
const Author = require('../models/author')
const PublishingCompany = require('../models/publishingcompany')
const Category=require("../models/category")
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
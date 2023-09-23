const Book = require('../models/book')
const Author = require('../models/author')
const PublishingCompany = require('../models/publishingcompany')
const Category = require("../models/category")
exports.addBook = async (req, res) => {
    try {
        const {priceOnCover,discount}=req.body
        
        const book = await Book.create({...req.body,price: Number(priceOnCover - Math.ceil(priceOnCover / 100 * discount))})
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
        const { _limit = 100, _sort = "createAt", _page = 1, _order = "asc",q, categories} = req.query
        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "desc" ? -1 : 1
            },
            populate: [{ path: "categoryId", select: "name" }, { path: "publishingCompanyId", select: "name" }, { path: "authorId", select: "name story image" }]
        }
        let searchQuery = q ? {
            name: { $regex: q, $options: "i" }
        } : {}

        if (categories) {
            searchQuery = {
                ...searchQuery, categoryId: {
                    $in: categories.split('.')
                }
            }
        } 
        const data = await Book.paginate(searchQuery, options)
        if (q) {
            data.docs.forEach(async (element) => {
                const bookItem = await Book.findById(element._id)
                bookItem.numberSearch++;
                await bookItem.save()
            });
        }
        console.log(data.totalDocs);
        return res.status(200).json(data.docs)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getOneBook = async (req, res) => {
    try {
        const data = await Book.findById(req.params.id).populate('authorId').populate('categoryId').populate('publishingCompanyId')
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.addViewBook = async (req, res) => {
    try {
        const data = await Book.findById(req.params.id).populate('authorId').populate('categoryId').populate('publishingCompanyId')
        data.view++
        await data.save()
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
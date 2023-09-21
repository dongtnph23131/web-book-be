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
        const dataCategories = await Category.find()
        const searchCategories = dataCategories.map(item => item._id)
        const { _limit = 10, _sort = "createAt", _pgae = 1, _order = "asc", q, categories } = req.query
        const options = {
            page: _pgae,
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
                    $in: categories
                }
            }
        } 
        console.log(searchQuery);

        

        // const searchQuery = q ? { name: { $regex: q, $options: "i"},categoryId:{
        //     $in:['65048a0aecc5d3e9b175c131','6503023d112f0874382d76fd']
        // } } : {}

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
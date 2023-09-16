const Book = require('../models/book')
const Category = require('../models/category')
exports.addCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(200).json({
            message: 'Tạo danh mục sách thành công',
            data: category
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getOneCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { _limit = 10, _page = 1, _sort = "createAt", _order = "asc" } = req.query
        const options = {
            limit: _limit,
            page: _page,
            sort: {
                [_sort]: _order === 'desc' ? -1 : 1
            },
            populate: [{ path: "categoryId" },{path:'authorId'}]
        }
        const data = await Book.paginate({ categoryId: categoryId }, options)
        return res.status(200).json(data.docs)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getAllCategory=async (req, res) => {
    try {
        const data=await Category.find().populate('books')
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
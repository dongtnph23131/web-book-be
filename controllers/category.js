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
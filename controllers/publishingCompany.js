const PublishingCompany=require('../models/publishingcompany')
exports.addPublishingCompany = async (req, res) => {
    try {
        const data = await PublishingCompany.create(req.body)
        return res.status(200).json({
            message: 'Thêm nhà xuất bản sách thành công',
            data: data
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getAllPublishingCompany=async (req, res) => {
    try {
        const data = await PublishingCompany.find().populate('books').populate('authors')
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
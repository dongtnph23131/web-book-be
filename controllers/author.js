const Author = require('../models/author')
const PublishingCompany=require('../models/publishingcompany')
exports.addAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        await PublishingCompany.findByIdAndUpdate(author.publishingCompanyId,{
            $addToSet:{
                authors:author._id
            }
        })
        return res.status(200).json({
            message: 'Thêm tác giả thành công',
            data: author
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
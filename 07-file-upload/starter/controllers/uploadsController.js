const path = require('path')
const {StatusCodes} = require('http-status-codes')

const uploadProductImage = async (req,res) => {
    let productImage = req.files.image //giant object of library 
    console.log(__dirname)
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`) //__dirname = current file, and imagePath where to store image
    console.log(imagePath)
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{src: `/uploads/${productImage.name}`}})
}

module.exports = {
    uploadProductImage
}


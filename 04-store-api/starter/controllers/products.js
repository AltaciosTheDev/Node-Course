const getAllProductsStatic = async (req,res) => {
    throw new Error('Testing express async error package')
    res.status(200).json({msg: `Products testing route`})
}

const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'products route'})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}
const getAllProductsStatic = async (req, res) => {
    res.status(200).json({msg: 'products testing route'})
}

const getAllProducsts = async (req, res) => {
    res.status(200).json({msg: 'products route'})
}

module.exports = {
    getAllProductsStatic,
    getAllProducsts
}
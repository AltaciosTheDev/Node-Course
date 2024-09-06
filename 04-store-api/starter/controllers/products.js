const getProducts = (req,res) => {
    res.status(200).json({msg: `Products retrieved successfully`})
}

module.exports = {
    getProducts
}
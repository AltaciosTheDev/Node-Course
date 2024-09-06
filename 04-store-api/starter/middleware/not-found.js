const notFound = (req, res) => {
    return res.status(404).json({msg:`Route does not exist`})
    console.log('without return this would still run, this is not ideal. ')
}

module.exports = notFound
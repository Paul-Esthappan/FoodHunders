const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? statusCode : 500
    res.json({ title:"not found", message: err.message, stackTrace: err.stack })
};

module.exports = errorHandler
const errorHandler = (func) => {
    return (
        (req, res, next) => {
            try {
                func(req, res, next)
            } catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                }
            }
        }
    )
}

module.exports = errorHandler;
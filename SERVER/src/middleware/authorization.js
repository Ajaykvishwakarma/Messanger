const authorization = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).send({ message: "Permision Denied!"});
    }
    next()
}

module.exports = authorization;
const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list (req,res,next) {
    const data = await moviesService.list();
    res.json({ data })
}

async function read (req,res,next) {
    const {movieId} = req.params
    const data = await moviesService.read(movieId)
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)],
}
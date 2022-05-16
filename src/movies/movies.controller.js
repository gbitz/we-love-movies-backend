const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req,res,next) {
    const {movieId} = req.params;
    const movie =  await moviesService.read(movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({status:404, message: `Movie cannot be found.`})
}

async function list (req,res,next) {
    const data = await moviesService.list();
    res.json({ data })
}

async function read (req,res,next) {
    const {movie} = res.locals;
    res.json({ data: movie })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [movieExists, asyncErrorBoundary(read)],
}
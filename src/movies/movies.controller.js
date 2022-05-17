const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req,res,next) {
    const {movieId} = req.params;
    const movie =  await moviesService.read(movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({status:404, message: `Movie cannot be found.`});
}

async function list (req,res,next) {
    const isShowing = req.query.is_showing;
    const data = isShowing ? await moviesService.listShowing() : await moviesService.list();
    res.json({ data });
}

async function read (req,res,next) {
    const {movie} = res.locals;
    res.json({ data: movie });
}

async function listReviews(req,res,next) {
    const {movie} = res.locals;
    const data = await moviesService.listReviews(movie.movie_id);
    res.json({data});
}

async function listTheaters(req,res,next) {
    const {movie} =  res.locals;
    const theaters = await moviesService.listTheaters(movie.movie_id);
    res.json({data: theaters});
}

module.exports = {
    list: [
        asyncErrorBoundary(list)
    ],
    read: [
        movieExists,
        asyncErrorBoundary(read)
    ],
    listReviews: [
        movieExists,
        asyncErrorBoundary(listReviews)
    ],
    listTheaters: [
        movieExists,
        asyncErrorBoundary(listTheaters)
    ]

}
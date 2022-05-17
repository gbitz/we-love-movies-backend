const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req,res,next) {
    const {reviewId} =  req.params;
    const review = await reviewService.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({status:404, message: `Review cannot be found.`})
}

async function destroy(req,res,next) {
    const {review} = res.locals;
    console.log(review)
    await reviewService.destroy(review.review_id)
    res.sendStatus(204)
}

module.exports = {
    delete: [
        reviewExists,
        asyncErrorBoundary(destroy)
    ],
}
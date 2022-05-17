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

async function deleteReview(req,res,next) {
    const {review} = res.locals;
    await reviewService.delete(review.review_id)
    res.sendStatus({status:204, message:"No Content"})
}

module.exports = {
    deleteReview : [
        reviewExists,
        asyncErrorBoundary(deleteReview)
    ]
}
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
    await reviewService.destroy(review.review_id);
    res.sendStatus(204);
}

async function update(req,res,next) {
    const {review} = res.locals;
    const updatedReview = {
        ...req.body.data,
        review_id: review.review_id
    };
    await reviewService.update(updatedReview);
    const data = await reviewService.getUpdatedReview(review.review_id);
    console.log(data)
    res.json({data});
}

module.exports = {
    delete: [
        reviewExists,
        asyncErrorBoundary(destroy)
    ],
    update: [
        reviewExists,
        asyncErrorBoundary(update)
    ]
}
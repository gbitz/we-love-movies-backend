const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({review_id : reviewId})
        .first()
}

function destroy(review_id) {
    return knex("reviews")
        .where({review_id : reviewId})
        .del()
}

module.exports = {
    read,
    delete: destroy,
    
}
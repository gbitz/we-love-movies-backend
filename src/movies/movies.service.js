const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .first()
}

function listReviews(movieId) {
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("reviews.*", "critics.*")
        .where({movie_id: movieId})
}

module.exports = {
    list,
    read,
    listReviews,
}
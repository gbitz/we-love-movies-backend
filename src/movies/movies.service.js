const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listShowing() {
    return knex("movies")
        .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
        .select("movies.*")
        .where({"movies_theaters.is_showing" : true})
        .groupBy("movies.movie_id")
        .orderBy("movies.movie_id")
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
        .then(reviews => reviews.map((review) => {
            return review = {
                ...review,
                critic: {
                    critic_id: "critics.critic_id",
                    preferred_name: "critics.preferred_name",
                    surname: "critics.surname",
                    organization_name: "critics.organization_name",
                    created_at: "critics.created_at",
                    updated_at: "critics.updated_at",
                }
            }
        }))

}

function listTheaters(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("*")
        .where({"mt.movie_id" : movieId})
}

module.exports = {
    list,
    read,
    listReviews,
    listShowing,
    listTheaters,
}
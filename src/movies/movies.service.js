const knex = require("../db/connection");
const mapProperties =  require("../utils/map-properties");


const addCritic = mapProperties({
    critic_id: "critics.critic_id",
    preferred_name: "critics.preferred_name",
    surname: "critics.surname",
    organization_name: "critics.organization_name",
    created_at: "critics.created_at",
    updated_at: "critics.updated_at",
})

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
        .first()
        .then(addCritic)
}

module.exports = {
    list,
    read,
    listReviews,
}
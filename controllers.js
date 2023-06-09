
const { fetchCategories, fetchReviews, fetchReview, fetchCommentsById, postCommentsById, patchVotes, deleteComment, fetchUsers } = require("./models")
const fs = require('fs')
const endpoints = require('./endpoints.json')


exports.getCategories = (request, response, next) => {
    fetchCategories().then((returnedCategories) => {                
        response.status(200).send({categories: returnedCategories})
    })
    .catch((error)=> {
        next(error)
    })
}

exports.getUsers = (request, response, next) => {
    fetchUsers().then((returnedUsers) => {
        response.status(200).send({users: returnedUsers})
    })
}


exports.getReview = (request, response, next) => {
    const reviewID = request.params.review_id
    fetchReview(reviewID).then((returnedReview) => {     
        response.status(200).send({review: returnedReview})
    })
    .catch((error) => {
        next(error)
    })
}


exports.getReviews = (request, response, next) => {
    fetchReviews().then((returnedReviews) => {
        response.status(200).send({reviews:returnedReviews})
    })
    .catch((error) => {
        next(error)
    })
}


exports.fetchEndPoints = (request, response, next) => {
    response.status(200).send(endpoints)
}

exports.getCommentsById = (request, response, next) => {
    const queryId = request.params.review_id;
    fetchCommentsById(queryId).then((returnedComments) => {
        response.status(200).send({comments:returnedComments})
    })
    .catch((error) => {
        next(error)
    })
}


exports.insertComment = (request, response, next) => {
    const sentPostRequest = request.body
    const review_id = request.params
    postCommentsById(sentPostRequest, review_id)
    .then((insertedComment) => {
        response.status(201).send({newComment: insertedComment })
    })
    .catch((error) => {
        next(error)
    })
}
    
exports.updateVotes = (request, response, next) => {

    const votes = request.body.inc_votes
    const review_id = request.params.review_id

    patchVotes(votes, review_id).then((updatedReview) => {
        response.status(201).send({updatedReview: updatedReview })
    })
    .catch((error) => {
        next(error)
    })
 }

 exports.getDeletedComment = (request, response, next) => {
    const comment_id = request.params.comment_id
    deleteComment(comment_id).then(() => {
        response.status(204).send()
    })
 }
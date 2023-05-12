const express = require('express');


const { getCategories, getReviews, getReview, fetchEndPoints, getReviewsById, insertComment } = require('./controllers');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors } = require('./errorFunc');
const app = express(); 


app.use(express.json());



app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews', getReviews )

app.get('/api', fetchEndPoints)

app.post('/api/reviews/:review_id/comments', insertComment)

app.get('/api/reviews/:review_id/comments', getReviewsById)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

module.exports = app; 
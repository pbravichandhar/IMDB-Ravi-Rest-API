const { body, check, sanitizeBody, query, param } = require('express-validator')
const { genres, movieSortColumns, pageLimit } = require('../_helpers/constants');

const createMovieValidation = () => {
    return [
        sanitizeBody(
            ['genre', 'name', 'releaseDate']
        ).trim(),
        check('genre')
            .isIn(genres).withMessage(`must be in following list ${genres}`),
        body('name').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
        body('releaseDate').isDate().withMessage(`must be valid date Format(YYYY:MM:DD)`),
    ]
}

const getMovieByIdValidation = () => {
    return [
        param('movieId').isMongoId().withMessage('is invalid object id')
    ]
}

const getAllMoviesValidation = () => {
    return [
        query('sortBy').optional().isIn(movieSortColumns).withMessage(`must be in following list => ${movieSortColumns}`),
        query('isAsc').optional().toBoolean(),
        query('limit').optional().toInt().isIn(pageLimit).withMessage(`must be in following list => ${pageLimit}`),
        query('page').optional().toInt(),
    ]
}

const setFavouriteValidation = () => {
    return [
        sanitizeBody(
            ['genre']
        ).trim(),
        check('genre').isIn(genres).withMessage(`must be in following list => ${genres}`),
    ]
}

const voteMovieValidation = () => {
    return [
        query('movieId').isMongoId().withMessage('is invalid object id'),
        body('isUpVote').isBoolean().withMessage('is invalid. It should be either true - upvote or false - downvote'),
    ]
}

const reviewMovieValidation = () => {
    return [
        query('movieId').isMongoId().withMessage('is invalid object id'),
        body('rating').isIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).withMessage('must be a number between 0 to 10'),
        body('comments').isString().withMessage('must be a string').optional(),
    ]
}

module.exports = {
    createMovieValidation,
    getMovieByIdValidation,
    setFavouriteValidation,
    voteMovieValidation,
    reviewMovieValidation,
    getAllMoviesValidation
}
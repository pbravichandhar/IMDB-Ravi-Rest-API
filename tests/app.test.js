'use strict';

const dbHandler = require('./db-handler');
const movieMocks = require('./mocks/movie.mock');
const supertest = require('supertest');
const app = require('../app');
const movieMock = require('./mocks/movie.mock');
const request = supertest(app);

jest.setTimeout(10000)

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
// afterEach(async () => {
//     await dbHandler.clearDatabase();
// });

/**
 * Remove and close the db and server.
 */
// afterAll(async () => {
//     await dbHandler.closeDatabase();
// });

let authorizationToken = '';
let userDetails = '';
let MoviesArray, firstMovie;

describe('Authentication - Register / Login ', () => {
    test("Post /users/register", async () => {
        await request.post("/users/register").send({ ...movieMock.registerUser })
            .expect(200)
            .then((response) => {
                const responseBody = response.body.data;

                // Check data
                expect(responseBody.username).toBe(movieMock.registerUser.username);
                expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
                expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
            });
    });

    test("Post /users/login", async () => {
        await request.post("/users/login").send({ username: movieMocks.registerUser.username, password: movieMocks.registerUser.password })
            .expect(200)
            .then((response) => {
                const responseBody = response.body.data.user;
                authorizationToken = response.body.data.user.token;
                userDetails = response.body.data.user;

                // Check data
                expect(responseBody.username).toBe(movieMock.registerUser.username);
                expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
                expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
            });
    });

})

test("Post /movie", async () => {
    await request.post("/movie").set('Authorization', 'Bearer ' + authorizationToken).send(movieMock.addMovie)
        .expect(200)
        .then((response) => {
            const responseBody = response.body.data;

            // Check data
            expect(responseBody.genre).toBe(movieMock.addMovie.genre);
            expect(responseBody.name).toBe(movieMock.addMovie.name);
        });
});

test("Put /movie/genre/favourite", async () => {
    await request.put("/movie/genre/favourite").set('Authorization', 'Bearer ' + authorizationToken).send(movieMock.favouriteGenre)
        .expect(200)
        .then((response) => {
            // Check type and length
            const responseBody = response.body.data;
            // expect(typeof {}).toBe('object');

            // Check data
            // expect(responseBody.favoriteGenre.includes(movieMock.favouriteGenre)).toBeTrue();
            expect(responseBody.username).toBe(movieMock.registerUser.username);
            expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
            expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
        });
});

// test("Get /movie/recommendations", async () => {
//     await request.get("/movie/recommendations").set('Authorization', `Bearer ${authorizationToken}`).send()
//         .expect(200)
//         .then((response) => {
//             // Check type and length
//             const responseBody = response.body.data;
//             // expect(typeof {}).toBe('object');

//             // Check data
//             expect(responseBody.length).le;
//         }).catch(err => {
//             console.log(err);
//         })
// });

// test("Get /routenotmatched", async () => {
//     await request.get("/routenotmatched").set('Authorization', 'Bearer ' + authorizationToken).send()
//         .expect(404)
//         .then((response) => {
//             // Check type and length
//             const responseBody = response.body.data;
//             // expect(typeof {}).toBe('object');

//             // Check data
//             // expect(responseBody.username).toBe(movieMock.registerUser.username);
//             // expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
//             // expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
//         });
// });


// test("Get /movies/all", async () => {
//     await request.get("/movie/all").set('Authorization', 'Bearer ' + authorizationToken).send()
//         .expect(200)
//         .then((response) => {
//             // Check type and length
//             const responseBody = response.body.data;
//             firstMovie = response.body.data[0]
//             MoviesArray = response.body.data
//             // expect(typeof {}).toBe('object');

//             // Check data
//             // expect(responseBody.username).toBe(movieMock.registerUser.username);
//             // expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
//             // expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
//         });
// });

// test("Put /movie/vote - Upvote", async () => {
//     await request.put("/movie/vote").query({ movieId: firstMovie._id }).set('Authorization', 'Bearer ' + authorizationToken).send(movieMock.upVote)
//         .expect(200)
//         .then((response) => {
//             // Check type and length
//             const responseBody = response.body.data;
//             // expect(typeof {}).toBe('object');

//             // Check data
//             // expect(responseBody.username).toBe(movieMock.registerUser.username);
//             // expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
//             // expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
//         });
// });

// test("Put /movie/vote - down vote", async () => {
//     await request.put("/movie/vote").query({ movieId: firstMovie._id }).set('Authorization', 'Bearer ' + authorizationToken).send(movieMock.downVote)
//         .expect(200)
//         .then((response) => {
//             // Check type and length
//             const responseBody = response.body.data;
//             // expect(typeof {}).toBe('object');

//             // Check data
//             // expect(responseBody.username).toBe(movieMock.registerUser.username);
//             // expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
//             // expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
//         });
// });

// test("Put /movie/review", async () => {
//     await request.put("/movie/review").query({ movieId: firstMovie._id }).set('Authorization', 'Bearer ' + authorizationToken).send(movieMock.review)
//         .expect(200)
//         .then((response) => {
//             // Check type and length
//             const responseBody = response.body.data;
//             // expect(typeof {}).toBe('object');

//             // Check data
//             // expect(responseBody.username).toBe(movieMock.registerUser.username);
//             // expect(responseBody.firstName).toBe(movieMock.registerUser.firstName);
//             // expect(responseBody.lastname).toBe(movieMock.registerUser.lastname);
//         });
// });
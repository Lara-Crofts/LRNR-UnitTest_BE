// dl npm package: npm install --save-dev jest
// npm library for doing http testing --> supertest
// dl npm package: npm install --save-dev supertest
// resource : https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf
// test: npm test backend.test.js

// --> test --> expect --> end


// test 1: test the get request to the ChatGPT API to generate a quiz ********
// test endpoint: /api/generatequiz
//test if server is running correctly 

const request = require('supertest');
const app = require('./app.js'); // server file variable

// added 10 seconds for timeout, without it the test would keep failing
// it tests do not work, please run each test individually ***

test('GET /api/generatequiz', async () => {
    const response = await request(app)
        .get('/api/generatequiz')
        .expect(200);

}, 15000);




// test 2: ********
// expects the response body to be an object with an error message.

describe('Generate Quiz API', () => {
    test('JSON Response', async () => {
        const response = await request(app)
            .get('/api/generatequiz')
            .query({
                topic: 'javascript',
                expertise: 'novice',
                questionNum: 10,
                questionStyle: 'captain jack sparrow'
            });

        // if the response status is 200 OK, gives response 
        expect(response.status).toBe(200);
        const responseBody = JSON.parse(response.text);

        // If the response contains an error message
        if (responseBody.error) {
            expect(responseBody).toEqual({
                error: 'invalid response from GPT.... Please try again.',
            });
        }
    }, 20000);
});





// test 3: ********


// testing  Score Question API endpoint

describe('Score Question API', () => {
    test('Correct Answer', async () => {
        const response = await request(app)
            .get('/api/scorequestion?question=What is 2 + 2?&answer=4&questionStyle=some_style&expertise=expert');

        expect(response.status).toBe(200);
    });
});




// test 4: ********
import { ApiHelper } from '../../src/api/ApiHelper';
import {test, expect} from '../../src/api/fixtures/apiFixtures';

const Token= process.env.API_TOKEN ;

let AUTH_HEADER = {
    Authorization:`Bearer ${Token}`

};
let userID: number;
test.describe.serial('running e2e go rest crud apis tests',()=>{
    test('GET API - get all users',async({apiHelper})=>{
        let response= await apiHelper.get('/public/v2/users/', AUTH_HEADER);
        expect (response.status).toBe(200);
        expect (response.body.length)
        expect(Token, 'API_TOKEN is missing').toBeTruthy();

    })

     test('Post API - create a user',async({apiHelper})=>{
       //user JS object:
       let userData = {
        name: 'manish',
        email: `pwautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
       };
       let response =await apiHelper.post('/public/v2/users/', userData, AUTH_HEADER);
    expect ((response).status).toBe(201);
      userID= response.body.id;
      console.log('created userID is', userID);

    });

      test('put API - update a user',async({apiHelper})=>{
       //user JS object:
       let userData = {
        name: 'manishbani',
        status: 'inactive'
       };
       let response =await apiHelper.put(`/public/v2/users/${userID}`, userData, AUTH_HEADER);
    expect ((response).status).toBe(200);
     expect (response.body.name).toBe(userData.name);

    });

 test('Delete API - delete a user',async({apiHelper})=>{
      
       let response =await apiHelper.delete(`/public/v2/users/${userID}`,AUTH_HEADER);
    expect((response).status).toBe(204);
   

    });
})


// import { test, expect } from '../../src/api/fixtures/apiFixtures';

// const Token = process.env.API_TOKEN;

// const AUTH_HEADER = {
//     Authorization: `Bearer ${Token}`
// };

// let userID: number;

// test.describe.serial('running e2e go rest crud apis tests', () => {

//     test.beforeAll(async () => {
//         expect(Token, 'API_TOKEN is missing').toBeTruthy();
//     });

//     // GET API
//     test('GET API - get all users', async ({ apiHelper }) => {

//         const response = await apiHelper.get(
//             '/public/v2/users/',
//             AUTH_HEADER
//         );

//         expect(response.status).toBe(200);
//         expect(response.body.length).toBeGreaterThan(0);

//     });

//     // POST API
//     test('POST API - create a user', async ({ apiHelper }) => {

//         const userData = {
//             name: 'manish',
//             email: `pwautomation_${Date.now()}@open.com`,
//             gender: 'male',
//             status: 'active'
//         };

//         const response = await apiHelper.post(
//             '/public/v2/users/',
//             userData,
//             AUTH_HEADER
//         );

//         expect(response.status).toBe(201);

//         userID = response.body.id;

//         expect(userID).toBeTruthy();

//         console.log('Created userID:', userID);

//     });

//     // PUT API
//     test('PUT API - update a user', async ({ apiHelper }) => {

//         const userData = {
//             name: 'manishbani',
//             status: 'inactive'
//         };

//         const response = await apiHelper.put(
//             `/public/v2/users/${userID}`,
//             userData,
//             AUTH_HEADER
//         );

//         expect(response.status).toBe(200);
//         expect(response.body.name).toBe(userData.name);
//         expect(response.body.status).toBe(userData.status);

//     });

//     // DELETE API
//     test('DELETE API - delete a user', async ({ apiHelper }) => {

//         const response = await apiHelper.delete(
//             `/public/v2/users/${userID}`,
//             AUTH_HEADER
//         );

//         console.log('Delete status:', response.status);

//         expect(response.status).toBe(204);

//     });

// });

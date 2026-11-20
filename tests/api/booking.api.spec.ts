import {test, expect} from '../../src/api/fixtures/apiFixtures';
let TokenID: string;

test.beforeEach('generate the token', async ({request})=>{
let creds = {
    username: 'admin',
    password: 'password123'
};

let authResponse = await request.post('https://restful-booker.herokuapp.com/auth',{
    headers:{
        'content-Type':'apllication/json'},
        data: creds
    });
expect(authResponse.status()).toBe(200);
let jsonResponse=await authResponse.json();
console.log('auth Api Response',jsonResponse);
TokenID = jsonResponse.token;
console.log('token------>', TokenID);

})
//1.creat a new booking
    test('booking CRUD with token',async({request})=>{

        let bookinResponse = await request.post('https://restful-booker.herokuapp.com/booking',{
        headers: {'Content-Type': 'application/json' },
        data:
        {
    "firstname": "Sally",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2013-02-23",
        "checkout": "2014-10-23",
    },
    "additionalneeds": "Breakfast"
      } 
     })
expect(bookinResponse.status()).toBe(200);
let bookingJson= await bookinResponse.json();
let bookingId = bookingJson.bookingid
console.log('booking id is:', bookingId);


let updatedResponse= await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
   headers: {
    Cookie: `token=${TokenID}`
},
    data: {
    "firstname": "Sally",
    "lastname": "Brown",
    "totalprice": 121,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2013-02-23",
        "checkout": "2014-10-23",
    },
    "additionalneeds": "lunch"
      }} );


expect(updatedResponse.status()).toBe(200);
expect((await updatedResponse.json()).totalprice).toBe(121);
expect((await updatedResponse.json()).additionalneeds).toBe('lunch');

//3. delete
 let deleteResponse= await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {Cookie: `token=${TokenID}`},
    } );
    expect(deleteResponse.status()).toBe(201);


});
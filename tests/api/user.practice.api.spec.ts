
import {test, expect, request} from '@playwright/test';

let AUTH_Token={
    Authorization: 'Bearer gorest_ADtrw9Qk9mlNT1uB3OnsrVouMi3bQAF2o4WPSrWXZ7i49gjXL'
};

test('get all users api test', async({request})=>{

    let response = await request.get('https://gorest.co.in/public/v2/users/',{
        headers: AUTH_Token
    });
console.log(response);
let jsonBody= await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(await response.text());

expect(response.status()).toBe(200);

});

test('create a user POST api test', async({request})=>{
    let userData={
        name:'manish',
        email:'manish@gmail.com',
        gender: 'male',
        status: 'Active'
    }

    let response = await request.post('https://gorest.co.in/public/v2/users/8706424',{
        headers: AUTH_Token,
        data: userData
    });

let jsonBody=await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(response.text);

expect(response.status()).toBe(201);

});

test('Update a user Put api test', async({request})=>{
    let userData={
        name:'manishbani',
        email:'manish@gmail.com',
        gender: 'male',
        status: 'inActive'
    }

    let response = await request.put('https://gorest.co.in/public/v2/users/8706424',{
        headers: AUTH_Token,
        data: userData
    });

let jsonBody=await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(response.text);

expect(response.status()).toBe(200);

});

test('Delete a user Delete api test', async({request})=>{
    let userData={
        name:'manishbani',
        email:'manish@gmail.com',
        gender: 'male',
        status: 'inActive'
    }

    let response = await request.delete('https://gorest.co.in/public/v2/users/8706424',{
        headers: AUTH_Token,
       
    });

// let jsonBody=await response.json();
// console.log(jsonBody);  no need to add these lines because json body will be blank
console.log(response.status());//204
console.log(response.text); //no content

expect(response.status()).toBe(204);

});
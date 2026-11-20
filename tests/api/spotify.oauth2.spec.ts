import {test, expect} from '@playwright/test';

let OAUTH_CONFIG={
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE


    
}
let accessToken: string;

test.beforeEach('Post - generate the acess token', async ({request})=>{
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form:{
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret

    

        }
    });
    expect(response.status()).toBe(200);

    let jsonResponse= await response.json();
    console.log('token api response:', jsonResponse);
    accessToken= jsonResponse.access_token; // bad practice to expose as it is token 
    console.log(accessToken);
})

test('get album data test', async({request})=>{
    let baseUrl= 'https://api.spotify.com';
let endPointURL='/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';

let albumResponse = await request.get(`${baseUrl}${endPointURL}`,{
    headers:{
    Authorization: `Bearer ${accessToken}`,
}
})

//  expect(albumResponse.status()).toBe(200);
// console.log(await albumResponse.json());
console.log('Status:', albumResponse.status());

let responseBody = await albumResponse.text();

console.log('Response body:', responseBody);
})


 



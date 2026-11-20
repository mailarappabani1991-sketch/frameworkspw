import {test, expect} from '../../src/api/fixtures/apiFixtures';

const Token= process.env.API_TOKEN!;


let AUTH_HEADER = {
    Authorization:`Bearer ${Token}`

};

//helper - generic function -- create a user (POST CALL):
async function createUser(apiHelper: any){
    //user JS Object:
    let userData={
        name:'apiautomation',
        email:`apiautomation_${Date.now()}@open.com`,
        gender: 'male',
        status:'active'
    };

    let response = await apiHelper.post('/public/v2/users/', userData,AUTH_HEADER);
expect (response.status).toBe(201);
return response.body;
}

//Test 1: create a user test + verify AAA
//Post--->userID--->GET/userID ---> verify

///TC 1
test('create a user test', async({apiHelper})=>{
    //create user
    let userResponse= await createUser(apiHelper);

    //get a user
    let getResponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');
});

//TC 2
test('Update a user test', async({apiHelper})=>{
    //1.create user
    let userResponse= await createUser(apiHelper);

    //2. get a user
    let getResponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    //3. Update a user
    let userUpdatedData={
        name:'apiautomation-update',
        status: 'inactive'
    }
    let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData,  AUTH_HEADER);
     expect(updateResponse.status).toBe(200);
    expect.soft(updateResponse.body.name).toBe(userUpdatedData.name);
      expect.soft(updateResponse.body.status).toBe(userUpdatedData.status);

     // 4. verify user
      getResponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(getResponse.body.status).toBe(userUpdatedData.status);

    //  expect(getResponse.body.id).toBe(userResponse.id);
    //  console.log("User ID:", userResponse.id);
     


});

test('delete a user test', async({apiHelper})=>{
    //1.create user
    let userResponse= await createUser(apiHelper);

    //2. get a user
    let getResponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    //3. delete a user
    let updateResponse= await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(updateResponse.status).toBe(204);

     // 4. verify user
      getResponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
      expect(getResponse.body.message).toBe('Resource not found');
   
    //  expect(getResponse.body.id).toBe(userResponse.id);
    //  console.log("User ID:", userResponse.id);
     


});

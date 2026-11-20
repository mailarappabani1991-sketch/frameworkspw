
import {test, expect} from '../../src/api/fixtures/apiFixtures';
import Ajv from 'ajv';

const Token= process.env.API_TOKEN ;

let AUTH_HEADER = {
    Authorization:`Bearer ${Token}`

};

//set up AJV:
let ajv=new Ajv();

//defince JSON schema


let userSchema = {
    type: "object",
    properties: {
        id: {
            type: "number"
        },
        name: {
            type: "string"
        },
        email: {
            type: "string"
        },
        gender: {
            type: "string"
        },
        status: {
            type: "string"
        }
    },
    required: [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ],
    additionalProperties: false
};

let userArraySchema={
    "type": "array",
    "items": userSchema

}



test('get a user - schema test', async({apiHelper})=>{
  
    //get 
    let getUserResponse = await apiHelper.get(`/public/v2/users`,AUTH_HEADER);
     expect((getUserResponse).status).toBe(200);


     //verify the schema validation
     let validate = ajv.compile(userArraySchema);
     let isSchemaValid= validate(getUserResponse.body);
     if(!isSchemaValid){
        console.log("SCHEMA ERRORS", validate.errors);
     }
     expect(isSchemaValid).toBeTruthy();

});
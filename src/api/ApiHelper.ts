import {APIRequestContext} from '@playwright/test';

export class ApiHelper {
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string){
        this.request= request;
        this.baseURL=baseURL;
    }

    //helper method

    //get

    async get(endpoint:string,headers?:Record<string, string>){
        let response= await this.request.get(`${this.baseURL}${endpoint}`,{
        headers: headers,
    });
        console.log(await response.json(), response.status());
    return {
        status: response.status(),
          body: await response.json(),
    };

    }

    ///post

   
async post(endpoint: string,data: object,headers?: Record<string, string>) {
    let response = await this.request.post(
        `${this.baseURL}${endpoint}`,
        {
            headers: headers,
            data: data
        }
    );

    console.log("POST Status:", response.status());

    let responseBody = await response.json();

    console.log("POST Response Body:", responseBody);

    return {
        status: response.status(),
        body: responseBody
    };
}
    async put(endpoint:string,data:object,headers?:Record<string, string>){
        let response= await this.request.put(`${this.baseURL}${endpoint}`,{
        headers: headers,
         data: data
        });
    return {
        status: response.status(),
        body: await response.json()
    };
    

    }
    async delete(endpoint:string,headers?:Record<string, string>){
        let response= await this.request.delete(`${this.baseURL}${endpoint}`,{
        headers: headers
        });
        console.log(response.status());
    return {
        status: response.status(),
    }
        
    }}
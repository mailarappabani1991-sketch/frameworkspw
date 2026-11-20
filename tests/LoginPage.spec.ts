

import {LoginPage} from '../src/pages/LoginPage'
import { Homepage } from '../src/pages/HomePage';
import { test, expect } from '../src/api/fixtures/pagefixtures';


let loginPage: LoginPage;
let homePage:Homepage;
test.beforeEach(async({page})=>{
loginPage = new LoginPage(page);
await loginPage.goToLoginPage();
homePage=new Homepage(page);


    

});


test('login page title test',async()=>{
    

let pageTitle=await loginPage.geToLoginPageTitle();
console.log('login page title:', pageTitle);
expect(pageTitle).toBe('Account Login');

await loginPage.isForgottenPwdLinkExist();

await loginPage.isLoginErrorDisplayed();

});

test('forgot pwd link exist test',async()=>{

expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();



});

test('user is able to logintest',async()=>{
await loginPage.doLogin(process.env.APP_USERNAME,process.env.PASSWORD)
expect.soft (await homePage.isLogoutLinkExist()).toBeTruthy();
expect.soft (await homePage.getaHomePagetitle()).toBe('My Account');
console.log('APP_USERNAME:', process.env.APP_USERNAME);

await loginPage.doLogin(
    process.env.APP_USERNAME!,
    process.env.PASSWORD!
);

});


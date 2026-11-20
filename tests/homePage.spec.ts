
import { test, expect } from '../src/api/fixtures/pagefixtures';

import {LoginPage} from '../src/pages/LoginPage'

import { Homepage } from '../src/pages/HomePage'


let loginPage:LoginPage;
let homepage: Homepage;

test.beforeEach(async({page})=>{
    loginPage=new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME,process.env.PASSWORD);
    homepage=new Homepage(page);

})

test('homepage title test', async() => {
    let pageTitle= await homepage.getaHomePagetitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('My Account');
    
});

test('logout link exist test', async() => {
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
    
});

test('homepage exist test', async() => {
    let allHeader=await homepage.getHompageHeaders();
    console.log('Header are:',allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
    
});
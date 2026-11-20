

import { meta } from 'reporting-labs/cypress/support';
import { test, expect } from '../src/api/fixtures/pagefixtures';


test.beforeEach(async({loginPage})=>{
    
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME,process.env.PASSWORD);
  

})

test('homepage title test', async({homePage}) => {
    let pageTitle= await homePage.getaHomePagetitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('My Account');
    
});

test('logout link exist test', async({homePage}) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
    
});

test('homepage exist test', async({homePage}) => {
    
    
    let allHeader=await homePage.getHompageHeaders();
    console.log('Header are:',allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
    
});



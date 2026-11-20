
import { meta, } from 'reporting-labs/cypress/support';
import { test, expect } from '../src/api/fixtures/pagefixtures';
import { CsvHelper } from '../utils/CsvHelper';
import * as allure from "allure-js-commons";
import { epic } from 'allure-js-commons';

test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
});

test('login page title test',async({loginPage})=>{
    meta({priority:'p2',severity: 'minor', owner:'mailarappa', story:'us01', epic:'ep300', feature:'f30', issue:'bug34'})
let pageTitle=await loginPage.geToLoginPageTitle();
console.log('login page title:', pageTitle);
await log('login page title:', pageTitle);
expect(pageTitle).toBe('Account Login');

await loginPage.isForgottenPwdLinkExist();

await loginPage.isLoginErrorDisplayed();

});

test('forgot pwd link exist test',async({loginPage})=>{

expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();



});

test('user is able to logintest',async({homePage, loginPage})=>{
await loginPage.doLogin(process.env.APP_USERNAME!, process.env.PASSWORD!);
console.log('APP_USERNAME:', process.env.APP_USERNAME);
console.log('PASSWORD:', process.env.PASSWORD ? 'Loaded' : 'Missing');
console.log('USERNAME:', process.env.USERNAME);
expect.soft (await homePage.isLogoutLinkExist()).toBeTruthy();
expect.soft (await homePage.getaHomePagetitle()).toBe('My Account');

});
//DD_1: read csv data directly from the CSV file and loop the test method row wise
let testdata=CsvHelper.readCsv('src/pages/testdata/logindata.csv');
for (let row of testdata){
test(`login to app with invalid credentials -${row.username} -${row.password}` ,async({loginPage,homePage,page})=>{
 meta({priority:'p2',severity: 'minor', owner:'poorvi', story:'us02', epic:'ep310', feature:'f34', issue:'bug36'});
 testData(row, 'invalid login data')
    await loginPage.doLogin(row.username, row.password);
expect(await loginPage.isInvalidLoginError()).toBeTruthy();
await page.pause();

});
};


function testData(row: { username: string; password: string }, label: string) {
    allure.attachment(label, JSON.stringify(row, null, 2), 'application/json');
}

function log(arg0: string, pageTitle: string) {
    throw new Error('Function not implemented.');
}


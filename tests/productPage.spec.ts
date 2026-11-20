


import { test, expect } from '../src/api/fixtures/pagefixtures';


// Hooks
test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.APP_USERNAME,process.env.PASSWORD);

});


test ('verify prodcut header', async({page, homePage,searchResultsPage, productinfo})=>{

await homePage.doSearch('macbook');
await searchResultsPage.SelectProduct('MacBook Air');
await expect(await productinfo.getProductHeader()).toBe('MacBook Pro');
await page.pause();

});


test ('verify prodcut Images count', async({page, homePage,searchResultsPage, productinfo})=>{

await homePage.doSearch('samsung');
await searchResultsPage.SelectProduct('Samsung Galaxy Tab 10.1');
 expect(await productinfo.getProductIMagesCount()).toBe(7);
await page.pause();

});

test ('verify prodcut information/Data', async({page, homePage,searchResultsPage, productinfo})=>{

await homePage.doSearch('macbook');
await searchResultsPage.SelectProduct('MacBook Pro');
let actualProductinfoMap= await productinfo.getProductInfo();
console.log('actual prodcut Details',actualProductinfoMap);

expect.soft(actualProductinfoMap.get('productheader')).toBe('MacBook Pro');
expect.soft(actualProductinfoMap.get('productImagescount')).toBe(4);
expect.soft(actualProductinfoMap.get('Brand')).toBe('Apple');
expect.soft(actualProductinfoMap.get('Product Code')).toBe('Product 18');
expect.soft(actualProductinfoMap.get('Reward Points')).toBe('800');
expect.soft(actualProductinfoMap.get('Availability')).toBe('Out Of Stock');

expect.soft(actualProductinfoMap.get('productPrice is')).toBe('$2,000.00');
expect.soft(actualProductinfoMap.get('exTaxPrice')).toBe('$2,000.00');


await page.pause();

});







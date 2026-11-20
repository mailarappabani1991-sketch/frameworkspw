
import { test, expect } from '../src/api/fixtures/pagefixtures';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { CsvHelper } from '../utils/CsvHelper';

// Hooks
test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.APP_USERNAME,process.env.PASSWORD);

});


//Data Provider
let prodcutData=CsvHelper.readCsv('src/pages/testdata/productdata.csv');
for (let row of prodcutData){

test(`verify search results count - ${row.searchkey} - ${row.productname}`,async({homePage, searchResultsPage})=>{
await homePage.doSearch(row.searchkey);
let actualResultCount= await searchResultsPage.getProductsSearchCount();
console.log('Search count', actualResultCount);
expect(actualResultCount).toBe(Number(row.resultcount));
});

};

for (let row of prodcutData){

test(`verify user is able to land on the prodcut page  -${row.searchkey} - ${row.productname}`,async({page, homePage, searchResultsPage})=>{
await homePage.doSearch(row.searchkey);
await searchResultsPage.SelectProduct(row.productname);
expect(await page.title()).toBe(row.productname);


});

}



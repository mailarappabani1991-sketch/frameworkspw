import {test, expect} from '@playwright/test';

test('intercept and log requests', async({page})=>{
await page.route('**/*', async(route)=>{
    console.log(route.request().method(), route.request().url());
    await route.continue();  // url1---capture, url2 --- capture....


});

await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});


//intercepting with mocking:
//Mocking: fake data/response:
//https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
test('mock search data api', async({page})=>{
    let fakeProducts=[
        {name: 'Fake MackBook Pro', price:'$599'},
        {name: 'Fake IPhone 18', price:'$5999'}
    ];

    await page.route('**/index.php?route=product/search&search=macbook', async(route)=>{
await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(fakeProducts)
})
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook')
await page.pause();
});


test('mock search data ', async({page})=>{
    let fakeProducts=[
        {name: 'Fake MackBook Pro', price:'$599'},
        {name: 'Fake IPhone 18', price:'$5999'}
    ];

    await page.route('**/index.php?route=product/search&search=macbook', async(route)=>{
await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(fakeProducts)
})
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook')
await page.pause();
});
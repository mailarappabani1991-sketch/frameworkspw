import{test as baseTest} from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { LoginPage } from '../../pages/LoginPage';
import { Homepage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { Productinfo} from '../../pages/Productinfo';




type pageFixtures ={
    basePage:BasePage,
    loginPage: LoginPage,
    homePage: Homepage,
    searchResultsPage: SearchResultsPage,
    productinfo: Productinfo;
};

//extend the playwright test: using baseTest.extend: Inhertiance(but not with class)

export let test = baseTest.extend<pageFixtures>({
    basePage: async ({page},use) => {
        let basePage=new BasePage(page);
        await use(basePage);
        
    },
 loginPage: async ({page},use) => {
        let loginPage=new LoginPage(page);
        await use(loginPage);
        
    },
     homePage: async ({page},use) => {
        let homePage=new Homepage(page);
        await use(homePage);
        
    },

    searchResultsPage: async ({page},use) => {
        let searchResultsPage=new SearchResultsPage(page);
        await use(searchResultsPage);
        
    },

    
    productinfo: async ({page},use) => {
        let productinfo=new Productinfo(page);
        await use(productinfo);
        
    }

})

export {expect} from '@playwright/test';
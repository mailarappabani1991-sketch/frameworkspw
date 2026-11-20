import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class Homepage extends BasePage{
   
 //Private Locators
    private readonly logoutLink:Locator;
    private readonly headers: Locator;
    private readonly searchBox: Locator;
    private readonly searchicon: Locator;


    //consrtructors
    constructor(page:Page){
        super(page);
        this.logoutLink=page.getByRole('link', { name: 'Logout' });
        this.headers= page.getByRole('heading',{level: 2})
        this.searchBox=page.getByRole('textbox', { name: 'Search' });
        this.searchicon=page.locator('#search button');

    }

//page actions
    async getaHomePagetitle():Promise<string>{
    return await this.page.title();
    
}
async isLogoutLinkExist():Promise<boolean>{
    return await  this.logoutLink.isVisible();
    
}

async getHompageHeaders():  Promise<string[]>{
    return await  this.headers.allInnerTexts();
    
}

async doSearch(searchkey: string){
    console.log('search key: ,searchkey');
    await this.searchBox.fill(searchkey);
    await this.searchicon.click();

    
}


}
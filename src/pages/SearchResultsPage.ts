import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SearchResultsPage extends BasePage{
   
 //Private Locators
    private readonly ResultsPage:Locator;
    static searchResultsPage: any;


    //consrtructors
    constructor(page:Page){
        super(page);
        this.ResultsPage=page.locator('div.product-layout');

    }

//page actions
    async getProductsSearchCount():Promise<number>{
        return await this.ResultsPage.count();
    }

     async SelectProduct(productName: string):Promise<void>{
        console.log('product name:',productName);
       //this is the dynamic locator it means this loactor will change based on the parmater we pass
        await this.page.getByRole('link', { name: productName, exact: true }).first().click()};
       
    


}

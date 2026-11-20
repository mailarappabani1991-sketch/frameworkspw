import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class Productinfo extends BasePage{
   
 //Private Locators
    private readonly header: Locator;
    private readonly productImages: Locator;
     private readonly productMetaData: Locator;
      private readonly productPricing: Locator;
      private productInfomap: Map<string, string| number>;



    //consrtructors
    constructor(page:Page){
        super(page);
         this.header=page.getByRole('heading', {level: 1 })
        this.productImages=page.locator('div #content li img');
        this.productMetaData=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfomap=new Map<string, string| number>
    }

//page actions
    async getProductHeader():Promise<string>{
        return await this.header.innerText()
    }
     async getProductInfo(): Promise<Map<string,string|number>>{
        this.productInfomap.set('productheader',await this.getProductHeader());
        this.productInfomap.set('productImagescount', await this.getProductIMagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfomap;
    }

     async getProductIMagesCount():Promise<number>{
        await this.productImages.first().waitFor({state: 'visible'});
       return await this.productImages.count();

}
 async getProductPricing():Promise<string>{
        return await this.productPricing.innerText()
    }
    // Brand: Apple
// Product Code: Product 18
// Reward Points: 800
// Availability: Out Of Stock

private async getProductMetaData(): Promise<void>{
        let metaData=await this.productMetaData.allInnerTexts();
        for (let data of metaData){
            let meta =data.split(':')
            let metakey=meta[0].trim();
            let metaValue=meta[1].trim();
            this.productInfomap.set(metakey, metaValue);}
    }

//     $2,000.00
// Ex Tax: $2,000.00
private async getProductPriceData(): Promise<void>{
        let priceData=await this.productPricing.allInnerTexts();
       let productPrice = priceData[0].trim();
       let exTaxPrice= priceData[1].split(':')[1].trim();
       this.productInfomap.set('productPrice is',productPrice);
       this.productInfomap.set('exTaxPrice',exTaxPrice);
    }

   

}
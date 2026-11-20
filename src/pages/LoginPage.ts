import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{
    //1.private Locators:
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly ForgottenPassword: Locator;
    private readonly LoginErrorMessage: Locator;

    //2. constructor of the page class: init locators
    constructor(page:Page){
        super(page);
        this. emailId=page.getByRole('textbox', { name: 'E-Mail Address' });
        this. password=page.getByLabel('Password');
        this. loginBtn=page.getByRole('button', { name: 'Login' });
        this. ForgottenPassword=page.getByRole('link', { name: 'Forgotten Password' }).first();
       this.LoginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
    }

    //3.public page actions(methods)/ behavior: encapsulation
    async goToLoginPage(): Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

      async geToLoginPageTitle(): Promise<string>{
        return await this.page.title();
    }
     async isInvalidLoginError(): Promise<boolean>{
        return await this.LoginErrorMessage.isVisible();
    }

async isForgottenPwdLinkExist(): Promise<boolean>{
    return await this.ForgottenPassword.isVisible();
}
async doLogin(username: string, password: string): Promise<void>{
    console.log(`user creds: ${username} - ${password}`);
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();

    
}


async isLoginErrorDisplayed(): Promise<boolean>{
    return this.LoginError.isVisible();
}

}
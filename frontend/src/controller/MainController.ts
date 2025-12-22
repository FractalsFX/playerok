import { Requests } from "../models/RequestsModel.js";
import { MainPage } from "../view/pages/MainView.js";
import { AuthPage } from "../view/pages/AuthView.js";

class AppController{
    private authPage: AuthPage;

    constructor() {
        this.authPage = new AuthPage();
        // this.mainPage = new MainPage();
    }

    async init() {
        this.authPage.render();

        ///////Логика проверки на авторизацию + логика появления треков
    }
}

const app = new AppController();
app.init();
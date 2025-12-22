import { AuthPage } from './view/pages/AuthPage.js';
// import { MainPage } from './view/pages/MainPage.js';

function bootstrap() {
    const appRoot = document.getElementById("app");
    if(!appRoot) {
        throw new Error('app not found in html');
    }

    const authPage = new AuthPage('app');
}

bootstrap();
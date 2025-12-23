import { AuthPage } from './view/pages/AuthPage.js';
import { MainPage } from './view/pages/MainPage.js';

function bootstrap() {
    const appRoot = document.getElementById('app');
    if (!appRoot) throw new Error('#app not found');
  
    const token = localStorage.getItem('token');
    
    if (token) {
      // Токен есть →  главная
      new MainPage('app');
    } else {
      // Нет токена → авторизация
      new AuthPage('app', () => {
        new MainPage('app');
      });
    }
  }
  
  bootstrap();
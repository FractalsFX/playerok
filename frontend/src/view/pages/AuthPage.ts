import { FormAuth } from "../../view/comps/FormAuth.js";
import { Requests } from '../../models/RequestsModel.js';
import { RouterInstance } from "../../main.js";

export class AuthPage {
  private formAuth: FormAuth;
  private requests: Requests;
  private containerId: string;
  private onSuccessCallback?: (() => void) | undefined; // колбэк для перехода на главную

  constructor(containerId: string, onSuccess?: () => void) {
    this.containerId = containerId;
    this.requests = new Requests();
    this.onSuccessCallback = onSuccess;
    this.formAuth = new FormAuth(containerId, this.handleAuthSubmit.bind(this));
  }

  private async handleAuthSubmit(username: string, password: string, isLogin: boolean) {
    this.formAuth.setLoading(true);

    try {
      const result = isLogin 
        ? await this.requests.login(username, password)
        : await this.requests.register(username, password);

      // Проверяем успешность по тексту сообщения (как в API)
      if (result.message?.includes('успешно')) {
        let token: string | null = null;
        
        // Если это логин, токен уже в ответе
        if (isLogin && result.token) {
          token = result.token;
        } 
        // Если это регистрация, нужно автоматически залогинить пользователя
        else if (!isLogin) {
          const loginResult = await this.requests.login(username, password);
          if (loginResult.token) {
            token = loginResult.token;
          }
        }
        
        // Сохраняем токен
        if (token) {
          localStorage.setItem('token', token);
        }
        
        this.formAuth.setLoading(false);

        const container = document.getElementById(this.containerId)!;
        container.innerHTML = '';
        
        this.onSuccessCallback?.();
        RouterInstance.go('/main');
      } else {
        // Ошибка от сервера
        this.formAuth.showError(result.message || 'Неизвестная ошибка');
        this.formAuth.setLoading(false);
      }
    } catch (error) {
      console.error('Auth error:', error);
      this.formAuth.showError('Ошибка сети. Проверьте подключение к серверу.');
      this.formAuth.setLoading(false);
    }
  }
}
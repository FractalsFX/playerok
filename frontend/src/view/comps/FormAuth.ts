export class FormAuth {
  private container: HTMLElement;
  private isLoginMode: boolean = true;
  private onSubmitCallback: (username: string, password: string, isLogin: boolean) => void;

  constructor(containerId: string, onSubmit: (username: string, password: string, isLogin: boolean) => void) {
    this.container = document.getElementById(containerId)!;
    this.onSubmitCallback = onSubmit;
    this.render();
    this.bindEvents();
  }

  private render() {
    this.container.innerHTML = this.getTemplate();
  }

  private getTemplate(): string {
    const title = this.isLoginMode ? 'Вход' : 'Регистрация';
    const submitText = this.isLoginMode ? 'Войти' : 'Зарегистрироваться';
    const toggleText = this.isLoginMode ? 'Зарегистрироваться' : 'Войти';

    return `
        <div class="auth__form">
        <h2 class="auth__title">${title}</h2>
        
        <form class="auth-form" id="authForm">
          <div class="auth-form__field">
            <label class="auth-form__label" for="username">Имя пользователя</label>
            <input 
              type="text" 
              id="username" 
              class="auth-form__input" 
              placeholder="Введите имя пользователя"
              required
            >
            <span class="auth-form__error" id="usernameError"></span>
          </div>

          <div class="auth-form__field">
            <label class="auth-form__label" for="password">Пароль</label>
            <input 
              type="password" 
              id="password" 
              class="auth-form__input" 
              placeholder="Введите пароль"
              required
            >
            <span class="auth-form__error" id="passwordError"></span>
          </div>

          <button type="submit" class="auth-form__submit btn btn--primary">${submitText}</button>
        </form>

        <p class="auth__toggle">
          <button type="button" class="auth__toggle-btn link">${toggleText}</button>
        </p>

        <div id="authError" class="auth__error"></div>
      </div>
        `
  }

  private bindEvents() {
    const form = this.container.querySelector('#authForm') as HTMLFormElement;
    const toggleBtn = this.container.querySelector('.auth__toggle-btn') as HTMLButtonElement;
    

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.handleSubmit();
    });

    toggleBtn.addEventListener('click', () => {
      this.toggleMode();
    });

    //Меняем текст кнопки отправки формы исходя из состояния
    const submitBtn = this.container.querySelector('.auth-form__submit') as HTMLButtonElement;
    submitBtn.textContent = this.isLoginMode ? 'Войти' : 'Зарегистрироваться';
  }

  private handleSubmit() {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const errorEl = document.getElementById('authError');

    //Очищаем предыдущие ошибки
    this.clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    //Валидация полей
    const errors: string[] = [];

    if (username.length < 3) {
      errors.push('Длина имени должна быть > 3 символов');
      this.showFieldError('username', errors[0] || '');
    }

    if (password.length < 6) {
      errors.push('Длина пароля должна быть > 6 символов');
      this.showFieldError('password', errors[0] || '');
    }

    if (errors.length > 0) {
      return;
    }

    this.onSubmitCallback(username, password, this.isLoginMode);
  }

  public showError(message: string) {
    this.clearErrors();
    this.showGlobalError(message);
  }

  private toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.render();
    this.bindEvents();
  }

  private showFieldError(fieldId: string, message: string) {
    const errorEl = document.getElementById(fieldId + 'Error') as HTMLSpanElement;
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('auth-form__error--visible');
    }
  }

  private showGlobalError(message: string) {
    const errorEl = document.getElementById('authError') as HTMLElement;
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('auth__error--visible');
    }
  }

  private clearErrors() {
    const errorEls = this.container.querySelectorAll('.auth-form__error');
    errorEls.forEach(el => {
      el.textContent = '';
      el.classList.remove('auth-form__error--visible');
    });

    const globalError = document.getElementById('authError');
    if (globalError) {
      globalError.textContent = '';
      globalError.classList.remove('auth__error--visible');
    }
  }

  public setLoading(loading: boolean) {
    const submitBtn = this.container.querySelector('.auth-form__submit') as HTMLButtonElement;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Загрузка' : (this.isLoginMode ? 'Войти' : 'Зарегистрироваться');
  }
}
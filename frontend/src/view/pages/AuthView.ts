

export class AuthPage {
    private appElement: HTMLElement;

    constructor() {
        this.appElement = document.getElementById('app')!;
    }

    render() {
        this.appElement.innerHTML = `
          <h1>Авторизация</h1>
        `;
      }
}
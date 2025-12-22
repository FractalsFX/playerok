export class MainPage {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
  }

  render() {
    this.container.innerHTML = `
    <h1>Добро пожаловать в аудиоплеер!</h1>
      <p>Токен: ${localStorage.getItem('token')?.slice(0, 20)}...</p>
      <button onclick="localStorage.removeItem('token'); location.reload();">
        Выйти
      </button>
    `;
  }
}
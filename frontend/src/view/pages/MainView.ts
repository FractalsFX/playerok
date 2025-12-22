export class MainPage {
    private appElement: HTMLElement;
  
    constructor() {
      this.appElement = document.getElementById('app')!;
    }
  
    render() {
      this.appElement.innerHTML = `
        <h1>Аудиоплеер</h1>
        <div id="player"></div>
        <div id="tracks"></div>
      `;
    }
  }
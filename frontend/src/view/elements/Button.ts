export class Button {
    private element:HTMLButtonElement;

    constructor(text: string, onClick: () => void) {
        this.element = document.createElement('button');
        this.element.textContent = text;
        this.element.addEventListener('click', onClick);
    }

    render(container: HTMLElement) {
        container.appendChild(this.element);
    }
}
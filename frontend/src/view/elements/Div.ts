export class Div {
    private element: HTMLDivElement;

    constructor(classText:string = '', idText:string = '') {
        this.element = document.createElement('div');
        this.element.className = classText;
        this.element.id = idText;
    }

    render(container:HTMLElement): void {
        container.appendChild(this.element);
    }
}
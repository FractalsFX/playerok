export class Input {
    private element:HTMLInputElement;

    constructor(placeholder: string = '', initialValue: string = '', type: string = 'text') {
        this.element = document.createElement('input');
        this.element.type = type;
        this.element.placeholder = placeholder;
        this.element.value = initialValue;
    }

    getValue(): string {
        return this.element.value;
    }

    render(container: HTMLElement):void {
        container.appendChild(this.element);
    }
}
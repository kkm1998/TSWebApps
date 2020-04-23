class EmailField implements Field {
    name: string;
    label: string;
    type!: FieldType
    element: HTMLInputElement;
    constructor(name: string, label: string, type: FieldType) {
        this.element = <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.type = type
        this.element.setAttribute('type',<string>type)
        this.element.setAttribute('placeholder',label)
    }
    render(): HTMLElement {
        return this.element;
    }
    getValue(): any {
        return this.element.value
    }
}

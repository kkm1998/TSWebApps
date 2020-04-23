class CheckboxField implements Field {
    name: string;
    label: string;
    type: FieldType
    element: HTMLInputElement;
    constructor(name: string, label: string, type: FieldType) {
        this.element = <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.type = type
        this.element.setAttribute('type',<string>type)
    }
    render(): HTMLElement {
        return this.element;
    }
    getValue(): any {
        this.element.checked==true?this.element.value='Tak':this.element.value='Nie'      
        return this.element.value
    }
}

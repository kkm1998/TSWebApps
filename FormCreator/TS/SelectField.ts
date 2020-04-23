class SelectField implements Field {
    name: string;
    label: string;
    type!: FieldType
    element: HTMLSelectElement;
    constructor(name: string, label: string, type: FieldType, options:Array<string>) {
        this.element = <HTMLSelectElement>document.createElement('select');
        options.forEach(x =>{
        const option:HTMLOptionElement =document.createElement('option')
        let option2:Text= document.createTextNode(x)
           option.appendChild(option2)
           this.element.appendChild(option)
        })
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
        return this.element.value
    }
}

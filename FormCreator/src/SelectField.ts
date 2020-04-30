import {Field} from './Field'
import {FieldType} from './FieldType'
export class SelectField implements Field {
    name: string;
    label: string;
    type!: FieldType
    element: HTMLSelectElement;
    constructor(name: string, label: string, type: FieldType, options: Array<string>) {
        this.element = <HTMLSelectElement>document.createElement('select');
        this.name = name;
        this.label = label;
        this.type = type
        this.element.name = this.name;
        this.element.id = this.name;
        this.element.setAttribute('type',<string>this.type)
        const PlaceHolder: HTMLOptionElement = document.createElement('option')
        PlaceHolder.setAttribute('hidden', 'hidden')
        let PlaceHolder_text: Text = document.createTextNode(label)
        PlaceHolder.appendChild(PlaceHolder_text)
        this.element.appendChild(PlaceHolder)
        options.forEach(x => {
            const option: HTMLOptionElement = document.createElement('option')
            let option2: Text = document.createTextNode(x)
            option.appendChild(option2)
            this.element.appendChild(option)
        })

    }
    render(): HTMLElement {
        return this.element;
    }
    getValue(): any {
        return this.element.value
    }
}
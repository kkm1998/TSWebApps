"use strict";
class SelectField {
    constructor(name, label, type, options) {
        this.element = document.createElement('select');
        this.name = name;
        this.label = label;
        this.type = type;
        this.element.name = this.name;
        this.element.id = this.name;
        this.element.setAttribute('type', this.type);
        const PlaceHolder = document.createElement('option');
        PlaceHolder.setAttribute('hidden', 'hidden');
        let PlaceHolder_text = document.createTextNode(label);
        PlaceHolder.appendChild(PlaceHolder_text);
        this.element.appendChild(PlaceHolder);
        options.forEach(x => {
            const option = document.createElement('option');
            let option2 = document.createTextNode(x);
            option.appendChild(option2);
            this.element.appendChild(option);
        });
    }
    render() {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

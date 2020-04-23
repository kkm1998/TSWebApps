"use strict";
class SelectField {
    constructor(name, label, type, options) {
        this.element = document.createElement('select');
        options.forEach(x => {
            const option = document.createElement('option');
            let option2 = document.createTextNode(x);
            option.appendChild(option2);
            this.element.appendChild(option);
        });
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.type = type;
        this.element.setAttribute('type', type);
    }
    render() {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

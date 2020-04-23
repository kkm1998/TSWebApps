"use strict";
class CheckboxField {
    constructor(name, label, type) {
        this.element = document.createElement('input');
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
        this.element.checked == true ? this.element.value = 'Tak' : this.element.value = 'Nie';
        return this.element.value;
    }
}

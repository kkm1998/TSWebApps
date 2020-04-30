"use strict";
class DateField {
    constructor(name, label, type) {
        this.element = document.createElement('input');
        this.name = name;
        this.label = label;
        this.type = type;
        this.element.name = this.name;
        this.element.type = this.type;
        this.element.placeholder = this.label;
    }
    render() {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

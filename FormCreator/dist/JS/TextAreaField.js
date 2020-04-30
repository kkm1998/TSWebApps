"use strict";
class TextAreaField {
    constructor(name, label, type) {
        this.element = document.createElement('textarea');
        this.name = name;
        this.label = label;
        this.type = type;
        this.element.name = this.name;
        this.element.id = this.name;
        this.element.placeholder = this.label;
        this.element.setAttribute('type', this.type);
    }
    render() {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

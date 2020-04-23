"use strict";
class TextAreaField {
    constructor(name, label, type) {
        this.element = document.createElement('textarea');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.type = type;
        this.element.setAttribute('type', type);
        this.element.setAttribute('placeholder', label);
    }
    render() {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

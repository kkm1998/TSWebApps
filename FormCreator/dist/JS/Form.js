"use strict";
class Form {
    constructor(id) {
        this.outputTable = document.getElementById('Output_Table');
        this.outputDiv = document.getElementById('Output');
        this.sendButton = document.getElementById('Send');
        this.saveButton = document.getElementById('Save');
        this.id = id;
        this.fields = new Array();
        this.formValues = new Array();
        this.formElement = document.getElementById(id);
        this.sendButton.addEventListener('click', () => { this.createTable(); });
        this.saveButton.addEventListener('click', () => { this.insertEditedDataToTable(document.getElementById('focused')); });
        this.fields.push(new InputField('Imię', 'Imię', FieldType.textBox));
        this.fields.push(new InputField('Nazwisko', 'Nazwisko', FieldType.textBox));
        this.fields.push(new EmailField('EMail', 'E-Mail', FieldType.Email));
        this.fields.push(new SelectField('Kierunek', 'Wybrany kierunek studiów', FieldType.Select, ['IT', 'Rachunkowość', 'Zarządzanie']));
        this.fields.push(new CheckboxField('Elearning', 'Czy preferujesz e-learning', FieldType.Check));
        this.fields.push(new TextAreaField('Uwagi', 'Uwagi', FieldType.TextArea));
    }
    render() {
        var _a;
        const headerForm = document.createElement('p');
        headerForm.setAttribute('id', 'headerForm');
        headerForm.appendChild(document.createTextNode(this.id));
        (_a = this.formElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(headerForm, this.formElement);
        this.fields.forEach(element => {
            if (element.render().getAttribute('type') == 'checkbox') {
                let p = document.createElement('p');
                p.append(element.label);
                p.append(element.render());
                this.formElement.appendChild(p);
            }
            else {
                this.formElement.appendChild(element.render());
                this.formElement.appendChild(document.createElement("br"));
            }
        });
    }
    getValue() {
        this.formValues.length = 0;
        this.fields.forEach(element => {
            this.formValues.push(element.getValue());
        });
    }
    createTable() {
        var _a;
        this.getValue();
        this.outputTable.style.display = 'inline-table';
        this.outputDiv.style.opacity = '1';
        const row = document.createElement('tr');
        this.outputTable.appendChild(row);
        for (let i = 0; i < this.formValues.length; i++) {
            const cell = document.createElement('th');
            cell.append(this.formValues[i]);
            row.appendChild(cell);
        }
        const createButtonCell = document.createElement('th');
        const buttonEditRow = document.createElement('button');
        const buttonDeleteRow = document.createElement('button');
        //  const Btn_Save = document.createElement('button')
        buttonEditRow.setAttribute('id', 'Edit');
        buttonDeleteRow.setAttribute('id', 'del');
        // Btn_Save.setAttribute('id', 'saveButton')
        // Btn_Save.style.display = 'none'
        //Btn_Save.textContent = 'Save'
        createButtonCell.appendChild(buttonEditRow);
        createButtonCell.appendChild(buttonDeleteRow);
        //createButtonCell.appendChild(Btn_Save)
        row.appendChild(createButtonCell);
        (_a = document.getElementById('reset')) === null || _a === void 0 ? void 0 : _a.click();
        buttonDeleteRow.addEventListener('click', () => { this.deleteDataFromRow(row); });
        buttonEditRow.addEventListener('click', () => { this.insertDataToForm(row /*Btn_Save*/); });
        //Btn_Save.addEventListener('click', () => { this.insertEditedDataToTable(row,Btn_Save) })
    }
    deleteDataFromRow(id) {
        this.outputTable.removeChild(id);
    }
    insertDataToForm(row /*,BtN:HTMLElement*/) {
        this.formElement.scrollIntoView(true);
        row.setAttribute('id', 'focused');
        row.style.backgroundColor = 'skyblue';
        this.sendButton.style.display = 'none';
        this.saveButton.style.display = 'inline';
        //BtN.style.display = 'inline'
        for (let i in this.fields) {
            let getFormElements = document.getElementById(this.fields[i].name);
            this.fields[i].type == 'checkbox' ?
                row.children[i].innerHTML == 'Tak' ? getFormElements.checked = true : getFormElements.checked = false
                :
                    getFormElements.value = row.children[i].innerHTML;
        }
        // form.Imię.value = row.children[0].innerHTML
        // form.Nazwisko.value = row.children[1].innerHTML
        // form.EMail.value = row.children[2].innerHTML
        // form.Kierunek.value = row.children[3].innerHTML
        // row.children[4].innerHTML == 'Tak' ? form.Elearning.setAttribute('checked', true) : form.Elearning.removeAttribute('checked')
        // form.Uwagi.value = row.children[5].innerHTML
    }
    insertEditedDataToTable(row /*,BtN:HTMLElement*/) {
        var _a;
        row.style.backgroundColor = 'white';
        this.sendButton.style.display = 'block';
        this.saveButton.style.display = 'none';
        this.getValue();
        for (let i in this.formValues) {
            row.children[i].innerHTML = this.formValues[i];
        }
        (_a = document.getElementById('reset')) === null || _a === void 0 ? void 0 : _a.click();
        row.id = '';
        row.scrollIntoView(true);
        // BtN.style.display = 'none'
    }
    Test() {
        const z = ['IT', 'Rachunkowość', 'Zarządzanie'];
        const x = ['Tak', 'Nie'];
        let i = 100;
        while (i-- != 0) {
            // this.formValues.length = 0
            // this.formValues.push(Math.random().toString(36).substring(7))
            // this.formValues.push(Math.random().toString(36).substring(7))
            // this.formValues.push(Math.random().toString(36).substring(3))
            // this.formValues.push(z[Math.ceil(Math.random() * 2)])
            // this.formValues.push(x[Math.round(Math.random())])
            // this.formValues.push(Math.random().toString(36).substring(1))
            // this.createTable()
            // console.log(this.formValues)
            let getFormElements = [];
            for (let i in this.fields) {
                getFormElements.push(document.getElementById(this.fields[i].name));
            }
            let op = Math.round(Math.random());
            getFormElements[0].value = Math.random().toString(36).substring(7);
            getFormElements[1].value = Math.random().toString(36).substring(7);
            getFormElements[2].value = Math.random().toString(36).substring(3);
            getFormElements[3].value = z[Math.ceil(Math.random() * 2)];
            getFormElements[4].value = op == 1 ? getFormElements[4].checked = true : getFormElements[4].checked = false;
            getFormElements[5].value = Math.random().toString(36).substring(1);
            this.sendButton.click();
        }
    }
}

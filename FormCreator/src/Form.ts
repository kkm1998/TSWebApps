import {Field} from './Field'
import {FieldType} from './FieldType'
import { InputField } from './InputField';
import { EmailField } from './EmailField';
import { SelectField } from './SelectField';
import { CheckboxField } from './CheckboxField';
import { TextAreaField } from './TextAreaField';
import { DateField } from './DateField';

export class Form {
    fields: Field[];
    formElement: HTMLElement;
    formValues: Array<string>;
    outputTable = <HTMLElement>document.getElementById('Output_Table')
    outputDiv = <HTMLElement>document.getElementById('Output')
    sendButton = <HTMLElement>document.getElementById('Send')
    saveButton = <HTMLElement>document.getElementById('Save')
    id: string
    constructor(id: string) {
        this.id = id
        this.fields = new Array();
        this.formValues = new Array();
        this.formElement = document.getElementById(id) as HTMLElement;
        this.sendButton.addEventListener('click', () => { this.createTable() })
        this.saveButton.addEventListener('click', () => { this.insertEditedDataToTable(<HTMLTableRowElement>document.getElementById('focused')) })
        this.fields.push(new InputField('Imię', 'Imię', FieldType.textBox))
        this.fields.push(new InputField('Nazwisko', 'Nazwisko', FieldType.textBox))
        this.fields.push(new EmailField('EMail', 'E-Mail', FieldType.Email))
        this.fields.push(new SelectField('Kierunek', 'Wybrany kierunek studiów', FieldType.Select, ['IT', 'Rachunkowość', 'Zarządzanie']))
        this.fields.push(new CheckboxField('Elearning', 'Czy preferujesz e-learning', FieldType.Check))
        this.fields.push(new TextAreaField('Uwagi', 'Uwagi', FieldType.TextArea))
    }
    render(): void {
        const headerForm = document.createElement('p')
        headerForm.setAttribute('id', 'headerForm')
        headerForm.appendChild(document.createTextNode(this.id))
        this.formElement.parentNode?.insertBefore(headerForm, this.formElement)
        this.fields.forEach(element => {
            if (element.render().getAttribute('type') == 'checkbox') {
                let p = document.createElement('p')
                p.append(element.label)
                p.append(element.render())
                this.formElement.appendChild(p)
            }
            else {
                this.formElement.appendChild(element.render())
                this.formElement.appendChild(document.createElement("br"))
            }
        })
    }
    getValue(): void {
        this.formValues.length = 0
        this.fields.forEach(element => {
            this.formValues.push(element.getValue())
        })
    }
    createTable(): void {
        this.getValue()
        this.outputTable.style.display = 'inline-table'
        this.outputDiv.style.opacity = '1'
        const row = document.createElement('tr')
        this.outputTable.appendChild(row)
        for (let i = 0; i < this.formValues.length; i++) {
            const cell = document.createElement('th')
            cell.append(this.formValues[i])
            row.appendChild(cell)
        }
        const createButtonCell = document.createElement('th')
        const buttonEditRow = document.createElement('button')
        const buttonDeleteRow = document.createElement('button')
        //  const Btn_Save = document.createElement('button')
        buttonEditRow.setAttribute('id', 'Edit')
        buttonDeleteRow.setAttribute('id', 'del')
        // Btn_Save.setAttribute('id', 'saveButton')
        // Btn_Save.style.display = 'none'

        //Btn_Save.textContent = 'Save'
        createButtonCell.appendChild(buttonEditRow)
        createButtonCell.appendChild(buttonDeleteRow)
        //createButtonCell.appendChild(Btn_Save)
        row.appendChild(createButtonCell)
        document.getElementById('reset')?.click()
        buttonDeleteRow.addEventListener('click', () => { this.deleteDataFromRow(row) })
        buttonEditRow.addEventListener('click', () => { this.insertDataToForm(row/*Btn_Save*/) })

        //Btn_Save.addEventListener('click', () => { this.insertEditedDataToTable(row,Btn_Save) })

    }
    deleteDataFromRow(id: HTMLTableRowElement): void {
        this.outputTable.removeChild(id)
    }
    insertDataToForm(row: HTMLTableRowElement/*,BtN:HTMLElement*/): void {
      
        this.formElement.scrollIntoView(true)
        row.setAttribute('id', 'focused')
        row.style.backgroundColor='skyblue'
        this.sendButton.style.display = 'none'
        this.saveButton.style.display = 'inline'
        //BtN.style.display = 'inline'
        for (let i in this.fields) {
            let getFormElements = document.getElementById(this.fields[i].name) as HTMLFormElement
            this.fields[i].type == 'checkbox' ?
                row.children[i].innerHTML == 'Tak' ? getFormElements.checked = true : getFormElements.checked = false
                :
                getFormElements.value = row.children[i].innerHTML
        }
        // form.Imię.value = row.children[0].innerHTML
        // form.Nazwisko.value = row.children[1].innerHTML
        // form.EMail.value = row.children[2].innerHTML
        // form.Kierunek.value = row.children[3].innerHTML
        // row.children[4].innerHTML == 'Tak' ? form.Elearning.setAttribute('checked', true) : form.Elearning.removeAttribute('checked')
        // form.Uwagi.value = row.children[5].innerHTML
    }
    insertEditedDataToTable(row: HTMLTableRowElement/*,BtN:HTMLElement*/): void {
        row.style.backgroundColor='white'
        this.sendButton.style.display = 'block'
        this.saveButton.style.display = 'none'
        this.getValue()
        for (let i in this.formValues) {
            row.children[i].innerHTML = this.formValues[i]
        }

        document.getElementById('reset')?.click()
        row.id = ''
        row.scrollIntoView(true)
        // BtN.style.display = 'none'
    }
    Test(): void {
        const z = ['IT', 'Rachunkowość', 'Zarządzanie']
        const x = ['Tak', 'Nie']

        let i = 100
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
            let getFormElements = []
            for (let i in this.fields) {
                getFormElements.push(document.getElementById(this.fields[i].name) as HTMLFormElement)
            }
            let op = Math.round(Math.random())
            getFormElements[0].value = Math.random().toString(36).substring(7)
            getFormElements[1].value = Math.random().toString(36).substring(7)
            getFormElements[2].value = Math.random().toString(36).substring(3)
            getFormElements[3].value = z[Math.ceil(Math.random() * 2)]
            getFormElements[4].value = op == 1 ? getFormElements[4].checked = true : getFormElements[4].checked = false
            getFormElements[5].value = Math.random().toString(36).substring(1)
            this.sendButton.click()
        }
    }
}

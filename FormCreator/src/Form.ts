import { Field } from './Field'
import { FieldType } from './FieldType'
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
    socket = new WebSocket("ws://localhost:8080");
    outputDiv = <HTMLElement>document.getElementById('Output')
    outputTable: HTMLElement
    sendButton = <HTMLElement>document.getElementById('Send')
    saveButton = <HTMLElement>document.getElementById('Save')
    id: string
    focusedRow!: HTMLTableRowElement;
    _storage: Array<string> = [];
    constructor(id: string) {
        this.id = id
        this.fields = new Array();
        this.formValues = new Array();
        this.formElement = document.getElementById(id) as HTMLElement;
        this.sendButton.addEventListener('click', () => {
            this.getValue()
            this.socket.send(JSON.stringify(this.formValues))
            // this.formValues.forEach(element => {
            //     this.socket.send(element)
            // });
            this.addRowToTable()
        })
        this.saveButton.addEventListener('click', () => { this.insertEditedDataToTable(this.focusedRow) })
        this.fields.push(new InputField('Imię', 'Imię', FieldType.textBox))
        this.fields.push(new InputField('Nazwisko', 'Nazwisko', FieldType.textBox))
        this.fields.push(new EmailField('EMail', 'E-Mail', FieldType.Email))
        this.fields.push(new SelectField('Kierunek', 'Wybrany kierunek studiów', FieldType.Select, ['IT', 'Rachunkowość', 'Zarządzanie']))
        this.fields.push(new CheckboxField('Elearning', 'Czy preferujesz e-learning', FieldType.Check))
        this.fields.push(new TextAreaField('Uwagi', 'Uwagi', FieldType.TextArea))
        this.fields.push(new SelectField('Kraj', 'Kraj', FieldType.Select, ['Kraje', 'Europe']))
        this.CreateTable()
        this.outputTable = <HTMLElement>document.getElementById('Output_Table')
        this.loadTable()
        this.render()
    }
    CreateTable(): void {
        let table = document.createElement('table')
        table.id = 'Output_Table'
        let heading = document.createElement('tr')
        heading.id = 'heading'
        this.fields.forEach(element => {
            let th = document.createElement('th')
            th.innerText = element.label
            heading.appendChild(th)
        });
        let th = document.createElement('th')
        th.innerText = 'Edycja'
        heading.appendChild(th)
        table.appendChild(heading)
        this.outputDiv.appendChild(table)
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
        this.fields.forEach(element => {
            this.formValues.push(element.getValue())
        })
    }
    addRowToTable(row_id?: any): void {
        let Single = row_id || {
            row_id: "id_" + new Date().getTime()
        }
        this.outputTable.style.display = 'inline-table'
        this.outputDiv.style.opacity = '1'
        const row = document.createElement('tr')
        this.outputTable.appendChild(row)
        for (let i = 0; i < this.formValues.length; i++) {
            const cell = document.createElement('th')
            cell.append(this.formValues[i])
            row.appendChild(cell)
        }
        row_id == undefined ?
            row.id = Single.row_id
            :
            row.id = row_id
        const createButtonCell = document.createElement('th')
        const buttonEditRow = document.createElement('button')
        const buttonDeleteRow = document.createElement('button')
        buttonEditRow.setAttribute('id', 'Edit')
        buttonDeleteRow.setAttribute('id', 'del')
        createButtonCell.appendChild(buttonEditRow)
        createButtonCell.appendChild(buttonDeleteRow)
        row.appendChild(createButtonCell)
        document.getElementById('reset')?.click()
        buttonDeleteRow.addEventListener('click', () => { this.deleteDataFromRow(row) })
        buttonEditRow.addEventListener('click', () => { this.insertDataToForm(row) })
        if (row_id == undefined) {
            this._storage.push(JSON.stringify(row.id))
            this._storage.push(JSON.stringify(this.formValues))
        }
        // localStorage.setItem(row.id, JSON.stringify(this.formValues))
        localStorage.setItem(this.id, JSON.stringify(this._storage))
        this.formValues.length = 0
    }
    deleteDataFromRow(row: HTMLTableRowElement): void {
        // localStorage.removeItem(row.id)
        let NotesOptions = JSON.parse(localStorage.getItem(this.id) || '')
        for (let i = 0; i < NotesOptions.length; i++) {
            if (JSON.parse(NotesOptions[i]) == row.id) {
                NotesOptions.splice(i, 2)
            }
        }
        localStorage.setItem(this.id, JSON.stringify(NotesOptions))
        this.outputTable.removeChild(row)
    }
    insertDataToForm(row: HTMLTableRowElement): void {
        this.focusedRow = row
        this.formElement.scrollIntoView(true)
        row.style.backgroundColor = 'skyblue'
        this.sendButton.style.display = 'none'
        this.saveButton.style.display = 'inline'
        for (let i in this.fields) {
            let getFormElements = document.getElementById(this.fields[i].name) as HTMLFormElement
            this.fields[i].type == 'checkbox' ?
                row.children[i].innerHTML == 'Tak' ? getFormElements.checked = true : getFormElements.checked = false
                :
                getFormElements.value = row.children[i].innerHTML
        }
    }
    insertEditedDataToTable(row: HTMLTableRowElement): void {
        row.style.backgroundColor = 'white'
        this.sendButton.style.display = 'block'
        this.saveButton.style.display = 'none'
        this.getValue()
        for (let i in this.formValues) {
            row.children[i].textContent = this.formValues[i]
        }
        let NotesOptions = JSON.parse(localStorage.getItem(this.id) || '')
        for (let i = 0; i < NotesOptions.length; i++) {
            if (JSON.parse(NotesOptions[i]) == row.id) {
                NotesOptions[i + 1] = JSON.stringify(this.formValues)
            }
        }
        localStorage.setItem(this.id, JSON.stringify(NotesOptions))
        // localStorage.setItem(row.id, JSON.stringify(this.formValues))
        document.getElementById('reset')?.click()
        row.scrollIntoView(true)
    }
    Test(): void {
        const z = ['IT', 'Rachunkowość', 'Zarządzanie']
        let i = 10
        while (i-- != 0) {
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
    loadTable(): void {
        if (localStorage.length != 0) {
            let NotesOptions = JSON.parse(localStorage.getItem(this.id) || '')
            let key = ''
            for (let i = 0; i < NotesOptions.length; i++) {
                if ((i % 2 == 0) == true) {
                    key = JSON.parse(NotesOptions[i])
                }
                else {
                    this.formValues = JSON.parse(NotesOptions[i])
                    this._storage.push(JSON.stringify(key))
                    this._storage.push(JSON.stringify(this.formValues))
                    this.addRowToTable(key)
                }
            }
        }
        //  NotesOptions.forEach((element: string) => {
        //      this.formValues.push(element)
        //  });
        //  this.addRowToTable(key);
    }
}

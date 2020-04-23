class Form {
    fields: Field[];
    formElement: HTMLElement;
    constructor(id: string) {
    this.fields = new Array();
    this.formElement = document.getElementById(id) as HTMLElement;
    this.fields.push(new InputField('Imię','Imię',FieldType.textBox))
    this.fields.push(new InputField('Nazwisko','Nazwisko',FieldType.textBox))
    this.fields.push(new EmailField('E-Mail','E-Mail',FieldType.Email))
    this.fields.push(new SelectField('Kierunek','Wybrany kierunek studiów',FieldType.Select ,['IT','Rachunkowość','Zarządzanie']))
    this.fields.push(new CheckboxField('E-learning','Czy preferujesz e-learning',FieldType.Check))
    this.fields.push(new TextAreaField('Uwagi','Uwagi',FieldType.TextArea))
    }  
    render(): void {  
        this.fields.forEach(element=>{     
            this.formElement.append(element.label+':')
            this.formElement.appendChild(document.createElement("br")) 
            this.formElement.appendChild(element.render())
            this.formElement.appendChild(document.createElement("br"))    
        })     
    }
    getValue(): void {
        const x =document.getElementById('Output') as HTMLElement
        x.innerHTML=''
        this.fields.forEach(element=>{
           const p = document.createElement('p')
           p.innerHTML=element.label+': '+element.getValue()
           x.appendChild(p)
            console.log(element.label+': '+element.getValue())
        })    
        document.getElementById('reset')?.click()
    }
   }
   
   
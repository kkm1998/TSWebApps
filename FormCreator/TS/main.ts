enum FieldType {
    textBox = 'text',
    Check = 'checkbox',
    Email = 'email',
    Select = 'select',
    TextArea='textarea'
}
interface Field {
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
   }
   
   
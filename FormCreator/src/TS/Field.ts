interface Field {
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
   }
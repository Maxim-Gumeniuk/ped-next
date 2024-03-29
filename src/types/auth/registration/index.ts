export interface IinputArray {
    onBlur: (e: unknown ) =>  void
    onChange: (e: React.ChangeEvent<unknown>) => void; 
    placeholder: string;
    type: string;
    password?: boolean;
    name: string;
    handleBlur?: (e: unknown) => void
    value: string;
    errors?: string;
    touched?: boolean;
}

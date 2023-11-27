import { ChangeEvent } from "react";

export interface IinputArray {
    type: string;
    placeholder: string;
    change: (e: ChangeEvent<any>) => void;
    value: string;
    errors?: string;
    touched?: boolean;
}

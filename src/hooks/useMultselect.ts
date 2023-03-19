import { useState } from "react"

interface IValue {
    id?: string | number;
    name: string;
}

export interface useMultselectProps {
    value: IValue[],
    setValue: any,
    onChange(newValue: IValue): void;
    isActive(newValue: IValue): boolean;
}

export function useMultselect(): useMultselectProps {
    const [value, setValue] = useState<IValue[]>([]);

    const onChange = (newValue: IValue) => {
        if(value.find(value => value.id === newValue.id)) {
            setValue(value.filter(value => value.id != newValue.id));
        } else {
            setValue(old => [...old, newValue]);
        }
    }

    const isActive = (newValue: IValue) => {
        return value.find(value => value.id === newValue.id) ? true : false
    }
    
    return {
        value,
        setValue,
        onChange,
        isActive
    }
}
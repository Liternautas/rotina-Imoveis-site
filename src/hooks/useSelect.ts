import {useState} from "react";

export interface OptionSelectProps {
    id?: number | string;
    name?: string;
    enum?: string;
    width?: number;
    height?: number;
}

export interface useSelectProps {
    value: OptionSelectProps;
    error: string;
    options: OptionSelectProps[];
    setOptions: any,
    onChange: (option: OptionSelectProps) => void;
    isActive: () => OptionSelectProps;
    validate: () => boolean;
}

export function useSelect(data?: OptionSelectProps[]): useSelectProps {
    const [value, setValue] = useState<OptionSelectProps>(null);
    const [options, setOptions] = useState<OptionSelectProps[]>(data ?? []);
    const [error, setError] = useState(null);

    const onChange = (option: OptionSelectProps) => {
        {error && setError(null)}
        setValue(option);
    }

    const isActive = () => {
        return options.find(item => item.id === value.id);
    }

    const validate = () => {
        if(!value) {
            setError('Selecione um valor para prosseguir');
            return false;
        }
        return true;
    }

    return {
        value,
        options,
        error,
        setOptions,
        onChange,
        isActive,
        validate
    }
}
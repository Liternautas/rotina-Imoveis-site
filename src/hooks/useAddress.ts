import { useCallback, useEffect, useState } from "react";
import { IAddress } from "../interfaces";
import { cities, districts, states } from "../utils/address";
import { useForm, useFormProps } from "./useForm";
import { useSelect, useSelectProps } from "./useSelect";

export interface useAddressProps {
    state: useSelectProps,
    city: useSelectProps,
    district: useSelectProps,
    route: useFormProps, 
    zipcode: useFormProps,
    number: useFormProps,
    complement: useFormProps

    startProps(stateValue: string, city: string, district?: string): Promise<void>;
}

export function useAddress(): useAddressProps {
    const [initialAddress, setInitialAddress] = useState<IAddress>(null);

    const state = useSelect();
    const city = useSelect();
    const district = useSelect();
    const route = useForm();
    const zipcode = useForm('cep');
    const number = useForm();
    const complement = useForm();

    const setEstateOptions = useCallback(() => {
        state.setOptions(states);
    }, []);

    const setCitiesOptions = useCallback(() => {
        const filter = cities.filter(item => item.stateId === state.value.id);
        city.setOptions(filter);
        if(initialAddress?.city) {
            city.onChange(findInOptions(initialAddress.city, filter));
        }
    }, [state.value]);
    
    const setDistrictsOptions = useCallback(() => {
        const filter = districts.filter(item => item.city.id === city.value.id);
        district.setOptions(filter)
        if(initialAddress?.city) {
            district.onChange(findInOptions(initialAddress.district, filter));
        }
    }, [city.value]);

    useEffect(() => {
        setEstateOptions();
    }, []);

    useEffect(() => {
        if (state.value?.id) {
            setCitiesOptions();
        } else {
            {city.options.length > 0 && city.setOptions([])}
        }
    }, [state.value]);

    useEffect(() => {
        if (city.value?.id) {
            setDistrictsOptions();
        } else {
            {district.options.length > 0 && district.setOptions([])}
        }
    }, [city.value]);

    const startProps = async (stateValue: string, city: string, district?: string) => {
        setInitialAddress({
            city,
            district,
            state: stateValue
        })
        state.onChange(findInOptions(stateValue, states));
    }

    function findInOptions(param: string, options) {
        let optionSelected;
        options.forEach(option => {
            { option.enum === param || option.name === param ? optionSelected = option : null }
        });
        return optionSelected;
    }


    return {
        state,
        city,
        district,
        complement,
        number,
        route,
        zipcode,

        startProps
    }
}
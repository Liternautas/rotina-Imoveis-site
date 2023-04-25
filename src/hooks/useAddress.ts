import { useCallback, useEffect, useState } from "react";
import { IAddress, ICity, IDistrict, IState } from "../interfaces";
import { states } from "../utils/address";
import { useForm, useFormProps } from "./useForm";
import { useSelect, useSelectProps } from "./useSelect";
import { api } from "../services/api";

export interface useAddressProps {
    state: useSelectProps,
    city: useSelectProps,
    district: useSelectProps,
    route: useFormProps, 
    zipcode: useFormProps,
    number: useFormProps,
    complement: useFormProps

    startProps(stateValue: IState, city: ICity, district?: IDistrict): Promise<void>;
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

    const setCitiesOptions = useCallback(async () => {
        const {data} = await api.get(`address/states/${state.value.id}/cities`);
        city.setOptions(data.results);
        if(initialAddress?.city) {
            city.onChange(findInOptions(initialAddress.city.name, data.results));
        }
    }, [state.value]);
    
    const setDistrictsOptions = useCallback(async () => {
        const {data} = await api.get(`address/cities/${city.value.id}/districts`);
        district.setOptions(data.results)
        if(initialAddress?.city) {
            district.onChange(findInOptions(initialAddress.district.name, data.results));
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

    const startProps = async (stateValue: IState, city: ICity, district?: IDistrict) => {
        setInitialAddress({
            city,
            district,
            state: stateValue
        })
        state.onChange(findInOptions(stateValue.name, states));
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
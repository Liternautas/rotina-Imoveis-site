import { useCallback, useEffect, useState } from "react";
import { IAddress, ICity, IDistrict, IState } from "../interfaces";
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
        state.setOptions(states.filter(state => state.shortName === 'GO'));
        /* state.onChange(states.find(state => state.shortName === 'GO')); */
    }, []);

    const setCitiesOptions = useCallback(() => {
        const filter = cities.filter(item => item.stateId === state.value.id);
        city.setOptions(filter);
        if (initialAddress?.city) {
            city.onChange(findInOptions(initialAddress.city.name, filter));
        }
    }, [state.value]);

    useEffect(() => {
        if (city.value) {
            setDistrictsOptions();
        }
    }, [city.value]);

    const setDistrictsOptions = () => {
        const filter = districts.filter(item => item.city.id === city.value.id);
        //console.log(filter.filter(item => item.name == 'Cidade Jardim'));
        district.setOptions(filter)
        if (initialAddress?.city) {
            district.onChange(findInOptions(initialAddress.district.name, filter));
        }
    };

    useEffect(() => {
        setEstateOptions();
    }, []);

    useEffect(() => {
        if (state.value?.id) {
            setCitiesOptions();
        } else {
            { city.options.length > 0 && city.setOptions([]) }
        }
    }, [state.value]);

    useEffect(() => {
        if (city.value?.id) {
            setDistrictsOptions();
        } else {
            { district.options.length > 0 && district.setOptions([]) }
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
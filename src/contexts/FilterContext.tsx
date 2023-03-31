import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { OptionSelectProps, useSelect, useSelectProps } from "../hooks/useSelect";
import { useAddress, useAddressProps } from "../hooks/useAddress";
import { IProperty } from "../interfaces";
import { adTypes, types } from "../utils/data";
import { useRouter } from "next/router";
import { cities, districts } from "../utils/address";
import { api } from "../services/api";

interface FindPropertiesProps {
    cityId?: number | string,
    districtId?: number | string,
    typeId?: number | string,
    adType?: number | string,
    page?: number | string,
    maxPrice?: number | string,
    minPrice?: number | string
}

interface FilterContextProps {
    address: useAddressProps;
    type: useSelectProps;
    adType: useSelectProps;
    results: IProperty[];
    setResults(properties: IProperty[]): void;
}

const FilterContext = createContext({} as FilterContextProps);

const FilterProvider = ({children}) => {
    const router = useRouter();
    const {adType: adTypeQuery, type: typeQuery, cityId, districtId} = router.query;

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [results, setResults] = useState<IProperty[]>([]);
    const address = useAddress();
    const {city, district, state} = address;
    const priceMin = useForm('price');
    const priceMax = useForm('price');
    const type = useSelect();
    const adType = useSelect();

    useEffect(() => {
        state.onChange({
            name: 'Goiás',
            id: 9
        });
        type.setOptions(types);
    }, []);

    const getPathByRoute = ({adType, cityId, districtId, page, typeId, maxPrice, minPrice}: FindPropertiesProps) => {
        let path = `properties?`;

        { adType ? path = path + `adType=${adType}` : null }
        { typeId ? path = path + `&typeId=${typeId}` : null }
        { cityId ? path = path + `&cityId=${cityId}` : null }
        { districtId ? path = path + `&districtId=${districtId}` : null }
        /* { maxPrice ? path = path + `&maxPrice=${maxPrice.toString().replace(/[^0-9]/g, '')}` : null }
        
        
        
        { page ? path = path + `&page=${page}` : null } */
        return path;
    }

    const findProperties = useCallback(async ({adType, cityId, districtId, page, typeId, maxPrice, minPrice}: FindPropertiesProps) => {
        try {
            setLoading(true);
            const {results} = await api.get(getPathByRoute({adType, cityId, districtId, page, typeId, maxPrice, minPrice})).then(res => res.data);

            if(results) {
                setResults(results);
            }
        } catch (error) {
            
        } finally {

        }
    }, [adTypeQuery, cityId, districtId, typeQuery]);

    useEffect(() => {
        const typeSelected = types.find(item => item.slug === typeQuery) as OptionSelectProps;

        {cityId && city.onChange(cities.find(item => item.id === +cityId) as OptionSelectProps)};
        {districtId && district.onChange(districts.find(item => item.id === +districtId) as OptionSelectProps)};
        {typeQuery && type.onChange(typeSelected)};
        {adTypeQuery && adType.onChange(adTypes.find(item => item.enum === adTypeQuery) as OptionSelectProps)};
        findProperties({adType: adTypeQuery?.toString(), cityId: +cityId, districtId: +districtId, page: +page, typeId: typeSelected?.id });
    }, [adTypeQuery, cityId, districtId, typeQuery]);

    return (
        <FilterContext.Provider value={{
            address,
            type,
            adType,
            results,
            setResults
        }}>
            {children}
        </FilterContext.Provider>
    )
}

function useFilter() {
    return useContext(FilterContext);
}

export {useFilter, FilterProvider, FilterContext}

export default FilterProvider;
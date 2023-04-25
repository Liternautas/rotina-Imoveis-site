import { createContext, useCallback, useContext, useEffect, useState, useMemo } from "react";
import { useForm } from "../hooks/useForm";
import { OptionSelectProps, useSelect, useSelectProps } from "../hooks/useSelect";
import { useAddress, useAddressProps } from "../hooks/useAddress";
import { IProperty } from "../interfaces";
import { adTypes, types } from "../utils/data";
import { useRouter } from "next/router";
import { api } from "../services/api";
import { Loading } from "../ui/components/Loading";
import slugify from "slugify";
import { useNotification } from "../hooks/useNotification";

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
    total: number;
    setTotal(n: number): void;
    page: number;
    setPage(n: number): void;
    handlePage(n: number): void;
    setResults(properties: IProperty[]): void;
    findPropertiesAdmin(page?: number): Promise<void>;
    pickup: useSelectProps;
}

const FilterContext = createContext({} as FilterContextProps);

const FilterProvider = ({ children }) => {
    const router = useRouter();
    const { adType: adTypeQuery, type: typeQuery, cityId, districtId, page: pageQuery } = router.query;
    const notification = useNotification();

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [results, setResults] = useState<IProperty[]>([]);
    const address = useAddress();
    const { city, district, state } = address;
    const pickup = useSelect();
    const priceMin = useForm('price');
    const priceMax = useForm('price');
    const type = useSelect();
    const adType = useSelect();
    const [value, setValue] = useState<number[]>([0, 1000000]);

    const handleTypes = useCallback(async () => {
        const res = await api.get('property-types').then(res => res.data);
        type.setOptions(res);
        adType.setOptions(adTypes);
    }, []);

    useEffect(() => {
        state.onChange({
            name: 'Goiás',
            id: 9
        });
        handleTypes();
    }, []);

    const getPathApi = (page?: number) => {
        const { city, district } = address;
        let path = `properties?page=${page ?? 1}`;
        { adType.value ? path = path + `&adType=${adType.value.enum}` : null }
        { city.value ? path = path + `&cityId=${city.value.id}` : null }
        { pickup.value ? path = path + `&realtorId=${pickup.value.id}` : null }
        { district.value ? path = path + `&districtId=${district.value.id}` : null }
        { type.value ? path = path + `&typeId=${type.value.id}` : null }
        { value ? path = path + `&minPrice=${value[0]}&maxPrice=${value[1]}` : null }

        return path;
    }

    const handlePage = useCallback((page: number) => {
        setPage(page);
        findPropertiesAdmin(page);
    }, []);

    const getPathByRoute = ({ adType, cityId, districtId, page, typeId, maxPrice, minPrice }: FindPropertiesProps) => {
        let path = `properties?`;

        { adType ? path = path + `adType=${adType}` : null }
        { typeId ? path = path + `&typeId=${typeId}` : null }
        { cityId ? path = path + `&cityId=${cityId}` : null }
        { districtId ? path = path + `&districtId=${districtId}` : null }
        { page ? path = path + `&page=${page}` : null }
        return path;
    }

    const findProperties = useCallback(async ({ adType, cityId, districtId, page, typeId, maxPrice, minPrice }: FindPropertiesProps) => {
        try {
            setResults([]);
            setLoading(true);
            const { results, count } = await api.get(getPathByRoute({ adType, cityId, districtId, page, typeId, maxPrice, minPrice })).then(res => res.data);

            if (results) {
                setResults(results);
                setTotal(count);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, [adTypeQuery, cityId, districtId, typeQuery]);

    const findPropertiesAdmin = async (page?: number) => {
        try {
            setLoading(true);
            const res = await api.get(getPathApi(page)).then(res => res.data);

            if (res.success) {
                setResults(res.results);
                setTotal(res.count);
                setPage(res.page);
            };
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const typeSelected = types.find(item => item.slug === typeQuery) as OptionSelectProps;
        //{ cityId && city.onChange(cities.find(item => item.id === +cityId) as OptionSelectProps) };
        //{ districtId && district.onChange(districts.find(item => item.id === +districtId) as OptionSelectProps) };
        { typeQuery && type.onChange(typeSelected) };
        { adTypeQuery && adType.onChange(adTypes.find(item => item.enum === adTypeQuery) as OptionSelectProps) };
        { pageQuery && setPage(+pageQuery) };
        if (adTypeQuery || cityId || districtId || typeQuery || pageQuery) {
            findProperties({ adType: adTypeQuery?.toString(), cityId: +cityId, districtId: +districtId, page: +pageQuery, typeId: typeSelected?.id });
        }
    }, [adTypeQuery, cityId, districtId, typeQuery, pageQuery]);

    return (
        <FilterContext.Provider value={{
            address,
            type,
            adType,
            results,
            pickup,
            setTotal,
            total,
            setResults,
            page,
            setPage,
            handlePage,
            findPropertiesAdmin
        }}>
            <Loading open={loading} />
            {children}
        </FilterContext.Provider>
    )
}

function useFilter() {
    return useContext(FilterContext);
}

export { useFilter, FilterProvider, FilterContext }

export default FilterProvider;
import { createContext, useCallback, useContext, useEffect, useState, useMemo } from "react";
import { useForm } from "../hooks/useForm";
import { OptionSelectProps, useSelect, useSelectProps } from "../hooks/useSelect";
import { useAddress, useAddressProps } from "../hooks/useAddress";
import { IProperty } from "../interfaces";
import { adTypes, types } from "../utils/data";
import { useRouter } from "next/router";
import { cities, districts } from "../utils/address";
import { api } from "../services/api";
import { Loading } from "../ui/components/Loading";
import { useNotification } from "../hooks/useNotification";

interface FindPropertiesProps {
    cityId?: number | string,
    districtId?: number | string,
    typeId?: number | string,
    adType?: number | string,
    page?: number | string,
    maxPrice?: number | string,
    minPrice?: number | string,
    pickupId?: string
}

interface FilterContextProps {
    address: useAddressProps;
    type: useSelectProps;
    users: useSelectProps;
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
    const { adType: adTypeQuery, type: typeQuery, cityId, districtId, page: pageQuery, pickup: pickupQuery } = router.query;
    const notification = useNotification();

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [results, setResults] = useState<IProperty[]>([]);
    const address = useAddress();
    const { city, district, state } = address;
    const pickup = useSelect();
    const users = useSelect();
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
        const asPath = router.asPath;
        let path = `properties?page=${page ?? 1}`;
        { !asPath.startsWith('/admin') ? path = path + '&status=disponivel' : null }
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

    const getPathByRoute = ({ adType, cityId, districtId, page, typeId, maxPrice, minPrice, pickupId }: FindPropertiesProps) => {
        let path = `properties?`;
        const asPath = router.asPath;

        { adType ? path = path + `adType=${adType}` : path = path + `adType=venda` }
        { !asPath.startsWith('/admin') ? path = path + '&status=disponivel' : null }
        { typeId ? path = path + `&typeId=${typeId}` : null }
        { cityId ? path = path + `&cityId=${cityId}` : null }
        { districtId ? path = path + `&districtId=${districtId}` : null }
        { pickupId ? path = path + `&realtorId=${pickupId}` : null }
        { page ? path = path + `&page=${page}` : null }
        return path;
    }

    const findProperties = useCallback(async ({ adType, cityId, districtId, page, typeId, maxPrice, minPrice, pickupId }: FindPropertiesProps) => {
        try {
            setResults([]);
            setLoading(true);
            const { results, count } = await api.get(getPathByRoute({ adType, cityId, districtId, page, typeId, maxPrice, minPrice, pickupId })).then(res => res.data);

            if (results) {
                setResults(results);
                setTotal(count);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, [adTypeQuery, cityId, districtId, typeQuery, pickupQuery]);

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
        { cityId && city.onChange(cities.find(item => item.id === +cityId) as OptionSelectProps) };
        { districtId && district.onChange(districts.find(item => item.id === +districtId) as OptionSelectProps) };
        { typeQuery && type.onChange(typeSelected) };
        { adTypeQuery && adType.onChange(adTypes.find(item => item.enum === adTypeQuery) as OptionSelectProps) };
        { pickupQuery && pickup.onChange({ id: pickupQuery } as OptionSelectProps) };
        { pageQuery && setPage(+pageQuery) };
        if (adTypeQuery || cityId || districtId || typeQuery || pageQuery || pickupQuery) {
            findProperties({ adType: adTypeQuery?.toString(), cityId: +cityId, districtId: +districtId, page: +pageQuery, typeId: typeSelected?.id, pickupId: pickupQuery?.toString() });
        }
    }, [adTypeQuery, cityId, districtId, typeQuery, pageQuery, pickupQuery]);

    return (
        <FilterContext.Provider value={{
            address,
            type,
            users,
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
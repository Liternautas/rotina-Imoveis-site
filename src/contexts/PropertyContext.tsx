import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { maskCep, maskNumber, maskPrice } from "../helpers/mask";
import { useAddress, useAddressProps } from "../hooks/useAddress";
import { useBoolean, useBooleanProps } from "../hooks/useBoolean";
import { useCookies } from "../hooks/useCookies";
import { useForm, useFormProps } from "../hooks/useForm";
import { useMultselect, useMultselectProps } from "../hooks/useMultselect";
import { useNotification } from "../hooks/useNotification";
import { OptionSelectProps, useSelect, useSelectProps } from "../hooks/useSelect";
import { IDetail, IProperty } from "../interfaces";
import { api } from "../services/api";
import { adTypes, types } from "../utils/data";

interface PropertyContextProps {
    address: useAddressProps;
    type: useSelectProps;
    adType: useSelectProps;
    pickup: useSelectProps;
    owner: useSelectProps;

    numberBathroom: useFormProps;
    numberRooms: useFormProps;
    numberSuite: useFormProps;
    numberGarage: useFormProps;

    price: useFormProps;
    iptu: useFormProps;
    exemptIptu: useBooleanProps;
    description: useFormProps;
    usefulArea: useFormProps;
    totalArea: useFormProps;
    characteristics: useMultselectProps;
    furnitures: useMultselectProps;
    extras: useMultselectProps;
    security: useMultselectProps;

    images: Array<string>;
    setImages: any;

    create(): Promise<void>;
    uploadImages(file: File): Promise<void>;
    orderImages(images: Array<string>): Promise<void>;

    details: any;
    setDetails: any;
}

const PropertyContext = createContext({} as PropertyContextProps);

const PropertyProvider = ({ children }) => {
    const router = useRouter();
    const {id} = router.query;

    const [details, setDetails] = useState();

    const adType = useSelect();
    const numberRooms = useForm();
    const numberBathroom = useForm();
    const numberSuite = useForm();
    const numberGarage = useForm();
    const description = useForm();

    const price = useForm('price');
    const iptu = useForm('price');
    const exemptIptu = useBoolean();

    const usefulArea = useForm('number');
    const totalArea = useForm('number');

    const [images, setImages] = useState<Array<string>>([]);
    const type = useSelect();
    const address = useAddress();

    const pickup = useSelect();
    const owner = useSelect();

    //favorites?: IUser;
    const characteristics = useMultselect();
    const furnitures = useMultselect();
    const extras = useMultselect();
    const security = useMultselect();

    const [loading, setLoading] = useState(false);
    const notification = useNotification();
    const cookies = useCookies();

    useEffect(() => {
        type.setOptions(types);
        adType.setOptions(adTypes);
    }, []);

    useEffect(() => {
        if(id) findOne(Number(id));
    }, [id]);

    function findInOptions(param: string, options) {
        let optionSelected;
        options.forEach(option => {
            { option.enum === param ? optionSelected = option : null }
        });
        if(!optionSelected) {
            options.forEach(option => {
                { option.name === param ? optionSelected = option : null }
            });
        }
        return optionSelected;
    }

    const findOne = async (id: number) => {
        try {
            const res = await api.get(`properties/${id}`).then(res => res.data);
            if(res.success && res.property) {
                const property: IProperty = res.property;
                 adType.onChange(findInOptions(property.adType, adTypes));
                 type.onChange(findInOptions(property.type.name, types));
                 owner.onChange(property.owner as OptionSelectProps);
                 pickup.onChange(property.pickup as OptionSelectProps);
                 totalArea.setValue(maskNumber(property.totalArea+''));
                 usefulArea.setValue(maskNumber(property.usefulArea+''));
                 description.setValue(property.description);
                 price.setValue(maskPrice(property.price));
                 iptu.setValue(maskPrice(property.iptu));
                 address.startProps(property.address.state, property.address.city, property.address.district);
                 numberBathroom.setValue(property.numberBathroom);
                 numberGarage.setValue(property.numberGarage);
                 numberRooms.setValue(property.numberRooms);
                 numberSuite.setValue(property.numberSuite);
                 address.number.setValue(property.address.number);
                 address.zipcode.setValue(maskCep(property.address.zipcode));
                 address.complement.setValue(property.address.complement);
                 address.route.setValue(property.address.route);
                 setImages(property?.images ?? []);
                 characteristics.setValue(property.details.filter(item => item.type === 'characteristics'));
                 extras.setValue(property.details.filter(item => item.type === 'extras'));
                 security.setValue(property.details.filter(item => item.type === 'security'));
                 furnitures.setValue(property.details.filter(item => item.type === 'furnitures'));
            }
        } catch (error) {
            notification.execute('danger', error.mensage);
        }
    }

    const create = async () => {
        try {
            setLoading(true);
            
            const property: IProperty = {
                address: {
                    city: {
                        id: +address.city.value.id
                    },
                    district: {
                        id: +address.district.value.id
                    },
                    state: {
                        id: +address.state.value.id
                    },
                    number: Number(address.number.value),
                    route: address.route.value,
                    complement: address.complement.value,
                    zipcode: address.zipcode.value
                },
                adType: adType.value.enum,
                description: description.value,
                exemptIptu: exemptIptu.state,
                iptu: iptu.value,
                numberBathroom: Number(numberBathroom.value),
                numberGarage: Number(numberGarage.value),
                numberRooms: Number(numberRooms.value),
                numberSuite: Number(numberSuite.value),
                price: price.value,
                totalArea: Number(totalArea.value),
                usefulArea: Number(usefulArea.value),
                type: {
                    id: type.value.id as number
                },
                images: images,
                details: [...characteristics.value, ...extras.value, ...furnitures.value, ...security.value],
                owner: {
                    id: owner.value ? owner.value.id.toString() : null
                },
                pickup: {
                    id: pickup.value ? pickup.value.id.toString() : null
                }
            }
            if (id) {
                const res = await api.patch(`properties/${id}`, property).then(res => res.data);
                if (res.success) {
                    router.push(`/admin/properties/update/${res.property.id}`);
                }
            } else {
                alert(`opa`)
                const res = await api.post('properties', property).then(res => res.data);
                if (res.success) {
                    router.push(`/admin/properties/update/${res.property.id}`);
                }
            }
        } catch (error) {
            notification.execute('danger', error.mensage);
        } finally {
            setLoading(false);
        }
    }

    const uploadImages = async (file: File) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append('file', file);
            const res = await api.post(`properties/upload/images/${id}`, data).then(res => res.data);
            setImages(res.images);
        } catch (error) {
            notification.execute('danger', error.mensage);
        }
    }

    const orderImages = async (images: Array<string>) => {
        try {
            setLoading(true);
            const res = await api.post(`properties/order/images/${id}`, {
                images
            }).then(res => res.data);
            setImages(res.images);
        } catch (error) {
            notification.execute('danger', error.mensage);
        }
    }

    return (
        <PropertyContext.Provider value={{
            address,
            type,
            adType,
            pickup,
            owner,

            numberBathroom,
            numberGarage,
            numberRooms,
            numberSuite,

            exemptIptu,
            iptu,
            price,
            description,
            totalArea,
            usefulArea,

            images,
            setImages,

            characteristics,
            extras,
            furnitures,
            security,

            create,
            uploadImages,
            orderImages,

            details,
            setDetails
        }}>
            {children}
        </PropertyContext.Provider>
    )
}

function useProperty() {
    return useContext(PropertyContext);
}

export { useProperty, PropertyProvider }
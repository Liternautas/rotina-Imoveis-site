import slugify from "slugify";
import { IProperty } from "../interfaces";

export const getImageUrl = (path: string) => {
    if (!path) {
        return '/no-image.png';
    }
    return path?.startsWith('storage') ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : path;
}

export const normalize = (value: string) => slugify(value, { lower: true });

export function findInOptions(param: string, options) {
    let optionSelected;
    options.forEach(option => {
        { option.enum === param ? optionSelected = option : null }
    });
    if (!optionSelected) {
        options.forEach(option => {
            { option.name === param ? optionSelected = option : null }
        });
    }
    return optionSelected;
}

export const findNameInOptions = (param: string, options) => {
    let optionSelected = null;
    options.forEach(option => {
        { option.enum === param ? optionSelected = option.name : null }
    });
    return optionSelected;
}

export function getImmobileTitleCard({ address, adType, type }: IProperty) {
    let title = '';
    { type ? title = title + type.name : null }
    { adType && adType === 'aluguel' ? title = title + ' para alugar ' : null }
    { adType && adType === 'venda' ? title = title + ' à venda ' : null }
    { address?.district && address.district.name ? title = title + 'em ' + address.district.name : null }
    { address && !address?.district?.name && address.city?.name ? title = title + 'em ' + address.city.name : null }
    return title;
}
import slugify from "slugify";

export const getImageUrl = (path: string) => {
    if (!path) {
        return '/no-image.png';
    }
    return path?.startsWith('storage') ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : path;
}

export const normalize = (value: string) => slugify(value, {lower: true});

export function findInOptions(param: string, options) {
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
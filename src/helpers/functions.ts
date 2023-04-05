import slugify from "slugify";

export const getImageUrl = (path: string) => {
    if (!path) {
        return '/no-image.png';
    }
    //return path?.startsWith('storage') ? `https://rotina-imoveis.herokuapp.com/${path}` : path;
    return path?.startsWith('storage') ? `http://localhost:8080/${path}` : path;
}

export const normalize = (value: string) => slugify(value, {lower: true});
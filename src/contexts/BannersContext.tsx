import { createContext, useContext, useState, useEffect } from "react";
import { IBanner } from "../interfaces";
import { useRouter } from "next/router";
import { useNotification } from "../hooks/useNotification";
import { api } from "../services/api";
import { blobToFile } from "../helpers/file";
import { Loading } from "../ui/components/Loading";

interface BannersContextProps {
    results: IBanner[];
    setResults(banners: IBanner[]): void;
    total: number;
    setTotal(n: number): void;
    image: string;
    setImage(n: string): void;
    findAll(): Promise<void>;
    create(data: IBanner): Promise<void>;
    update(data: IBanner): Promise<void>;
    remove(id: number): Promise<void>;
}

const BannersContext = createContext({} as BannersContextProps);


const BannersProvider = ({ children }) => {
    const router = useRouter();
    const notification = useNotification();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<IBanner[]>([]);
    const [total, setTotal] = useState(0);
    const [image, setImage] = useState<string>();

    const findAll = async () => {
        try {
            setLoading(false);
            const { results, total, success } = await api.get('banners').then(res => res.data);

            if (success) {
                setResults(results);
                setTotal(total);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }
    const create = async (data: IBanner) => {
        try {
            setLoading(false);
            const { success, message, banner } = await api.post('banners', data).then(res => res.data);

            if (success) {
                notification.execute('success', 'Banner cadastrado com sucesso.');
                if (image) await uploadImage(banner?.id, image);
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }
    const update = async (data: IBanner) => {
        try {
            setLoading(false);
            if (!data.id) throw new Error('É necessário um id.');

            const { success, message, banner } = await api.patch(`banners/${data.id}`, data).then(res => res.data);

            if (success) {
                notification.execute('success', 'Banner atualizado com sucesso.');
                if (image) await uploadImage(data?.id, image);
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }
    const remove = async (id: number) => {
        try {
            setLoading(false);
            const {success, message} = await api.delete(`banners/${id}`).then(res => res.data);

            
            if (success) {
                notification.execute('success', message);
                await findAll();
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }
    const uploadImage = async (id: number, path: string) => {
        try {
            setLoading(true);
            const myFile = await blobToFile(path);
            const form = new FormData();
            form.append('file', myFile);

            const res = await api.patch(`banners/upload-image/${id}`, form).then(res => res.data);

            if (!res.success) throw new Error(res.message);

            notification.execute('success', res.message);
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <BannersContext.Provider value={{
            create,
            findAll,
            remove,
            results,
            setResults,
            setTotal,
            total,
            update,
            image,
            setImage
        }}>
            <Loading open={loading}/>
            {children}
        </BannersContext.Provider>
    )
}

function useBanners() {
    return useContext(BannersContext);
}

export { BannersProvider, useBanners }

export default BannersProvider;
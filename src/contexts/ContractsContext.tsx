import { createContext, useContext, useEffect, useState } from "react";
import { IRentalContract, ISalesContract } from "../interfaces";
import { useNotification } from "../hooks/useNotification";
import { api } from "../services/api";
import { useRouter } from "next/router";
import { Loading } from "../ui/components/Loading";

interface ContractsContextProps {
    sales: ISalesContract[];
    setSales(sales: ISalesContract[]): void;
    rentals: ISalesContract[];
    setRentals(sales: IRentalContract[]): void;
    images: Array<string>;
    setImages: any;
    documentPath: string;
    setDocumentPath: any;
    uploadImages(file: File): Promise<void>;
    orderImages(images: Array<string>): Promise<void>;
    removeImage(path: string): Promise<void>;
    generateDocument(id: number): Promise<void>;

    findRental(): Promise<void>;
    findSales(): Promise<void>;
    createSales(data: ISalesContract): Promise<void>;
    createRental(data: IRentalContract): Promise<void>;
    updateSales(data: ISalesContract): Promise<void>;
    updateRental(data: IRentalContract): Promise<void>;
    removeSales(id: number): Promise<void>;
    removeRental(id: number): Promise<void>;
}

const ContractsContext = createContext({} as ContractsContextProps);

const ContractsProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {id} = router.query;
    const notification = useNotification();

    const [sales, setSales] = useState<ISalesContract[]>([]);
    const [rentals, setRentals] = useState<IRentalContract[]>([]);
    const [images, setImages] = useState<Array<string>>([]);
    const [documentPath, setDocumentPath] = useState(null);

    const findSales = async () => {
        try {
            setLoading(true);
            const { success, results } = await api.get(`sales-contracts`).then(res => res.data);

            if (success) {
                setSales(results);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const findRental = async () => {
        try {
            setLoading(true);
            const { success, results } = await api.get(`rental-contracts`).then(res => res.data);

            if (success) {
                setRentals(results);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const createSales = async (data: ISalesContract) => {
        try {
            setLoading(true);
            const { success, contract, message } = await api.post(`sales-contracts`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de venda criado com sucesso.');
                router.push('/admin/contracts/sales');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const createRental = async (data: IRentalContract) => {
        try {
            setLoading(true);
            const { success, contract, message } = await api.post(`rental-contracts`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de Aluguel criado com sucesso.');
                router.push('/admin/contracts/rentals');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateSales = async (data: ISalesContract) => {
        try {
            setLoading(false);
            const { success, contract, message } = await api.patch(`sales-contracts/${data.id}`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de Venda atualizado com sucesso.');
                router.push('/admin/contracts/sales');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateRental = async (data: IRentalContract) => {
        try {
            setLoading(true);
            const { success, result, message } = await api.patch(`rental-contracts/${data.id}`, data).then(res => res.data);

            if (success && result) {
                notification.execute('success', 'Contrato de Aluguel atualizado com sucesso.');
                router.push('/admin/contracts/rentals');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const removeSales = async (id: number) => {
        try {
            setLoading(true);
            const { success, message } = await api.delete(`sales-contracts/${id}`).then(res => res.data);

            if (success) {
                notification.execute('success', message);
                await findSales();
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    } 

    const removeRental = async (id: number) => {
        try {
            setLoading(true);
            const { success, message } = await api.delete(`rental-contracts/${id}`).then(res => res.data);

            if (success) {
                notification.execute('success', message);
                await findRental();
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const uploadImages = async (file: File) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append('file', file);
            const res = await api.post(`rental-contracts/${id}/upload/images`, data).then(res => res.data);
            setImages(res.images);
        } catch (error) {
            notification.execute('danger', error.mensage);
        } finally {
            setLoading(false);
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
        } finally {
            setLoading(false);
        }
    }
    
    const removeImage = async (path: string) => {
        try {
            setLoading(true);
            const res = await api.post(`properties/remove/images/${id}`, {
                path
            }).then(res => res.data);
            if(res.success) {
                setImages(res.images);
                notification.execute('success', res.message);
            } else {
                notification.execute('danger', res.mensage);
            }
        } catch (error) {
            notification.execute('danger', error.mensage);
        } finally {
            setLoading(false);
        }
    }

    const generateDocument = async (id: number) => {
        try {
            setLoading(true);
            const res = await api.patch(`rental-contracts/${id}/generate-document`).then(res => res.data);
            if(res.success) {
                notification.execute('success', res.mensage);
                setDocumentPath(res.path);
            } else {
                throw new Error(res.mensage);
            }
        } catch (error) {
            notification.execute('danger', error.mensage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ContractsContext.Provider value={{
            createRental,
            createSales,
            updateRental,
            updateSales,
            generateDocument,
            findRental,
            findSales,
            removeRental,
            removeSales,
            images,
            setImages,
            documentPath,
            setDocumentPath,
            uploadImages,
            rentals,
            sales,
            setRentals,
            setSales,
            orderImages,
            removeImage,
        }}>
            <Loading open={loading}/>
            {children}
        </ContractsContext.Provider>
    )
}

function useContracts() {
    return useContext(ContractsContext);
}

export { ContractsProvider, useContracts }
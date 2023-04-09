import { createContext, useContext, useEffect, useState } from "react";
import { IRentalContract, ISalesContract } from "../interfaces";
import { useNotification } from "../hooks/useNotification";
import { api } from "../services/api";
import { useRouter } from "next/router";

interface ContractsContextProps {
    sales: ISalesContract[];
    setSales(sales: ISalesContract[]): void;
    rentals: ISalesContract[];
    setRentals(sales: IRentalContract[]): void;

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
    const notification = useNotification();

    const [sales, setSales] = useState<ISalesContract[]>([]);
    const [rentals, setRentals] = useState<IRentalContract[]>([]);

    const findSales = async () => {
        try {
            const { success, results } = await api.get(`sales-contracts`).then(res => res.data);

            if (success) {
                setSales(results);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const findRental = async () => {
        try {
            const { success, results } = await api.get(`rental-contracts`).then(res => res.data);

            if (success) {
                setRentals(results);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const createSales = async (data: ISalesContract) => {
        try {
            const { success, contract, message } = await api.post(`sales-contracts`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de venda criado com sucesso.');
                router.push('/admin/contracts/sales');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const createRental = async (data: IRentalContract) => {
        try {
            const { success, contract, message } = await api.post(`rental-contracts`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de Aluguel criado com sucesso.');
                router.push('/admin/contracts/rentals');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const updateSales = async (data: ISalesContract) => {
        try {
            const { success, contract, message } = await api.patch(`sales-contracts/${data.id}`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de Venda atualizado com sucesso.');
                router.push('/admin/contracts/sales');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const updateRental = async (data: IRentalContract) => {
        try {
            const { success, contract, message } = await api.patch(`rental-contracts/${data.id}`, data).then(res => res.data);

            if (success && contract) {
                notification.execute('success', 'Contrato de Aluguel atualizado com sucesso.');
                router.push('/admin/contracts/rental');
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const removeSales = async (id: number) => {
        try {
            const { success, message } = await api.delete(`sales-contracts/${id}`).then(res => res.data);

            if (success) {
                notification.execute('success', message);
                await findSales();
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    const removeRental = async (id: number) => {
        try {
            const { success, message } = await api.delete(`rental-contracts/${id}`).then(res => res.data);

            if (success) {
                notification.execute('success', message);
                await findRental();
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        }
    }

    return (
        <ContractsContext.Provider value={{
            createRental,
            createSales,
            updateRental,
            updateSales,
            findRental,
            findSales,
            removeRental,
            removeSales,
            rentals,
            sales,
            setRentals,
            setSales
        }}>
            {children}
        </ContractsContext.Provider>
    )
}

function useContracts() {
    return useContext(ContractsContext);
}

export { ContractsProvider, useContracts }
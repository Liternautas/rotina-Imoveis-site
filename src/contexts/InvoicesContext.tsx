import { createContext, useContext, useState } from "react";
import { IInvoice } from "../interfaces";
import { api } from "../services/api";
import { useRouter } from "next/router";
import { useNotification } from "../hooks/useNotification";

export type InvoiceStatus = 'pendente' | 'pago' | 'vencida' | 'cancelada';

interface InvoicesContextProps {
    results: IInvoice[];
    setResults(results: IInvoice[]);
    file: File;
    setFile(file: File): void;
    
    findAll(): Promise<void>;
    create(data: IInvoice): Promise<void>;
    update(data: IInvoice): Promise<void>;
    remove(id: string): Promise<void>;
    chanceStatus(id: string, status: InvoiceStatus): Promise<void>;
    payInvoice(id: string, date: Date): Promise<void>;
}

const InvoicesContext = createContext({} as InvoicesContextProps);

const InvoicesProvider = ({children}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const notification = useNotification();
    const [results, setResults] = useState<IInvoice[]>([]);
    const [file, setFile] = useState<File>(null);

    const findAll = async () => {
        try {
            setLoading(true);
            const {results} = await api.get('invoices').then(res => res.data);
            if(results) {
                setResults(results);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(true);
        }
    }

    const create = async (data: IInvoice) => {
        try {
            setLoading(true);
            const res = await api.post('invoices', data).then(res => res.data);
            if(res.success) {
                notification.execute('success', 'Fatura cadastrada com sucesso.');
                if(file) {
                    const form = new FormData();
                    form.append('file', file);
                    const {success} = await api.post(`invoices/${res.invoice.id}/upload`, form).then(res => res.data);
    
                    if(success) {
                        notification.execute('success', 'Upload de Fatura realizado com sucesso.');
                    } else {
                        throw new Error(res.message);
                    }
                }
                router.push('/admin/contracts/boletos');
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(true);
        }
    }

    const update = async (data: IInvoice) => {
        try {
            setLoading(true);

            if(!data.id) {
                throw new Error('Id é necessário para está ação.');
            }

            const res = await api.patch(`invoices/${data.id}`, data).then(res => res.data);

            if(res.success) {
                notification.execute('success', 'Fatura atualizada com sucesso.');
                if(file) {
                    const form = new FormData();
                    form.append('file', file);
                    const res = await api.post(`invoices/${data.id}/upload`, form).then(res => res.data);
    
                    if(res.success) {
                        notification.execute('success', 'Upload de Fatura realizado com sucesso.');
                    } else {
                        throw new Error(res.message);
                    }
                }
                router.push('/admin/contracts/boletos');
            } else {
                throw new Error(res.message);
            }

        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(true);
        }
    }
    
    const chanceStatus = async (id: string, status: InvoiceStatus) => {
        try {
            setLoading(true);

            const res = await api.patch(`invoices/${id}`, {
                status
            }).then(res => res.data);

            if(res.success) {
                notification.execute('success', 'Status da fatura atualizado com sucesso.');
                await findAll();
            } else {
                throw new Error(res.message);
            }

        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(true);
        }
    }
    
    const payInvoice = async (id: string, date: Date) => {
        try {
            setLoading(true);

            const res = await api.patch(`invoices/${id}`, {
                status: 'pago',
                payment: date
            }).then(res => res.data);

            if(res.success) {
                notification.execute('success', 'Status da fatura atualizado com sucesso.');
                await findAll();
            } else {
                throw new Error(res.message);
            }

        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(true);
        }
    }

    const remove = async (id: string) => {
        try {
            setLoading(true);

            const res = await api.delete(`invoices/${id}`).then(res => res.data);
            if(res.success) {
                notification.execute('success', 'Fatura removida com sucesso.');
                await findAll();
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(true);
        }
    }


    return (
        <InvoicesContext.Provider value={{
            create,
            file,
            findAll,
            remove,
            results,
            setFile,
            setResults,
            update,
            chanceStatus,
            payInvoice
        }}>
            {children}
        </InvoicesContext.Provider>
    )
}

function useInvoices() {
    return useContext(InvoicesContext);
}

export {useInvoices, InvoicesProvider}

export default InvoicesProvider;
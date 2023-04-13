import { createContext, useContext, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { IUser, Role } from "../interfaces";
import { api } from "../services/api";
import { Loading } from "../ui/components/Loading";

interface UserContextProps {
    findAll(customers?: boolean): Promise<void>;
    create(user: IUser, role: Role): Promise<void>;
    remove(id: string): Promise<void>;
    update(user: IUser): Promise<void>;
    uploadAvatar(id: string, file: File): Promise<void>;

    results: IUser[];
    setResults: any;
    loading: boolean;
}

const UserContext = createContext({} as UserContextProps);

const UserProvider = ({ children }) => {
    const [results, setResults] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const notification = useNotification();

    const findAll = async (customers?: boolean) => {
        let res;
        try {
            setLoading(true);
            if (customers) {
                res = await api.get('users/customers').then(res => res.data);
            } else {
                res = await api.get('users').then(res => res.data);
            }
            setResults(res.results);
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false)
        }
    }

    const create = async (user: IUser, role: Role) => {
        let res;
        try {
            setLoading(true);
            console.log(user, role);
            switch (role) {
                case Role.admin:
                    res = await api.post('users/administrators', user).then(res => res.data);
                    break;
                case Role.collaborator:
                    res = await api.post('users/collaborators', user).then(res => res.data);
                    break;
                case Role.customer:
                    res = await api.post('users/customers', user).then(res => res.data);
                    break;
                case Role.owner:
                    res = await api.post('users/owners', user).then(res => res.data);
                    break;
                case Role.realtor:
                    res = await api.post('users/realtors', user).then(res => res.data);
                    break;
            }
            if (!res.success) {
                throw new Error(res.message);
            } else {
                notification.execute('success', "Usuário cadastrado com sucesso.");
                findAll(role === Role.customer);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const update = async (user: IUser) => {
        try {
            setLoading(true);
            const res = await api.patch(`users/${user.id}`, user).then(res => res.data);
            if (!res.success) {
                throw new Error(res.message);
            } else {
                notification.execute('success', "Usuário cadastrado com sucesso.");
                findAll(res.user.role ?? null);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    const remove = async (id: string) => {
        let res;
        try {
            setLoading(true);
            res = await api.delete(`users/${id}`).then(res => res.data);

            if(!res.success) throw new Error(res.message);
            notification.execute('success', 'Usuário removido com sucesso.')
            findAll()
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false)
        }
    }

    const uploadAvatar = async (id: string, file: File) => {
        try {
            setLoading(true);

            const data = new FormData();
            data.append('file', file);

            const res = await api.post(`users/upload/avatar/${id}`, data).then(res => res.data);

            if(res.success) {
                notification.execute('success', res.message);    
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{
            create,
            update,
            findAll,
            loading,
            results,
            setResults,
            remove,
            uploadAvatar
        }}>
            <Loading open={loading}/>
            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext);

    return context;
};

export { UserProvider, useUser };

export default UserProvider;
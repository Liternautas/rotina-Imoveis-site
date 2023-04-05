import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "../hooks/useCookies";
import { useNotification } from "../hooks/useNotification";
import { IUser } from "../interfaces";
import { api } from "../services/api";
import { destroyCookie } from "nookies";

interface AuthProps {
    user: IUser;
    loading: boolean;
    signIn(email: string, password: string): Promise<void>;
    signInCustomer(email: string, password: string): Promise<void>;
    signOut(): Promise<void>;
    signUp(data: IUser): Promise<void>;
}

const AuthContext = createContext({} as AuthProps);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState<IUser>(null);
    const [loading, setLoading] = useState(false);
    const notification = useNotification();
    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        const { 'imob.token': token, 'imob.user': user } = cookies.get();
        if (token && user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true);
            const {user, token} = await api.post('auth', {email, password}).then(res => res.data);
            if(user && token) {
                setUser(user);
                cookies.set('imob.user', JSON.stringify(user));
                cookies.set('imob.token', token);
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                router.push('/admin');
            } else {
                throw new Error('Email e/ou senha incorretas.');
            }
        } catch (error) {
            notification.execute('danger', error.mensage)
        } finally {
            setLoading(false);
        }
    }

    const signInCustomer = async (email: string, password: string) => {
        try {
            setLoading(true);
            const {user, token} = await api.post('auth/customer', {email, password}).then(res => res.data);
            if(user && token) {
                setUser(user);
                cookies.set('imob.user', JSON.stringify(user));
                cookies.set('imob.token', token);
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                alert(user.name);
                router.push('/area-do-cliente');
            } else {
                throw new Error('Email e/ou senha incorretas.');
            }
        } catch (error) {
            notification.execute('danger', error.mensage)
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        setUser(null);
        destroyCookie(undefined, 'mobilar.user');
        destroyCookie(undefined, 'mobilar.token');
        router.push('/')
    }

    const signUp = async (data: IUser) => {

    }

    return (
        <AuthContext.Provider value={{
            loading,
            signIn,
            signInCustomer,
            signOut,
            signUp,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

export {useAuth, AuthProvider}

export default AuthProvider;
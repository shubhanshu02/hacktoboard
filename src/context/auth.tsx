import { DbUser } from '../types/db';
import {} from '../utils/dbFunctions';
import { auth, User, GoogleAuthProvider, signInWithPopup } from './firebase';
import {
    useEffect,
    useState,
    createContext,
    useContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
} from 'react';

const AuthContext = createContext<{
    handleLogout: () => void;
    handleSignIn: () => void;
    setFirebaseUser: Dispatch<SetStateAction<User | null>>;
    firebaseUser: User | null;
    loading: boolean;
    user: DbUser | null;
    setUser: Dispatch<SetStateAction<DbUser | null>>;
}>({
    handleLogout: () => {},
    handleSignIn: () => {},
    setFirebaseUser: () => {},
    firebaseUser: null,
    loading: false,
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [user, setUser] = useState<DbUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleSignIn = async () => {
        var provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        auth.languageCode = 'en';
        signInWithPopup(auth, provider)
            .then(() => {})
            .catch((err) => {
                const errorMessage = err.message;
                alert(errorMessage);
            });
    };

    const handleLogout = async () => {
        auth.signOut()
            .then(function () {
                setFirebaseUser(null);
            })
            .catch((err) => {
                const errorMessage = err.message;
                alert(errorMessage);
            });
    };

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((authUser) => {
            setFirebaseUser(authUser as User | null);
            if (authUser) {
            }
        });
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                firebaseUser,
                setFirebaseUser,
                loading,
                handleSignIn,
                handleLogout,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import { DbUser, addUser, searchCurrentUserInDatabase } from './db';
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
import { useIonModal } from '@ionic/react';
import RegisterModal from '../components/RegisterModal';

const AuthContext = createContext<{
    handleLogout: () => Promise<void>;
    handleSignIn: () => Promise<void>;
    setFirebaseUser: Dispatch<SetStateAction<User | null>>;
    firebaseUser: User | null;
    loading: boolean;
    user: DbUser | null;
    setUser: Dispatch<SetStateAction<DbUser | null>>;
}>({
    handleLogout: () => new Promise(() => {}),
    handleSignIn: () => new Promise(() => {}),
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [present, dismiss] = useIonModal(RegisterModal, {
        firebaseUser,
        setUser,
    });

    const handleSignIn = async (): Promise<void> => {
        setLoading(true);
        var provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        auth.languageCode = 'en';
        signInWithPopup(auth, provider)
            .then(() => {})
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const handleLogout = async (): Promise<void> => {
        auth.signOut()
            .then(function () {
                setFirebaseUser(null);
                setUser(null);
            })
            .catch(() => {});
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (authUser) => {
            setLoading(true);
            setFirebaseUser(authUser as User | null);
            if (authUser) {
                const fetchedUser: DbUser | null =
                    await searchCurrentUserInDatabase(authUser?.uid || '');
                if (fetchedUser) setUser(fetchedUser);
                else present({ backdropDismiss: false });
            }
            setLoading(false);
        });
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

export async function handleRegistration(
    userId: string,
    name: string,
    email: string,
    github: string,
    branch: string,
    rollNo: number,
    setUser: Dispatch<SetStateAction<DbUser | null>>
) {
    addUser({ name, email, github, branch, rollNo, userId });
    setUser({ name, email, github, branch, rollNo, userId });
}

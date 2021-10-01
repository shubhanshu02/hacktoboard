import {
    IonContent,
    IonHeader,
    IonPage,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
    IonToolbar,
    IonMenuButton,
} from '@ionic/react';
import './Home.css';
import { useAuth } from '../context/auth';
import { logOutOutline, logoGoogle } from 'ionicons/icons';

const Home: React.FC = () => {
    const { handleSignIn, user, loading, firebaseUser, handleLogout } =
        useAuth();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>HacktoBoard</IonTitle>
                    {user ? (
                        <>
                            <IonButtons slot="end">
                                <span>Hi, {'Shubhanshu'}!</span>
                                <IonButton
                                    onClick={async () => await handleLogout()}
                                >
                                    <IonIcon
                                        slot="icon-only"
                                        icon={logOutOutline}
                                    ></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </>
                    ) : (
                        <IonButtons slot="end">
                            <IonButton
                                slot="start"
                                onClick={async () => await handleSignIn()}
                            >
                                Login with&nbsp;
                                <IonIcon icon={logoGoogle} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div>
                    <p>{JSON.stringify(firebaseUser)}</p>
                    <IonButton slot="end">
                        {loading ? 'True' : 'False'}
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;

import './Home.css';
import { useAuth } from '../context/auth';
import { logOutOutline, logoGoogle } from 'ionicons/icons';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
    IonImg,
    IonToolbar,
    IonMenuButton,
    IonGrid,
} from '@ionic/react';

const Home = () => {
    const { handleSignIn, user, handleLogout } = useAuth();
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
                <IonGrid>
                    <IonImg src="/assets/hacktoberfest.svg" />
                    <div className="ion-text-center">
                        <h1>
                            Official Leaderboard for Students of IIT BHU taking
                            part in HacktoberFest 2021{' '}
                        </h1>
                    </div>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;

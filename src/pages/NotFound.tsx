import Lottie from 'react-lottie';
import { useAuth } from '../context/auth';
import { logOutOutline, logoGoogle } from 'ionicons/icons';
import animationData from '../lottie/404.json';
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
    IonCol,
    IonRow,
    IonLabel,
} from '@ionic/react';

const NotFound = () => {
    const { handleSignIn, user, handleLogout } = useAuth();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Page Not Found</IonTitle>
                    {user ? (
                        <>
                            <IonButtons slot="end">
                                <span>Hi, {user.name}!</span>
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
            <IonContent>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: animationData,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                            height={200}
                            width={250}
                        />
                        <IonLabel>Page Not Found!</IonLabel>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default NotFound;

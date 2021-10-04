import Lottie from 'react-lottie';
import { useAuth } from '../context/auth';
import { logoGithub, logOutOutline, logoGoogle } from 'ionicons/icons';
import { rocketOutline, schoolOutline } from 'ionicons/icons';
import animationData from '../lottie/401.json';
import MySubmissions from '../components/MySubmissions';
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
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
} from '@ionic/react';

const Profile = () => {
    const { handleSignIn, user, handleLogout } = useAuth();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
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
            <IonContent class="scroll-content">
                {!user ? (
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
                            <IonLabel>
                                Sorry, you aren't authorised to view this page.
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                ) : (
                    <>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>{user.name}</IonCardTitle>
                                <IonCardSubtitle>
                                    <IonItem
                                        lines="none"
                                        href={
                                            'http://github.com/' + user.github
                                        }
                                        routerDirection="none"
                                    >
                                        <IonLabel>{user.github}</IonLabel>
                                        <IonIcon
                                            slot="start"
                                            icon={logoGithub}
                                        ></IonIcon>
                                    </IonItem>
                                </IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>{user.about}</IonCardContent>
                            <IonItem className="ion-activated">
                                <IonIcon icon={schoolOutline} slot="start" />
                                <IonLabel>Branch: </IonLabel>
                                <IonLabel>{user.branch}</IonLabel>
                            </IonItem>
                            <IonItem className="ion-activated">
                                <IonIcon icon={rocketOutline} slot="start" />
                                <IonLabel>Roll Number: </IonLabel>
                                <IonLabel>{user.rollNo}</IonLabel>
                            </IonItem>
                        </IonCard>
                        <MySubmissions />
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Profile;

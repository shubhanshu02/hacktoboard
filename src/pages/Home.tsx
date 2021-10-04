import './Home.css';
import { useAuth } from '../context/auth';
import { logOutOutline, logoGoogle, cafeOutline } from 'ionicons/icons';
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
    IonFooter,
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
                    <IonTitle>Home</IonTitle>
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
                <IonGrid>
                    <div
                        className="ion-text-center ion-align-self-center"
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '2rem',
                            width: '70%',
                        }}
                    >
                        <IonImg
                            src="/assets/hacktoberfest.svg"
                            alt="HacktoberFest 2021 Banner"
                        />
                        <h1>
                            Official Leaderboard for Students of IIT BHU taking
                            part in HacktoberFest 2021{' '}
                        </h1>
                    </div>
                </IonGrid>
            </IonContent>

            <IonFooter className="ion-no-border" translucent>
                <IonToolbar className="ion-text-center">
                    <p>
                        Build by{' '}
                        <a href="https://github.com/shubhanshu02">
                            Shubhanshu Saxena
                        </a>{' '}
                        with lots of{' '}
                        <IonIcon slot="end" icon={cafeOutline}></IonIcon>{' '}
                    </p>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Home;

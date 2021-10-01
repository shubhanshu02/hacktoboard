import Lottie from 'react-lottie';
import { useAuth } from '../context/auth';
import { createOutline, logOutOutline, logoGoogle } from 'ionicons/icons';
import animationData from '../lottie/401.json';
import { useState } from 'react';
import { DbUser } from '../context/db';
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
    IonInput,
    IonList,
    IonDatetime,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
} from '@ionic/react';

const Submit = ({ user }: { user: DbUser }) => {
    const [link, setLink] = useState<string>('');
    const [org, setOrg] = useState<string>('');
    const [date, setDate] = useState<string>('');

    return (
        <IonList style={{ marginTop: 10, padding: 20 }}>
            <IonItem>
                <IonLabel position="floating">Organisation Name</IonLabel>
                <IonInput
                    value={org}
                    placeholder="Enter Organisation Name"
                    onIonChange={(e) => setOrg(e.detail.value!)}
                ></IonInput>
            </IonItem>

            <IonItem>
                <IonLabel position="floating">GitHub Username</IonLabel>
                <IonInput value={user.github} readonly></IonInput>
            </IonItem>

            <IonItem>
                <IonLabel position="floating">Link to Contribution</IonLabel>
                <IonInput
                    value={link}
                    type="url"
                    onIonChange={(e) => setLink(e.detail.value!)}
                ></IonInput>
            </IonItem>

            <IonItem>
                <IonLabel position="floating">Date</IonLabel>
                <IonDatetime
                    value={date}
                    display-timezone="ist"
                    placeholder="Select Date of Contribution"
                    onIonChange={(e) => setDate(e.detail.value!)}
                ></IonDatetime>
            </IonItem>

            <div className="ion-text-center" style={{ marginTop: 15 }}>
                <IonButton onClick={() => {}}>
                    <IonIcon icon={createOutline} />
                    Register
                </IonButton>
            </div>
        </IonList>
    );
};

const Profile: React.FC = () => {
    const { handleSignIn, user, loading, firebaseUser, handleLogout } =
        useAuth();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Add Contribution Record</IonTitle>
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
            <IonContent>
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
                                <IonCardTitle>
                                    Submit a Pull Request/Issue Entry
                                </IonCardTitle>
                                <IonCardSubtitle>
                                    <IonItem lines="none" button>
                                        <IonLabel>
                                            <h2>Instructions:</h2>
                                            <ol>
                                                <li>
                                                    Submit only your
                                                    contributions.
                                                </li>
                                            </ol>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardSubtitle>
                            </IonCardHeader>

                            <Submit user={user} />
                            <IonCardContent></IonCardContent>
                        </IonCard>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Profile;

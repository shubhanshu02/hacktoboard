import { LeaderboardType } from '../context/db';
import dayjs from 'dayjs';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonCol,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonButton,
} from '@ionic/react';

const RegisterModal = ({
    selectedUser,
    leaderboard,
    onDismiss,
}: {
    selectedUser: string;
    leaderboard: LeaderboardType;
    onDismiss: () => {};
}) => {
    const numVerified = leaderboard.contributionMap[selectedUser].filter(
        (el) => el.verified
    ).length;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {leaderboard.userData[selectedUser].name}'s
                        Contributions
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList style={{ marginTop: 10, padding: 20 }}>
                    <IonItem>
                        <IonCol>Date Filed</IonCol>
                        <IonCol>Organisation</IonCol>
                        <IonCol>Date of Contribution</IonCol>
                        <IonCol>Verified?</IonCol>
                    </IonItem>
                    {leaderboard.contributionMap[selectedUser].map((el) => (
                        <IonItem href={el.link} button>
                            <IonCol>
                                {dayjs(el.date, 'YYYY-MM-DD').format(
                                    'MMM D,  h:mm a'
                                )}
                            </IonCol>
                            <IonCol>{el.org}</IonCol>
                            <IonCol>
                                {dayjs(el.date, 'YYYY-MM-DD').format(
                                    'MMMM DD, YYYY'
                                )}
                            </IonCol>
                            <IonCol>{el.verified ? 'Yes' : 'No'}</IonCol>
                        </IonItem>
                    ))}
                </IonList>
                <IonList style={{ marginTop: 10, padding: 20 }}>
                    <IonItem>
                        <IonCol>Total Contributions:</IonCol>
                        <IonCol>
                            {leaderboard.contributionMap[selectedUser].length}
                        </IonCol>
                    </IonItem>
                    <IonItem>
                        <IonCol>Total Verified Contributions:</IonCol>
                        <IonCol>{numVerified}</IonCol>
                    </IonItem>

                    <div className="ion-text-center" style={{ marginTop: 15 }}>
                        <IonButton onClick={() => onDismiss()}>Close</IonButton>
                    </div>
                </IonList>
            </IonContent>
        </IonPage>
    );
};
export default RegisterModal;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { getLeaderboard, LeaderboardType } from '../context/db';
import { logOutOutline, logoGoogle } from 'ionicons/icons';
import { barChartOutline } from 'ionicons/icons';
import UserContributionsPage from '../components/UserContributionsPage';
import {
    IonBadge,
    IonContent,
    IonHeader,
    IonPage,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
    useIonModal,
    IonToolbar,
    IonMenuButton,
    IonCol,
    IonCard,
    IonSpinner,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
} from '@ionic/react';

const Leaderboard = () => {
    const { handleSignIn, user, handleLogout, firebaseUser } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardType>(
        {} as LeaderboardType
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const onDismiss = () => {
        dismiss();
    };
    const [present, dismiss] = useIonModal(UserContributionsPage, {
        selectedUser,
        leaderboard,
        onDismiss,
    });

    useEffect(() => {
        setLoading(true);
        getLeaderboard()
            .then((data) => setLeaderboard(data as LeaderboardType))
            .finally(() => setLoading(false));
        //    console.log(leaderboard);
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Leaderboard</IonTitle>
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
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Tentative Leaderboard</IonCardTitle>
                        <IonCardSubtitle>
                            Contains Unverified Entries
                        </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        {loading ? (
                            <div className="ion-text-center">
                                <IonSpinner slot="start" name="bubbles" />
                                <p>Loading Submissions</p>
                            </div>
                        ) : !leaderboard.contributionCounts.length ? (
                            <IonItem lines="none" button>
                                <IonIcon icon={barChartOutline} slot="start" />
                                <IonLabel>
                                    Waiting for Users to Submissions
                                </IonLabel>
                                <IonLabel>Please come back later</IonLabel>
                            </IonItem>
                        ) : (
                            <div className="table-responsive">
                                <IonItem>
                                    <IonCol>Github Username</IonCol>
                                    <IonCol>Name</IonCol>
                                    <IonCol>Branch</IonCol>
                                    <IonCol>Total Contributions</IonCol>
                                </IonItem>
                                {leaderboard.contributionCounts.map((el) => (
                                    <IonItem
                                        button
                                        onClick={() => {
                                            setSelectedUser(el.userId);
                                            present();
                                        }}
                                    >
                                        <IonCol>
                                            {
                                                leaderboard.userData[el.userId]
                                                    .github
                                            }
                                        </IonCol>
                                        <IonCol>
                                            {
                                                leaderboard.userData[el.userId]
                                                    .name
                                            }
                                        </IonCol>
                                        <IonCol>
                                            {
                                                leaderboard.userData[el.userId]
                                                    .branch
                                            }
                                        </IonCol>
                                        <IonCol>
                                            {el.count}{' '}
                                            {firebaseUser &&
                                                firebaseUser.uid ===
                                                    el.userId && (
                                                    <IonBadge color="primary">
                                                        ME
                                                    </IonBadge>
                                                )}
                                        </IonCol>
                                    </IonItem>
                                ))}
                            </div>
                        )}
                        <div
                            style={{ marginTop: '10px' }}
                            className="ion-text-right"
                        >
                            <IonCardSubtitle>
                                Note: Click on Individual Users to view their
                                contributions.
                            </IonCardSubtitle>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Leaderboard;

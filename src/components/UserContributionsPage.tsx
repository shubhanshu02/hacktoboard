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
import { Table } from 'react-bootstrap';
import '../pages/Leader.css';

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
                    <Table hover>
                        <thead>
                            <tr>
                                <th className="hide-widget">Date Filed</th>
                                <th>Organisation</th>
                                <th className="hide-widget-minimum">
                                    Date of Contribution
                                </th>
                                <th>Verified?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.contributionMap[selectedUser].map(
                                (el, index) => (
                                    <tr
                                        onClick={() => {
                                            window.open(el.link, '_blank')?.focus();
                                        }}
                                        key={el.userId + index}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="hide-widget">
                                            {dayjs(
                                                el.date,
                                                'YYYY-MM-DD'
                                            ).format('MMM D,  h:mm a')}
                                        </td>
                                        <td>{el.org}</td>
                                        <td className="hide-widget-minimum">
                                            {dayjs(
                                                el.date,
                                                'YYYY-MM-DD'
                                            ).format('MMMM DD, YYYY')}
                                        </td>
                                        <td>{el.verified ? 'Yes' : 'No'}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
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

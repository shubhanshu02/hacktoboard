import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonCardContent,
    IonItem,
    IonIcon,
    IonSpinner,
    IonLabel,
} from '@ionic/react';
import dayjs from 'dayjs';
import { barChartOutline } from 'ionicons/icons';
import { getMySubmissions, DbContribution } from '../context/db';
import { useAuth } from '../context/auth';
import { useEffect, useState } from 'react';

export default function MySubmissions() {
    const { firebaseUser } = useAuth();
    const [submissions, setSubmissions] = useState<DbContribution[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (firebaseUser) {
            setLoading(true);
            getMySubmissions(firebaseUser.uid)
                .then((data) => setSubmissions(data))
                .finally(() => setLoading(false));
        }
    }, [firebaseUser]);

    return (
        <>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>HacktoberFest 2021</IonCardSubtitle>
                    <IonCardTitle>My Submissions</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    {firebaseUser ? (
                        <>
                            {loading ? (
                                <div className="ion-text-center">
                                    <IonSpinner slot="start" name="bubbles" />
                                    <p>Loading</p>
                                </div>
                            ) : !submissions.length ? (
                                <IonItem lines="none" button>
                                    <IonIcon
                                        icon={barChartOutline}
                                        slot="start"
                                    />
                                    <IonLabel>No Submissions Found</IonLabel>
                                </IonItem>
                            ) : (
                                <>
                                    <IonItem button>
                                        <IonCol>Date Filed</IonCol>
                                        <IonCol>Organisation</IonCol>
                                        <IonCol>Date of Contribution</IonCol>
                                        <IonCol>Verified?</IonCol>
                                    </IonItem>
                                    {submissions.map((el) => (
                                        <IonItem
                                            href={el.link}
                                            key={el.date + el.github}
                                            button
                                        >
                                            <IonCol>
                                                {dayjs(
                                                    el.date,
                                                    'YYYY-MM-DD'
                                                ).format('MMM D,  h:mm a')}
                                            </IonCol>
                                            <IonCol>{el.org}</IonCol>
                                            <IonCol>
                                                {dayjs(
                                                    el.date,
                                                    'YYYY-MM-DD'
                                                ).format('MMMM DD, YYYY')}
                                            </IonCol>
                                            <IonCol>
                                                {el.verified ? 'Yes' : 'No'}
                                            </IonCol>
                                        </IonItem>
                                    ))}
                                </>
                            )}
                        </>
                    ) : null}
                </IonCardContent>
            </IonCard>
        </>
    );
}

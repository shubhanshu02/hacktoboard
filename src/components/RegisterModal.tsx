import { createOutline } from 'ionicons/icons';
import { User } from '../context/firebase';
import { DbUser } from '../context/db';
import { handleRegistration } from '../context/auth';
import { Dispatch, useState, SetStateAction } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonIcon,
    IonTextarea,
    IonButton,
    useIonToast,
} from '@ionic/react';

const RegisterModal = ({
    firebaseUser,
    setUser,
    dismissModal,
}: {
    firebaseUser: User | null;
    setUser: Dispatch<SetStateAction<DbUser | null>>;
    dismissModal: () => void;
}) => {
    const [name, setName] = useState<string>('');
    const [github, setGithub] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [rollNo, setRollNo] = useState<number>();
    const [present, dismiss] = useIonToast();

    const toast = (msg: string, msgType: string) => {
        present({
            buttons: [
                {
                    text: 'hide',
                    handler: () => dismiss(),
                },
            ],
            color: msgType,
            message: msg,
            duration: 1000,
        });
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>User Registration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {firebaseUser ? (
                    <IonList style={{ marginTop: 10, padding: 20 }}>
                        <IonItem>
                            <IonLabel position="floating">Name</IonLabel>
                            <IonInput
                                value={name}
                                placeholder="Enter Name"
                                onIonChange={(e) => setName(e.detail.value!)}
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                value={firebaseUser.email}
                                readonly
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">
                                GitHub Username
                            </IonLabel>
                            <IonInput
                                value={github}
                                onIonChange={(e) => setGithub(e.detail.value!)}
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">about</IonLabel>
                            <IonTextarea
                                value={about}
                                onIonChange={(e) => setAbout(e.detail.value!)}
                            ></IonTextarea>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Branch</IonLabel>
                            <IonInput
                                value={branch}
                                placeholder="Enter Branch"
                                onIonChange={(e) => setBranch(e.detail.value!)}
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Roll Number</IonLabel>
                            <IonInput
                                type="number"
                                value={rollNo}
                                placeholder="Enter Roll Number"
                                onIonChange={(e) =>
                                    setRollNo(parseInt(e.detail.value!, 10))
                                }
                            ></IonInput>
                        </IonItem>
                        <div
                            className="ion-text-center"
                            style={{ marginTop: 15 }}
                        >
                            <IonButton
                                onClick={() => {
                                    if (name.trim() === '') {
                                        toast('Enter Name', 'warning');
                                    } else if (github.trim() === '') {
                                        toast(
                                            'Enter GitHub Username',
                                            'warning'
                                        );
                                    } else if (branch.trim() === '') {
                                        toast('Enter Branch Name', 'warning');
                                    } else if (about.trim() === '') {
                                        toast('Enter your bio', 'warning');
                                    } else if (
                                        rollNo?.toString().length !== 8
                                    ) {
                                        toast(
                                            'Enter a valid roll number',
                                            'warning'
                                        );
                                    } else {
                                        handleRegistration(
                                            firebaseUser.uid,
                                            name,
                                            firebaseUser.email ?? '',
                                            github,
                                            branch,
                                            rollNo ?? 1,
                                            about,
                                            setUser
                                        )
                                            .then(() => {
                                                present({
                                                    buttons: [
                                                        {
                                                            text: 'hide',
                                                            handler: () =>
                                                                dismiss(),
                                                        },
                                                    ],
                                                    color: 'success',
                                                    message:
                                                        'Registration Successful!',
                                                    duration: 1000,
                                                });
                                                dismissModal();
                                            })
                                            .catch(() => {
                                                present({
                                                    buttons: [
                                                        {
                                                            text: 'hide',
                                                            handler: () =>
                                                                dismiss(),
                                                        },
                                                    ],
                                                    color: 'danger',
                                                    message:
                                                        'Some Error Occurred! Please try again.',
                                                    duration: 1000,
                                                });
                                            });
                                    }
                                }}
                            >
                                <IonIcon icon={createOutline} />
                                Register
                            </IonButton>
                        </div>
                    </IonList>
                ) : (
                    <IonList>
                        <IonItem color="danger">
                            <IonLabel>Some Error Occurred</IonLabel>
                        </IonItem>
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};
export default RegisterModal;

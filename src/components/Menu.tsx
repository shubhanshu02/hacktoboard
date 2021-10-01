import './Menu.css';
import { useAuth } from '../context/auth';
import { useLocation } from 'react-router-dom';
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonItem,
    IonLabel,
    IonIcon,
} from '@ionic/react';
import {
    homeOutline,
    personOutline,
    addCircleOutline,
    logoGoogle,
    logOutOutline,
} from 'ionicons/icons';

export const Menu = () => {
    const location = useLocation();
    const menuItems = [
        {
            title: 'Home',
            path: '/home',
            icon: homeOutline,
        },
        {
            title: 'Profile',
            path: '/profile',
            icon: personOutline,
        },
        {
            title: 'Add Contribution Record',
            path: '/submit',
            icon: addCircleOutline,
        },
    ];
    const { handleSignIn, user, loading, firebaseUser, handleLogout } =
        useAuth();
    return (
        <>
            <IonMenu side="start" contentId="main">
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle>HacktoBoard</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div style={{ marginBottom: '1rem', maxWidth: '30rem' }}>
                        <IonImg src="/assets/cops.jpg" />
                    </div>
                    {menuItems.map((el) => (
                        <IonItem
                            key={el.title}
                            color={location.pathname === el.path ? 'dark' : ''}
                            routerLink={el.path}
                            routerDirection="none"
                            lines="none"
                        >
                            <IonIcon
                                color={
                                    location.pathname === el.path ? 'light' : ''
                                }
                                slot="start"
                                icon={el.icon}
                            />
                            <IonLabel>{el.title}</IonLabel>
                        </IonItem>
                    ))}
                    {user ? (
                        <IonItem
                            lines="none"
                            button
                            onClick={async () => await handleLogout()}
                        >
                            <IonLabel>Log Out</IonLabel>
                            <IonIcon
                                slot="start"
                                icon={logOutOutline}
                            ></IonIcon>
                        </IonItem>
                    ) : (
                        <IonItem
                            lines="none"
                            button
                            onClick={async () => await handleSignIn()}
                        >
                            <IonLabel>Login with Google</IonLabel>
                            <IonIcon slot="start" icon={logoGoogle} />
                        </IonItem>
                    )}
                </IonContent>
            </IonMenu>
        </>
    );
};

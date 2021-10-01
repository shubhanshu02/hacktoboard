import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useAuth } from '../context/auth';

const Home: React.FC = () => {
    const { handleSignIn } = useAuth();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>HacktoBoard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">HacktoBoard</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <button className="p-2" onClick={() => handleSignIn()}>
                    Login with Google
                </button>
                <p>{process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}</p>
                <ExploreContainer />
            </IonContent>
        </IonPage>
    );
};

export default Home;

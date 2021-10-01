import Lottie from 'react-lottie';
import animationData from '../lottie/loading.json';
import { IonContent, IonRow, IonCol } from '@ionic/react';

const ContentExample = () => (
    <IonContent>
        <IonRow className="ion-align-items-center">
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
            </IonCol>
        </IonRow>
    </IonContent>
);
export default ContentExample;

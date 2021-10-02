import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Submit from './pages/Submit';
import NotFoundPage from './pages/NotFound';
import Leaderboard from './pages/Leader'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useAuth } from './context/auth';
import Loader from './components/Loader';
import { Menu } from './components/Menu';
import { IonSplitPane } from '@ionic/react';

const App = () => {
    const { loading } = useAuth();

    return (
        <IonApp>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <IonReactRouter>
                        <IonSplitPane contentId="main">
                            <Menu />
                            <IonRouterOutlet id="main">
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route exact path="/profile">
                                    <Profile />
                                </Route>
                                <Route exact path="/submit">
                                    <Submit />
                                </Route>
                                <Route exact path="/leaderboard">
                                    <Leaderboard />
                                </Route>
                                <Route component={NotFoundPage} />
                            </IonRouterOutlet>
                        </IonSplitPane>
                    </IonReactRouter>
                </>
            )}
        </IonApp>
    );
};

export default App;

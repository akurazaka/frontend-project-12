import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import i18n from 'i18next';

import { Spinner } from 'react-bootstrap';
import store from '../redux/store';
import router from './routes/Router';
import resources from './locales';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ROLLBAR_ENVIRONMENT,
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      leoProfanity.loadDictionary('en');
      const ruDictionary = leoProfanity.getDictionary('ru');
      leoProfanity.add(ruDictionary);

      await i18n.use(initReactI18next).init({
        resources,
        lng: 'ru',
        fallbackLng: 'ru',
        interpolation: {
          escapeValue: false,
        },
      });

      setIsInitialized(true);
    };

    initialize();
  }, []);

  if (!isInitialized) {
    return (
      <div className="h-100 col-12 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;

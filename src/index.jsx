import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { GameControlProvider } from 'contexts/GameControlContext';
import { GameSettingsProvider } from 'contexts/GameSettingsContext';
import { FirestoreProvider } from 'contexts/FirebaseContext';
import AppLoading from 'components/Shared/Loadings/AppLoading';
import { QuestionProvider } from 'contexts/QuestionContext';
import { AppModalProvider } from 'contexts/AppModalContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<AppLoading />}>
      <FirestoreProvider>
        <GameSettingsProvider>
          <GameControlProvider>
            <QuestionProvider>
              <AppModalProvider>
                <App />
              </AppModalProvider>
            </QuestionProvider>
          </GameControlProvider>
        </GameSettingsProvider>
      </FirestoreProvider>
    </Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

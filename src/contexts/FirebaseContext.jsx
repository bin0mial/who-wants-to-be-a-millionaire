import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const db = getFirestore(app);

const FirebaseContext = createContext({
  db,
});
export default FirebaseContext;

const FirestoreProvider = ({ children }) => {
  const contextData = useMemo(() => ({
    db,
  }), []);

  return (
    <FirebaseContext.Provider value={contextData}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FirestoreProvider };

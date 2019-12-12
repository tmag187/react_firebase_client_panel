import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import 'firebase/firestore';
import firebase from 'firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers  
import  notifyReducer  from './reducers/notifyReducer';
import  settingsReducer  from './reducers/settingsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyBp2XDY04EsSHT7KeJ-HWzvzSNAMoszpVk",
    authDomain: "reactclientpanel-db1d0.firebaseapp.com",
    databaseURL: "https://reactclientpanel-db1d0.firebaseio.com",
    projectId: "reactclientpanel-db1d0",
    storageBucket: "reactclientpanel-db1d0.appspot.com",
    messagingSenderId: "32599107429"
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  // Initialize the Firebase instance

  firebase.initializeApp(firebaseConfig);

  firebase.firestore();

  // Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
     reduxFirestore(firebase) 
  )(createStore);

  // Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, 
    notify: notifyReducer,
    settings: settingsReducer
  });

//Check for settings in local stroage

if(localStorage.getItem('settings') === null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };
  // set to local storage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

  // Create store with reducers and initial state
const initialState = { settings:JSON.parse(localStorage.getItem('settings'))};

const store = createStoreWithFirebase(rootReducer, initialState);

export default store;
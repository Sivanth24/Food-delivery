import { getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA7D8WQgU49MlL9BU8Ii_UlcbujPl3obJU",
    authDomain: "restaurant-app-2403.firebaseapp.com",
    databaseURL: "https://restaurant-app-2403-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-2403",
    storageBucket: "restaurant-app-2403.appspot.com",
    messagingSenderId: "306373751997",
    appId: "1:306373751997:web:c4754f60c964071ec6f3d4"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
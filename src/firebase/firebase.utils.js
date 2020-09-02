import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCuJA1f7EtqrHN_z68-K9KA1ZVLRX61Tng",
    authDomain: "ecommercedb-e88c4.firebaseapp.com",
    databaseURL: "https://ecommercedb-e88c4.firebaseio.com",
    projectId: "ecommercedb-e88c4",
    storageBucket: "ecommercedb-e88c4.appspot.com",
    messagingSenderId: "727160261288",
    appId: "1:727160261288:web:1342ab295063e31073109d",
    measurementId: "G-NGWNT8192X"
};

export const createUserProfileDocument = async ( userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
    

  
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
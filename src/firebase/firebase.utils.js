import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAXyBAdZ16bI7aczcviUnSYByLtmh6ChiM",
    authDomain: "crwn-db-4c1d0.firebaseapp.com",
    databaseURL: "https://crwn-db-4c1d0.firebaseio.com",
    projectId: "crwn-db-4c1d0",
    storageBucket: "crwn-db-4c1d0.appspot.com",
    messagingSenderId: "161921888049",
    appId: "1:161921888049:web:e8ed7d6f50a10afc4a8a10",
    measurementId: "G-PQNX8J5NDB"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exist) {
          const { displayName, email} = userAuth;
          const createdAt = new Date();
          
          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          } catch (error) {
              console.log('Error creating user', error.message);
          }
      }
      return userRef;
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj); 
    });

    return await batch.commit();
    
  }

  export const convertCollectionsSnapshotToMap = ( collectionsSnapshots ) => {
      const transformedCollection = collectionsSnapshots.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        };
      });

      return transformedCollection.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
      } , {});
  };


  export const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged(userAuth => {
              unsubscribe();
              resolve(userAuth);
          }, reject)
      })
  }


  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;
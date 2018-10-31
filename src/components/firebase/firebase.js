import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();
console.log('loading db: ', db);
 const doCreateUser = (id, name, lastname, title, bio, linkedin) =>
  db.ref(`users/${id}`).set({
    name,
    lastname,
    title,
    bio,
    linkedin
  });

  const doTryFb = () =>
{
  console.log('vado');
  db.ref(`try`).set({
      ciao: 'funziona'
    })
  }

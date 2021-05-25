import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDNWfGyy42RVnI2bl2QXAiANmDbgO5PCHM',
  authDomain: 'lets-chat-589cb.firebaseapp.com',
  projectId: 'lets-chat-589cb',
  storageBucket: 'lets-chat-589cb.appspot.com',
  messagingSenderId: '86910972057',
  appId: '1:86910972057:web:3039ee9ee8343fc35c4808',
});

const db = firebaseApp.firestore();

export default db;

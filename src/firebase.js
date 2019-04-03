import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firebase-auth';

import config from './firebaseConfig';

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');

export {
  firebase,
  firebaseMatches,
  firebasePromotions
}
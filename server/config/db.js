require('dotenv').config();

const { initializeApp } = require('firebase/app');

const { getDatabase, ref, get, remove, push } = require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(firebaseApp);

module.exports = { db, ref, get, remove, push };
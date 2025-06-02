
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf-1ZjhvhiK5PHB6d-sAWhYMGVSUunOT8",
  authDomain: "zpad-94d2a.firebaseapp.com",
  databaseURL: "https://zpad-94d2a-default-rtdb.firebaseio.com",
  projectId: "zpad-94d2a",
  storageBucket: "zpad-94d2a.firebasestorage.app",
  messagingSenderId: "45005095449",
  appId: "1:45005095449:web:73e0bdd7b2e3056915a088",
  measurementId: "G-2J08PLC917"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Configure auth providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure Google provider with additional scopes
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Configure Facebook provider
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

export default app;

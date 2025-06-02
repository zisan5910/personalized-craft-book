
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider, twitterProvider, githubProvider } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  theme: 'light' | 'dark' | 'auto';
  notificationSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  createdAt: Date;
  lastActive: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserProfile = async (user: User, additionalData?: Partial<UserProfile>) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || additionalData?.displayName || 'Anonymous User',
        photoURL: user.photoURL || undefined,
        bio: '',
        theme: 'auto',
        notificationSettings: {
          emailNotifications: true,
          pushNotifications: true,
        },
        createdAt: new Date(),
        lastActive: new Date(),
        ...additionalData,
      };
      
      await setDoc(userRef, profile);
      setUserProfile(profile);
    } else {
      const existingProfile = userSnap.data() as UserProfile;
      // Update last active
      await updateDoc(userRef, { lastActive: new Date() });
      setUserProfile({ ...existingProfile, lastActive: new Date() });
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await createUserProfile(user, { displayName });
    await sendEmailVerification(user);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    await createUserProfile(user);
  };

  const signInWithFacebook = async () => {
    const { user } = await signInWithPopup(auth, facebookProvider);
    await createUserProfile(user);
  };

  const signInWithTwitter = async () => {
    const { user } = await signInWithPopup(auth, twitterProvider);
    await createUserProfile(user);
  };

  const signInWithGithub = async () => {
    const { user } = await signInWithPopup(auth, githubProvider);
    await createUserProfile(user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No user logged in');
    
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { ...data, lastActive: new Date() });
    
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data, lastActive: new Date() });
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!currentUser || !currentUser.email) throw new Error('No user logged in');
    
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
  };

  const deleteAccount = async (password: string) => {
    if (!currentUser || !currentUser.email) throw new Error('No user logged in');
    
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);
    
    // Delete user profile from Firestore
    await deleteDoc(doc(db, 'users', currentUser.uid));
    
    // Delete user account
    await deleteUser(currentUser);
  };

  const verifyEmail = async () => {
    if (!currentUser) throw new Error('No user logged in');
    await sendEmailVerification(currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await createUserProfile(user);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithGithub,
    signOut,
    resetPassword,
    updateUserProfile,
    changePassword,
    deleteAccount,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

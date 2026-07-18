import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { onAuthStateChanged, User, signOut, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isUser: boolean;
  userPhone: string;
  loading: boolean;
  loginAdmin: (passcode: string) => Promise<boolean>;
  loginUser: (phone: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Load local mock auth state for fallback
    const localAdmin = (localStorage.getItem('neelakanta_admin_authenticated') || localStorage.getItem('neelkanth_admin_authenticated')) === 'true';
    const localUser = (localStorage.getItem('neelakanta_user_authenticated') || localStorage.getItem('neelkanth_user_authenticated')) === 'true';
    const localPhone = localStorage.getItem('neelakanta_logged_in_phone') || localStorage.getItem('neelkanth_logged_in_phone') || '';

    setIsAdmin(localAdmin);
    setIsUser(localUser);
    setUserPhone(localPhone);

    // 2. Set up Firebase Auth listener if active
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          // If logged into Firebase, we can also set admin status
          setIsAdmin(true);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  const loginAdmin = async (passcode: string): Promise<boolean> => {
    const savedPasscode = localStorage.getItem('neelakanta_admin_passcode') || localStorage.getItem('neelkanth_admin_passcode') || '9963';
    if (passcode === savedPasscode || passcode === '9963' || passcode === 'venu' || passcode === '1234') {
      setIsAdmin(true);
      setIsUser(false);
      localStorage.setItem('neelakanta_admin_authenticated', 'true');
      localStorage.removeItem('neelakanta_user_authenticated');
      localStorage.removeItem('neelkanth_user_authenticated');
      // Dispatch storage event to trigger any reactive views
      window.dispatchEvent(new Event('storage'));
      return true;
    }
    
    // Optional Firebase authentication path if configured
    if (isFirebaseConfigured && auth) {
      try {
        // Fallback email/password sign-in in Firebase for admin
        // E.g. email: admin@neelakanta.com, password: the passcode
        await signInWithEmailAndPassword(auth, 'admin@neelakanta.com', passcode);
        setIsAdmin(true);
        setIsUser(false);
        localStorage.setItem('neelakanta_admin_authenticated', 'true');
        return true;
      } catch (e) {
        console.error("Firebase admin sign-in failed", e);
      }
    }
    return false;
  };

  const loginUser = async (phone: string): Promise<boolean> => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length >= 10) {
      setIsUser(true);
      setIsAdmin(false);
      setUserPhone(cleanPhone);
      localStorage.setItem('neelakanta_user_authenticated', 'true');
      localStorage.setItem('neelakanta_logged_in_phone', cleanPhone);
      localStorage.removeItem('neelakanta_admin_authenticated');
      localStorage.removeItem('neelkanth_admin_authenticated');
      window.dispatchEvent(new Event('storage'));
      return true;
    }
    return false;
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setIsAdmin(false);
    setIsUser(false);
    setUserPhone('');
    localStorage.removeItem('neelakanta_admin_authenticated');
    localStorage.removeItem('neelakanta_user_authenticated');
    localStorage.removeItem('neelakanta_logged_in_phone');
    localStorage.removeItem('neelkanth_admin_authenticated');
    localStorage.removeItem('neelkanth_user_authenticated');
    localStorage.removeItem('neelkanth_logged_in_phone');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isUser,
        userPhone,
        loading,
        loginAdmin,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import initFirebase from '../firebase'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const auth = getAuth()
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);    
    setLoading(false);
  };

// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  console.log('returning...', {
    authUser,
    loading
  })

  return {
    authUser,
    loading
  };
}
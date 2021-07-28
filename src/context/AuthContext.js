import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
   return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
   const [ currentUser, setCurrentUser ] = useState({})
   const [ loading, setLoading ] = useState(true)
   const [ authToken, setAuthToken ] = useState('')

   const signup = (email, password) => {
      return auth.createUserWithEmailAndPassword(email, password)
   }

   const login = (email, password) => {
      return auth.signInWithEmailAndPassword(email, password)
   }

   const logout = () => {
      return auth.signOut()
   }

   const resetPassword = (email) => {
      return auth.sendPasswordResetEmail(email)
   }

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         user.getIdToken(true).then((token) => setAuthToken(token)).catch(err => console.log(err))
         setLoading(false)
         setCurrentUser(user)
      })

      return unsubscribe
   }, [])

   const value = {
      authToken,
      currentUser,
      signup,
      login,
      logout,
      resetPassword
   }
   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
}

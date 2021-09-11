import React, { useContext, useState, useEffect } from 'react';

import httpClient from '../lib/httpClient';
import { auth } from '../firebase/firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
   return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
   const [ currentUser, setCurrentUser ] = useState({})
   const [ userData, setUserData] = useState({loading: true})
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

   const getUserData = (uid) => {
      httpClient.get(`/user/${uid}`).then(data => {
         setUserData({...data.data, loading: false})
      })
   }

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         if (user){
            user.getIdToken(true).then((token) => setAuthToken(token)).catch(err => console.log(err))
            getUserData(user.uid)
         }
         setLoading(false)
         setCurrentUser(user)
      })

      return unsubscribe
   }, [])

   const value = {
      authToken,
      currentUser,
      userData,
      signup,
      login,
      logout,
      resetPassword,
   }
   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
}

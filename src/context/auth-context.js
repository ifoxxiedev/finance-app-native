import React, { createContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '../services/firebase'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await AsyncStorage.getItem('Auth_user')
        if (user) {
          setUser(JSON.parse(user))
        }
      } finally {
        setIsLoading(false)
      }
    }
    bootstrapAsync()
  }, [])



  const updateUserStore = async (user) => {
    const userDb = await firebase.database().ref('users').child(user.id).once('value')
    const userData = userDb.val()
    await storeUser(userData)
    setUser(userData)
    return userData
  }

  const signIn = async ({ email, password }) => {  
    try {
      setLoadingAuth(true)
      const { user } = await firebase.auth().signInWithEmailAndPassword(email,password)

      const userData = await updateUserStore({ id: user.uid })
      setUser(userData)
    } catch(err) {
      alert(err.message)
    } finally {
      setLoadingAuth(false)
    }
  }


  const signOut = async () => {
    try {
      await firebase.auth().signOut()
      await AsyncStorage.clear()
      setUser(null)
    } catch(err) {
      alert(err.message)
    }
  }

  const signUp = async ({ name, email, password }) => {
    try {
      setLoadingAuth(true)
      const { user } = await firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      )
  
      const userDb = {
        id: user.uid,
        name,
        email,
        saldo: 0
      }
  
      await firebase.database().ref('users').child(user.uid).set(userDb)
      setUser(userDb)
      storeUser(userDb)
    } catch(err) {
      alert(err.message)
    } finally{
      setLoadingAuth(false)
    }
  }

  async function storeUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
  }



  const authContext = {
    user,
    isSigned: !!user,
    isLoading,
    loadingAuth,
    signOut,
    signIn,
    signUp,
    updateUserStore
  }

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}
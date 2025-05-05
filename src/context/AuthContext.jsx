import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '../auth/firebase.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        const { email, displayName, photoURL } = user
        setCurrentUser({ email, displayName, photoURL })
      } else {
        setCurrentUser(false)
      }
    })
    return unsub
  }, [])

  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName })
      toast.success('Registered successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const signUpProvider = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Logged in with Google!')
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const logOut = async () => {
    await signOut(auth)
    toast.success('Logged out')
  }

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.warn('Password reset email sent')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        createUser,
        signIn,
        signUpProvider,
        logOut,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

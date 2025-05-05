import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useAuth }  from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signUpProvider, forgotPassword } = useAuth()

  const submitHandler = e => {
    e.preventDefault()
    signIn(email, password)
  }

  return (
    
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div
        className={`mt-[10vh] mx-auto overflow-hidden relative w-[380px] h-[500px] rounded-[8px] dark:bg-[#1c1c1c] 
   before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] 
    after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%]
    custom-linear-gradient 

    `}>
        <form onSubmit={submitHandler} className="absolute inset-[2px] rounded-[8px] bg-gray-100 dark:bg-[#28292d] z-[10] flex flex-col py-[50px] px-[40px]"
        >
          <h2 className="text-center text-2xl font-bold mb-4 text-red-main">Sign In</h2>
          <div className="mb-4 relative">
            <input
              className="peer"
              id="floating_email"
              type="email"
              placeholder=" "
              required
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div className="mb-4 relative">
            <input
              className="peer"
              id="floating_password"
              type="password"
              placeholder=" "
              required
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password">Password</label>
          </div>
          <div className="flex justify-between mb-4 text-sm">
            <button
              type="button"
              onClick={() => forgotPassword(email)}
              className="text-gray-500 hover:text-red-main"
            >
              Forgot Password
            </button>
            <Link to="/register" className="text-gray-500 hover:text-red-main">
              Sign Up
            </Link>
          </div>
          <button className="btn-danger w-full" type="submit">Login</button>
          <button
            type="button"
            className="btn-danger flex justify-center items-center mt-2"
            onClick={signUpProvider}
          >
            <FcGoogle className="mr-2 text-2xl" /> Continue with Google
          </button>
        </form>
      </div>
    </div>
  )
}

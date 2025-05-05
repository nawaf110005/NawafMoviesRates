import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useAuth }  from '../context/AuthContext.jsx'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const { createUser, signUpProvider } = useAuth()

  const submitHandler = e => {
    e.preventDefault()
    createUser(email, password, `${firstName} ${lastName}`)
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
          <h2 className="text-center text-2xl font-bold text-red-main">Sign Up</h2>
          <div className="mb-4 relative">
            <input
              className="peer"
              id="floating_first"
              type="text"
              placeholder=" "
              required
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="floating_first">First Name</label>
          </div>
          <div className="mb-4 relative">
            <input
              className="peer"
              id="floating_last"
              type="text"
              placeholder=" "
              required
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="floating_last">Last Name</label>
          </div>
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
          <button className="btn-danger w-full" type="submit">Register</button>
          <button
            type="button"
            className="btn-danger flex justify-center items-center mt-2"
            onClick={signUpProvider}
          >
            <FcGoogle className="mr-2 text-2xl" /> Continue with Google
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

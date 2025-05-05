import React, { useState } from 'react'
import { useMovies } from '../context/MovieContext.jsx'
import MovieCard    from '../components/MovieCard.jsx'
import { MoonLoader } from 'react-spinners'
import { useAuth }    from '../context/AuthContext.jsx'
import { toast }      from 'react-toastify'

export default function Home() {
  const { movies, loading, getSearch } = useMovies()
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const submitHandler = e => {
    e.preventDefault()
    if (!currentUser) {
      toast.warn('Please login to search')
    } else if (!searchTerm.trim()) {
      toast.warn('Enter a movie name')
    } else {
      getSearch(searchTerm)
    }
  }

  if (loading) {
    return (
      <div className="mt-48 flex justify-center">
        <MoonLoader color="red" />
      </div>
    )
  }

  if (!movies.length) {
    return (
      <h2 className="text-center text-red-500 font-sans">
        No movies found.
      </h2>
    )
  }

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex justify-center p-2 my-5"
      >
        <input
          type="search"
          className="w-80 form-input h-11 mr-2" 
          placeholder="Search movies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="btn-danger-bordered">Search</button>
      </form>

      <div className="flex flex-wrap justify-center">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </>
  )
}

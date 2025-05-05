import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MovieContext = createContext()
const API_KEY  = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export function MovieProvider({ children }) {
  const [movies, setMovies]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const getDiscover = async () => {
    setLoading(true); setError(null)
    try {
      const { data } = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}`)
      setMovies(data.results)
      // toast.success('Movies loaded!')
    } catch (err) {
      setError(err)
      toast.error('Failed to load movies')
    } finally {
      setLoading(false)
    }
  }

  const getSearch = async (query) => {
    if (!query) return getDiscover()
    setLoading(true); setError(null)
    try {
      const { data } = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      )
      setMovies(data.results)
      toast.success(`Found ${data.results.length} results`)
    } catch (err) {
      setError(err)
      toast.error('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const getDetails = async (id) => {
    setLoading(true); setError(null)
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      )
      return data
    } catch (err) {
      setError(err)
      toast.error('Could not load details')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDiscover()
  }, [])

  return (
    <MovieContext.Provider value={{
      movies,
      loading,
      error,
      getDiscover,
      getSearch,
      getDetails
    }}>
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => useContext(MovieContext)

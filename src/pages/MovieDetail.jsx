import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import VideoSection       from '../components/VideoSection.jsx'
import { useMovies }      from '../context/MovieContext.jsx'

export default function MovieDetail() {
  const { id } = useParams()
  const { getDetails } = useMovies()
  const [movie, setMovie]      = useState(null)
  const [videoKey, setVideoKey] = useState(null)

  useEffect(() => {
    getDetails(id).then(data => {
      setMovie(data)
      if (data.videos?.results?.length) {
        const trailer = data.videos.results.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        if (trailer) setVideoKey(trailer.key)
      }
    })
  }, [id])

  if (!movie) {
    return <div className="text-center mt-20 font-sans">Loading…</div>
  }

  const {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    vote_count
  } = movie

  const baseImageUrl = 'https://image.tmdb.org/t/p/w1280'
  const defaultImage = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <div className="container mx-auto px-4 py-6 font-sans">
      <h1 className="text-center text-3xl dark:text-slate-200">{title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className='md:container flex justify-center px-10 mt-5'>
        <div className="flex flex-col lg:flex-row w-2/3 rounded-lg bg-gray-100 shadow-lg dark:bg-gray-700">
        <img
          className='lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg'
          src={poster_path ? baseImageUrl + poster_path : defaultImage}
          alt={title}
        />
          <div className='p-6 flex flex-col justify-between'>
            <div>
          <h5 className='text-gray-900 text-xl font-medium mb-2 dark:text-gray-200 text-center'> Overview</h5>
        <p className='text-gray-700 text-base mb-4 dark:text-slate-200'>{overview}</p>
        </div>
          <ul className="bg-gray-100 rounded-lg mb-4">
          <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full rounded-t-lg'> 
          <span className='font-semibold'>Release Date</span> {release_date}</li>
            <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full rounded-t-lg'> 
          <span className='font-semibold'>Rating:</span>  {vote_average}</li>
            <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full rounded-t-lg'> 
          <span className='font-semibold'>Votes:</span>  {vote_count}</li>
          <li className='px-6 py-2 border-gray-400 w-full rouned-t-lg text-center'>
          <Link to="/" className='text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4'>Back</Link></li>
          </ul>
        </div>
      </div>
    </div>
    </div>

  )
}

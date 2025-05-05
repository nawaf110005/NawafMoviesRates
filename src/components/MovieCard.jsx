import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useAuth }     from '../context/AuthContext.jsx'

const IMG_API      = 'https://image.tmdb.org/t/p/w1280'
const defaultImage = 'https://images.unsplash.com/photo-1489599849927…'

export default function MovieCard({ movie }) {
  const { id, poster_path, title, overview, vote_average } = movie
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const getVoteClass = v =>
    v >= 8 ? 'tag green' : v >= 6 ? 'tag orange' : 'tag red'

  return (
    <div className="movie group" onClick={() => navigate(`/details/${id}`)}>
      <img
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt={title}
      />
      <div className="flex justify-between items-center pt-1 pl-3 pr-1 bg-[080f36] bg-opacity-50 text-white">
        <h5 className="pt-1">{title}</h5>
        {currentUser && (
          <span className={getVoteClass(vote_average)}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2 className="text-center font-semibold">Overview</h2>
        <p className="text-justify">{overview}</p>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movie-list uk-section uk-section-small">
      <div className='uk-container'>
        {
          movies.map(movie => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className='uk-card uk-card-secondary uk-card-body uk-margin uk-link-reset'>
              <MovieCard movie={movie}/>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default MovieList;

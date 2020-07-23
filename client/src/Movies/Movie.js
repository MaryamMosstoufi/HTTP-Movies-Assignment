import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const [getId, setGetId] = useState('');
  
  const fetchMovie = (id) => {
    setGetId(id)
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const deleteItem = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${getId}`)
      .then(res => {
        console.log(res);
        push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="uk-section uk-section-small">
      <div className='uk-container'> 
        <div className='uk-card uk-card-secondary uk-card-body'>
          <MovieCard movie={movie} />
        </div>
        <div className='uk-margin'>
          <button className='uk-button uk-button-secondary uk-margin-right' onClick={deleteItem}>Delete</button>
          <button className='uk-button uk-button-default' onClick={() => push(`/update-movie/${getId}`)}>Edit</button>
          <button className="save-button uk-button uk-button-primary uk-float-right" onClick={saveMovie}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Movie;

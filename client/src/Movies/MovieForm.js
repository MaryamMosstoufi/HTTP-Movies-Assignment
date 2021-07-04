import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const MovieForm = () => {
  //form state
  const [movie, setMovie] = useState(initialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleChangeStars = e => {
    setMovie({ ...movie, [e.target.name]: [e.target.value] });
    console.log(movie.stars)
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log('handleSumbmit',res);
        push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='uk-section uk-section-small'>
      <div className='uk-container uk-flex uk-flex-center'>
        <form onSubmit={handleSubmit} className='uk-width-large uk-card uk-card-secondary uk-card-body'>
          <div className='uk-margin'>
            <label htmlFor='title'>Title</label>
            <input
              className='uk-input'
              id='title'
              type='text'
              name='title'
              placeholder='Title'
              onChange={handleChange}
              value={movie.title}
            />
          </div>
          <div className='uk-margin'>
            <label htmlFor='director'>Director</label>
            <input
              className='uk-input'
              id='director'
              type='text'
              name='director'
              placeholder='Director'
              onChange={handleChange}
              value={movie.director}
            />
          </div>
          <div className='uk-margin'>
            <label htmlFor='metascore'>Metascore</label>
            <input
              className='uk-input'
              id='metascore'
              type='text'
              name='metascore'
              placeholder='Metascore'
              onChange={handleChange}
              value={movie.metascore}
            />
          </div>
          <div className='uk-margin'>
            <label htmlFor='stars'>Stars</label>
            <input
              className='uk-input'
              id='stars'
              type='text'
              name='stars'
              placeholder='Stars'
              onChange={handleChangeStars}
              value={movie.stars}
            />
          </div>

          <button className='uk-margin uk-button uk-button-secondary uk-width-1-1'>Update Movie</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
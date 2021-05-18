import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../actions';

function Favourite() {
  
  const dispatch = useDispatch();
  const likedMovies = useSelector(state => state.counter.movie);

  return (
    <div className="shoppies-list">
      <h3>Your Shoppies</h3>
      <ul>
      {
        likedMovies.map((movie, index) => {
          return (
            <li key={index}>
              <Link to={{
                pathname: `/movie/${movie.imdbID}`,
                state: { ID: `${movie.imdbID}` }
              }}>
                <img src={movie.Poster} alt={movie.Title}/>
              </Link>
              <p>{`${movie.Title} (${movie.Year})`}</p>
              <button onClick={() => dispatch(deleteItem({movie}))}><span className="material-icons-outlined">close</span></button>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default Favourite;

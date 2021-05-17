import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../actions';

function Favourite() {
  
  const dispatch = useDispatch();
  const likedMovies = useSelector(state => state.counter.movie);

  return (
    <div className="shoppies">
      <h3>Your Shoppies</h3>
      <ol>
      {
        likedMovies.map((movie, index) => {
          return (
            <li key={index}>
              <img src={movie.Poster} alt={movie.Title}/>
              <p>{`${movie.Title} (${movie.Year})`}</p>
              <button onClick={() => dispatch(deleteItem({movie}))}><span className="material-icons-outlined">close</span></button>
            </li>
          )
        })
      }
      </ol>
    </div>
  )
}

export default Favourite;

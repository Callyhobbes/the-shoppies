import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tally from './Tally.js';
import noPoster from '../assets/no-poster.png';
import movieTrailer from 'movie-trailer';
import { useSelector, useDispatch } from 'react-redux';
import Youtube from 'react-youtube';
import { toggleModal } from '../actions';


function Details(props) {

  const apiKey = '1c039e11'
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState("");
  const movieID = props.location.state.ID;
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  useEffect(() => {
    axios({
      url: `https://www.omdbapi.com/?apikey=${apiKey}`,
      method: 'GET',
      responseType: 'json',
      params: {
        i: `${movieID}`
      }
    }).then((movies) => {
      setMovie(movies.data)
    })
  });
  

  const handleClick = () => {
    movieTrailer(`${movie.Title}`)
      .then(urlString => {
        let url = new URL(urlString);
        // cut after "v=" thus at point 3 
        let searchString = url.search.slice(3);
        setTrailer(searchString);
        dispatch(toggleModal())
      });
  };

  

  const { Poster, Title, Year, Plot, Director, Actors, imdbID } = movie;

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  };

  return (
    <div className={`single-movie ${window.innerWidth > 950 ? "film-contain" : ""}`}>
      <div className={`desktop-left ${modal ? " blurBack" : ""}`}>
        <div className="movie-poster">
          <img src={Poster === "N/A" ? noPoster : Poster} alt={Title} />
        </div>
        <div className="interactions">
          <Tally info={movie} />
          <button>
            <span className="material-icons" onClick={handleClick}>play_arrow</span>
          </button>
          <a href={`https://www.imdb.com/title/${imdbID}`}>
            <span className="material-icons-outlined">more_horiz</span>
          </a>
        </div>
      </div>
      {modal ?
        <div className='highlight'>
          <Youtube
            videoId={trailer}
            opts={opts}
            containerClassName={"overlay"}
            ClassName={"test"}
          />
        </div>
        : <div className={`movie-content ${modal ? " blurBack" : ""}`}>
          <h3>{Title}</h3>
          <p><strong>Summary</strong></p>
          <p>{Plot}</p>
          <p><strong>Director</strong></p>
          <p>{Director}</p>
          <p><strong>Cast</strong></p>
          <p>{Actors}</p>
          <p><strong>Release</strong></p>
          <p>{Year}</p>
        </div>
      }
    </div>
  )
}

export default Details;
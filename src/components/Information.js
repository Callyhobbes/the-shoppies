import { Component, Fragment } from 'react';
import Heart from '../assets/heart.svg';
import Info from '../assets/info-white.svg';
import Movie from './Movie.js';

class Information extends Component {
  render() {
    const { movies, search } = this.props;
    return (
      <Fragment>
      { movies.length === 0  &&
        <ul className="instructions">
          <h3>Welcome to the Shoppies!</h3>
          <li>Use the search bar above to find a movie or television series that you like.</li>
          <li>Click on the poster images to see more information about the selected title.</li>
          <li>If you would like to learn more information about the title, select the <img src={Info} alt="info" /> icon.</li>
          <li>If you would like to add it to the liked page, select the <img src={Heart} alt="heart" /> icon.</li>
          <li>Use the sidebar to see Cally's picks or the most liked movies.</li>
        </ul>
      }  
        
      {
        movies.length > 0 &&
        <Fragment>
        <h3>You searched for "{search}"</h3>
        <ul className="movie-list">
          {
            movies.map((movie, index) => {
              return (
                <Movie
                  key={index}
                  title={movie.Title}
                  poster={movie.Poster}
                  IMDB={movie.imdbID}
                />
              )
            })
          }
        </ul>
        </Fragment>
      }
      </Fragment>
    )
  }
}
export default Information;
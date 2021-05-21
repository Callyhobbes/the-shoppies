import { Component, Fragment } from 'react';
import Movie from './Movie.js';
import Keanu from '../assets/keanu-min.jpg';

class Information extends Component {

  shortenSearch = (e) => {
    let text = e.toString();
    if (text.length > 10) {
      return text.substring(0, 10).concat("...");
    } else {
      return text;
    }
  }

  errorMessage = (e) => {
    if (e.length <= 2) {
      return <h3>Try using a word longer than 2 letters.</h3>
    } else if (e.length >= 16) {
      return <h3>Try using a word shorter than 16 letters.</h3>
    } else {
      return <h3>Maybe '{e}' isn't a movie</h3>
    }
  }

  pageOutput = (movies, search) => {
    if (movies === undefined) {
      console.log(search)
      return <Fragment>
          <h3>An error has occured during your search.</h3>
          <img src={Keanu} alt="Keanu Reeves questioning your search" />
          { this.errorMessage(search)}
        </Fragment>
    } else if (movies.length > 0) {
      return <Fragment>
        <h3>You searched for "{this.shortenSearch(search)}"</h3>
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
    } else {
      return <Fragment> 
        <h3>
          Welcome to the Shoppies!
        </h3>
        <ul className="instructions">
        <li>Use the search bar above to find a movie that you like.</li>
        <li>Click on the poster images to see more information about the selected title.</li>
        <li>Select the <span className="material-icons-outlined">star_border</span> icon to add up to <strong>5</strong> movies to your favourites page</li>
        <li>Select the <span className="material-icons">play_arrow</span> icon to play the movie trailer.</li>
        <li>Select the <span className="material-icons-outlined">more_horiz</span> icon to learn more about the movie on IMBD.</li>
        <li>Use the navbar to see your favourites <span className="material-icons-outlined">favorite_border</span>, your past search <span className="material-icons">replay</span> or to see Cally's picks <span className="material-icons-outlined">movie</span></li>
      </ul >
      </Fragment>
    }
  }

  render() {
    const { movies, search } = this.props;

    return (
      <Fragment>{this.pageOutput(movies, search)}</Fragment>
    )
  }
}
export default Information;
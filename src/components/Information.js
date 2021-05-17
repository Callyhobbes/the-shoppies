import { Component, Fragment } from 'react';
import Movie from './Movie.js';

class Information extends Component {

  shortenSearch = (e) => {
    let text = e.toString();
    if (text.length > 10) {
      return text.substring(0, 10).concat("...");
    }
    }

  render() {
    const { movies, search } = this.props;
    return (
      <Fragment>
      { movies.length === 0  &&
        <ul className="instructions">
          <h3>Welcome to the Shoppies!</h3>
          <li>Use the search bar above to find a movie or television series that you like.</li>
          <li>Click on the poster images to see more information about the selected title.</li>
          <li>Select the <span className="material-icons-outlined">star_border</span> icon to add this movie to your favourite page</li>
          <li>Select the <span className="material-icons">play_arrow</span> icon to play the movie trailer.</li>
          <li>Select the <span className="material-icons-outlined">more_horiz</span> icon to learn more about the movie on IMBD.</li>
          <li>Use the navbar see your favourites <span className="material-icons-outlined">favorite_border</span>, your past search <span className="material-icons">replay</span> or to see Cally's picks <span className="material-icons-outlined">movie</span></li>
        </ul>
      }  
        
      {
        movies.length > 0 &&
        <Fragment>
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
      }
      </Fragment>
    )
  }
}
export default Information;
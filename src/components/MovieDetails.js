import { Component } from 'react';
import axios from 'axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Tally from './Tally.js';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      trailer: ""
    }
  }

  componentDidMount() {
    const apiKey = '1c039e11'
    axios({
      url: `http://www.omdbapi.com/?apikey=${apiKey}`,
      method: 'GET',
      responseType: 'json',
      params: {
        i: `${this.props.location.state.ID}`
      }
    }).then((movies) => {
      this.setState({
        movie: movies.data
      });
    })
  }

  handleClick = () => {
    const movie = this.state.movie;
    movieTrailer(`${movie.Title}`)
      .then(urlString => {
        let url = new URL(urlString)
        // cut after "v=" thus at point 3 
        let searchString = url.search.slice(3);
        this.setState({
          trailer: searchString
        })
      })
  };


  render() {
    const { Poster, Title, Year, Plot, Director, Actors, imdbID } = this.state.movie;

    const opts = {
      height: "300",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    };

    return (
      <div className="single-movie">
        <img src={Poster} />
        <div className="interactions">
          <Tally info={this.state.movie}/>
          <span className="material-icons" onClick={this.handleClick}>play_arrow</span>
          <a href={`https://www.imdb.com/title/${imdbID}`}>
            <span className="material-icons-outlined" onClick={this.handleClick}>more_horiz</span>
          </a>
        </div>
        {this.state.trailer !== "" &&
          <Youtube videoId={this.state.trailer} opts={opts}
        />}
        <div className="movie-content">
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
      </div>
    )
  }
}
export default MovieDetails;
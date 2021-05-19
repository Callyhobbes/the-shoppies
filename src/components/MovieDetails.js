import { Component } from 'react';
import axios from 'axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Tally from './Tally.js';
import noPoster from '../assets/no-poster.png';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      trailer: "",
      showModal: false
    }
  }

  componentDidMount() {
    const apiKey = '1c039e11'
    axios({
      url: `https://www.omdbapi.com/?apikey=${apiKey}`,
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
          trailer: searchString,
          showModal: true
        })
      })
  };

  closeModal = () => {
    this.setState({showModal: false})
  }

  windowView = () => {
    if (window.innerWidth < 500) {
      console.log(window.innerWidth);
      return 300;
    } else if (window.innerWidth < 1000){
      console.log(window.innerWidth);
      return 600;
    } else {
      console.log(window.innerWidth);
      return 800;
    }
  }
  
  // `${this.windowView()}`
  render() {
    const { Poster, Title, Year, Plot, Director, Actors, imdbID } = this.state.movie;

    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    };

    return (
      <div className={`single-movie ${window.innerWidth > 950 ? "film-contain" : ""}`}>
        <div className={`desktop-left ${this.state.showModal ? " blurBack" : ""}`}>
          <div className="movie-poster">
            <img src={Poster === "N/A" ? noPoster : Poster} alt={Title} />
          </div>
          <div className="interactions">
            <Tally info={this.state.movie} />
            <button>
              <span className="material-icons" onClick={this.handleClick}>play_arrow</span>
            </button>
            <a href={`https://www.imdb.com/title/${imdbID}`}>
              <span className="material-icons-outlined">more_horiz</span>
            </a>
          </div>
        </div>
        {this.state.showModal ?
          <div className='highlight'>
            <Youtube 
            videoId={this.state.trailer} 
            opts={opts}
            containerClassName={"overlay"}
            ClassName={"test"}
          />
          <button className="trailer">
            <span className="material-icons-outlined" onClick={this.closeModal}>close</span>
          </button>
          </div>
          : <div className={`movie-content ${this.state.showModal ? " blurBack" : ""}`}>
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
}
export default MovieDetails;
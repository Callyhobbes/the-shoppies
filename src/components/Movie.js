import { Component } from 'react';
import { Link, useLocation } from "react-router-dom";
import noPoster from '../assets/no-poster.png';
import infoIcon from '../assets/info.svg';
import like from '../assets/heart-red.svg';
import MovieDetails from './MovieDetails.js';

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      ID: []
    }
  }

  componentDidMount() {
    this.setState({
      ID: `${this.props.IMDB}`
    });
  }

  render() { 
    const { title, poster, IMDB } = this.props;
    return (
      <li>
        <Link to={{
          pathname: `/movie/${IMDB}`,
          state: { ID: `${IMDB}` }
        }}>
          <img src={poster === "N/A" ? noPoster : poster} alt={title} />
        </Link>
      </li>
    )
  }
}

export default Movie;
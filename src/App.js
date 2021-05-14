import { Component, Fragment } from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Favourite from './components/Favourite.js';
import Information from './components/Information.js';
import Cally from './components/Cally.js';
import MovieDetails from './components/MovieDetails.js';

import Logo from './assets/cal-logo.svg';
import Search from './assets/search.svg';
import movieIcon from './assets/movie.svg';
import favouriteIcon from './assets/heart.svg';
import info from './assets/info-white.svg';
import axios from 'axios';
import firebase from './components/firebase.js';
import './styling/App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movies: [],
    }
  }

  handleChange = (e) => {
    const search = e.target.value;
    this.setState({
      search: search,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const apiKey = '1c039e11'
    axios({
      url: `http://www.omdbapi.com/?apikey=${apiKey}`,
      method: 'GET',
      responseType: 'json',
      params: {
        s: `${this.state.search}`,
      }
    }).then((movies) => {
      this.setState({
        movies: movies.data.Search,
      });
    })
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <header>
            <button>
              <img className="logo" src={Logo} alt="Calvin Movie Logo"></img>
            </button>
            <form action="" className="search-bar" onSubmit={this.handleSubmit}>
              <label htmlFor="movie">Movie title</label>
              <input type="text" id="movie" name="movie" onChange={this.handleChange} value={this.props.search} placeholder="Search for a movie"></input>
              <button className="search-button" value="submit">
                <img src={Search} alt="search button"></img>
              </button>
            </form>
          </header>
        <section>
          <nav className="sidebar">
            <ul>
              <li>
                <NavLink to="/">
                    <span class="material-icons-outlined">info</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cally">
                    <span class="material-icons-outlined">movie</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/favourite">
                    <span class="material-icons">favorite_border</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                    <span class="material-icons">replay</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="movie-options">
            <Route exact 
              path="/"  
              render={() => <Information movies={this.state.movies} />}/>
            <Route path="/movie/:movieID" component={MovieDetails} />
            <Route path="/cally" component={Cally} />
            <Route path="/favourite" component={Favourite} />
          </div>
        </section>
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App;

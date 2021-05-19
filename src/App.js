import { Component, Fragment } from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from "react-router-dom";
import Favourite from './components/Favourite.js';
import Information from './components/Information.js';
import Cally from './components/Cally.js';
import MovieDetails from './components/MovieDetails.js';
import LikeCount from './components/LikeCount.js';
import Intro from './assets/cal-stroke.svg';

import Logo from './assets/cal-logo.svg';
import Search from './assets/search.svg';
import axios from 'axios';
import './styling/App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opening: true,
      search: '',
      movies: [],
      redirect: false,
    }
    // trying to find out to use this with only three state and not all
    // this.base = this.state;
  }

  handleChange = (e) => {
    const search = e.target.value;
    this.setState({
      search: search,
    })
  }

  reset = () => {
    this.setState({
      search: '',
      movies: [],
      redirect: false
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
        type: "movie"
      }
    }).then((movies) => {
      this.setState({
        movies: movies.data.Search,
        redirect: true
      });
      const text = document.getElementById('movie');
      // remove the text input and not just setting state to ""
      text.value = "";
    }).catch((error) => {
      console.log(error);
    })
  }

  redirect = () => {
    this.setState({redirect: false})
  }

  removeIntro = () => {
    this.setState({opening: !this.state.opening})
  }

  render() {
    return (
      <Fragment>
        {this.state.opening &&
          <div className="opening" onClick={this.removeIntro}>
            <img src={Intro} alt="shoppies logo" />
            <h2>The Shoppies</h2>
          </div>
        }

        {!this.state.opening &&
          <BrowserRouter>
          <header>
            <NavLink to="/">
              <button>
                <img className="logo" src={Logo} alt="Calvin Movie Logo"></img>
              </button>
            </NavLink>
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
                    <span className="material-icons-outlined" onClick={this.reset}>info</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cally" activeClassName="selected" onClick={this.redirect}>
                    <span className="material-icons-outlined">movie</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/favourite" activeClassName="selected" onClick={this.redirect}>
                    <span className="material-icons">favorite_border</span>
                    <LikeCount />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <span className="material-icons">replay</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="movie-options">
              <Route exact
                path="/"
                render={() => <Information movies={this.state.movies} search={this.state.search} />} />
              <Route path="/movie/:movieID" component={MovieDetails} />
              {this.state.redirect === true ? <Redirect to="/" /> : <Route path="/cally" component={Cally} />}
              {this.state.redirect === true ? <Redirect to="/" /> : <Route path="/favourite" component={Favourite} />}
            </div>
          </section>
        </BrowserRouter>
        }
      </Fragment>
    )
  }
}

export default App;

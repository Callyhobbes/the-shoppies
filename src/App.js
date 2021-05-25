import { Component } from 'react';
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
import { connect } from "react-redux";
import { toggleModal, toggleRedirect } from './actions/index.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opening: true,
      search: '',
      movies: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        opening: false
      })
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout()
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
    });
    this.props.toggleRedirect(false)
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const apiKey = '1c039e11'
    axios({
      url: `https://www.omdbapi.com/?apikey=${apiKey}`,
      method: 'GET',
      responseType: 'json',
      params: {
        s: `${this.state.search}`,
        type: "movie"
      }
    }).then((movies) => {
      this.setState({
        movies: movies.data.Search,
      });
      this.props.toggleRedirect(true)
      const text = document.getElementById('movie');
      // remove the text input and not just setting state to ""
      text.value = "";
    }).catch((error) => {
      console.log(error);
    })

  }

  redirect = () => {
    this.props.toggleRedirect(false)
  }

  toggleModal = () => {
    this.props.toggleModal(false)
  }


  

  render() {
    return (
      
      <div onClick={this.toggleModal}>
        {this.state.opening &&
          <div className="opening">
            <img src={Intro} alt="shoppies logo" />
            <h2>The Shoppies</h2>
          </div>
        }

        {!this.state.opening &&
          <BrowserRouter>
          <header>
            <NavLink to="/the-shoppies">
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
          <aside className={this.props.counter === 5 ? "show" : "hide"}>
            <h4>You have nominated all your shoppies</h4>
          </aside>
          <section>
            <nav className="sidebar">
              <ul>
                <li className={this.props.modal ? 'hide' : null }>
                  <NavLink to="/the-shoppies">
                    <span className="material-icons-outlined" onClick={this.reset}>info</span>
                  </NavLink>
                </li>
                <li className={this.props.modal ? 'hide' : null }>
                  <NavLink to="/the-shoppies/cally" onClick={this.redirect}>
                    <span className="material-icons-outlined">movie</span>
                  </NavLink>
                </li>
                <li className={this.props.modal ? 'hide' : null }>
                  <NavLink to="/the-shoppies/favourite" onClick={this.redirect}>
                    <span className="material-icons">favorite_border</span>
                    <LikeCount />
                  </NavLink>
                </li>
                <li className={this.props.modal ? 'hide' : 'null' }>
                  <NavLink to="/the-shoppies">
                    <span className="material-icons">replay</span>
                  </NavLink>
                </li>
                <li className={this.props.modal ? "show include-close" : "hide"}>
                  <span className="material-icons-outlined">close</span>
                </li>
              </ul>
            </nav>
            <div className="movie-options">
              <Route exact
                path="/the-shoppies"
                render={() => <Information movies={this.state.movies} search={this.state.search} />} />
              {this.props.redirect === true ? <Redirect to="/the-shoppies" /> : <Route path="/the-shoppies/movie/:movieID" component={MovieDetails} /> }
              {this.props.redirect === true ? <Redirect to="/the-shoppies" /> : <Route path="/the-shoppies/cally" component={Cally} />}
              {this.props.redirect === true ? <Redirect to="/the-shoppies" /> : <Route path="/the-shoppies/favourite" component={Favourite} />}
            </div>
          </section>
        </BrowserRouter>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  counter: state.counter.number,
  redirect: state.redirect
});

export default connect(mapStateToProps, { toggleModal, toggleRedirect })(App);

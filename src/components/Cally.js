import { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import firebase from './firebase.js';
import noPoster from '../assets/no-poster.png';

class Cally extends Component {
  constructor() {
    super();
    this.state = {
      cally: []
    }
  }

  componentDidMount() {
    // make a reference to the database
    const dbRef = firebase.database().ref();
    // get data from the database
    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();

      // make a new empty array
      let callyMovies = [];

      // use for in loop to loop through the object
      for (let propertyKey in firebaseDataObj) {
        // propertyKey = 'b1','b2', etc.
        // extract the key and value of the object
        const propertyVal = firebaseDataObj[propertyKey];
        //format it to the way we want to
        const formattedObj = {
          id: propertyKey,
          name: propertyVal
        };

        // push this new item into the empty array
      callyMovies.push(formattedObj)
      }

      this.setState({
        cally: callyMovies
      })
    })
  }

  render() {
    console.log(this.state.cally);
    return (
      <Fragment>
        <h3>Cally's Picks</h3>
        <ul className="shoppies-list">
          {this.state.cally.map((film, key) => {
            return (
              <li key={key}>
                <Link to={{
                  pathname: `/movie/${film.name.imdbID}`,
                  state: { ID: `${film.name.imdbID}` }
                }}>
                <img src={film.name.Poster === "N/A" ? noPoster : film.name.Poster} alt={film.name.Title} />
                </Link>
                <p>{`${film.name.Title} (${film.name.Year})`}</p>
              </li>
            )
          })}
        </ul>
      </Fragment>
    )
  }
}

export default Cally;

import { Component } from 'react';
import { Link } from "react-router-dom";
import noPoster from '../assets/no-poster.png';
import { connect } from "react-redux";
import { toggleRedirect } from '../actions/index.js';

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

  redirect = () => {
    this.props.toggleRedirect(false)
  }

  render() { 
    const { title, poster, IMDB } = this.props;

    return (
      <li onClick={this.redirect}>
        <Link to={{
          pathname: `/the-shoppies/movie/${IMDB}`,
          state: { ID: `${IMDB}` }
        }}>
          <img src={poster === "N/A" ? noPoster : poster} alt={title} />
        </Link>
      </li>
    )
  }
}

const mapStateToProps = state => ({
  redirect: state.redirect
});

export default connect(mapStateToProps, { toggleRedirect })(Movie);
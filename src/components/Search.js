import { Component } from 'react';
import Logo from '../assets/cal-logo.svg';
import Search from '../assets/search.svg';

class Searchbar extends Component {

  handleChange = (e) => {
    const search = e.target.value;
    console.log(e.target.value);
    this.setState({
      search: search,
    })
  }

  render() {
    const { search } = this.props;
    return (
      <header>
        <button>
          <img className="logo" src={Logo} alt="Calvin Movie Logo"></img>
        </button>
        <form action="" className="search-bar" /*onSubmit={this.handleSubmit}*/>
          <label htmlFor="movie">Movie title</label>
          <input type="text" id="movie" name="movie" onChange={this.handleChange} value={this.props.search} placeholder="Search for a movie"></input>
          <button className="search-button" value="submit">
            <img src={Search} alt="search button"></img>
          </button>
        </form>
      </header>
    )
  }
}
export default Searchbar;


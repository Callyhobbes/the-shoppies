import React, {useState, useEffect} from 'react';


function Details() {

  const apiKey = '1c039e11'
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios({
      url: `https://www.omdbapi.com/?apikey=${apiKey}`,
      method: 'GET',
      responseType: 'json',
      params: {
        i: "tt1375666"
      }
    }).then((movies) => {
      setMovie(movies)
    })
  });

  return (
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
  )
}

export default Details;

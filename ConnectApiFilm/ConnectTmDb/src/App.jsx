import { useState, useEffect } from 'react'
import { getMovieList, searchMovie } from "./Api.jsx"
import './App.css'

function App() {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    //karena error promise makanya harus di bikin async atau bisa seperti di bawah ini
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className='Movie-wrapper' key={i}>
          {/* <div className='Movie-title'> {movie.title}</div>
          <img className="Movie-image" src={movie.poster_path} />
          <div className="Movie-date">{movie.release_date}</div>
          <div className='Movie-rate'>{movie.vote_average}</div> */}
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
      console.log({ query: query })
    }
  }
  console.log({ popularMovies: popularMovies })
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Afluz Leveling</h1>
        <input
          placeholder='cari film kesayangan'
          className='Movie-search'
          onChange={({ target }) => search(target.value)}
        />
        <div className='Movie-container'>
          {/* map{} ini di pakai di luar jsx kalau di dalam jsx pakai ini map() */}
          {popularMovies.map((movie, i) => (
            <div className='Movie-wrapper' key={i} >
              <div className='Movie-title'> {movie.title}</div>
              <img className="Movie-image" src={`${"https://image.tmdb.org/t/p/w500"}/${movie.poster_path}`} />
              <div className="Movie-date">release: {movie.release_date}</div>
              <div className='Movie-rate'>rating: {movie.vote_average}</div>
            </div>
          ))
          }
        </div>

      </header >
    </div >
  )
}
export default App

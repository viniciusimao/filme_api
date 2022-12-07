import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCards from "../components/MovieCards";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/MovieGrid.css"

const Search = () => {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const query = searchParams.get("q")

  const getSearchMovies= async (url) =>{
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results)
  }

  useEffect(() =>{
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`
    getSearchMovies(searchWithQueryURL)
  }, [query])

  return (
    <div className="container">
      <h2 className="title">Resultado: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {movies.length > 0 &&
            movies.map((movie) => <MovieCards key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search
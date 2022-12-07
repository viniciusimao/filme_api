import { useState, useEffect } from "react"
import MovieCards from "../components/MovieCards"

import '../styles/MovieGrid.css'

const movieURL=  import.meta.env.VITE_API
const movieKEY=  import.meta.env.VITE_API_KEY



const Home = () => {
  const [topFilmes, setTopFilmes] = useState([])
  
  const getTopRateFilmes = async (url) =>{
    const res = await fetch(url);
    const data = await res.json();

    setTopFilmes(data.results)
  }

  useEffect(() =>{
    const topRateURL = `${movieURL}top_rated?${movieKEY}`
    getTopRateFilmes(topRateURL)
  }, [])
  
  return (
    
    <div className="container">
      <h2 className="title">Os Melhores Filmes</h2>
      <div className="movies-container">
        {topFilmes.length > 0 &&
          topFilmes.map((movie) => <MovieCards key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home
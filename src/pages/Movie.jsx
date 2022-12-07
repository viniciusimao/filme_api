import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCards from "../components/MovieCards"

import "../styles/Movie.css"

const movieURL=  import.meta.env.VITE_API
const movieKEY=  import.meta.env.VITE_API_KEY

const Movie = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async(url) =>{
      const res = await fetch(url);
      const data = await res.json();
  
      setMovie(data)
    }

    const formatCurrency = (number) => {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };

    useEffect(() => {
      const movieUrl = `${movieURL}${id}?${movieKEY}`
      getMovie(movieUrl)
    }, [])

  return (
    <div className="movie-page">
      {movie && <>
        <MovieCards movie={movie} showLink={false} />
        <p className="tagline">{movie.tagline}</p>
        <div className="info">
          <h3>
            <BsWallet2/> Custo
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp/> Faturamento
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit/> Tempo
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>
        <div className="info descripiton">
          <h3>
            <BsFillFileEarmarkTextFill/> Resumo
          </h3>
          <p>{movie.overview}</p>
        </div>
      </>}
      </div>
  )
}

export default Movie
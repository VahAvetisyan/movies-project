import { useEffect, useState } from "react";
import "../index.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Home = () => {
    let [film, setFilm] = useState([])
    let [page, setPage] = useState(1)
    const getMoviesData = async()=>{
        let API_KEY = '8cc8bb5915e1ce414955be2f44bcb790'
        let request = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
        let data = await request.json();
        setFilm(data.results)
    }
    useEffect(()=>{getMoviesData()},[])

    const toNextPage = () => {
        setPage(--page)
    }
    
    return (
        <div className="home-div">
            <div className="movies-list">
                {film.map((el) => (
                    <div className="card" key={Math.random()}>
                        {console.log(el)}
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`} alt="Avatar"/>
                            <div className="container">
                            <h4>{el.original_title}</h4>
                            </div>
                    </div>
                ))}
            </div>
            <div id="pages-buttons-div">
                <button id="prev-btn" onClick={toNextPage}><NavigateBeforeIcon /></button>
                <h4> Page {page}</h4>
                <button id="next-btn" onClick={() => {setPage(++page)}}><NavigateNextIcon /></button>
            </div>
        </div>
    )
}

export default Home;
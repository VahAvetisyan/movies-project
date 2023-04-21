import "../index.css";
import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Home = ({selectedFilm}) => {
    let [film, setFilm] = useState([])
    let [page, setPage] = useState(1)
    const getMoviesData = async()=>{
        let API_KEY = '8cc8bb5915e1ce414955be2f44bcb790'
        let request = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=8cc8bb5915e1ce414955be2f44bcb790&language=en-US&page=1`);
        let data = await request.json();
        setFilm(data.results)
    }
    useEffect(()=>{getMoviesData()},[])


    let navigate = useNavigate();
    const routeChange = (el) => {
        selectedFilm(el)
        let path = `film`;
        navigate(path);
        
    }

    
    return (
        <div className="home-div">
            <div className="movies-list">
                {film.map((el) => (
                    <div className="card" key={Math.random()} onClick={() => { routeChange(el)}}>
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`} alt="Avatar"/>
                            <div className="container">
                            <h4>{el.original_title}</h4>
                            </div>
                    </div>
                ))}
            </div>
            <div id="pages-buttons-div">
                <button id="prev-btn" onClick={() => {setPage(--page) }}><NavigateBeforeIcon /></button>
                <h4> Page {page}</h4>
                <button id="next-btn" onClick={() => {setPage(++page)}}><NavigateNextIcon /></button>
            </div>
        </div>
    )
}

export default Home;
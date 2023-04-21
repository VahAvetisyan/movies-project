import { useEffect, useState } from "react"
import "./filmPage.css"


function FilmPage({ selectedFilm }) {
    let [film, setFilm] = useState([])
    const getMoviesData = async () => {
        let API_KEY = '8cc8bb5915e1ce414955be2f44bcb790'
        let request = await fetch(`https://api.themoviedb.org/3/movie/${selectedFilm.id}/videos?api_key=${API_KEY}&language=en-US`);
        let data = await request.json();
        setFilm((data.results).slice(0, 3))
    }
    useEffect(() => { getMoviesData() }, [])

    return (
        <div>
            <div className="FilmPage" style={{ display: "flex" }}>
                <div>
                    <img id="film-picture" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${selectedFilm.poster_path}`} alt="Poster" />
                </div>
                <div id="about-film">
                    <button>Add to watchlist</button>
                    <h1><u>{`${selectedFilm.original_title}`}</u></h1>
                    <p><b>Release Date:</b> {selectedFilm.release_date}</p>
                    <p><b>Genre:</b>{selectedFilm.genre_ids}</p>
                    <p><b>Description:</b> {selectedFilm.overview}</p>

                </div>
            </div><hr style={{ marginBottom: 30 }} />
            <h1 style={{ color: "white" }}>Movie's trailers</h1>
            <div className='video'>

                {film.map((el) => (
                    <iframe key={el.key} width="400" height="250" src={`https://www.youtube.com/embed/${el.key}`} title="YouTube video player"
                        frameBorder="3"></iframe>
                ))}
            </div>
        </div>
    )
}
export default FilmPage;
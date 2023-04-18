export default function MoviesUrl(API_KEY, page) {
    const url = []
    for (let i = 0; i < 20; i++) {
        let request = fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
        let data = request.json();
        url.push(`https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[i].backdrop_path}`)
    }
    return (<div>{
        url.map((el)=>{
            <img src={el}/>
        })}
    </div>)
}
<MoviesList API_KEY='8cc8bb5915e1ce414955be2f44bcb790&query=a' page={1} />



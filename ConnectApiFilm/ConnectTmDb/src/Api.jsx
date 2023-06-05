import axios from "axios"

const baseUrl = "https://api.themoviedb.org/3"
//baca dokumentasi kalau mau pakai
const apiKey = "api_key=6cc44b92fc1c23350bfbc2966e22eff9"

export const getMovieList = async () => {
    const movie = await axios.get(
        //gak bisa menggunakan process.env kalau di vite
        `${baseUrl}/movie/popular?${apiKey}`
    )
    console.log({ MovieList: movie })
    //perhatikn tipe data bagian ini, kalau salah maka gak bisa di maping
    return movie.data.results
}

export const searchMovie = async (q) => {
    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&${apiKey}`);
    return search.data
}
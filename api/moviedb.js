import axios from "axios";

const apiKey = "74710dfb193cb03c90cef8e7130d0b1b";

const apiBaseUrl = "https://api.themoviedb.org/3";
//HomeScreen films
const trendingMovie = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upComingMovie = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRateMovie = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
//MoviesScreen films
const filmDetails = (id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const filmCredits = (id) =>`${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const filmSimilar = (id) =>`${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
//PersonsScreen films
const personDetail = (id) =>`${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMovies = (id) =>`${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

//SearchScreen films
const searchMovies = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


 //ImageFilms and Person
export const imageOriginal = (path) => path ? `https://image.tmdb.org/t/p/original${path}` : null;


const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchTrendingMovies = async () => {
  return await apiCall(trendingMovie);
};

export const fetchupComingMovies = async () => {
  return await apiCall(upComingMovie);
};

export const fetchtopRateMovies = async () => {
  return await apiCall(topRateMovie);
};

export const fetchFilmDetails = async (id) => {
  return await apiCall(filmDetails(id));
};

export const fetchFilmCredits = async (id) => {
  return await apiCall(filmCredits(id));
};

export const fetchFilmSimilar = async (id) => {
  return await apiCall(filmSimilar(id));
};

export const fetchPersonDetail = async(id) => {
     return await apiCall(personDetail(id))  
}

export const fetchPersonMovies = async(id) => {
     return await apiCall(personMovies(id))
}

export const fetchSearchMovies = async(params) => {
     return await apiCall(searchMovies, params)
}
 
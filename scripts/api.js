const OMDb_API_KEY = 'df760c7c'; // Get from http://www.omdbapi.com
const TMDb_API_KEY = '39d46b58ed0bd204bcb73b3e27b66856';  // Get from https://www.themoviedb.org


export async function searchMovies(query, page = 1) { // Added page parameter
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDb_API_KEY}&page=${page}`; // Added page to URL
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      return {
        movies: data.Search || [], // Ensure movies is always an array
        totalResults: parseInt(data.totalResults) || 0
      };
    } else {
      // API returned an error (e.g., "Movie not found!", "Too many results.")
      return {
        movies: [],
        totalResults: 0,
        error: data.Error || "Unknown API error"
      };
    }
  } catch (error) {
    console.error('OMDb API Error:', error);
    // Network error or other issue with fetch
    return {
      movies: [],
      totalResults: 0,
      error: "Failed to fetch data from OMDb API."
    };
  }
}

export async function fetchMovieDetails(imdbID) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&i=${imdbID}`
  );
  return await response.json();
}

export async function fetchTMDbData(title, year) {
  try {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDb_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.results?.length) {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${searchData.results[0].id}?api_key=${TMDb_API_KEY}`;
      const detailsResponse = await fetch(detailsUrl);
      return await detailsResponse.json();
    }
  } catch (error) {
    console.error("TMDb Error:", error);
    return {};
  }
}
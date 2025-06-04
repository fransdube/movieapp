// DOM element selectors
const movieResultsGrid = document.getElementById('movie-results');
const paginationControlsContainer = document.getElementById('pagination-controls');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const pageInfoSpan = document.getElementById('page-info');
const loader = document.getElementById('loader');
const savedMoviesContainer = document.getElementById('saved-movies');

export function showLoader(show = true) {
  if (loader) {
    loader.style.display = show ? 'block' : 'none';
  } else {
    console.error('Loader element not found');
  }
}

export function renderMovies(movies) {
  if (!movieResultsGrid) {
    console.error('Movie results grid not found');
    return;
  }
  movieResultsGrid.innerHTML = ''; // Clear previous results

  if (!movies || movies.length === 0) {
    // movieResultsGrid.innerHTML = '<p>No movies found. Try a different search!</p>'; // Optional: message for no movies
    return;
  }

  movieResultsGrid.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}"
           alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <div class="movie-meta">
          <span>${movie.Year}</span>
          ${movie.details && movie.details.vote_average ? `<span class="movie-rating">⭐ ${movie.details.vote_average.toFixed(1)}</span>` : (movie.vote_average ? `<span class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</span>` : '')}
        </div>
        <button class="add-btn" data-id="${movie.imdbID}">Add to Watchlist</button>
      </div>
    </div>
  `).join('');
}

export function renderWatchlist(movies) {
  if (!savedMoviesContainer) {
    console.error('Saved movies container not found');
    return;
  }
  savedMoviesContainer.innerHTML = movies && movies.length
    ? movies.map(movie => `
        <div class="movie-card">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}"
               alt="${movie.Title}">
          <div class="movie-info">
            <h3>${movie.Title}</h3>
            <button class="remove-btn" data-id="${movie.imdbID}">Remove</button>
          </div>
        </div>
      `).join('')
    : '<p>Your watchlist is empty. Add some movies!</p>';
}

export function updatePaginationControls(currentPage, totalResults, moviesPerPage) {
  if (!paginationControlsContainer || !prevPageBtn || !nextPageBtn || !pageInfoSpan) {
    // Re-querying elements here is generally not a good practice if they should have been found initially.
    // It might indicate a timing issue or that elements are not yet in the DOM when ui.js is first parsed.
    // However, app.js uses DOMContentLoaded, so these should be available.
    // For robustness, we can check again, but it's better to ensure scripts are loaded correctly.
    // const tempPaginationControlsContainer = document.getElementById('pagination-controls');
    // if (!tempPaginationControlsContainer) {
    //   console.error('Pagination controls container still not found.');
    //   return;
    // }
    console.error('Pagination elements were not found initially. Ensure DOM is fully loaded and IDs are correct.');
    return;
  }

  if (totalResults === 0 || totalResults === undefined || totalResults === null) {
    paginationControlsContainer.style.display = 'none';
    return;
  }

  paginationControlsContainer.style.display = 'flex';

  const totalPages = Math.ceil(totalResults / moviesPerPage);

  if (pageInfoSpan) {
    pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  if (prevPageBtn) {
    prevPageBtn.disabled = currentPage === 1;
  }
  if (nextPageBtn) {
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
  }
}
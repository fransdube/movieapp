import { searchMovies, fetchMovieDetails, fetchTMDbData } from './api.js';
import { showLoader, renderMovies, renderWatchlist, updatePaginationControls } from './ui.js'; // Added updatePaginationControls
import { getWatchlist, addToWatchlist, removeFromWatchlist } from './watchlist.js';

let currentPage = 1;
let totalMovieResults = 0;
const MOVIES_PER_PAGE = 10; // OMDb default, good to have as a constant

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadWatchlist();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById('search-btn').addEventListener('click', handleSearch);
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  
  // Dynamic event delegation
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
      addToWatchlist(e.target.dataset.id);
      loadWatchlist();
    }
    if (e.target.classList.contains('remove-btn')) {
      removeFromWatchlist(e.target.dataset.id);
      loadWatchlist();
    }
    // Note: Pagination buttons are now handled by direct event listeners below
  });

  // Direct event listeners for pagination buttons
  const prevPageButton = document.getElementById('prev-page-btn');
  if (prevPageButton) {
    prevPageButton.addEventListener('click', handlePreviousPage);
  } else {
    console.warn('Previous page button not found during setupEventListeners');
  }

  const nextPageButton = document.getElementById('next-page-btn');
  if (nextPageButton) {
    nextPageButton.addEventListener('click', handleNextPage);
  } else {
    console.warn('Next page button not found during setupEventListeners');
  }
}

async function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  currentPage = 1; // Reset current page
  showLoader();
  
  try {
    const omdbApiResponse = await searchMovies(query, currentPage); // Pass current page
    totalMovieResults = omdbApiResponse.totalResults; // Store total results

    if (omdbApiResponse.error || !omdbApiResponse.movies?.length) {
      renderMovies([]);
      if (typeof updatePaginationControls === 'function') {
        updatePaginationControls(currentPage, totalMovieResults, MOVIES_PER_PAGE);
      }
      return;
    }

    const enriched = await Promise.all(
      omdbApiResponse.movies.map(async movie => ({ // No more slice
        ...movie,
        ...(await fetchTMDbData(movie.Title, movie.Year))
      }))
    );
    
    renderMovies(enriched);
    if (typeof updatePaginationControls === 'function') {
        updatePaginationControls(currentPage, totalMovieResults, MOVIES_PER_PAGE);
    }
  } catch (error) {
    console.error("Search Error:", error);
    if (typeof updatePaginationControls === 'function') {
      updatePaginationControls(0, 0, MOVIES_PER_PAGE);
    }
  } finally {
    showLoader(false);
  }
}

async function navigateToPage(page) {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  showLoader();
  try {
    const omdbApiResponse = await searchMovies(query, page);

    if (omdbApiResponse.error) {
      console.error("Error navigating page:", omdbApiResponse.error);
      renderMovies([]);
      if (typeof updatePaginationControls === 'function') {
        updatePaginationControls(0, 0, MOVIES_PER_PAGE);
      }
      return;
    }

    currentPage = page;

    const enriched = await Promise.all(
      omdbApiResponse.movies.map(async movie => ({
        ...movie,
        ...(await fetchTMDbData(movie.Title, movie.Year))
      }))
    );
    renderMovies(enriched);

    if (typeof updatePaginationControls === 'function') {
        updatePaginationControls(currentPage, totalMovieResults, MOVIES_PER_PAGE);
    }

  } catch (error) {
    console.error("Page Navigation Error:", error);
    if (typeof updatePaginationControls === 'function') {
      updatePaginationControls(0, 0, MOVIES_PER_PAGE);
    }
  } finally {
    showLoader(false);
  }
}

function handleNextPage() {
  const totalPages = Math.ceil(totalMovieResults / MOVIES_PER_PAGE);
  if (currentPage < totalPages) {
    navigateToPage(currentPage + 1);
  }
}

function handlePreviousPage() {
  if (currentPage > 1) {
    navigateToPage(currentPage - 1);
  }
}

async function loadWatchlist() {
  const watchlistIDs = getWatchlist();
  const movies = await Promise.all(
    watchlistIDs.map(id => fetchMovieDetails(id))
  );
  renderWatchlist(movies.filter(Boolean));
}
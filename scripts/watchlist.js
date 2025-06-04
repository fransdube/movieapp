export function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
  }
  
  export function addToWatchlist(imdbID) {
    const watchlist = getWatchlist();
    if (!watchlist.includes(imdbID)) {
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, imdbID]));
    }
  }
  
  export function removeFromWatchlist(imdbID) {
    const updated = getWatchlist().filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  }
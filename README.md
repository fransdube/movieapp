# 🎬 Movie Search App

A responsive web application that allows users to search for movies using the OMDb and TMDb APIs, and save favorites to a watchlist.

![App Screenshot](screenshot.jpg)

## ✨ Features

- **Dual API Integration**:
  - OMDb API for basic movie information
  - TMDb API for ratings and popularity data
- **Interactive Watchlist**:
  - Add/remove movies with localStorage persistence
  - Visual feedback when adding items
- **Modern UI**:
  - Responsive grid layout
  - Smooth animations and transitions
  - Loading spinner during API requests
- **Error Handling**:
  - Graceful fallback if one API fails
  - User-friendly error messages

## 🛠 Technologies Used

- **Frontend**:
  - Vanilla JavaScript (ES6+)
  - HTML5
  - CSS3 (Flexbox, Grid, Animations)
- **APIs**:
  - [OMDb API](http://www.omdbapi.com/)
  - [TMDb API](https://www.themoviedb.org/)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fransdube/movie-search-app.git
   cd movie-search-app
Get API keys:

Register for a free OMDb API key

Register for a free TMDb API key

Add your API keys to script.js:

javascript
const OMDb_API_KEY = "your_omdb_key_here";
const TMDb_API_KEY = "your_tmdb_key_here";
Open index.html in your browser (no server required)

🚀 Usage
Enter a movie title in the search box

Browse results with ratings from TMDb

Click "Add to Watchlist" to save favorites

View/remove items from your watchlist

📝 Project Structure
/movie-app
│── index.html          # Main HTML file
│── style.css           # All CSS styles
│── script.js           # JavaScript functionality
│── README.md           # This documentation
✅ Requirements Met
    Vanilla JavaScript only (no frameworks)

    Two external APIs (OMDb + TMDb)

    Dynamic + static markup

    CSS animations (hover effects, transitions)

    Clean, modular code with comments

    Accessibility & SEO best practices

Responsive design

🔮 Future Enhancements
    Add pagination for search results

    Implement a "More Info" modal with detailed movie data

    Add sorting/filtering options

    Dark mode toggle

    User ratings/reviews system

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

    🙏 Acknowledgments
    OMDb and TMDb for their excellent APIs

    Inspired by various movie database applications

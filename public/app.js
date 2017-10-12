console.log('working mo fo')
let movieDiv = document.getElementById('movie')
const createMovieCards = (movie) => (
  `
  <div class="ui card">
    <div class="image">
      <img src="${movie.poster}">
      </div>
      <div class="content">
        <a class="header">${movie.title}</a>
        <div class="meta">
          <span class="date">${movie.release_date}</span>
        </div>
        <div class="description">
          Rating: ${movie.rating} | Runtime: ${movie.runtime} <br/>
          Genres: ${movie.genre.join(',')}
        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="user icon"></i>
          ${movie.fanRating}
        </a>
      </div>
    </div>
    `
  )
fetch('/api/v1/movies')
  .then(res => res.json())
  .then(movies => {
    console.log(movies)
    let movieCardsHtml = movies.map(createMovieCards)
    movieDiv.innerHTML = movieCardsHtml.join('')
  })

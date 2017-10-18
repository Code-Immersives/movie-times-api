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

// Create a SignUp class
class SignUp {
  static handleSubmit () {
    let fields = document.getElementsByClassName('field')
    let newUser = {}
    for (let i = 0; i < fields.length; i++) {
      newUser[fields[i].lastElementChild.name] = fields[i].lastElementChild.value
    }
    fetch('/api/v1/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)

    })
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(err => console.log(err))
  }
  static createForm () {
    return `
    <div class="ui center equal width form">
      <div class="fields">
        <div class="field">
          <label>E-mail</label>
          <input name="email" type="text" placeholder="Email">
        </div>
        <div class="field">
          <label>Password</label>
          <input name="password" type="password">
        </div>
      </div>
      <div class="fields">
        <div class="field">
          <label>First name</label>
          <input name="firstName" type="text" placeholder="First Name">
        </div>
        <div class="field">
          <label>Last name</label>
          <input name="lastName" type="text" placeholder="Last Name">
        </div>
      </div>
      <div class="ui submit button">Submit</div>
      </div>
    `
  }

  static render () {
    movieDiv.innerHTML = SignUp.createForm()
    document.querySelector('.submit').addEventListener('click', SignUp.handleSubmit)
  }
}

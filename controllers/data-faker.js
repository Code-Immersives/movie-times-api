// var dataFaker = require('data-faker')
// dataFaker.set('title', ['Meet the fockers', 'Day in a life of Jose', 'Blade Runner', 'Star Wars'], {unique: true})
// dataFaker.set('rating', [1, 10], { range: true })
// dataFaker.set('number', [60, 180], { range: true })
// dataFaker.set('genre', [['thriller', 'action'], ['suspense', 'porn']])
// dataFaker.set('name', ['AMC 20', 'Regals 11'], {unique: true})
// // var movies = dataFaker.schema([
// //   {
// //     title: 'title',
// //     genre: ['genre'],
// //     rating: 'rating',
// //     fanRating: 'rating',
// //     runtime: 'number',
// //     release_date: 'date',
// //     poster: 'poster',
// //     cinemas: []},
// //   4])
// var cinemas = dataFaker.schema([
//   {
//     location: {
//       address: 'address',
//       city: 'city',
//       state: 'state',
//       zip: 10000
//     },
//     name: 'name',
//     rooms: [{ movie: {},
//       showtimes: ['date'],
//       imax: false,
//       roomNumber: 'rating'
//     }]
//   },
//   2])
// console.log(cinemas)
// for (var i = 0; i < movies.length; i++) {
//   let newMovie = new db.Movie(movies[i])
//   newMovie.save((err, movie) => {
//     if (!err) console.log('movie save')
//   })
// }
// for (var i = 0; i < cinemas.length; i++) {
//   let newCinema = new db.Cinema(cinemas[i])
//   newCinema.save((err, movie) => {
//     if (!err) console.log('cinemas save')
//     if (err) console.log(err)
//   })
// }

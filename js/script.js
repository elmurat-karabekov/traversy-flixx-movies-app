// TODO: build a router

const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
                  ${
                    movie.poster_path
                      ? `<img
                                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                                class="card-img-top"
                                alt="${movie.title}"
                                />`
                      : `<img
                                src="../images/no-image.jpg"
                                class="card-img-top"
                                alt="${movie.title}"
                                />`
                  }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${new Date(
                movie.release_date
              ).toLocaleDateString()}</small>
            </p>
          </div>
                `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayPopularShows() {
  const { results } = await fetchData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="show-details.html?id=${show.id}">
                  ${
                    show.poster_path
                      ? `<img
                                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                                class="card-img-top"
                                alt="${show.name}"
                                />`
                      : `<img
                                src="../images/no-image.jpg"
                                class="card-img-top"
                                alt="${show.name}"
                                />`
                  }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${new Date(
                show.first_air_date
              ).toLocaleDateString()}</small>
            </p>
          </div>
                `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchData(`movie/${movieId}`);

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
      <div>
      ${
        movie.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
          : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
      }
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${Math.round(movie.vote_average * 10) / 10} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
          ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${
          movie.homepage
        }" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
        <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${movie.production_companies
        .map((comp) => `<span>${comp.name}</span>`)
        .join(', ')}</div>
    </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}

function displayBackgroundImage(type, backdrop_path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  overlayDiv.classList.add('overlay');

  type === 'movie'
    ? document.querySelector('#movie-details').appendChild(overlayDiv)
    : document.querySelector('#tv-details').appendChild(overlayDiv);
}

// Fetchin Data from TMDB API
async function fetchData(endpoint) {
  const API_KEY = '3acd8b99e2a5040ad1e83e38858c7db3';
  const API_URL = 'https://api.themoviedb.org/3';

  showSpinner();

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

// Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      break;
    case '/search.html':
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

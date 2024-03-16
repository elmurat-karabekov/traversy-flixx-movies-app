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
      break;
    case '/tv-details.html':
      break;
    case '/search.html':
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

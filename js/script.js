const global = {
    currentPage: window.location.pathname,
};


async function displayPopularMovies() {
    const { results } = await fetchAPIData("movie/popular");

    results.forEach((movie) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
         movie.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
             alt="${movie.title}"
             />` 
             :` <img
             src="../images/no-image.jpg"
             class="card-img-top"
             alt="${movie.title}"
           />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

        document.querySelector("#popular-movies").appendChild(div);
    });
}

// fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = "98dadfc7abb6d74964ceb56387b911ba";
    const API_URL = "https://api.themoviedb.org/3/";

    const full_url = `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(full_url);

    const data = await response.json();

    return data;
}


// highlight active link
function highlightActivelink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
        if (link.getAttribute("href") === global.currentPage) {
            link.classList.add("active");
        }
    });
}

// Init app
function init() {
    switch (global.currentPage) {
        case "/":
        case "/index.html":
           displayPopularMovies();
            break;
        case "/shows.html":
            console.log("Shows");
            break;
        case "/movie-details.html":
            console.log("Movie Details");
            break;
        case "/tv-details.html":
            console.log("TV Details");
            break;
        case "/search.html":
            console.log("Search");
            break;
    }

    highlightActivelink();
}

document.addEventListener("DOMContentLoaded", init);
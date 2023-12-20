"use strict";

const searchInput = document.getElementById("query");
const resultsContainer = document.getElementById("results");
const loadingBlock = document.getElementById("loading");

let loadingTimer;

searchInput.addEventListener("input", function () {
  resultsContainer.innerHTML = "";

  loadingBlock.style.display = "block";

  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    const input = searchInput.value.trim();
    if (input) {
      fetchData(input);
    } else {
      loadingBlock.style.display = "none";
    }
  }, 500);
});

function fetchData(input) {
  const api = `https://itunes.apple.com/search?term=${input}&entity=song`;

  fetch(api)
    .then((Response) => Response.json())
    .then((data) => {
      loadingBlock.style.display = "none";

      displayResults(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      loadingBlock.style.display = "none";
    });
}

function displayResults(results) {
  loadingBlock.style.display = "none";

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    const fragment = document.createDocumentFragment();

    results.forEach((result) => {
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("col-md-3", "mb-4", "result");

      const songName = document.createElement("p");
      songName.textContent = `Song: ${result.trackName}`;

      const artistName = document.createElement("p");
      artistName.textContent = `Artist: ${result.artistName}`;

      const image = document.createElement("img");
      image.src = result.artworkUrl100;
      image.classList.add("img-fluid");

      resultDiv.appendChild(songName);
      resultDiv.appendChild(artistName);
      resultDiv.appendChild(image);

      fragment.appendChild(resultDiv);
    });
    resultsContainer.innerHTML = "";
    resultsContainer.appendChild(fragment);
  }
}

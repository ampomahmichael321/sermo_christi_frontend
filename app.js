const url =
  "https://raw.githubusercontent.com/ampomahmichael321/jesus_words_data/refs/heads/main/jesus_words.json";
const response = await fetch(url);
const data = await response.json();
let filtered = data;
const scripturesContainer = document.getElementById("scriptures-container");
const bookSelector = document.getElementById("book-select");
const segmentLabels = document.querySelectorAll('input[name="scope-filter"]');
const aboutSection = document.querySelector(".about");

function renderData(scripturesJSON) {
  let scripturesHtml = "";

  scripturesJSON.forEach((element) => {
    let html = `
    <div class="scripture">
          <h3 class="scripture-heading">${element.book} ${element.verse}</h3>
          <p class="scripture-text">
            ${element.KJVText}
          </p>
        </div>
    `;
    scripturesHtml += html;
  });
  aboutSection.innerHTML = "";
  scripturesContainer.innerHTML = '<p class="loader">Loading....<p>';

  setTimeout(() => {
    scripturesContainer.innerHTML = scripturesHtml;
  }, 1000);
}

function filterByBook(bookName) {
  if (scripturesContainer.innerHTML !== "") {
    filtered = data.filter((entry) => entry.book === bookName);
    scripturesContainer.innerHTML = "";
    renderData(filtered);
  }
}

function filterByWord(word) {
  filtered = data.filter((entry) =>
    entry.KJVText.toLowerCase().includes(word.toLowerCase()),
  );
  renderData(filtered);
}

function getParables() {
  if (scripturesContainer.innerHTML !== "") {
    let filteredCopy = filtered.filter((entry) => entry.parable === true); //Make a copy of the filtered varible so that you can go back to the previous filtered
    renderData(filteredCopy);
  }
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
  renderData(data);
});

bookSelector.addEventListener("change", (event) => {
  const selectedBook = event.target.value;
  if (selectedBook === "all") {
    renderData(data);
  } else {
    filterByBook(selectedBook);
  }
});

segmentLabels.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "parables") {
      getParables();
    } else {
      renderData(filtered);
    }
  });
});

const searchInput = document.querySelector("#keyword-search");
searchInput.addEventListener("input", () => {
  filterByWord(searchInput.value);
});

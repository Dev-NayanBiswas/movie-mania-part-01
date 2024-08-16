import movieData from "./movieData.js";
let flatData = dataFlutter();
let staticLength = 0;
let dataTrimmer=flatData;

//Static Data no need to Touch....
function staticData(allReviewsData) {
  const totalMovies = movieData().length;
  const totalReviews = allReviewsData.length;

  const totalRatings = allReviewsData.reduce(
    (accumulatorCallBackFunction, previousValue) => {
      let inTotalRating = accumulatorCallBackFunction + previousValue.rating;
      return inTotalRating;
    },
    0,
  );
  const avgRating = (totalRatings / totalReviews).toFixed(2);

  // console.log(totalMovies, avgRating, totalReviews);

  const movieBox = document.getElementById("totalMoviesID");
  updateDOM(movieBox, totalMovies);
  const ratingBox = document.getElementById("totalAverageRatingsID");
  updateDOM(ratingBox, avgRating);
  const reviewBox = document.getElementById("totalReviewsID");

  updateDOM(reviewBox, totalReviews);
}
// to Update Static Values on UI....
function updateDOM(element, value) {
  return (element.textContent = value);
}

// Updating all Data in the Card Container
function paintMovieData(flatMoviesData) {
  const listContainer = document.querySelector(".review_container UL");

  listContainer.innerHTML = "";

  flatMoviesData.map((movie) => {
    const list = document.createElement("li");
    list.classList.add("card");

    // Title and Rating. . .
    const para = document.createElement("p");
    para.classList.add("text-2xl", "font-bold", "text-green-700");
    para.innerText = `${movie.title} - `;
    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("rating");

    ratingSpan.textContent = `${movie.rating}`;
    para.appendChild(ratingSpan);
    list.appendChild(para);
    listContainer.appendChild(list);

    //  Review Comment
    const reviewPara = document.createElement("q");
    reviewPara.classList.add("mb-2", "mx-2", "text-xl", "comment");
    reviewPara.innerText = `${movie.content}`;
    list.appendChild(reviewPara);
    listContainer.appendChild(list);

    //User Name Date and Time
    const userName = document.createElement("p");
    userName.classList.add("mb-2", "mx-2", "userName");
    userName.textContent = `~${movie.by}~`;
    const small = document.createElement("small");
    small.classList.add("dateTime");
    small.textContent = `on ${new Intl.DateTimeFormat("en-IN").format(
      movie.on,
    )}`;

    list.appendChild(userName);
    userName.appendChild(small);
    listContainer.appendChild(list);
  });
}


// Initializing Functions;
function init() {
  const flatMoviesData = dataFlutter();
  paintMovieData(flatMoviesData);
  staticData(flatMoviesData);
}
init();

// all Buttons
const ascButton = document.getElementById("des");
const desButton = document.getElementById("asc");
const searchField = document.getElementById("search");
const lessButton = document.getElementById("less");
const moreButton = document.getElementById("more");

// button Listeners
ascButton.addEventListener("click", sortOnPostedDate);
desButton.addEventListener("click", sortOnPostedDateDesc);
searchField.addEventListener("input", searchByName);
lessButton.addEventListener("click", showLess);
moreButton.addEventListener("click", showMore);


function dataFlutter() {
  let flatData = movieData().flat();
  return flatData;
}

function via(data){
  paintMovieData(data)
}

function sortOnPostedDate() {
  const sortedToAsc = dataTrimmer.toSorted((x, y) => x.on - y.on);
  via(sortedToAsc);
}

function sortOnPostedDateDesc() {
  const sortedToDes = dataTrimmer.toSorted((x, y) => y.rating - x.rating);
  via(sortedToDes);
}

function searchByName(e) {
  let value = e.target.value.toLowerCase().trim();
  let searchedMovieArray = flatData.filter((movie) =>
    movie.title.toLowerCase().trim().includes(value),
  );
  paintMovieData(searchedMovieArray);
}



function showLess() {
  staticLength -= 9;
  if (staticLength < 9) {
    staticLength = 9;
  }
  dataTrimmer = flatData.slice(0, staticLength);
  via(dataTrimmer);
  console.log(staticLength);
  enableDisableButtons();
}
function showMore() {
  staticLength += 9;
  if (staticLength > flatData.length) {
    staticLength = flatData.length;
  }
  console.log(staticLength);
  enableDisableButtons();
  dataTrimmer = flatData.slice(0, staticLength);
  via(dataTrimmer);
}

function enableDisableButtons() {
  if (staticLength === 9) {
    lessButton.disabled = true;
  } else if (staticLength === flatData.length) {
    moreButton.disabled = true;
  } else {
    lessButton.disabled = false;
    moreButton.disabled = false;
  }
}

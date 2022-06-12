let main = document.querySelector("main");
let input = document.querySelector("input");
let btn = document.querySelector("button");
let serchDiv = document.getElementsByClassName("Serch");
let listSerch = document.querySelector("ul");
let dots = document.querySelector(".dots div");
let loud = 12;

let renderSingelShow = (show) => {
  let card = document.createElement("div");
  let titel = document.createElement("h2");
  let poster = document.createElement("img");

  titel.innerHTML = show.name;
  poster.setAttribute("src", show.image.medium);
  card.append(titel, poster);
  main.appendChild(card);
  card.addEventListener("click", () => {
    window.location.href = "./singel.html";
    localStorage.setItem("user", show.id);
  });
};

let serchData = (names) => {
  console.log(names);
  listSerch.innerHTML = "";
  names.forEach((e) => {
    let elements = document.createElement("li");
    elements.innerHTML = e.show.name;
    listSerch.appendChild(elements);
    elements.addEventListener("click", () => {
      window.location.href = "./singel.html";
      localStorage.setItem("user", e.show.id);
    });
  });
};

let fetchData = fetch(`http://api.tvmaze.com/shows`)
  .then((response) => response.json())
  .then((res) => {
    res
      .filter((e, i) => i < loud)
      .forEach((e) => {
        renderSingelShow(e);
      });
  });

window.addEventListener("load", fetchData);

input.addEventListener("keyup", (e) => {
  fetchDataSerch();
});

function fetchDataSerch() {
  fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`)
    .then((response) => response.json())
    .then((res) => {
      serchData(res);
    });
}

dots.addEventListener("click", () => {
  main.innerHTML = "";
  loud += 12;
  fetch(`http://api.tvmaze.com/shows`)
    .then((response) => response.json())
    .then((res) => {
      res
        .filter((e, i) => i < loud)
        .forEach((e) => {
          renderSingelShow(e);
        });
    });
});

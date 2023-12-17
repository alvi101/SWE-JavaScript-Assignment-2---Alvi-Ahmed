const loadedDataId = [];

const getButtons = async () => {
  try {
    url = "https://openapi.programming-hero.com/api/videos/categories";
    const response = await fetch(url);
    const data = await response.json();
    createButtons(data.data);
  } catch {
    (err) => alert(err);
  }
};

const createButtons = (data) => {
  const buttonArea = document.getElementById("button-area");
  data.forEach((el) => {
    const categoryButtons = document.createElement("div");
    categoryButtons.classList.add("my-button");
    categoryButtons.innerHTML = `
    <button
    id="cat-btn"
    class="rounded border-0"
    onclick="getData(${el.category_id})"
    >
    ${el.category}
    </button>`;
    buttonArea.appendChild(categoryButtons);
  });
};

const getData = async (id = 1000) => {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  try {
    url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
    const response = await fetch(url);
    const allData = await response.json();
    if (allData.data.length <= 0) {
      mainContent.innerHTML = `     
        <div class="error-page">
        <img class="error-img" src="./Icon.png" alt="" />
          <h2 class="error-msg">Oops!! Sorry, There is no content here</h2>
        </div>
        </div>`;
    } else {
      // add id to array for sorting later
      loadedDataId.pop();
      loadedDataId.push(id);

      // showing main data on page
      allData.data.forEach((el) => {
        if (el.authors[0].verified) {
          const videoPreview = document.createElement("div");
          videoPreview.classList.add("video-preview");
          videoPreview.innerHTML = `
            <div class='thumb-section'>
            <img class="thumbnail" src="${el.thumbnail}" alt="" />
          </div>
          <div class="video-details">
            <div class="left-details">
              <img class="channel-image" src="${el.authors[0].profile_picture}" alt="" />
            </div>
            <div class="right-details">
              <h5 class="video-title">
                ${el.title}
              </h5>
              <div class="creator d-flex">
              <p class="video-creator">${el.authors[0].profile_name}</p>
              <img class="verified" src="./practice_verified.png" alt="">
              </div>
              <p class="video-views">${el.others.views}</p>
            </div>
          </div>
          `;
          mainContent.appendChild(videoPreview);
        } else {
          const videoPreview = document.createElement("div");
          videoPreview.classList.add("video-preview");
          videoPreview.innerHTML = `
            <div class='thumb-section'>
            <img class="thumbnail" src="${el.thumbnail}" alt="" />
          </div>
          <div class="video-details">
            <div class="left-details">
              <img class="channel-image" src="${el.authors[0].profile_picture}" alt="" />
            </div>
            <div class="right-details">
              <h5 class="video-title">
                ${el.title}
              </h5>
              <p class="video-creator">${el.authors[0].profile_name}</p>
              <p class="video-views">${el.others.views}</p>
            </div>
          </div>
          `;
          mainContent.appendChild(videoPreview);
        }
      });
    }
  } catch {
    (err) => alert(err);
  }
};

// custom sorting for sort button
const sortData = async () => {
  url = `https://openapi.programming-hero.com/api/videos/category/${loadedDataId[0]}`;
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  try {
    const response = await fetch(url);
    const allData = await response.json();
    if (allData.data.length <= 0) {
      mainContent.innerHTML = `     
        <div class="error-page">
        <img class="error-img" src="./Icon.png" alt="" />
          <h2 class="error-msg">Oops!! Sorry, There is no content here</h2>
        </div>
        </div>`;
    } else {
      // sorting function after api call
      allData.data.sort(function (a, b) {
        let viewsA = parseInt(a.others.views);
        let viewsB = parseInt(b.others.views);

        return viewsB - viewsA;
      });
      console.log(allData.data);

      // showing main data on page
      allData.data.forEach((el) => {
        if (el.authors[0].verified) {
          const videoPreview = document.createElement("div");
          videoPreview.classList.add("video-preview");
          videoPreview.innerHTML = `
            <div class='thumb-section'>
            <img class="thumbnail" src="${el.thumbnail}" alt="" />
          </div>
          <div class="video-details">
            <div class="left-details">
              <img class="channel-image" src="${el.authors[0].profile_picture}" alt="" />
            </div>
            <div class="right-details">
              <h5 class="video-title">
                ${el.title}
              </h5>
              <div class="creator d-flex">
              <p class="video-creator">${el.authors[0].profile_name}</p>
              <img class="verified" src="./practice_verified.png" alt="">
              </div>
              <p class="video-views">${el.others.views}</p>
            </div>
          </div>
          `;
          mainContent.appendChild(videoPreview);
        } else {
          const videoPreview = document.createElement("div");
          videoPreview.classList.add("video-preview");
          videoPreview.innerHTML = `
            <div class='thumb-section'>
            <img class="thumbnail" src="${el.thumbnail}" alt="" />
          </div>
          <div class="video-details">
            <div class="left-details">
              <img class="channel-image" src="${el.authors[0].profile_picture}" alt="" />
            </div>
            <div class="right-details">
              <h5 class="video-title">
                ${el.title}
              </h5>
              <p class="video-creator">${el.authors[0].profile_name}</p>
              <p class="video-views">${el.others.views}</p>
            </div>
          </div>
          `;
          mainContent.appendChild(videoPreview);
        }
      });
    }
  } catch {
    (err) => alert(err);
  }
};

getButtons();
getData();

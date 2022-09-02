// categories
const categories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.data.news_category;
      categories.forEach((category) => {
        const categoryItems = document.getElementById("category-items");
        const li = document.createElement("li");
        li.classList.add("pe-2");
        li.innerHTML = `<a href="#" onclick="newsByCategory('${category.category_id}')">${category.category_name}</a>`;
        categoryItems.appendChild(li);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
categories();

// show news by category id
const newsByCategory = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allNews = data.data;
      console.log(allNews);
      preloader(true);
      const message = document.getElementById("category-message");
      // showing messages
      if (allNews.length > 0) {
        message.innerText = `${allNews.length} items found `;
      } else {
        message.innerText = "no news found";
      }

      const newsCard = document.getElementById("news-card");
      newsCard.innerHTML = ``;

      // top views news
      allNews.sort(function (a, b) {
        return b.total_view - a.total_view;
      });

      // showing news in a card
      allNews.forEach((news) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "mb-3");
        cardDiv.innerHTML = `
        <div class="row g-0 flex-column flex-sm-row">
                  <div class="col-md-3">
                    <img
                      src="${news.thumbnail_url}"
                      class="img-fluid rounded-start card-imgs"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-9">
                    <div class="card-body">
                      <h5 class="card-title">
                        ${news.title}
                      </h5>
                      <p class="card-text">
                        ${news.details.slice(1, 650)}....
                      </p>
                      <div class="card-footer-items">
                        <div class="row">
                          <div class="col-md-4 col-lg-3 col-12">
                            <div class="author h-100 d-flex align-items-center">
                              <div class="author-img">
                                <img
                                  class="img-fluid pe-1"
                                  src="${news.author.img}"
                                  alt=""
                                />
                              </div>
                              <div class="author-name">
                                <h5>${
                                  news.author.name
                                    ? news.author.name
                                    : "Not found"
                                }</h5>
                                <span>Jan 10, 2022 </span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-3 col-12">
                            <div class="news-views d-flex fw-bold pt-md-0 pt-2">
                              <a href="" class="pe-2 text-black"
                                ><i class="fa-regular fa-eye"></i
                              ></a>
                              <p>${
                                news.total_view > 0 ? news.total_view : "0"
                              } </p>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-3 col-12">
                            <div class="rateing pb-mb-0 pb-4">
                              <a href="" class="text-black"
                                ><i class="fa-solid fa-star-half-stroke"></i
                              ></a>
                              <a href="" class="text-black"
                                ><i class="fa-regular fa-star"></i
                              ></a>
                              <a href="" class="text-black"
                                ><i class="fa-regular fa-star"></i
                              ></a>
                              <a href="" class="text-black"
                                ><i class="fa-regular fa-star"></i
                              ></a>
                              <a href="" class="text-black"
                                ><i class="fa-regular fa-star"></i
                              ></a>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-3 col-12">
                            <div class="view-news">
                              <button onclick="viewNews('${
                                news._id
                              }')" class="main-btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#newsModal">see more <i class="fa-solid fa-arrow-right"></i
                              ></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        `;
        newsCard.appendChild(cardDiv);
      });

      setTimeout(() => {
        preloader(false);
      }, 100);
    })
    .catch((error) => {
      console.log(error);
    });
};

// showing news details by newsid
const viewNews = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const news = data.data;
      const modalBody = document.getElementById("news-modal-body");
      modalBody.innerHTML = `
        <div class="modal-news-img" id="">
                <img src="${news[0].image_url}" class="img-fluid mb-4" alt="">
            </div>
            <div class="modal-title">
                <h5 class="fw-bold">${news[0].title}</h5>
                <p class="mt-3">${news[0].details}</p>
            </div>
            <div class="row">
                <div class="col-md-4 ">
                  <div class="author h-100 d-flex align-items-center">
                    <div class="author-img">
                      <img
                        class="img-fluid pe-1"
                        src="${news[0].author.img}"
                        alt=""
                     style="width: 40px;   height: 40px;  border-radius: 50%;" />
                    </div>
                    <div class="author-name">
                      <h5>
                        ${
                          news[0].author.name
                            ? news[0].author.name
                            : "Not found"
                        }
                      </h5>
                      <span>Jan 10, 2022 </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 ">
                  <div class="news-views d-flex fw-bold pt-md-0 pt-2">
                    <a href="" class="pe-2 text-black"
                      ><i class="fa-regular fa-eye"></i
                    ></a>
                    <p>${news[0].total_view > 0 ? news[0].total_view : "0"}</p>
                  </div>
                </div>
                <div class="col-md-4 ">
                  <div class="rateing pb-mb-0 pb-4">
                    <a href="" class="text-black"
                      ><i class="fa-solid fa-star-half-stroke"></i
                    ></a>
                    <a href="" class="text-black"
                      ><i class="fa-regular fa-star"></i
                    ></a>
                    <a href="" class="text-black"
                      ><i class="fa-regular fa-star"></i
                    ></a>
                    <a href="" class="text-black"
                      ><i class="fa-regular fa-star"></i
                    ></a>
                    <a href="" class="text-black"
                      ><i class="fa-regular fa-star"></i
                    ></a>
                  </div>
                </div>
              </div>
        
        `;
    })
    .catch((error) => {
      console.log(error);
    });
};

// preloader
const preloader = (isPreloader) => {
  const preloader = document.getElementById("preloader");
  if (isPreloader) {
    preloader.classList.remove("d-none");
  } else {
    preloader.classList.add("d-none");
  }
};

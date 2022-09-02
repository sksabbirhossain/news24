// categories
const categories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.data.news_category;
      categories.forEach((category) => {
        // console.log(category);
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

// show news by category id
const newsByCategory = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.data);
      const allNews = data.data;
      const message = document.getElementById("category-message");
      // showing messages
      if (allNews.length > 0) {
        message.innerText = `${allNews.length} items found for category Entertainment`;
      } else {
        message.innerText = "no news found";
      }

      const newsCard = document.getElementById("news-card");
      newsCard.innerHTML = ``;
      allNews.forEach((news) => {
        console.log(news);
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
                        ${news.details.slice(1, 650)}
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
                                >see more <i class="fa-solid fa-arrow-right"></i
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
    })
    .catch((error) => {
      console.log(error);
    });
};

// view news by newsid
const viewNews = (new_id) => {
  console.log(new_id);
};

categories();

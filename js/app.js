// categories
const categories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.data);
      const categories = data.data.news_category;
      categories.forEach((category) => {
        console.log(category);
        const categoryItems = document.getElementById("category-items");
        const li = document.createElement("li");
        li.classList.add("pe-2");
        li.innerHTML = `<a href="#" onclick="newsByCategory('${category.category_id}')">${category.category_name}</a>`;
        categoryItems.appendChild(li);
      });
    });
};

categories();

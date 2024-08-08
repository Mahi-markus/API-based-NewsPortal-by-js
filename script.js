const apiKey = "085ab934cde248398959f55c3f8371cc";
const blogContainer = document.querySelector(".blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

async function fetchNewsByQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        if (article.urlToImage) {
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            blogCard.appendChild(img);
        }

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 40 ?
            article.title.slice(0, 40) + "..." :
            article.title;
        title.textContent = truncatedTitle;
        blogCard.appendChild(title);

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120 ?
            article.description.slice(0, 120) + "..." : article.description;

        description.textContent = truncatedDes;
        blogCard.appendChild(description);

        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener("click", async() => {
    const query = searchField.value.trim();

    if (query !== "") {
        try {
            const articles = await fetchNewsByQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching query:", error);
        }
    }
});

(async() => {
    try {
        const articles = await fetchRandNews();
        displayBlogs(articles);
    } catch (error) {
        console.log("Error fetching random data:", error);
    }
})();
let page = 1;
let getNews = (search, page) => {
    let loader = document.getElementById("loader");
    let content = document.getElementById("content");
    fetch(`https://api.newscatcherapi.com/v2/search?q=${search}&page_size=12&page=${page ? page : 1}`, {
        headers: {
            "x-api-key": "'tALHqDfvskylZD8t1TKTuQokjTsT7MdX2hGRWPghptM'"
        }
    })
    .then(res => res.json())
    .then(res => {
        loader.style.display = "none"
        content.style.display = "block"
        let news = document.getElementById("news");
        const articles = res.articles;
        for (var i = 0; i < articles.length; i++) {
            const { media, title, excerpt, published_date, link } = articles[i];
            console.log(articles[i])
            news.innerHTML += `
            <div class="card mt-4" style="width: 18rem;">
                <img src="${media}" class="newsImg card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title.slice(0, 40)}...</h5>
                    <p class="card-text">${excerpt.slice(0, 80)}...</p>
                    <span class="badge text-bg-info">${moment(published_date).fromNow()}</span>
                    <a href="${link}" target="_blank" class="btn btn-primary mt-2">Read More</a>
                </div>
            </div>
            `;
        }
    })
    .catch(err => console.log(err))
}

getNews()

let newsSearch = () =>{
    let news = document.getElementById("news")
    let search = document.getElementById("search")
    console.log()
    loader.style.display = "flex"
    content.style.display = "none"
    news.innerHTML="";
    getNews(search.value)
    }
let LoadMore = () =>{
    let search = document.getElementById("search")
    page++
    getNews(search.value,page)
}
window.onscroll = function (ev){
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight)
    {
        LoadMore()
    }
}
let getLatestNews= () =>{
    let news = document.getElementById("news");
    news.innerHTML = "";
    let loader = document.getElementById("loader");
    let content = document.getElementById("content");

    loader.style.display = "flex";
    content.style.display = "none";

    getNews("latest");
}
let getCricketNews = () =>{
    
    let news = document.getElementById("news")
    news.innerHTML = "";
    let loader = document.getElementById("loader");
    let content = document.getElementById("content");

    loader.style.display = "flex";
    content.style.display = "none";
    page = 1
    getNews("cricket" ,page);
}

let getEntertainment = () =>{
    let news = document.getElementById("news")
    news.innerHTML = "";
    let loader = document.getElementById("loader");
    let content = document.getElementById("content");

    loader.style.display = "flex";
    content.style.display = "none";

    getNews("entertainment");
}
function updateDateTime() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    
    const dayName = days[now.getDay()];
    const date = now.toLocaleDateString();

    document.getElementById('day').textContent =  dayName;
    document.getElementById('date').textContent =   date;
}

updateDateTime();
setInterval(updateDateTime, 24 * 60 * 60 * 1000);
const API_KEY = "479106123551ff86ce755e818d9bf71e";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const suggestions = document.getElementById("suggestions");
const loading = document.getElementById("loading");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

const rainContainer = document.getElementById("rain");

/* =========================
   CREATE RAIN DROPS
========================= */

for(let i = 0; i < 150; i++){

    const drop = document.createElement("span");

    drop.classList.add("drop");

    drop.style.left = Math.random() * 100 + "vw";

    drop.style.animationDuration =
    (Math.random() * 0.6 + 0.4) + "s";

    drop.style.animationDelay =
    Math.random() * 2 + "s";

    rainContainer.appendChild(drop);
}

/* =========================
   EVENTS
========================= */

searchBtn.addEventListener(
    "click",
    getWeather
);

cityInput.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){

            getWeather();
        }
    }
);

cityInput.addEventListener(
    "keyup",
    searchCities
);

/* =========================
   WORLDWIDE CITY SEARCH
========================= */

async function searchCities(){

    const query = cityInput.value.trim();

    if(query.length < 2){

        suggestions.innerHTML = "";

        return;
    }

    try{

        const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=8&appid=${API_KEY}`
        );

        const data = await response.json();

        let html = "";

        data.forEach(city => {

            html += `
            <div
            class="suggestion-item"
            onclick="selectCity('${city.name}')">

                ${city.name},
                ${city.country}

            </div>
            `;
        });

        suggestions.innerHTML = html;

    }

    catch(error){

        console.log(error);
    }
}

/* =========================
   SELECT CITY
========================= */

function selectCity(city){

    cityInput.value = city;

    suggestions.innerHTML = "";

    getWeather();
}

/* =========================
   GET WEATHER
========================= */

async function getWeather(){

    const city = cityInput.value.trim();

    if(city === ""){

        alert("Please enter a city name");

        return;
    }

    loading.style.display = "block";

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        loading.style.display = "none";

        if(data.cod != 200){

            cityEl.innerText = "City Not Found";
            tempEl.innerText = "--";
            conditionEl.innerText = "Try Again";

            return;
        }

        cityEl.innerText =
        `${data.name}, ${data.sys.country}`;

        tempEl.innerText =
        `${Math.round(data.main.temp)}°C`;

        conditionEl.innerText =
        data.weather[0].main;

        humidityEl.innerText =
        `${data.main.humidity}%`;

        windEl.innerText =
        `${data.wind.speed} km/h`;

        updateTheme(
        data.weather[0].main
        );

    }

    catch(error){

        loading.style.display = "none";

        console.log(error);

        alert("Unable to fetch weather data");
    }
}

/* =========================
   WEATHER ANIMATIONS
========================= */

function updateTheme(weather){

    document.body.className = "";

    document.querySelector(".sun")
    .style.display = "none";

    document.querySelector(".cloud1")
    .style.display = "none";

    document.querySelector(".cloud2")
    .style.display = "none";

    document.querySelector(".cloud3")
    .style.display = "none";

    rainContainer.style.display = "none";

    if(weather.includes("Clear")){

        document.body.classList.add(
        "sunny"
        );

        document.querySelector(".sun")
        .style.display = "block";
    }

    else if(
        weather.includes("Cloud")
    ){

        document.body.classList.add(
        "cloudy"
        );

        document.querySelector(".cloud1")
        .style.display = "block";

        document.querySelector(".cloud2")
        .style.display = "block";

        document.querySelector(".cloud3")
        .style.display = "block";
    }

    else if(
        weather.includes("Rain") ||
        weather.includes("Drizzle")
    ){

        document.body.classList.add(
        "rainy"
        );

        rainContainer.style.display =
        "block";
    }

    else if(
        weather.includes("Thunderstorm")
    ){

        document.body.classList.add(
        "rainy"
        );

        rainContainer.style.display =
        "block";
    }

    else{

        document.body.classList.add(
        "cloudy"
        );
    }
}

/* =========================
   HIDE SUGGESTIONS
========================= */

document.addEventListener(
    "click",
    function(e){

        if(
            !e.target.closest(
            ".search-box")
        ){

            suggestions.innerHTML = "";
        }
    }
);
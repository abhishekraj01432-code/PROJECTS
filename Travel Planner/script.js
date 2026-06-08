const API_KEY = "479106123551ff86ce755e818d9bf71e";

/* ELEMENTS */

const fromCity = document.getElementById("fromCity");
const destination = document.getElementById("destination");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const budget = document.getElementById("budget");
const notes = document.getElementById("notes");

const planBtn = document.getElementById("planBtn");
const pdfBtn = document.getElementById("pdfBtn");
const themeToggle = document.getElementById("themeToggle");
const saveFavoriteBtn = document.getElementById("saveFavorite");

const tripDestination = document.getElementById("tripDestination");
const tripFrom = document.getElementById("tripFrom");
const tripDates = document.getElementById("tripDates");
const tripDuration = document.getElementById("tripDuration");
const tripBudget = document.getElementById("tripBudget");
const dailyBudget = document.getElementById("dailyBudget");

const weatherInfo = document.getElementById("weatherInfo");
const placesList = document.getElementById("placesList");
const hotelList = document.getElementById("hotelList");
const itinerary = document.getElementById("itinerary");
const countdown = document.getElementById("countdown");
const savedNotes = document.getElementById("savedNotes");
const recentTrips = document.getElementById("recentTrips");

/* THEME */

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeToggle.innerText =
    document.body.classList.contains("dark")
    ? "☀"
    : "🌙";
});

/* PLAN TRIP */

planBtn.addEventListener("click", planTrip);

async function planTrip(){

    if(
        !destination.value ||
        !startDate.value ||
        !endDate.value
    ){
        alert("Fill all required fields");
        return;
    }

    const days = calculateDays(
        startDate.value,
        endDate.value
    );

    tripDestination.innerText =
    destination.value;

    tripFrom.innerText =
    fromCity.value || "Not Specified";

    tripDates.innerText =
    `${startDate.value} → ${endDate.value}`;

    tripDuration.innerText =
    `${days} Days`;

    tripBudget.innerText =
    `₹${budget.value || 0}`;

    dailyBudget.innerText =
    `₹${Math.round(
        (budget.value || 0) / days
    )}`;

    savedNotes.innerText =
    notes.value || "No Notes";

    createCountdown();
    createItinerary(days);

    generatePlaces(
    destination.value
    );

    generateHotels(
    destination.value
    );

    addRecentTrip();

    await fetchWeather(
    destination.value
    );
}

/* DAYS */

function calculateDays(start,end){

    const diff =
    new Date(end) -
    new Date(start);

    const days =
    Math.ceil(
    diff /
    (1000*60*60*24)
    );

    return days > 0 ? days : 1;
}

/* COUNTDOWN */

function createCountdown(){

    const start =
    new Date(
    startDate.value
    );

    const today =
    new Date();

    const diff =
    start - today;

    const days =
    Math.ceil(
    diff /
    (1000*60*60*24)
    );

    if(days > 0){

        countdown.innerText =
        `${days} days left`;

    }else{

        countdown.innerText =
        "Trip Started";
    }
}

/* WEATHER */

async function fetchWeather(city){

    weatherInfo.innerHTML =
    "Loading...";

    try{

        const res =
        await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data =
        await res.json();

        if(data.cod != 200){

            weatherInfo.innerHTML =
            "Weather unavailable";

            return;
        }

        weatherInfo.innerHTML =
        `
        🌡 ${Math.round(data.main.temp)}°C<br>
        ☁ ${data.weather[0].main}<br>
        💧 ${data.main.humidity}%<br>
        🌬 ${data.wind.speed} km/h
        `;

    }catch{

        weatherInfo.innerHTML =
        "Unable to fetch weather";
    }
}

/* PLACES */

function generatePlaces(city){

    const placesData = {

        Paris:[
            "Eiffel Tower",
            "Louvre Museum",
            "Arc de Triomphe",
            "Seine River Cruise",
            "Notre-Dame Cathedral"
        ],

        Dubai:[
            "Burj Khalifa",
            "Dubai Mall",
            "Palm Jumeirah",
            "Dubai Marina",
            "Museum of the Future"
        ],

        London:[
            "Big Ben",
            "London Eye",
            "Tower Bridge",
            "Buckingham Palace",
            "British Museum"
        ],

        Tokyo:[
            "Tokyo Tower",
            "Shibuya Crossing",
            "Sensoji Temple",
            "Akihabara",
            "Ueno Park"
        ]
    };

    const places =
    placesData[city] ||
    [
        "City Center",
        "Popular Museum",
        "Main Market",
        "Tourist Area"
    ];

    placesList.innerHTML = "";

    places.forEach(place=>{

        placesList.innerHTML +=
        `<li>${place}</li>`;

    });
}

/* HOTELS */

function generateHotels(city){

    const hotelsData = {

        Paris:[
            "Hotel Eiffel",
            "Grand Paris",
            "Royal Stay"
        ],

        Dubai:[
            "Atlantis",
            "Burj Al Arab",
            "Jumeirah Resort"
        ],

        London:[
            "The Savoy",
            "Hilton London",
            "Park Plaza"
        ],

        Tokyo:[
            "Park Hotel",
            "Tokyo Prince",
            "Keio Plaza"
        ]
    };

    const hotels =
    hotelsData[city] ||
    [
        "Premium Hotel",
        "City Residency",
        "Tourist Inn"
    ];

    hotelList.innerHTML = "";

    hotels.forEach(hotel=>{

        hotelList.innerHTML +=
        `<li>${hotel}</li>`;

    });
}

/* ITINERARY */

function createItinerary(days){

    let text = "";

    for(let i=1;i<=days;i++){

        text +=
        `Day ${i}
• Explore City
• Visit Attractions
• Enjoy Local Food

`;
    }

    itinerary.innerText =
    text;
}

/* FAVORITES */

saveFavoriteBtn.addEventListener(
"click",
saveFavorite
);

function saveFavorite(){

    const favorites =
    JSON.parse(
    localStorage.getItem(
    "favorites"
    )
    ) || [];

    favorites.push({

        from:
        fromCity.value,

        to:
        destination.value
    });

    localStorage.setItem(
    "favorites",
    JSON.stringify(
    favorites
    )
    );

    alert(
    "Trip Saved ❤️"
    );
}

/* RECENT TRIPS */

function addRecentTrip(){

    const trips =
    JSON.parse(
    localStorage.getItem(
    "recentTrips"
    )
    ) || [];

    trips.unshift(
    destination.value
    );

    localStorage.setItem(
    "recentTrips",
    JSON.stringify(
    trips.slice(0,5)
    )
    );

    loadRecentTrips();
}

function loadRecentTrips(){

    const trips =
    JSON.parse(
    localStorage.getItem(
    "recentTrips"
    )
    ) || [];

    recentTrips.innerHTML = "";

    if(trips.length===0){

        recentTrips.innerHTML =
        "<li>No trips yet</li>";

        return;
    }

    trips.forEach(trip=>{

        recentTrips.innerHTML +=
        `<li>${trip}</li>`;

    });
}

/* PDF */

pdfBtn.addEventListener(
"click",
()=>{
    window.print();
}
);

/* INIT */

loadRecentTrips();
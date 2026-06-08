const paragraphs = [

"One morning a young boy found an old map hidden inside his grandfather's wooden chest. Curious and excited, he followed the map through a forest and discovered a beautiful waterfall. The adventure taught him that courage and curiosity often lead to wonderful discoveries.",

"A farmer worked hard every day on his small piece of land. Despite facing drought and difficult seasons, he never gave up. After years of patience and dedication, his farm became one of the most successful in the village, inspiring everyone around him.",

"A little girl dreamed of becoming a pilot. While others doubted her abilities, she studied every day and remained focused on her goal. Years later, she flew her first airplane and proved that determination can overcome any obstacle.",

"Two friends decided to climb a mountain during their summer vacation. The journey was long and tiring, but they encouraged each other throughout the climb. When they finally reached the top, they realized that teamwork makes difficult challenges easier to achieve.",

"A young artist spent countless hours practicing his painting skills. Many people ignored his early work, but he continued learning and improving. Eventually, one of his paintings was displayed in a famous gallery, bringing him recognition and success.",

"A traveler arrived in a small village where people greeted strangers with kindness and respect. He spent several days learning their traditions and helping with daily tasks. Before leaving, he understood that true wealth comes from strong relationships and community spirit.",

"A curious student loved reading books about science and space. Every evening, he would observe the stars from his rooftop. His passion eventually led him to become an astronomer who helped discover important information about distant planets.",

"During a heavy storm, a brave dog guided a lost child back to safety. The villagers were amazed by the animal's intelligence and loyalty. From that day forward, everyone treated the dog as a hero and trusted companion.",

"A carpenter carefully crafted furniture using simple tools and great attention to detail. His work was admired because every piece reflected patience and skill. He taught his apprentices that excellence is achieved through consistent effort and dedication.",

"A group of children organized a cleanup campaign in their neighborhood park. They collected litter, planted flowers, and encouraged others to keep the area clean. Their actions transformed the park into a beautiful place enjoyed by everyone.",

"A fisherman sailed into the sea before sunrise every day. Although he faced rough waters and unpredictable weather, he remained hopeful. His persistence taught him that success often belongs to those who continue working despite uncertainty.",

"A young inventor built small machines using recycled materials from his home. Many experiments failed, but each mistake taught him something valuable. Over time, he developed an innovative device that solved an important problem in his community.",

"A teacher noticed that one student lacked confidence in class. Instead of criticizing mistakes, she encouraged the student to keep trying. Gradually, the student became more confident and started achieving excellent academic results.",

"A family moved to a new city and struggled to adjust at first. By meeting neighbors, participating in local events, and helping others, they slowly built strong friendships. Their experience showed that kindness can create a sense of belonging anywhere.",

"A young athlete trained every morning before school and every evening after classes. Despite losing several competitions, he continued improving his skills. His perseverance eventually earned him a championship title and the respect of his competitors.",

"One day, a rabbit found a trapped bird in the forest. Instead of ignoring the situation, the rabbit worked hard to free the bird. Their friendship became a reminder that helping others often creates meaningful connections.",

"A librarian loved introducing children to exciting stories and adventures through books. She believed that reading could inspire imagination and knowledge. Many children who visited the library later developed a lifelong love for learning.",

"A sailor spent years exploring different oceans and visiting distant lands. Along the way, he learned new cultures, languages, and traditions. His experiences taught him that understanding different perspectives makes people wiser and more open-minded.",

"A young musician practiced the piano every day, even when progress seemed slow. Friends enjoyed listening to her performances, and eventually she played in front of a large audience. Her journey proved that consistent practice leads to improvement.",

"A small village suffered from a shortage of clean water during the summer. Residents worked together to build a new well and improve water storage systems. Their cooperation solved the problem and strengthened their community spirit.",

"A boy planted a tree in his backyard and cared for it every day. Years later, the tree provided shade, fruits, and a home for birds. The experience taught him that small actions can create lasting positive impacts.",

"A detective carefully observed every detail while solving a difficult mystery. Instead of making quick assumptions, he gathered evidence and analyzed facts. His patience and logical thinking eventually revealed the truth behind the case.",

"A baker woke up before dawn each morning to prepare fresh bread for customers. His commitment to quality and consistency earned him a loyal following. People appreciated not only his products but also his dedication to his craft.",

"A scientist spent years researching a cure for a serious disease. Many experiments failed, but she remained determined to find a solution. Her persistence eventually contributed to a medical breakthrough that helped countless people.",

"A young explorer ventured into an ancient jungle searching for forgotten ruins. Along the way, he encountered challenges that tested his courage and intelligence. The adventure taught him the value of preparation and resilience.",

"A shopkeeper treated every customer with honesty and respect. Even during difficult times, he maintained high standards and fair prices. As a result, people trusted him and continued supporting his business for many years.",

"A student struggled with mathematics and often felt discouraged. Instead of quitting, he asked for help and practiced regularly. Over time, he improved significantly and discovered that effort can overcome weakness.",

"A firefighter risked his safety to rescue people trapped during an emergency. His bravery inspired others and highlighted the importance of serving the community. Everyone admired his willingness to help those in need.",

"A photographer traveled across the country capturing beautiful landscapes and unique moments. Through his work, he shared stories that connected people with nature and culture. His photographs inspired many to explore the world around them.",

"A young entrepreneur started a small business from home with very limited resources. By working hard, learning from mistakes, and listening to customers, she gradually expanded her business and achieved remarkable success."

];

const quote = document.getElementById("quote");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");
const certificateBtn = document.getElementById("certificateBtn");
const themeBtn = document.getElementById("themeBtn");
const highScoreDisplay = document.getElementById("highScore");
const leaderboardList = document.getElementById("leaderboardList");
const keySound = document.getElementById("keySound");

let selectedParagraph = "";
let remainingParagraphs = [...paragraphs];

let timeLeft = 120;
let timer = null;
let started = false;

function loadParagraph() {

    if (remainingParagraphs.length === 0) {
        remainingParagraphs = [...paragraphs];
    }

    const randomIndex =
        Math.floor(Math.random() * remainingParagraphs.length);

    selectedParagraph =
        remainingParagraphs[randomIndex];

    remainingParagraphs.splice(randomIndex, 1);

    quote.textContent = selectedParagraph;
}

loadParagraph();

let highScore =
    parseInt(localStorage.getItem("highScore")) || 0;

highScoreDisplay.textContent = highScore;

loadLeaderboard();

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            finishTest();

        }

    }, 1000);
}

input.addEventListener("input", () => {

    if (!started) {

        started = true;
        startTimer();

    }

    playSound();
    calculateStats();

});

function calculateStats() {

    const typedText = input.value;

    let correctChars = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === selectedParagraph[i]) {
            correctChars++;
        }

    }

    let accuracy = typedText.length === 0
        ? 100
        : Math.round(
            (correctChars / typedText.length) * 100
        );

    accuracyDisplay.textContent = accuracy;

    const words =
        typedText.trim().length === 0
            ? 0
            : typedText.trim().split(/\s+/).length;

    const elapsed = 60 - timeLeft;

    if (elapsed > 0) {

        const wpm =
            Math.round((words / elapsed) * 60);

        wpmDisplay.textContent = wpm;

    }
}

function finishTest() {

    input.disabled = true;

    const finalWpm =
        parseInt(wpmDisplay.textContent);

    if (finalWpm > highScore) {

        highScore = finalWpm;

        localStorage.setItem(
            "highScore",
            highScore
        );

        highScoreDisplay.textContent =
            highScore;
    }

    saveLeaderboard(finalWpm);

    alert(
        `Test Finished!\n\nWPM: ${finalWpm}\nAccuracy: ${accuracyDisplay.textContent}%`
    );
}

restartBtn.addEventListener("click", () => {

    clearInterval(timer);

    started = false;
    timeLeft = 60;

    input.value = "";
    input.disabled = false;

    timeDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";

    loadParagraph();
});

function saveLeaderboard(score) {

    let scores =
        JSON.parse(
            localStorage.getItem("leaderboard")
        ) || [];

    scores.push(score);

    scores.sort((a, b) => b - a);

    scores = scores.slice(0, 10);

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(scores)
    );

    loadLeaderboard();
}

function loadLeaderboard() {

    const scores =
        JSON.parse(
            localStorage.getItem("leaderboard")
        ) || [];

    leaderboardList.innerHTML = "";

    scores.forEach((score, index) => {

        const li =
            document.createElement("li");

        li.textContent =
            `#${index + 1} - ${score} WPM`;

        leaderboardList.appendChild(li);

    });
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "🌙 Dark Mode";

    } else {

        themeBtn.textContent = "☀️ Light Mode";
    }

});

function playSound() {

    if (!keySound) return;

    keySound.currentTime = 0;

    keySound.play().catch(() => {});

}

certificateBtn.addEventListener("click", () => {

    const name = prompt("Enter Your Name");

    if (!name) return;

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("landscape");

    // Background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 210, "F");

    // Golden Border
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    // Inner Border
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    // Title
    doc.setTextColor(255, 215, 0);
    doc.setFontSize(30);
    doc.text(
        "CERTIFICATE OF ACHIEVEMENT",
        148,
        40,
        { align: "center" }
    );

    // Subtitle
    doc.setTextColor(255,255,255);
    doc.setFontSize(16);

    doc.text(
        "This Certificate is Proudly Presented To",
        148,
        65,
        { align: "center" }
    );

    // Name
    doc.setTextColor(0,255,255);
    doc.setFontSize(28);

    doc.text(
        name,
        148,
        90,
        { align: "center" }
    );

    // WPM
    doc.setTextColor(255,255,255);
    doc.setFontSize(18);

    doc.text(
        `Typing Speed : ${wpmDisplay.textContent} WPM`,
        148,
        115,
        { align: "center" }
    );

    // Accuracy
    doc.text(
        `Accuracy : ${accuracyDisplay.textContent}%`,
        148,
        130,
        { align: "center" }
    );

    // Current Date Time Day
    const now = new Date();

    const date =
        now.toLocaleDateString();

    const time =
        now.toLocaleTimeString();

    const day =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

    doc.setFontSize(14);

    doc.text(
        `Date : ${date}`,
        25,
        170
    );

    doc.text(
        `Time : ${time}`,
        25,
        180
    );

    doc.text(
        `Day : ${day}`,
        25,
        190
    );

    // Signature Line
    doc.setDrawColor(255,255,255);

    doc.line(
        210,
        170,
        280,
        170
    );

    // Signature
    doc.setTextColor(255,105,180);
    doc.setFontSize(24);
    doc.setFont("times","italic");

    doc.text(
        "Abhishek",
        225,
        182
    );

    doc.setTextColor(255,255,255);
    doc.setFontSize(12);

    doc.text(
        "Authorized By",
        228,
        195
    );

    // Red Stamp
    doc.setDrawColor(255,0,0);
    doc.setLineWidth(1.5);

    doc.circle(
        250,
        140,
        18
    );

    doc.setTextColor(255,0,0);
    doc.setFontSize(14);

    doc.text(
        "ABHISHEK",
        236,
        142
    );

    doc.setFontSize(8);

    doc.text(
        "CERTIFIED",
        240,
        148
    );

    // Footer
    doc.setTextColor(150,150,150);
    doc.setFontSize(10);

    doc.text(
        "Generated by Typing Speed Pro",
        148,
        205,
        { align: "center" }
    );

    doc.save(
        `${name}_Certificate.pdf`
    );

});
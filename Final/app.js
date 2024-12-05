const questions = [
    { text: "Pick a way to get around", options: ["Spaceship", "Zoo Animal", "Helicopter", "Foot"] },
    { text: "Choose a color that fits your mood", options: ["Green", "Red", "Purple", "Blue"] },
    { text: "What's your energy level?", options: ["Low", "Medium", "High", "Extreme"] },
    { text: "Pick a scenery", options: ["Beach", "Forest", "Mountains", "City"] },
    { text: "What's your go-to snack?", options: ["Fruit", "Candy", "Protein Bar", "Chips"] },
    { text: "If you could live anywhere, where would it be?", options: ["Island", "Mountain", "City", "Forest"] },
    { text: "Choose a music genre", options: ["Rock", "Pop", "Classical", "Jazz"] },
    { text: "What's your favorite type of weather?", options: ["Sunny", "Rainy", "Snowy", "Windy"] },
    { text: "If you had to pick a movie genre, what would it be?", options: ["Action", "Comedy", "Drama", "Sci-Fi"] },
    { text: "What's your dream vacation?", options: ["Adventure", "Relaxing on the beach", "Touring a city", "Going to a festival"] }
];

let answers = [];
let currentQuestionIndex = 0;

document.getElementById("get-started").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("quiz-page").classList.remove("hidden");
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement("div");
    questionElement.classList.add("quiz-question");
    questionElement.innerHTML = `<h3>${question.text}</h3>`;
    question.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("quiz-option");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => selectAnswer(index));
        questionElement.appendChild(optionButton);
    });
    quizContainer.appendChild(questionElement);
}

function selectAnswer(answerIndex) {
    answers.push(answerIndex);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const personality = getPersonality(answers);
    document.getElementById("quiz-page").classList.add("hidden");
    document.getElementById("result-page").classList.remove("hidden");

    const resultDescription = document.getElementById("result-description");
    resultDescription.textContent = personality.description;

    const playlistLink = document.getElementById("playlist-link");
    playlistLink.href = personality.spotifyPlaylist;

    // Apply background for the personality
    const resultPage = document.getElementById("result-page");
    resultPage.className = "page"; // reset classes
    resultPage.classList.add(personality.name.toLowerCase());
}

function getPersonality(answers) {
    const personalityScores = { 
        adventurer: 0,
        rockstar: 0,
        dreamer: 0,
        chillVibes: 0
    };

    answers.forEach(answer => {
        if (answer === 0 || answer === 1) personalityScores.adventurer++;
        if (answer === 2 || answer === 3) personalityScores.rockstar++;
        if (answer === 4 || answer === 5) personalityScores.dreamer++;
        if (answer === 6 || answer === 7) personalityScores.chillVibes++;
    });

    const personality = Object.keys(personalityScores).reduce((a, b) => personalityScores[a] > personalityScores[b] ? a : b);
    return getPersonalityDetails(personality);
}

function getPersonalityDetails(personality) {
    const personalityData = {
        adventurer: {
            name: "Adventurer",
            description: "You're an explorer at heart! You love trying new things and venturing into the unknown.",
            spotifyPlaylist: "https://open.spotify.com/playlist/37i9dQZF1DX0s5k4A7J9NY"
        },
        rockstar: {
            name: "Rockstar",
            description: "You have the energy and the attitude of a rockstar! Bold and full of passion.",
            spotifyPlaylist: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd"
        },
        dreamer: {
            name: "Dreamer",
            description: "You live in a world of imagination. You're always dreaming and looking for deeper meaning.",
            spotifyPlaylist: "https://open.spotify.com/playlist/37i9dQZF1DWXsT4SFzdi2f"
        },
        chillVibes: {
            name: "Chill Vibes",
            description: "You're laid-back and easy-going. You enjoy relaxing and unwinding in your own time.",
            spotifyPlaylist: "https://open.spotify.com/playlist/37i9dQZF1DX5O5AhYBRgP3"
        }
    };
    return personalityData[personality];
}

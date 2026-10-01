// ==========================================
// QUIZ APPLICATION
// ==========================================


// ==========================================
// APPLICATION STATE
// ==========================================

// Keeping related values together makes the program easier to manage.
const state = {
    currentQuestion: 0,  // Which question we are currently showing
    score: 0,             // Number of correct answers
    answers: [],          // Stores the user's answers for review
    timer: null,          // Stores the setInterval timer
    timeLeft: 15,         // Seconds remaining
    answered: false       // Prevents multiple answers
};


// ==========================================
// GET HTML ELEMENTS
// ==========================================

// We store references to HTML elements so we can update them later.
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const reviewScreen = document.getElementById("review-screen");

const startBtn = document.getElementById("start-btn");
const reviewBtn = document.getElementById("review-btn");
const restartBtn = document.getElementById("restart-btn");
const backBtn = document.getElementById("back-btn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

const finalScore = document.getElementById("final-score");
const percentageElement = document.getElementById("percentage");
const gradeElement = document.getElementById("grade");
const messageElement = document.getElementById("message");

const reviewContainer = document.getElementById("review-container");
const lastScoreElement = document.getElementById("last-score");


// ==========================================
// START QUIZ
// ==========================================

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    // Reset everything so every new quiz starts from the beginning.
    state.currentQuestion = 0;
    state.score = 0;
    state.answers = [];

    startScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");
    reviewScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    loadQuestion();
}


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    // Clear any previous timer before creating a new one.
    clearInterval(state.timer);

    state.answered = false;
    state.timeLeft = 15;

    const current = quizQuestions[state.currentQuestion];

    // Display question information.
    questionElement.textContent = current.question;

    progressText.textContent =
        `Question ${state.currentQuestion + 1} of ${quizQuestions.length}`;

    scoreElement.textContent = `Score: ${state.score}`;

    // Calculate how much of the progress bar should be filled.
    const progress =
        ((state.currentQuestion + 1) / quizQuestions.length) * 100;

    progressBar.style.width = `${progress}%`;

    timerElement.textContent = `Time: ${state.timeLeft}s`;

    // Remove old answer buttons before creating new ones.
    answersElement.innerHTML = "";

    // Create exactly four answer buttons.
    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("answer-btn");

        // Save the option number so we know which answer was clicked.
        button.dataset.index = index;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersElement.appendChild(button);
    });

    startTimer();
}


// ==========================================
// ANSWER SELECTION
// ==========================================

function selectAnswer(selectedIndex) {

    // If an answer was already selected, ignore another click.
    if (state.answered) {
        return;
    }

    state.answered = true;

    // Stop the timer immediately after the user answers.
    clearInterval(state.timer);

    const current = quizQuestions[state.currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    // Prevent the user from clicking another answer.
    buttons.forEach(button => {
        button.disabled = true;
    });

    const selectedButton = buttons[selectedIndex];
    const correctButton = buttons[current.correct];

    // Check whether the selected answer is correct.
    const isCorrect = selectedIndex === current.correct;

    if (isCorrect) {

        // Correct answer: increase score and turn button green.
        state.score++;
        selectedButton.classList.add("correct");

    } else {

        // Wrong answer: selected answer becomes red.
        selectedButton.classList.add("wrong");

        // Correct answer becomes green.
        correctButton.classList.add("correct");
    }

    // Save the answer for review mode.
    state.answers.push({
        selected: selectedIndex,
        correct: current.correct
    });

    scoreElement.textContent = `Score: ${state.score}`;

    // Give the user 1.5 seconds to see the feedback.
    setTimeout(nextQuestion, 1500);
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    state.timer = setInterval(() => {

        state.timeLeft--;

        timerElement.textContent = `Time: ${state.timeLeft}s`;

        // When the timer reaches zero, treat it as a wrong answer.
        if (state.timeLeft <= 0) {

            clearInterval(state.timer);

            timeUp();
        }

    }, 1000);
}


// ==========================================
// TIME RUNS OUT
// ==========================================

function timeUp() {

    // Prevent the user from answering after time expires.
    state.answered = true;

    const current = quizQuestions[state.currentQuestion];
    const buttons = document.querySelectorAll(".answer-btn");

    // Disable all answer buttons.
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Show the correct answer in green.
    buttons[current.correct].classList.add("correct");

    // Save -1 to mean that the user did not answer.
    state.answers.push({
        selected: -1,
        correct: current.correct
    });

    // Wait so the user can see the correct answer.
    setTimeout(nextQuestion, 1500);
}


// ==========================================
// MOVE TO NEXT QUESTION
// ==========================================

function nextQuestion() {

    state.currentQuestion++;

    // If there are more questions, display the next one.
    if (state.currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        // Otherwise the quiz has finished.
        showResults();
    }
}


// ==========================================
// RESULTS
// ==========================================

function showResults() {

    clearInterval(state.timer);

    quizScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");

    const total = quizQuestions.length;

    // Convert the score into a percentage.
    const percentage = Math.round((state.score / total) * 100);

    let grade;
    let message;

    // Determine the letter grade and message.
    if (percentage >= 90) {
        grade = "A";
        message = "Excellent work!";
    } else if (percentage >= 80) {
        grade = "B";
        message = "Great job!";
    } else if (percentage >= 70) {
        grade = "C";
        message = "Good effort!";
    } else if (percentage >= 60) {
        grade = "D";
        message = "Keep practicing!";
    } else {
        grade = "F";
        message = "Keep practicing and try again!";
    }

    finalScore.textContent =
        `You got ${state.score} out of ${total}`;

    percentageElement.textContent =
        `Percentage: ${percentage}%`;

    gradeElement.textContent =
        `Grade: ${grade}`;

    messageElement.textContent = message;

    // Save the most recent score.
    const result = {
        score: state.score,
        total: total,
        date: new Date().toLocaleDateString()
    };

    localStorage.setItem("lastQuizScore", JSON.stringify(result));
}


// ==========================================
// REVIEW MODE
// ==========================================

reviewBtn.addEventListener("click", showReview);

function showReview() {

    resultsScreen.classList.add("hidden");
    reviewScreen.classList.remove("hidden");

    reviewContainer.innerHTML = "";

    // Go through every question and show the user's answer.
    state.answers.forEach((answer, index) => {

        const question = quizQuestions[index];

        const card = document.createElement("div");
        card.classList.add("review-card");

        const questionText = document.createElement("h3");
        questionText.textContent =
            `${index + 1}. ${question.question}`;

        const userAnswer = document.createElement("p");

        // -1 means the timer ran out.
        if (answer.selected === -1) {
            userAnswer.textContent = "Your answer: No answer";
        } else {
            userAnswer.textContent =
                `Your answer: ${question.options[answer.selected]}`;
        }

        const correctAnswer = document.createElement("p");

        correctAnswer.textContent =
            `Correct answer: ${question.options[question.correct]}`;

        // Give the card different styling depending on the result.
        if (answer.selected === answer.correct) {
            card.classList.add("review-correct");
        } else {
            card.classList.add("review-wrong");
        }

        card.appendChild(questionText);
        card.appendChild(userAnswer);
        card.appendChild(correctAnswer);

        reviewContainer.appendChild(card);
    });
}


// ==========================================
// BACK TO RESULTS
// ==========================================

backBtn.addEventListener("click", () => {

    reviewScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
});


// ==========================================
// RESTART QUIZ
// ==========================================

restartBtn.addEventListener("click", startQuiz);


// ==========================================
// LOAD LAST SCORE
// ==========================================

function loadLastScore() {

    // Try to retrieve the previous result from localStorage.
    const savedScore = localStorage.getItem("lastQuizScore");

    // If there is no previous score, do nothing.
    if (!savedScore) {
        return;
    }

    // Convert the saved JSON string back into an object.
    const result = JSON.parse(savedScore);

    lastScoreElement.textContent =
        `Your last score: ${result.score}/${result.total} on ${result.date}`;
}


// Run this once when the page first loads.
loadLastScore();
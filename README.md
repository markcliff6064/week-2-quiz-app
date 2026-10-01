# Quiz App

A simple interactive quiz application built with **HTML, CSS, and JavaScript**.

The app presents multiple-choice questions, tracks the user's score, includes a countdown timer, and allows the user to review their answers after completing the quiz.
![how it is shown](https://github.com/markcliff6064/week-2-quiz-app/blob/7561cfea633b2f587e7f786b57d949527b18af7c/quiz1.jpg)
![how it is shown](https://github.com/markcliff6064/week-2-quiz-app/blob/7561cfea633b2f587e7f786b57d949527b18af7c/quiz2.jpg)
## Features

* 15 multiple-choice questions
* 4 answer options for each question
* 15-second timer for every question
* Correct answers shown in green
* Wrong answers shown in red
* Progress bar showing quiz progress
* Score tracking
* Results screen with:

  * Final score
  * Percentage
  * Letter grade
  * Performance message
* Review answers after completing the quiz
* Restart quiz option
* Saves the most recent score using `localStorage`
* Responsive design for desktop and mobile

## Technologies Used

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* Event Listeners
* Arrays and Objects
* `localStorage`
* `setInterval()`

## Project Structure

```text
quiz-app/
│
├── index.html
├── styles.css
├── script.js
└── questions.js
```

### File Description

**index.html**
Contains the structure of the quiz application and its different screens.

**styles.css**
Contains the layout, colors, buttons, progress bar, answer feedback, and responsive design.

**script.js**
Contains the quiz logic, timer, score tracking, answer checking, results, review mode, restart functionality, and localStorage.

**questions.js**
Contains the quiz questions and their answer options.

## How to Run

1. Download or clone the project.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Click **Start Quiz**.
5. Answer each question before the timer reaches zero.

## Grading Features Covered

The project implements the required functionality from the assignment:

* Question display
* Progress indicator
* Immediate answer feedback
* 15-second countdown timer
* Score tracking
* Results screen
* Review mode
* Restart functionality
* `localStorage`

## Author

**Mark Mukami**

A beginner JavaScript project created to practice DOM manipulation, events, functions, arrays, objects, timers, and browser storage.

//Define global variables
var questions = [
    {
        question:"What is the correct way to declare a variable in JavaScript?",
        answers:["var myVar;","let myVar;","const myVar;","All of the above"],
        correctAnswer:"All of the above"
    },{
        question:"Which method is used to add an element to the end of an array in JavaScript?",
        answers:["push()","pop()","shift()","unshift()"],
        correctAnswer:"push()"
    },{
        question:"What is the output of the following code?<code>console.log(2 + \"2\");</code>",
        answers:["22","4","\"22\"","NaN"],
        correctAnswer:"\"22\""
    },{
        question:"What is the correct way to check if a variable is an array in JavaScript?",
        answers:["Array.isArray(variable)","variable.isArray()","variable instanceof Array","typeof variable === \"array\""],
        correctAnswer:"Array.isArray(variable)"
    },{
        question:"What is the scope of a variable declared with the let keyword?",
        answers:["Global scope","Local scope","Block scope","Function Scope"],
        correctAnswer:"Block Scope"
    },{
        question:"Which method is used to remove the last element from an array in JavaScript?",
        answers:["push()","pop()","shift()","unshift()"],
        correctAnswer:"pop()"
    },{
        question:"What does the \"typeof\" operator return in JavaScript?",
        answers:["The value's data type","The value's memory address","The value's length","The value's index in an array"],
        correctAnswer:"The value's data type"
    },{
        question:"What does the === operator do in JavaScript?",
        answers:["Checks for equality of both value and type","Checks for equality of value only","Checks for equality of type only","Assigns a value to a variable"],
        correctAnswer:"Checks for equality of both value and type"
    },{
        question:"Which of the following is NOT a valid JavaScript loop statement?",
        answers:["for","while","loop","do...while"],
        correctAnswer:"loop"
    },{
        question:"What is the output of the following code?<code><p>const x = 5;</p><p>x = 10;</p><p>console.log(x);</p></code>",
        answers:["5","10","SyntaxError","TypeError"],
        correctAnswer:"SyntaxError"
    },
];
var questionsDiv = document.querySelector('#questions');
var answersDiv = document.querySelector('#answers');
var scoreListDiv = document.querySelector('#scoreList');
var timerCounter = 100, questionCounter = 0;
/*
Check to see if highScores is defined in the local storage. If not, then 
declare and empty array, else parse the object onto the variable.
*/
if(localStorage.getItem('highScores') === null) {
    var highScores = [];
} else {
    var highScores = JSON.parse(localStorage.getItem("highScores"));
}

//Add the event listeners to the buttons
document.querySelector('#startButton').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#welcome').style.display = 'none';
    showQuestion();
    //define the countdown timer and have it count down in hundredths 
    var interval = setInterval(function() { 
        document.querySelector('#timeRemaining').textContent = timerCounter.toFixed(2);   
        if(timerCounter === 0.00 || questionCounter >= questions.length) {
            clearInterval(interval)
            endGame();
        } else {
            timerCounter -= .01;
            timerCounter = (Math.floor(timerCounter * 100) / 100);
        }
    }, 10);
});
document.querySelector('#initialEntryButton').addEventListener('click',submitScore);
document.querySelector('#goBack').addEventListener('click', newGame);
document.querySelector('#highScoreLink').addEventListener('click', showHighScores);
document.querySelector('#clearHighScores').addEventListener('click', clearHighScores);

//Function that shows the questions
function showQuestion() {
    var question = document.createElement('h2');
    //InnerHTML was used as some questions use HTML code in them.
    question.innerHTML = questions[questionCounter].question;
    questionsDiv.textContent = "";
    answersDiv.textContent = "";    
    questionsDiv.appendChild(question);
    //Create the buttons for each answer
    for (i=0;i<questions[questionCounter].answers.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.textContent = questions[questionCounter].answers[i];
        answerButton.setAttribute('class', 'answer');
        answerButton.addEventListener("click", nextQuestion);
        answersDiv.append(answerButton);
    }
}

//Define a function that shows the next question
function nextQuestion(event) { 
    //Check if the correct answer was clicked and increment to the next question
    if(this.textContent === questions[questionCounter].correctAnswer) {
        questionCounter++;
        showResult('correct');
        //If it is the final question, end the game.
        if(questions.length > questionCounter) {
            showQuestion();
        } else {
            endGame();
        }            
    } else {
        //If incorrect, remove 10 seconds from the timer
        if(timerCounter >= 10) {
            timerCounter -= 10;
        } else {
            timerCounter = 0;
        }
        questionCounter++;  
        showResult('wrong');   
        //If it is the final question, end the game.       
        if(questions.length > questionCounter) {
            showQuestion();
        } else {
            endGame();
        }
    }    
}

//Define a function to show the result of the question if correct or wrong.
function showResult(result) {
    var resultInterval;
    if(result === 'correct') {
        document.querySelector('#resultWord').textContent = 'Correct!';
    } else {
        document.querySelector('#resultWord').textContent = 'Wrong!';                     
    }    
    document.querySelector('#result').style.display = 'block';
    //Set a timer to show the result for one second.
    resultInterval = setInterval(function() {
        clearInterval(resultInterval);
        document.querySelector('#result').style.display = 'none';
    }, 1000);
}

//Define a function to end the game once time expires or all questions are answered.
function endGame() {
    questionsDiv.textContent = "";
    answersDiv.textContent = ""; 
    //Update the text to show the final score then show the high score entry form.
    document.querySelector("#finalScore").textContent = timerCounter.toFixed(2);
    document.querySelector('#highScoresEntry').style.display = 'block';
}

//Define the function that submits the high score and initials and saves them to local storage.
function submitScore(event) {
    event.preventDefault();
    var highScore = {
        initials:document.querySelector('#initialEntry').value,
        highScore:timerCounter.toFixed(2)
    } 
    
    var highScoreLength = highScores.length;
    for (i=0; i<highScoreLength;i++) {
        console.log(i);
        if(highScores[i].highScore <= timerCounter.toFixed(2)) {
            highScores.splice(i,0,highScore); 
            break;           
        } else if(i+1 === highScoreLength) {
            highScores.push(highScore);
        }
    }
    //This limits the number of high scores logged to 10
    if(highScoreLength === 10) {
        highScores.pop();
    }  
    //if there is not a high score already listed, this will add one.   
    if(highScoreLength === 0) {
        highScores.push(highScore);
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
}

//Define the function that shows the high scores to the user.
function showHighScores() {
    scoreListDiv.textContent = "";
    document.querySelector('#highScoresEntry').style.display = 'none';       
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#highScores').style.display = 'block';
    //itterates through the highScores array and appends them to the element
    highScores.forEach(function(value, index) {
        var showScore = document.createElement('p');
        showScore.textContent = (index+1) + ". " + value.initials + " - "+ value.highScore;
        scoreListDiv.append(showScore);
    })
}

//Define the function that shows the welcome message for a new game.
function newGame(event) {   
    event.preventDefault(); 
    document.querySelector('#highScores').style.display = 'none';    
    document.querySelector('#welcome').style.display = 'block';
}

//Define the function that clears the high scores from the screen and localStorage.
function clearHighScores(event) {
    event.preventDefault();
    scoreListDiv.textContent = "";
    localStorage.removeItem("highScores");
    highScores = [];
}
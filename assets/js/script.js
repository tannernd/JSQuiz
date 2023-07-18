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
        question:"What is the output of the following code?",
        answers:["\"null\"","\"undefined\"","\"object\"","\"boolean\""],
        correctAnswer:"\"object\""
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
if(localStorage.getItem('highScores') === null) {
    var highScores = [];
} else {
    var highScores = JSON.parse(localStorage.getItem("highScores"));
}

document.querySelector('#startButton').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#welcome').style.display = 'none';
    showQuestion();
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
})

document.querySelector('#initialEntryButton').addEventListener('click',submitScore);
document.querySelector('#goBack').addEventListener('click', newGame);
document.querySelector('#highScoreLink').addEventListener('click', showHighScores);
document.querySelector('#clearHighScores').addEventListener('click', clearHighScores);

function showQuestion() {
    var question = document.createElement('h2');
    question.innerHTML = questions[questionCounter].question;
    questionsDiv.textContent = "";
    answersDiv.textContent = "";    
    questionsDiv.appendChild(question);
    for (i=0;i<questions[questionCounter].answers.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.textContent = questions[questionCounter].answers[i];
        answerButton.setAttribute('class', 'answer');
        answerButton.addEventListener("click", nextQuestion);
        answersDiv.append(answerButton);
    } 

}

function nextQuestion(event) {   
        if(this.textContent === questions[questionCounter].correctAnswer) {
            questionCounter++;
            showResult('correct');
            if(questions.length > questionCounter) {
                showQuestion();
            } else {
                endGame();
            }            
        } else {
            if(timerCounter >= 10) {
                timerCounter -= 10;
            } else {
                timerCounter = 0;
            }
            questionCounter++;  
            showResult('wrong');          
            if(questions.length > questionCounter) {
                showQuestion();
            } else {
                endGame();
            }
        }    
}

function showResult(result) {
    var resultInterval;
    if(result === 'correct') {
        document.querySelector('#resultWord').textContent = 'Correct!';
    } else {
        document.querySelector('#resultWord').textContent = 'Wrong!';                     
    }    
    document.querySelector('#result').style.display = 'block';
    resultInterval = setInterval(function() {
        clearInterval(resultInterval);
        document.querySelector('#result').style.display = 'none';
    }, 1000);
}

function endGame() {
    questionsDiv.textContent = "";
    answersDiv.textContent = ""; 
    document.querySelector("#finalScore").textContent = timerCounter.toFixed(2);
    document.querySelector('#highScoresEntry').style.display = 'block';
}

function submitScore(event) {
    event.preventDefault();
    var highScore = {
        initials:document.querySelector('#initialEntry').value,
        highScore:timerCounter.toFixed(2)
    } 
    
    var highScoreLength = highScores.length;
    console.log(highScores);
    for (i=0; i<highScoreLength;i++) {
        console.log(i);
        if(highScores[i].highScore <= timerCounter.toFixed(2)) {
            highScores.splice(i,0,highScore); 
            break;           
        } else if(i+1 === highScoreLength) {
            highScores.push(highScore);
        }
    }

    if(highScoreLength === 10) {
        highScores.pop();
    }     
    if(highScoreLength === 0) {
        highScores.push(highScore);
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
}

function showHighScores() {
    scoreListDiv.textContent = "";
    document.querySelector('#highScoresEntry').style.display = 'none';       
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#highScores').style.display = 'block';
    highScores.forEach(function(value, index) {
        var showScore = document.createElement('p');
        showScore.textContent = (index+1) + ". " + value.initials + " - "+ value.highScore;
        scoreListDiv.append(showScore);
    })
}

function newGame(event) {   
    event.preventDefault(); 
    document.querySelector('#highScores').style.display = 'none';    
    document.querySelector('#welcome').style.display = 'block';
}

function clearHighScores(event) {
    event.preventDefault();
    scoreListDiv.textContent = "";
    localStorage.removeItem("highScores");
    highScores = [];
}
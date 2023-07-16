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
var timerCounter = 100, questionCounter = 0;

document.querySelector('#startButton').addEventListener('click', function(event){
    event.preventDefault();
    var interval = setInterval(function() {
        document.querySelector('#timeRemaining').textContent = timerCounter;
        document.querySelector('#welcome').style.display = 'none';
        if(timerCounter === 0 || questionCounter > questions.length) {
            clearInterval(interval)
        } else {
            timerCounter--;
        }
    }, 1000);
})
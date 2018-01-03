
var questions = [{
    question: "Eddie Van Halen, Eric Clapton and Jimmy Page all play what insturment?",
    choices: ["Drums", "Guitar", "Piano", "Bass"],
    correctAnswer: 1
}, {
    question: "Who won the 2015 Grammy for Record of the year?",
    choices: ["Taylor Swift", "Beyonce", "Sam Smith", "Sia"],
    correctAnswer: 2
}, {
    question: "Which rapper performed the 90's hit 'Ganstar's Paradise'?",
    choices: ["Ice Cube", "Coolio", "Snoop Dog", "Dr. Dre"],
    correctAnswer: 1
}, {
    question: "Which of these bands has never had a #1 hit in the US?",
    choices: ["Led Zeppelin", "Eagles", "Feetwood Mac", "The Rolling Stones"],
    correctAnswer: 0
}, {
    question: "What modern pop artist sings the song 'Firework'?",
    choices: ["Katy Perry", "Taylor Swift", "Adele", "Mylie Cyrus"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

var number = 60;
var intervalId;
$("#game-timer").on("click", run);
function run() {
  intervalId = setInterval(decrement, 1000);
}
function decrement() {
  number--;
  $("game-timer").html("<h2>" + number + "</h2>");
  if (number === 0) {

    results.innerHTML = "<p>you scored <span>" +score+ "</span> out of <span>" +total+"</span></p>";
    alert("you scored " +score+ " out of " +total);
    clearInterval(intervalId);

  }
}
run();


$(document).ready(function () {

    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();


    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();

                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});


function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;


    $(questionClass).text(question);


    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

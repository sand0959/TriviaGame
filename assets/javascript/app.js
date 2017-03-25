// all my variables
var startScreen;
var gameHTML;
var timeCounter = 30;
var triviaQuestions = ["What was the name of Jay-Z's first album?",
    "Q-Tip, Phife Dawg & Ali Shaheed Muhammad founded which group?",
    "Which song in this list is NOT included on the album 'R U  Still Down?' by 2Pac?",
    "Talib Kweli and Mos Def formed what iconic Alternative Hip Hop duo?",
    "Which Outkast album is named after Big Boi and Andre 3000's zodiac signs?",
    "Whhich person is NOT a member of the Wu Tang Clan",
    "In the song 'N Y State of Mind', Nas claims he never sleeps. Why?",
    "What legendary producer(s) provided the beats for nearly all of 'Paul's Boutique'?"
];
var triviaAnswers = [
    ["Reasonable Doubt", "Blueprint", "Kingdom Come", "Jay-Z"],
    ["Beastie Boys", "A Tribe Called Quest", "Clorox Bleach", "Run DMC"],
    ["Thug Style", "Open Fire", "Ambitionz Az A Ridah", "Nothing to Lose"],
    ["De La Soul", "Mobb Deep", "Black Star", "Native Tongues"],
    ["Stankonia", "Southernplayalisticadillacmuzik", "Libra", "Aquamini"],
    ["Busta Rhymes", "RZA", "Ghostface Killah", "GZA"],
    ["cause sleep causes enemies to creep...", "cause sleep is the cousin of death...", "cause the early bird gets the worm...", "cause they always after me..."],
    ["Q-Tip", "The Neptunes", "Rick Rubin", "The Dust Brothers"]
];
var triviaImgs = ["<img class='center-block img-right' src='assets/images/reasonabledoubt.jpg'>",
    "<img class='center-block img-right' src='assets/images/ATCQ.jpg'>",
    "<img class='center-block img-right' src='assets/images/2pac.jpg'>",
    "<img class='center-block img-right' src='assets/images/blackstar.jpg'>",
    "<img class='center-block img-right' src='assets/images/outkast.jpg'>",
    "<img class='center-block img-right' src='assets/images/wutang.jpg'>",
    "<img class='center-block img-right' src='assets/images/nas.jpg'>",
    "<img class='center-block img-right' src='assets/images/beastie.jpg'>"
];
var wrongImg = "<img class='center-block img-wrong' src='https://media.giphy.com/media/y8mThMjGBrQpG/200w_d.gif'>"
var correctTriviaAnswers = ["A. Reasonable Doubt",
    "B. A Tribe Called Quest",
    "C. Ambitionz Az A Ridah",
    "C. Black Star",
    "D. Aquamini",
    "A. Busta Rhymes",
    "B. cause sleep is the cousin of death...",
    "D. The Dust Brothers"
];
var triviaQuestionCounter = 0;
var userAnswerChosen;
var theClock;
var correctResults = 0;
var incorrectResults = 0;
var unansweredTally = 0;
	//dont like the sound, want to revisit doing something else with it, making a few different ones
var clickSound = new Audio("assets/button-click.mp3");


$(document).ready(function() {
    // start button and starting screen
    function startTheGame() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".gameArea").html(startScreen);
    }

    startTheGame();


    $("body").on("click", ".start-button", function(event) {
        // clickSound.play();
        generateHTML();
        timerWrapper();

    });

    

    $("body").on("click", ".answer", function(event) {

        // clickSound.play();
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctTriviaAnswers[triviaQuestionCounter]) {
            clearInterval(theClock);
            correctChoice();
        } else {
            clearInterval(theClock);
            incorrectChoice();
        }
    });

    $("body").on("click", ".reset-button", function(event) {
        // clickSound.play();
        resetGame();
    });

});

function timeIsUp() {
    unansweredTally++;
    gameHTML = "<p class='text-center timerTag'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctTriviaAnswers[triviaQuestionCounter] + "</p>" + wrongImg;
    $(".gameArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function correctChoice() {
    correctResults++;
    gameHTML = "<p class='text-center timerTag'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>YESS! The answer is: " + correctTriviaAnswers[triviaQuestionCounter] + "</p>" + triviaImgs[triviaQuestionCounter];
    $(".gameArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function incorrectChoice() {
    incorrectResults++;
    gameHTML = "<p class='text-center timerTag'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center wronganswer'>Wrong! The correct answer is: " + correctTriviaAnswers[triviaQuestionCounter] + "</p>" + wrongImg;
    $(".gameArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateHTML() {
    gameHTML = "<p class='text-center timerTag'>Time Remaining: <span class='timer'>30</span></p><p class='text-center questionTag'>" + triviaQuestions[triviaQuestionCounter] + "</p><p class='first-answer answer'>A. " + triviaAnswers[triviaQuestionCounter][0] + "</p><p class='answer'>B. " + triviaAnswers[triviaQuestionCounter][1] + "</p><p class='answer'>C. " + triviaAnswers[triviaQuestionCounter][2] + "</p><p class='answer'>D. " + triviaAnswers[triviaQuestionCounter][3] + "</p>";
    $(".gameArea").html(gameHTML);
}

function wait() {
    if (triviaQuestionCounter < triviaQuestions.length - 1) {
        triviaQuestionCounter++;
        generateHTML();
        timeCounter = 30;
        timerWrapper();
    } else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (timeCounter === 0) {
            clearInterval(theClock);
            timeIsUp();
        }
        if (timeCounter > 0) {
            timeCounter--;
        }
        $(".timer").html(timeCounter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timerTag'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>Lets see how well you know your 90's Hip Hop!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctResults + "</p>" + "<p>Wrong Answers: " + incorrectResults + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-block reset-button' href='#' role='button'>Restart The Quiz!</a></p>";
    $(".gameArea").html(gameHTML);
}

function resetGame() {
    triviaQuestionCounter = 0;
    correctResults = 0;
    incorrectResults = 0;
    unansweredTally = 0;
    timeCounter = 30;
    generateHTML();
    timerWrapper();
}

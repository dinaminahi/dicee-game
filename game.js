const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let gameStart = false;

let level = 0;


function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  $("#level-title").text("Level  " + level);
  level++;
  userClickedPattern = [];
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      console.log("success");
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}

$(document).keypress(function () {
  if (gameStart === false) {
    setTimeout(function () {
      nextSequence();
    }, 500);

    $("#level-title").text("Level 0");

  }
  gameStart = true;
});

$(".btn").click(function () {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

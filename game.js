var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title")[0].textContent = "Level " + level;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeOut(75).fadeIn(75);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

$(".container .btn").click(function(){
    if(gameOn == true){
        userClickedPattern.push(this.id);
        playSound(this.id);
        animatePress(this.id);
        checkAnswer((userClickedPattern.length)-1);
    }
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

$(document).keypress(function(){
    if(gameOn == false)
        nextSequence();
    gameOn = true;
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
       if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
       }
    }
    else{
        level = 0;
        $("#level-title")[0].textContent = "Level Failed! Press Any Key To Restart!";
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 1000);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameOn = false;
}
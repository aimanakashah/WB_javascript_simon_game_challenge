const buttonColours = ["red", "blue", "green", "yellow"]; //declare the button involve
var gamePattern = []; //to store the sequence once keydown started and be compare to clicke sequnce
var userClickedPattern = []; //to store the clicked sequence

var started = false; //to make sure the game only started only when the key is pressed.
var level = 0;


  $(document).keydown(function() { //using the keydown event to start the game.
    if (!started) { //meaning true
        $("h1").text("Level " + level); //changes the text using jQuery text event
        nextSequence(); // call the function
        started = true; //meaning the game has started
    }
  });
//if clicked was triggere when the started boolean is false, it will check the button clicked using the function check answer at the bottom, and since and compare both of them, since the gamePattern array is still void, the colour is not the same to the clicked array thus game over was triggered
  $(".btn").click(function() { //calling the ".btn" class using jQuery to event click

    var userChosenColour = $(this).attr("id"); //this meaning finding id attribute of the clicked button from the html and store into new variable, in this case the id = "red"
    userClickedPattern.push(userChosenColour); //putting the red into another array to be stored once clicked

    playSound(userChosenColour); // sound played when the div/button was clicked
    animatePress(userChosenColour); //calling the function to play the animation, passing the red as parameter

    checkAnswer(userClickedPattern.length - 1); //calling the function, 
  });


function checkAnswer(currentLevel){ //this one was triggered after each click to check if the clicked colour is the same to the current level colour
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //eg, since the first level is only 1 in length, it checks the latest colour of the array. if the level is at 3, the code below wont be executed since the length of the clicked pattern is still not the same to the length of the gamepattern array. so user need to clicked again 
        if(userClickedPattern.length === gamePattern.length) { //now that user have clicked 6 times and all colour is the same, proceed to the next function
            setTimeout(function() {
                nextSequence(); //in 1 seconds the game goes to the next level,
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3"); //since the compared colour at the latest clicked  is not the same, this else is triggered
        audio.play();

        setTimeout(function() {
            $('body').addClass('game-over'); //game over class added for a period of time after 100 miliseconds and remove again after 200 miliseconds
        }, 100);
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
    
        $('h1').text("GameOver, Press Any Key To Restart."); //the text changed using the jQuery methods
        gameOver();  //function was called
    }; 
}

function gameOver() {
    level = 0; //level set back to 0
    started = false; //since the boolean is false user can clicked the keydown again, 
    gamePattern = []; //gamePattern was reset back to 0
}

function nextSequence(){

    userClickedPattern = []; //to store the clicked.
    level++; //increase the level

    $("h1").text("Level " + level); //changes the increased level

    var randomNumber = Math.floor(Math.random() * 4); //using random num to generate the colour
    var randomChosenColour = buttonColours[randomNumber]; //using the declared array from earlier to choose the colour and declared on another var. eg, red
    gamePattern.push(randomChosenColour); //added the colour eg. "red" into another array using push method

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //using said color earlier to call the id set on html to change the button/div to fadeIn and fadeOut
    playSound(randomChosenColour); // passing the red earlier to this function to play red sound
}

 
function playSound(name) { //receiving the colour red as name parameter in when this function was called
    var audio = new Audio("sounds/" + name + ".mp3"); //putting the name: red into the sounds file
	audio.play(); //play the sound intended
}

function animatePress(currentColour){ //input is red, as currentColour is red
    setTimeout(function() { //method setTimeOut was called to excute function after a certain period, not how long
        $('.' + currentColour).addClass('pressed'); // jQueury calls the class '.red' to add another class for a certain period of time. said class is not written in the html, only in css
      }, 100); //set for 100 miliseconds, 3 seconds = 3000 miliseconds
    setTimeout(function (){ 
        $('.' + currentColour).removeClass('pressed'); //remove same class after 200 miliseconds have passed
    }, 200);
}
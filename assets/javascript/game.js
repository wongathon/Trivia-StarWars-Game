
$(document).ready(function(){

//variable holders for question types
var questionNum = 0;

var correctAnswers = 0;
var wrongAnswer = 0;

var answerCorrect //knows to populate WRONG or RIGHT! when user checks answer

//timer variables
var intervalId;

var questions = [
	{	
		question: 'What is JarJars secret identity?', 
		answer: 'Sith Lord', 
		wrong1: 'Regular dude', 
		wrong2: 'CGI', 
		wrong3: 'Jedi Master',
		giphyUrl: 'http://i.imgur.com/mI08Wz2.jpg'
	}, 
	{	
		question: 'What # order did Darth Sidious order at Burger King?', 
		answer: 'Order 66', 
		wrong1: 'Whopper Meal', 
		wrong2: 'Big Mac', 
		wrong3: 'Mambo number 5',
		giphyUrl: 'http://i.imgur.com/gx2siTo.gif'
	}, 
	{	
		question: 'What is Anakin\'s favorite Dark side bedtime story?', 
		answer: 'The Tragedy of Darth Plagueis the Wise', 
		wrong1: 'The Comedy of Darth Maul the Half-Torso', 
		wrong2: 'The Tale of Darth Sidious the Wrinkly', 
		wrong3: 'The Hisotry of Chewbacca the Furry Wookie',
		giphyUrl: 'https://i.redd.it/mfcn0hwhp9by.jpg'
	}, 
	{	
		question: 'Who kills Padme Amidala in Episode 3, Revenge of the Sith?', 
		answer: 'Anakin, probably', 
		wrong1: 'Obi Wan', 
		wrong2: 'Obie Trice', 
		wrong3: 'Obi Too',
		giphyUrl: 'https://i.redd.it/930wpsocypdy.png'

	}, 
	{	
		question: 'What is Anakin\'s idea of a good time?', 
		answer: 'All of these!', 
		wrong1: 'Not Sand', 
		wrong2: 'Murder', 
		wrong3: 'Podracing',
		giphyUrl: 'https://i.redd.it/ykntr1bjo49y.jpg'
	}, 
	{	
		question: 'Who is the Viceroy of the Trade Federation?', 
		answer: 'Nute Gunray', 
		wrong1: 'No idea', 
		wrong2: 'Gun Nuteray', 
		wrong3: 'A raygun',
		giphyUrl: 'https://i.redd.it/e1qqc2slrhjy.jpg'
	}, 
	{	
		question: 'What does only a Sith do?', 
		answer: 'Deal in absolutes', 
		wrong1: 'Deal in relatavism', 
		wrong2: 'Deal in flexibility', 
		wrong3: 'Deal or no deal',
		giphyUrl: 'http://i.imgur.com/EHWAnZt.jpg'
	}];

//Timer object??
var timer = {
	time: 180,

	start: function(){
		$("#timer-slot").html("3:00");
		intervalId = setInterval(timer.count, 1000);
		console.log(intervalId);
	},

	stop: function(){
		clearInterval(intervalId);
	},

	count: function(){
		timer.time--;
		var currentTime = timer.timeConvert(timer.time);
		$("#timer-slot").html(currentTime)

		if(timer.time === 0){
			gameOver();
		}
	},

	timeConvert: function(t){
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		if (minutes === 0) {
			minutes = "00";
		}

		else if (minutes < 10) {
			minutes = minutes;
		}

		return minutes + ":" + seconds;
	}
};

//start game button
$(document).on("click", "#start-button", function(){
	
	timer.time = 180;
	questions = shuffleQ(questions);
	questionNum = 0;
	correctAnswers = 0;
	wrongAnswer = 0;

	timer.start();

	$("#giphy").empty();
	$("form").empty();
	populateRadios(questionNum);
	console.log(questionNum);
});

//jQuery shuffle radio buttons function
jQuery.fn.shuffle = function(){
	var j;
	for (var i=0; i<this.length; i++) {
		j = Math.floor(Math.random() * this.length);
		$(this[i]).before($(this[j]));
	}
	return this;
};

//takes the questionNum state and provides the question text, answer options
function populateRadios(qNum){

	$("#question").html(questions[qNum].question);
	$("form").append("<div id='a1'><input type='radio' name='radAnswer' value='answer'/> " + questions[qNum].answer +'<br></div>');
	$("form").append("<div id='a2'><input type='radio' name='radAnswer' value='wrong'/> " + questions[qNum].wrong1 +'<br></div>');
	$("form").append("<div id='a3'><input type='radio' name='radAnswer' value='wrong'/> " + questions[qNum].wrong2 +'<br></div>');
	$("form").append("<div id='a4'><input type='radio' name='radAnswer' value='wrong'/> " + questions[qNum].wrong3 +'<br></div>');
	
	$("form div").shuffle();

	$("form").append("<br><input type='button' id='answer-button' value='Submit'>");

}

//reveals right/wrong, answer, and gif.
function populateAnswer(qNum){
	$("#question").append(" The correct answer was " + questions[qNum].answer + "!!");
	$("#giphy").html("<img width='300' src='" + questions[qNum].giphyUrl + "'>");

	$("form").append("<br><input type='button' id='next-button' value='Next Question'>");

}

//submits the user radio selection and checks if answerCorrect is set to True,
//adds to score, and runs populate answer
$(document).on("click", "#answer-button", function(){
	questionCheck();
	$("form").empty();

	if(answerCorrect){
		$("#question").html("Correct!");
	} else {
		$("#question").html("Wrong!");
	}

	populateAnswer(questionNum);
	console.log(questionNum);
});

//sees if selection is correct answer
function questionCheck(){
	
	var $radios = $('input:radio[name=radAnswer]');

	if ($radios.filter('[value=answer]').is(':checked')){
		answerCorrect = true;
		correctAnswers++;
	} else {
		answerCorrect = false;
		wrongAnswer++;
	}
}

//goes to next question in the lineup
$(document).on("click", "#next-button", function(){
	$("form").empty();
	$("#giphy").empty();

	if(questionNum == questions.length-1){
		gameOver();
	} else {
		questionNum++;
		populateRadios(questionNum);
	}
	console.log(questionNum);

});

function shuffleQ(array) {
	var currIndex = array.length, tempVal, randomIndex;
	while (0 !== currIndex) {
		randomIndex = Math.floor(Math.random() * currIndex);
		currIndex -= 1;

		tempVal = array[currIndex];
		array[currIndex] = array[randomIndex];
		array[randomIndex] = tempVal;
	}
	return array;
}

function gameOver(){
	timer.stop();
	$("#question").empty();
	$("form").empty();

	$("#question").append("YOU'RE FINISHED! Your score: " + correctAnswers + "/" +questions.length);
	$("#giphy").html("<img src=http://i.giphy.com/3ornjPteRwwUdSWifC.gif>");

	$("form").append("<input type='button' id='start-button' value='Play again?'>");

}


});



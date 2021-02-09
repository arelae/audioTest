// Get the modal
var modal = document.getElementById("settings-modal");

// Get the button that opens the modal
var btn = document.getElementById("settings-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var alarmAudio = new Audio('https://freesound.org/data/previews/219/219244_4082826-lq.mp3');
// var twentyfiveMinutes = 60 * 1;
var twentyfiveMinutes = 60 * 25;
var pomodoro = 1;
//Timer Functions
window.onload = () => {
    let minute = 0;
    let seconds = 0;
    let totalSeconds = twentyfiveMinutes;
    let intervalId = null;
    function startTimer() {
        --totalSeconds;
        seconds = Math.floor(totalSeconds % 60);
        minute = Math.floor((totalSeconds / 60) % 60);
        minute = minute < 10 ? "0" + minute : minute;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("minute").innerHTML = minute;
        document.getElementById("seconds").innerHTML = seconds;
        if(totalSeconds == 0){
            totalSeconds = twentyfiveMinutes;
            clearInterval(intervalId);
            // sound();
        }
        //plays alarm when at 00:00
        if(minute == 0 && seconds == 0){
            //add this if infinite loop. doesnt stop till stop is pressed
            // alarmAudio.addEventListener('ended', function() {
            //   this.currentTime = 0;
            //   this.play();
            // }, false);
            alarmAudio.play();
        }
    }
    var mixBut = document.getElementById("mixBut");
    mixBut.addEventListener("click", Start);
    var resetTimer = document.getElementById("reset-btn");
    resetTimer.addEventListener("click", Reset);
    function Start(){
        intervalId = setInterval(startTimer, 1000);
        console.log("Started");
        mixBut.removeEventListener("click", Start);
        mixBut.addEventListener("click", Stop);
        document.getElementById("mixBut").style.background = "indianred";
        mixBut.value = "Stop Timer";
    }
    function Stop(){
    if (intervalId){
        clearInterval(intervalId);
    }
    console.log("Stopped");
    mixBut.removeEventListener("click", Stop);
    mixBut.addEventListener("click", Start);
    document.getElementById("mixBut").style.background = "lightgreen";
    mixBut.value = "Start Timer";
    }
    function Reset(){
        totalSeconds = twentyfiveMinutes;
        document.getElementById("minute").innerHTML = '25';
        document.getElementById("seconds").innerHTML = '00';
    }
    //Stop alarm sound
    document.getElementById("mixBut").onclick = function(event) {stopAlarm()}; //stop alarm when press stop
    document.getElementById("reset-btn").onclick = function(event) {stopAlarm()}; //stop alarm when press reset
    function stopAlarm() {
        var name = document.getElementById("mixBut");
        if(name.value == "Stop Timer"){
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
        }
    }
}

// Custom Timer Length
// var inputMins = document.getElementById("userMins").value;
// var inputSecs = document.getElementById("userSecs").value;
// if(inputMins == ""){
//     alert("hello");
// }
// else{
//     location.reload();
//     twentyfiveMinutes = 60 * inputMins;
//     alert(twentyfiveMinutes);
// }


(function(){
    var todo = document.querySelector( '#tasks' ),
        form = document.querySelector( 'form' ),
        field = document.querySelector( '#newitem' );
    form.addEventListener( 'submit', function( event ) {
      var text = field.value;
      if ( text !== '' ) {
        todo.innerHTML += '<li>' + text +
          ' <button onclick="Check(this);">check as done</button> <button onclick="Delete(this);">X</button> </li>';
        field.value = '';
      }
      event.preventDefault();
    }, false);
  })();

function Check(curr){
if(curr.parentNode.innerHTML.charAt(0) == "✓"){
    curr.parentNode.innerHTML= curr.parentNode.innerHTML.substring(1);
}
else{
    curr.parentNode.innerHTML = "✓" + curr.parentNode.innerHTML;
}
}

function Delete(curr){
curr.parentNode.parentNode.removeChild(curr.parentNode);    
}

var listClear = document.getElementById("clearList");

listClear.addEventListener("click", noList);

function noList(){
var ul = document.getElementById("tasks");
ul.innerHTML = "";
}
// //refresh confirmation
// window.onbeforeunload = function(event)
// {
// return confirm("Confirm refresh");
// };
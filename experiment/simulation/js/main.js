var words = ["GREEN", "BLUE", "RED", "YELLOW"];
var colors = ["#00FF00", "#0000FF", "#FF0000", "#FFFF00"];
<<<<<<< Updated upstream
var trials = 5;
var trialNum = 0;
var correctcount = 0;
document.getElementById("count").innerHTML = correctcount;
var time = [];
var startTime, endTime;
var timediff = (endTime - startTime)/1000;
=======
var word, color;
var trials = 5;
var trialNum = 0;
var correctcount = 0;
var start_exp=0;
var accept_click=0;
var endTime;
var startTime;
var time = [];
>>>>>>> Stashed changes

const colorDict = {
    g: "#00FF00",
    b: "#0000FF",
    r: "#FF0000",
    y: "#FFFF00",
};

<<<<<<< Updated upstream
=======
document.getElementById("count").innerHTML = correctcount;

>>>>>>> Stashed changes
function getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function clearCanvas() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

function writeText(text, color = "#FFFFFF") {
    clearCanvas();
    window.ctx.fillStyle = color;
    window.ctx.fillText(
        text,
        window.canvas.width / 2,
        window.canvas.height / 2
    );
}

<<<<<<< Updated upstream
function endExperiment() {
    writeText("Thanks for participating!");
=======
function endExperiment(){
    ctx.font = "50px Times New Roman";
    writeText("Thankyou!");
}

function endExperiment1() {
    clearCanvas();
    writeText("Thankyou!");
    window.canvas = document.getElementById("experiment1");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
    let times = time.toString();
    document.getElementById("experiment1").innerHTML = times;
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(times, window.canvas.width/2, window.canvas.height/2);
>>>>>>> Stashed changes
}

function displayTrial() {
    if (trialNum < trials) {
<<<<<<< Updated upstream
        clearCanvas();
        word = getRandom(words);
        color = getRandom(colors);
        window.ctx.font = "50px Times New Roman";
        writeText(word, color);
        // startTime = new Date().getTime();
        trialNum++;
    } else {
=======
        startTime = Date.now();
        clearCanvas();
        word = getRandom(words);
        color = getRandom(colors);
        ctx.font = "50px Times New Roman";
        writeText(word, color);
        accept_click = 1;
    } 
    else {
>>>>>>> Stashed changes
        endExperiment();
    }
}

document.addEventListener("keydown", function (f) {
<<<<<<< Updated upstream
    if (f.key == " " && trialNum == 0) {
        displayTrial();
        return;
    }
    for (let key in colorDict) {
        if (f.key == key && color == colorDict[key]) {
            // endTime = new Date().getTime();
            console.log(timediff + "seconds")
            writeText("Correct", color = "#00FF00");
            correctcount++;
            document.getElementById("count").innerHTML = correctcount;
            
            setTimeout(displayTrial, 2000);
            return;
        }
    }
    writeText("Wrong", color = "#FF0000");
    setTimeout(displayTrial, 2000);
=======
    if (f.key == " " && trialNum == 0 && start_exp==0) {
        start_exp=1;
        setTimeout(displayTrial,2000);
        return;
    }

    if(f.key == "q"){
        location.reload();
        correctcount = 0;
        start_exp = 0;
        trialNum = 0;
        clearCanvas();
        return;
    }

    if(start_exp==1 && accept_click==1 && trialNum<trials){
        accept_click=0;
        endTime = Date.now();
        var timetaken = endTime - startTime;
        time.push(timetaken);
        console.log(timetaken);
        console.log(time);
        for (let key in colorDict) {
            if (f.key == key && color == colorDict[key]) {
                writeText("Correct", color = "#00FF00");
                correctcount++;
                trialNum++;
                document.getElementById("count").innerHTML = correctcount;
                setTimeout(displayTrial, 2000);
                return;
            }
        }
        setTimeout(displayTrial, 2000);
        trialNum++;
        if(f.key != "g" && f.key != "b" && f.key != "r" && f.key != "y"){
            trialNum--;
            time.pop(timetaken);
            writeText("Wrong key press", color = "#FF0000");
            console.log("not accepted")
            return;
        }
        writeText("Wrong", color = "#FF0000");
    }
>>>>>>> Stashed changes
});

function setup() {
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
<<<<<<< Updated upstream
=======
    correctcount = 0;
>>>>>>> Stashed changes
}

function instructions() {
    writeText(
        "Press key 'g' for 'green', 'b' for 'blue, 'r' for 'red, 'y' for 'yellow.' Ignore the word's meaning. Press Space to start."
    );
}

function main() {
    setup();
    instructions();
}
<<<<<<< Updated upstream

$(window).on("load", main);
=======
>>>>>>> Stashed changes

var words = ["GREEN", "BLUE", "RED", "YELLOW"];
var colors = ["#00FF00", "#0000FF", "#FF0000", "#FFFF00"];
var trials = 5;
var trialNum = 0;
var correctcount = 0;
document.getElementById("count").innerHTML = correctcount;
var time = [];
var startTime, endTime;
var timediff = (endTime - startTime)/1000;

const colorDict = {
    g: "#00FF00",
    b: "#0000FF",
    r: "#FF0000",
    y: "#FFFF00",
};

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

function endExperiment() {
    writeText("Thanks for participating!");
}

function displayTrial() {
    if (trialNum < trials) {
        clearCanvas();
        word = getRandom(words);
        color = getRandom(colors);
        window.ctx.font = "50px Times New Roman";
        writeText(word, color);
        // startTime = new Date().getTime();
        trialNum++;
    } else {
        endExperiment();
    }
}

document.addEventListener("keydown", function (f) {
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
});

function setup() {
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
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

$(window).on("load", main);

var words = ["GREEN", "BLUE", "RED", "YELLOW"];
var colors = ["#00FF00", "#0000FF", "#FF0000", "#FFFF00"];
var word, color;
var trials = 5;
var trialNum = 0;
var correctcount = 0;
var start_exp=0;
var accept_click=0;
var endTime;
var startTime;
var time = [];

const colorDict = {
    g: "#00FF00",
    b: "#0000FF",
    r: "#FF0000",
    y: "#FFFF00",
};

document.getElementById("count").innerHTML = correctcount;

function getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function clearCanvas() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

function writeText(text, color = "#FFFFFF") {
    clearCanvas();
    window.ctx.fillStyle = color;
    window.ctx.textAlign = "center";
    window.ctx.font = fontSize + " sans-serif";
    const lines = text.split("\n");
    const lineHeight = 30;
    const startY = window.canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        window.ctx.fillText(line, window.canvas.width / 2, startY + i * lineHeight);
    }
}

function endExperiment(){
    writeText("Thankyou!");
}

function endExperiment1() {
    clearCanvas();
    writeText("Thank you for participating!");
    window.canvas = document.getElementById("experiment1");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "1rem sans-serif";
    let times = time.toString();
    document.getElementById("experiment1").innerHTML = times;
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(times, window.canvas.width/2, window.canvas.height/2);
}

function displayTrial() {
    if (trialNum < trials) {
        startTime = Date.now();
        clearCanvas();
        word = getRandom(words);
        color = getRandom(colors);
        ctx.font = "2rem Times New Roman";
        writeText(word, color, fontSize = "2rem");
        accept_click = 1;
    } 
    else {
        endExperiment1();
    }
}

document.addEventListener("keydown", function (f) {
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
});


function resetExperiment() {
    location.reload();
    correctcount = 0;
    start_exp = 0;
    trialNum = 0;
    clearCanvas();
}


document.getElementById("resetButton").addEventListener("click", resetExperiment);

function setup() {
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "1rem sans-serif";
    correctcount = 0;
}

function instructions() {
    writeText("Press key 'G' for 'Green', 'B' for 'Blue, 'R' for 'Red, 'Y' for 'Yellow.'\nIgnore the word's meaning.\n Press Space to start.", color = "#FFFFFF", fontSize = "1.5rem");
}

function main() {
    setup();
    instructions();
}

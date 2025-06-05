var words = ["GREEN", "BLUE", "RED", "YELLOW"];
var colors = ["#00FF00", "#0000FF", "#FF0000", "#FFFF00"];
var word, color;
var trials = 5;
var trialNum = 0;
var correctcount = 0;
var start_exp = 0;
var accept_click = 0;
var endTime;
var startTime;
var time = [];

const colorDict = {
    g: "#00FF00",
    b: "#0000FF",
    r: "#FF0000",
    y: "#FFFF00",
};

document.getElementById("count").innerText = correctcount;

function getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function writeText(text, color = "#FFFFFF", fontSize = "2rem") {
    clearCanvas();

    const canvasWidth = canvas.getBoundingClientRect().width;

    // Adjust font size based on canvas width (responsive)
    let dynamicSize = canvasWidth < 700 ? 20 : 32; // px size
    window.ctx.font = `${dynamicSize}px sans-serif`;

    ctx.fillStyle = color;
    ctx.textAlign = "center";

    const lines = text.split("\n");
    const lineHeight = dynamicSize + 10;
    const startY = canvas.height / (window.devicePixelRatio || 1) / 2 - (lines.length - 1) * lineHeight / 2;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width / (window.devicePixelRatio || 1) / 2, startY + i * lineHeight);
    }
}


function showProgress() {
    const progressText = `Trial: ${trialNum} / ${trials}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "1rem sans-serif";
    ctx.textAlign = "left";
    ctx.clearRect(0, 0, 150, 30);
    ctx.fillText(progressText, 10, 20);
}

function endExperiment() {
    clearCanvas();
    writeText("Thank you for participating!", "#FFFFFF", "2rem");

    let resultText = `Response Times (ms): ${time.join(", ")}`;
    const resultCanvas = document.getElementById("experiment1");
    resultCanvas.innerHTML = resultText;
}

function displayTrial() {
    if (trialNum < trials) {
        startTime = Date.now();
        word = getRandom(words);
        color = getRandom(colors);
        writeText(word, color, "2.5rem");
        showProgress();
        accept_click = 1;
    } else {
        endExperiment();
    }
}

function animateFeedback(text, color) {
    clearCanvas();
    writeText(text, color, "2.5rem");
    showProgress();
}

document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    if (key === " " && trialNum === 0 && start_exp === 0) {
        start_exp = 1;
        setTimeout(displayTrial, 500);
        return;
    }

    if (key === "q") {
        resetExperiment();
        return;
    }

    if (start_exp === 1 && accept_click === 1 && trialNum < trials) {
        accept_click = 0;
        endTime = Date.now();
        const timetaken = endTime - startTime;
        if (colorDict[key] && color === colorDict[key]) {
            correctcount++;
            document.getElementById("count").innerText = correctcount;
            time.push(timetaken);
            trialNum++;
            animateFeedback("Correct", "#00FF00");
            setTimeout(displayTrial, 1000);
        } else if (["g", "b", "r", "y"].includes(key)) {
            time.push(timetaken);
            trialNum++;
            animateFeedback("Wrong", "#FF0000");
            setTimeout(displayTrial, 1000);
        } else {
            animateFeedback("Invalid key", "#FF0000");
            accept_click = 1;
        }
    }
});

function resetExperiment() {
    correctcount = 0;
    trialNum = 0;
    start_exp = 0;
    time = [];
    document.getElementById("count").innerText = correctcount;
    clearCanvas();
    
    const resultCanvas = document.getElementById("experiment1");
    resultCanvas.innerHTML = ""    
    instructions();
}

function instructions() {
    clearCanvas();
    
    const canvasWidth = canvas.getBoundingClientRect().width;
    let dynamicSize = canvasWidth < 700 ? 13 : 20;
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${dynamicSize}px sans-serif`;
    ctx.textAlign = "center";
    
    const instructionText = "Press 'G' for Green, 'B' for Blue,\n'R' for Red, 'Y' for Yellow.\nIgnore the word's meaning.\nPress Space to start.";
    writeText(instructionText, "#FFFFFF");
}

function simulateKeyPress(key) {
    const event = new KeyboardEvent("keydown", {
        key: key,
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(event);
}

function setupButtons() {
    const buttons = document.querySelectorAll("#buttonContainer button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.getAttribute("data-key");
            simulateKeyPress(key);
        });
    });
}

function setup() {
    setupButtons(); // initialize button listeners
    window.canvas = document.getElementById("experiment");
    window.ctx = canvas.getContext("2d");

    // Responsive resizing
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const scale = window.devicePixelRatio || 1;

        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;

        ctx.scale(scale, scale);
        ctx.textAlign = "center";
        ctx.font = "1rem sans-serif";

        instructions(); // Redraw on resize
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial call
}



function main() {
    setup();
}

function endExperiment1() {
    endExperiment();
}

main();

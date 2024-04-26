playBtn = document.getElementById("playBtn");
resetBtn = document.getElementById("resetBtn");
splitBtn = document.getElementById("splitBtn");
counter = document.getElementById("counter");
splits = document.getElementById("splits");

playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
resetBtn.innerHTML = `<ion-icon name="reload"></ion-icon>`;
splitBtn.innerHTML = `<ion-icon name="flag-outline"></ion-icon>`;

playBtn.onclick = onPlayBtn;
resetBtn.onclick = onResetBtn;
splitBtn.onclick = onSplitBtn;

counterHours = document.getElementById("counterHours");
counterMinutes = document.getElementById("counterMinutes");
counterSeconds = document.getElementById("counterSeconds");
counterMilliseconds = document.getElementById("counterMilliseconds");

let isPlaying = false;
let startTime = 0;
let elapsedTime = 0;
let interval;

function onPlayBtn() {
    if (!isPlaying) {
        startTimer();
    }
    else {
        pauseTimer();
    }
}
function onResetBtn() {
    resetTimer();
}
function onSplitBtn() {
    addSplit();
}

function startTimer() {
    playBtn.innerHTML = `<ion-icon name="pause"></ion-icon>`;

    isPlaying = true;
    startTime = Date.now() - elapsedTime;
    splitBtn.disabled = false;
    interval = setInterval(updateTimer, 1);
}
function updateTimer() {
    elapsedTime = (Date.now() - startTime) * 1;

    const t = formatTime(elapsedTime);
    updateTimerText(t);
}
function pauseTimer() {
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;

    isPlaying = false;
    elapsedTime = Date.now() - startTime;
    splitBtn.disabled = true;
    clearInterval(interval);
}
function resetTimer() {
    const t = formatTime(0);
    updateTimerText(t);

    pauseTimer();
    startTime = 0;
    elapsedTime = 0;

    splits.innerHTML = "Your splits will show here.";
}

function formatTime(time) {
    let h = Math.trunc(time / (60 * 60 * 1000));
    let m = Math.trunc(time / (60 * 1000)) % 60;
    let s = Math.trunc(time / 1000) % 60;
    let ms = Math.trunc(time / 1) % 1000;

    function addPadding(num, padding) {
        return String(num).padStart(padding, "0");
    }
    h = addPadding(h, 2);
    m = addPadding(m, 2);
    s = addPadding(s, 2);
    ms = addPadding(ms, 3);

    return { h, m, s, ms };
}
function updateTimerText({ h, m, s, ms }) {
    counterHours.textContent = h;
    counterMinutes.textContent = m;
    counterSeconds.textContent = s;
    counterMilliseconds.textContent = ms;
}

function addSplit() {
    let t = formatTime(elapsedTime, 3);
    const timeText = `${t.h}:${t.m}:${t.s}.${t.ms}`
    const splitNumber = String(splits.childElementCount + 1).padStart(3, "0");
    if (splitNumber == 1) {
        splits.innerHTML = null;
    }

    let iconName;
    if (splitNumber % 2 === 0) {
        iconName = "flag-outline";
    }
    else {
        iconName = "flag";
    }

    splits.insertBefore(document.createElement("p"), splits.firstChild)
        .innerHTML = `#${splitNumber}</strong> - ${timeText}`;
}

//Keyboard shortcuts
addEventListener("keypress", function (event) {
    if (event.key === " ") {
        event.preventDefault();
        playBtn.click();
    }
    else if (event.key === "s") {
        event.preventDefault();
        splitBtn.click();
    }
    else if (event.key === "r") {
        event.preventDefault();
        resetBtn.click();
    }
});
let gameSeq = [];
let userSeq = [];
let hscore = 0;

let btns = ["yellow", 'red', "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let center = document.querySelector(".name");


document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    document.querySelector(".score").innerText = `Score: ${level}`;
    document.querySelector(".highscore").innerText = `High Score: ${hscore}`;
    
    h2.innerText = `Level ${level}`;
    center.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Corrected to *4 for all buttons
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            hscore = Math.max(hscore, level); // Ensures high score updates correctly
        }
    } else {
        if (level > hscore) {
            hscore = level;
        }
        h2.innerHTML = `Game over! Your score was ${level} <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length - 1);
    console.log(gameSeq);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

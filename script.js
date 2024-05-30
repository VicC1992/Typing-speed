const textParagraph = document.getElementById("mainText");
const inputChar = document.getElementById("myInput");
const gameWindow = document.getElementById("buttonDiv");
const timeDiv = document.querySelector(".time");
//inputChar.value = null;
const text = [];
text[0] = `Artificial intelligence, in its broadest sense, is intelligence
exhibited by machines, particularly computer systems. It is a field of research 
in computer science that develops and studies methods and software that enable 
machines to perceive their environment and uses learning and intelligence to 
take actions that maximize their chances of achieving defined goals. Such 
machines may be called AIs.`;
text[1] = `In computer engineering, computer architecture is the conceptual
design and fundamental operational structure of a computer system. It is the 
technical drawings and functional description of all design requirements, 
it is how to design and implement various parts of a computer focusing largely 
on the way by which the central processing unit operates internally and how it 
accesses addresses in memory.`;
text[2] = `Programming refers to a technological process for telling a computer 
which tasks to perform in order to solve problems. You can think of programming 
as a collaboration between humans and computers, in which humans create 
instructions for a computer to follow in a language computers can understand.`;

function getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let randomText = text[getRandomNumber(0, 3)];
//splitting the text into characters and display text
randomText.split('').forEach(character => {
    const spanCharacter = document.createElement("span");
    spanCharacter.innerText = character;
    textParagraph.appendChild(spanCharacter);
});

//letter, space or symbol?
function isLetter(char) {
    if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
        return 1;
    }
}

function isSymbol(char) {
    if (char === "." || char === "," || char === "!" 
    || char === "?" || char === "-") {
        return 1;
    }
}

function isSpace(char) {
    if (char === " ") {
        return 1;
    }
}

inputChar.addEventListener("input", setColor);
inputChar.addEventListener("input", start);
let spanCorrectWords = document.getElementById("words");

//set color
function setColor() {
    let correctWords = 0;
    let correctCharacter = 0;
    let lenghtCurrentWord = 0;
    const arrayText = textParagraph.querySelectorAll("span");
    const arrayInputValue = inputChar.value.split('');
    arrayText.forEach((spanCharacter, index) => {
        const character = arrayInputValue[index];
        if (character == null) {
            spanCharacter.classList.remove("green");
            spanCharacter.classList.remove("red");
        } else if (isLetter(character) || isSymbol(character) || isSpace(character) &&
         !isSpace(spanCharacter.innerText)) {
            if (character === spanCharacter.innerText) {
                spanCharacter.classList.add("green");
                spanCharacter.classList.remove("red");
                ++lenghtCurrentWord;
                ++correctCharacter;
            } else if (character != spanCharacter.innerText) {
                spanCharacter.classList.add("red");
                spanCharacter.classList.remove("green");
                ++lenghtCurrentWord;
            }
        } else if (isSpace(spanCharacter.innerText) && isSpace(character)) {
            if (correctCharacter === lenghtCurrentWord) {
                ++correctWords;
            }
            lenghtCurrentWord = 0;
            correctCharacter = 0;
        }
    });
    spanCorrectWords.innerText = correctWords;
}

//stop game
function stopGame() {
    inputChar.disabled = true;
    document.querySelector(".correctWords").style.color = "red";
    timeDiv.innerText = "Result:";
    timeDiv.style.color = "red";
}

// timer
const TEN = 10;
const THOUSAND = 1000;
const SIXTY = 60;
let second = SIXTY;
let millisecond = THOUSAND;
let cron;

function start() {
    pause();
    cron = setInterval(() => {
        timer();
    }, TEN);
}

function pause() {
    clearInterval(cron);
}

function timer() {
    if ((millisecond -= TEN) == 0) {
        millisecond = THOUSAND;
        --second;
    } else if (second <= 0) {
        pause();
        stopGame();
    }
    document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
    if (input >= TEN) {
        return input;
    }
    return `0${input}`;
}
//create button 
createButtonNewGame();

function createButtonNewGame() {
    const button = document.createElement("button");
    gameWindow.appendChild(button);
    button.classList.add("button");
    button.innerText = "Start new game";
    button.addEventListener("click", newGame);
}

function newGame() {
    location.reload();
}

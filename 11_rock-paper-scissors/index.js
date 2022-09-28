const items = ['rock', 'paper', 'scissors'];
const radios = document.getElementsByName('choice');
const button = document.getElementById('startButton');
const rGroup = document.getElementById('choises');

function getUserChoice() {
    console.log('getUserChoise');
    const checkedRadio = document.querySelector('input[name="choice"]:checked').id;
    const userChoice = items.findIndex((element) => element == checkedRadio);
    console.log('user: ' + './' + checkedRadio + '.svg');
    // draw user choise
    document.getElementById('user-choice').src = './' + checkedRadio + '.svg';

    return userChoice;
}

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3);
    // draw computer choise
    document.getElementById('computer-choice').src = './' + items[computerChoice] + '.svg';
    console.log('computer: ' + './' + items[computerChoice] + '.svg');
    return computerChoice;
}

function determineWinner(userChoice, computerChoice) {
    let result = userChoice - computerChoice;
    console.log('result: ' + result);
    if (result == 0) {
        return 'DRAW';
    } else {
        if (result == 1 || result == -2) {
            document.getElementById('main').style.backgroundImage = "url('./confetti.gif')"
            return 'YOU WIN!';
        } else {
            return 'YOU LOSE :(';
        }
    }
}

function playGame() {
    let user = getUserChoice();
    console.log('user: ' + user);
    let comp = getComputerChoice();
    console.log('comp: ' + comp);
    let result = determineWinner(user, comp)
    console.log(result);
    document.getElementById('game-field').classList.toggle("disappear", false);
    document.getElementById('result').innerHTML = result;
    button.classList.toggle("disappear", false);
}

function Init() {
    button.classList.toggle("disappear", false);
    rGroup.classList.toggle("disappear", true);
    radios.forEach(item => {
        item.checked = false;
    })
    document.getElementById("game-field").classList.toggle("disappear", true);
    document.getElementById('main').style.backgroundImage = '';
}

// play after user choise
radios.forEach(radioButton =>
    radioButton.addEventListener('click', () => {
        // hide radio group
        rGroup.classList.toggle("disappear", true);
        playGame();
    })
);

// press Srart game button
button.addEventListener('click', () => {
    Init();
    // hide Start game button
    button.classList.toggle("disappear", true);
    // show radio buttons
    rGroup.classList.toggle("disappear", false);

});


Init();

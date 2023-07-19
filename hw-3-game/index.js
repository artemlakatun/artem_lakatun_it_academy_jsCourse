function rockScissorsPaperGame () {
    let user = prompt('Please, enter your name: ');
    if(user === null) {
        confirm('You aborted this game. To start new game just refresh the page.');
        rockScissorsPaperGame();
    } else if(!user) {
        user = 'user';
    }

    if(!userValidName(user)) {
        alert('Invalid name. Please enter only letters!');
        rockScissorsPaperGame();
    }
    ////////////////////////////
    // счетчики побед
    let countUser = 0;
    let countComputer = 0;
    ///////////////////////////
    playRound(user, countUser, countComputer);
}

// проверка ввода имени
function userValidName(user) {
   let nameRegex = /^[a-zA-Z]{1,10}$/;
   return nameRegex.test(user);
}

// основная логика тут
function playRound (user, countUser, countComputer) {
    let userChoices = getUserChoice();
    let computerChoices = getRandomComputerChoice();

    if(userChoices === computerChoices) {
        playRound(user, countUser, countComputer);
    } else if (userChoices === 'rock' && computerChoices === 'scissors' ||
        userChoices === 'scissors' && computerChoices === 'paper' ||
        userChoices === 'paper' && computerChoices === 'rock') {
        countUser++;
        alert(`Computer move is: ${computerChoices}`);
        alert(`You won this round: Current count is ${user}: ${countUser}: Computer ${countComputer}`);
    } else {
        countComputer++;
        alert(`Computer move is: ${computerChoices}`);
        alert(`Computer won this round: Current count is ${user}: ${countUser}: Computer ${countComputer}`);
    }

    if(countUser < 3 && countComputer < 3) {
        playRound(user, countUser, countComputer);
    } else {
        if (countUser === 3) {
            alert(`Congratulations. You won this game. Count - You: ${countUser} : Computer ${countComputer}`);
        } else {
            alert(`Sorry. You lost this game. Count - You: ${countUser} : Computer ${countComputer}`)
        }
    }
    let playAgain = confirm('Play again?');
    if(playAgain) {
        rockScissorsPaperGame();
    } else return 0;
}

// функция для выбора ножниц, бумаги или камня
function getUserChoice () {
    let userChoice = prompt('rock, scissors, paper... Please make your move');
    if(userChoice === null) {
        confirm('You aborted this game. To start new game just refresh the page.');
        rockScissorsPaperGame();
    } else if(!userValidChoice(userChoice)) {
        alert('Invalid choice. Please make your move again!')
        getUserChoice();
    }
    return userChoice;
}

// проверяем правильность ввода
function userValidChoice (userChoice) {
    let validChoice = ['rock', 'scissors', 'paper'];
    return validChoice.includes(userChoice);
}

// компьютер рандомно выбирает ножницы, бумагу или камень
function getRandomComputerChoice () {
    let computerChoice = ['rock', 'scissors', 'paper'];
    let randIndex = Math.floor(Math.random() * 3);
    return computerChoice[randIndex];
}

rockScissorsPaperGame();
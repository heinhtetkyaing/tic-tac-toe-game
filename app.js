  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  let board = ['', '', '', '', '', '', '', '', '',];
  let currentPlayer = 'X';
  let isGameActive = true;

  const playerX_Won = 'PlayerX_Won';
  const playerO_Won = 'PlayerO_Won';
  const tie = 'Tie';

  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
      let winCondition = winningCondition[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];
      if (a === '' || b === '' || c === ''){
        continue;
      }else if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if(roundWon){
      announce(currentPlayer === 'X' ? playerX_Won : playerO_Won);
      isGameActive = false;
      return;
    }
    if(!board.includes('')){
      announce(tie);
    }
  }

  function announce(type) {
    switch(type){
      case playerX_Won:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case playerO_Won:
          announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
          break;
      case tie:
        announcer.innerHTML = 'Tie';
        break;
    }
    announcer.classList.remove('hide');
  }

  const isValidAction = (tile) => {
    if(tile.innerText === 'X' || tile.innerText === '0'){
      return false;
    }
    return true;
  }

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  }

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
  };

  const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  }

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', '',];
    isGameActive = true;
    announcer.classList.add('hide');

    if(currentPlayer == '0') {
      changePlayer();
    }

    tiles.forEach(tile => {
      tile.innerHTML = '';
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
    });
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
  })

  resetButton.addEventListener('click', resetBoard);

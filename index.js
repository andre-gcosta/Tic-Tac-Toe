function updateTitle(result) {
  const playerInput  = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText =  playerInput.value
  if (result == 'Drawn!') {
    document.querySelector('h2').innerText = result
    return
  }
  else if (result == 'player1' || result == 'player2') {
    document.querySelector('h2').innerText = playerInput.value + ' wins!'
    return
  }
}

function initializeGame() {
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  numberOfPlays = 0
  stopGame = false
  turnPlayer = 'player1'
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  updateTitle()
  gameBoard = document.querySelectorAll('#gameBoard span')
  gameBoard.forEach(function (pointer) {
    pointer.addEventListener('click', getBoardClick)
    pointer.innerHTML = ''
    pointer.classList.remove('win')
    pointer.classList.add('cursor-pointer')
  })
}

function getBoardClick(ev) {
  const span = ev.currentTarget
  if (stopGame) {
    disableElement(span)
    return
  }
  const position = span.dataset.region
  const columnPosition = position.slice(2,3)
  const rowPosition = position.slice(0, 1)
  if (turnPlayer == 'player1' && span.innerText == '') {
    span.innerText = 'X'
    vBoard[rowPosition][columnPosition] = 'X'
  }
  else if (turnPlayer == 'player2' && span.innerText == '') {
    span.innerText = 'O'
    vBoard[rowPosition][columnPosition] = 'O'
  }
  disableElement(span)
  result = checkWinCondition()
  if(result) {
    updateTitle(result)
    stopGame = true
    return
  }
  else if (turnPlayer == 'player1') {
    turnPlayer = 'player2'
  }
  else if (turnPlayer == 'player2') {
    turnPlayer = 'player1'
  }
  updateTitle()
}

function checkWinCondition() {
  const possibleWins = [
    vBoard[0],
    vBoard[1],
    vBoard[2],
    [vBoard[0][0], vBoard[1][0], vBoard[2][0]],
    [vBoard[0][1], vBoard[1][1], vBoard[2][1]],
    [vBoard[0][2], vBoard[1][2], vBoard[2][2]],
    [vBoard[0][0], vBoard[1][1], vBoard[2][2]],
    [vBoard[2][0], vBoard[1][1], vBoard[0][2]]
  ]
  const winMarks = [
    ["0.0", "0.1", "0.2"],
    ["1.0", "1.1", "1.2"],
    ["2.0", "2.1", "2.2"],

    ["0.0", "1.0", "2.0"],
    ["0.1", "1.1", "2.1"],
    ["0.2", "1.2", "2.2"],

    ["0.0", "1.1", "2.2"],
    ["2.0", "1.1", "0.2"]
    
  ]
  numberOfPlays += 1
    for (let winCase = 0; winCase < possibleWins.length; winCase++) {
      if ((JSON.stringify(possibleWins[winCase])) == (JSON.stringify(['X', 'X' ,'X']))) {
        winMarkRegion(winMarks[winCase])
        return 'player1'
      }
      else if ((JSON.stringify(possibleWins[winCase])) == (JSON.stringify(['O', 'O' ,'O']))) {
        winMarkRegion(winMarks[winCase])
        return 'player2'
      }
    }
    if (numberOfPlays == 9) {
      return 'Drawn!'
  }
}

function winMarkRegion(winMarks) {
  for (let i = 0; i < winMarks.length; i++) {
    gameBoard.forEach(function (pointer) {
      console.log(pointer.dataset.region)
      if (pointer.dataset.region == winMarks[i]) {
        document.querySelector('[data-region="' + winMarks[i] + '"]').classList.add('win')
      }
    })
  }
}

function disableElement(element) {
  element.removeEventListener('click', getBoardClick)
}

document.getElementById('start').addEventListener('click', initializeGame)
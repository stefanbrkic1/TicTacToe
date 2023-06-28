const gameData = (() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    let playerX, playerO, player;

    if (mode === 'pvp') {
        playerX = JSON.parse(urlParams.get('playerX'));
        playerO = JSON.parse(urlParams.get('playerO'));
    } else if (mode === 'vsComputer') {
        const playerParam = urlParams.get('player');
        if (playerParam !== null) {
            player = JSON.parse(playerParam);
        } else {
            // Handle the case when the player parameter is missing
        }
    }

    return { mode, playerX, playerO, player };
})();

const setScoreTableNames = (() => {
    const playerXScoreName = document.getElementById('playerXScoreName');
    const playerOScoreName = document.getElementById('playerOScoreName');

    if (gameData.mode === 'pvp') {
        playerXScoreName.textContent = gameData.playerX.name;
        playerOScoreName.textContent = gameData.playerO.name;
    } else {
        if (gameData.player.mark === 'O') {
            playerXScoreName.textContent = 'Computer';
            playerOScoreName.textContent = gameData.player.name;
        } else {
            playerXScoreName.textContent = gameData.player.name;
            playerOScoreName.textContent = 'Computer';
        }
    }
})();

const gameboardCellHandler = (() => {
    const displayTurn = document.getElementById('displayTurn')
    const displayTurnBigScreen = document.getElementById('displayTurnBigScreen')
    const cells = document.querySelectorAll('.gameboard-cell');
    let gameboardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let turn = 'X';
    let winner = '';
    let scoreX = 0
    let scoreO = 0

    displayTurn.textContent = `${gameData.playerX.name}'s TURN`   
    displayTurnBigScreen.textContent = `${gameData.playerX.name}'s TURN`   

    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('disabled-cell')) {
                return;
            }

            if (turn === 'X') {
                cell.innerHTML = '<i class="fa-solid fa-xmark fa-2xl red-mark unclickable"></i>';
                target.classList.add('disabled-cell');
                target.classList.remove('x-hover');
                gameboardCellHandler.gameboardArray[index] = 'X';
                turn = 'O';
                displayTurn.classList.remove('x-turn')
                displayTurn.classList.add('o-turn')
                displayTurn.textContent = `${gameData.playerO.name}'s TURN`
                displayTurnBigScreen.classList.remove('x-turn')
                displayTurnBigScreen.classList.add('o-turn')
                displayTurnBigScreen.textContent = `${gameData.playerO.name}'s TURN`
                cells.forEach(cell => {
                    if (!cell.classList.contains('disabled-cell')) {
                        cell.classList.remove('x-hover');
                        cell.classList.add('o-hover');
                    }
                });
            } else {
                cell.innerHTML = '<i class="fa-solid fa-o fa-2xl blue-mark unclickable"></i>';
                target.classList.add('disabled-cell');
                target.classList.remove('o-hover');
                gameboardCellHandler.gameboardArray[index] = 'O';
                turn = 'X';
                displayTurn.classList.remove('o-turn')
                displayTurn.classList.add('x-turn')
                displayTurn.textContent = `${gameData.playerX.name}'s TURN`    
                displayTurnBigScreen.classList.remove('o-turn')
                displayTurnBigScreen.classList.add('x-turn')
                displayTurnBigScreen.textContent = `${gameData.playerX.name}'s TURN`    
                cells.forEach(cell => {
                    if (!cell.classList.contains('disabled-cell')) {
                        cell.classList.remove('o-hover');
                        cell.classList.add('x-hover');
                    }
                });
            }

            checkWinningCombination();
        });
    });

    const checkWinningCombination = () => {
        const winningCombinations = [
          [0, 1, 2], // Rows
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], // Columns
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], // Diagonals
          [2, 4, 6]
        ];
      
        const hasWinner = winningCombinations.some(combination => {
          const [a, b, c] = combination;
          const firstValue = gameboardCellHandler.gameboardArray[a];
          return (
            firstValue !== 0 &&
            gameboardCellHandler.gameboardArray[b] === firstValue &&
            gameboardCellHandler.gameboardArray[c] === firstValue
          );
        });

        const openWinnerModal = document.getElementById('winnerBtn');
        const winnerDisplay = document.getElementById('winnerDisplay');
        const markWinnerDisplay = document.getElementById('markWinnerDisplay')
      
        if (hasWinner) {
          winner = turn === 'X' ? 'O' : 'X';
          markWinnerDisplay.textContent = 'WINNER IS'
          openWinnerModal.click();

          if(winner === 'X'){
            gameboardCellHandler.scoreX ++
            const scoreXDisplay = document.getElementById('scoreX')
            scoreXDisplay.textContent = gameboardCellHandler.scoreX
            winnerDisplay.textContent = `${gameData.playerX.name}`
            winnerDisplay.classList.remove('o-winner')
            winnerDisplay.classList.add('x-winner')
          }
          else{
            gameboardCellHandler.scoreO ++
            const scoreODisplay = document.getElementById('scoreO')
            scoreODisplay.textContent = gameboardCellHandler.scoreO
            winnerDisplay.textContent = `${gameData.playerO.name}` 
            winnerDisplay.classList.remove('x-winner')
            winnerDisplay.classList.add('o-winner')
          }
        }
        else if(!gameboardCellHandler.gameboardArray.includes(0)){
            openWinnerModal.click()
            winnerDisplay.textContent = `It's a tie` 
            markWinnerDisplay.textContent = 'NO WINNER'
        }
      };

    return { winner, turn, gameboardArray, cells, scoreX, scoreO };
})();

const playAgain = (() => {
    const displayTurn = document.getElementById('displayTurn')
    const displayTurnBigScreen = document.getElementById('displayTurnBigScreen')
    const playAgainBtn = document.getElementById('playAgainBtn')
    const btnModalClose = document.getElementById('btnWinnerClose')

    playAgainBtn.addEventListener('click', () => {
        gameboardCellHandler.gameboardArray = [0, 0, 0, 0, 0 , 0, 0, 0, 0]
        gameboardCellHandler.winner = '';
        
        if(gameboardCellHandler.turn === 'X'){
            displayTurn.classList.remove('x-turn')
            displayTurn.classList.add('o-turn')
            displayTurn.textContent = `${gameData.playerO.name}'s TURN`
            displayTurnBigScreen.classList.remove('x-turn')
            displayTurnBigScreen.classList.add('o-turn')
            displayTurnBigScreen.textContent = `${gameData.playerO.name}'s TURN`
            gameboardCellHandler.cells.forEach(cell => {
                cell.classList.remove('disabled-cell')
                cell.innerHTML = ''
                if (!cell.classList.contains('disabled-cell')) {
                    cell.classList.remove('x-hover');
                    cell.classList.add('o-hover');
                }
                gameboardCellHandler.turn = 'O'
            })
        }
        else{
            displayTurn.classList.remove('o-turn')
            displayTurn.classList.add('x-turn')
            displayTurn.textContent = `${gameData.playerX.name}'s TURN`    
            displayTurnBigScreen.classList.remove('o-turn')
            displayTurnBigScreen.classList.add('x-turn')
            displayTurnBigScreen.textContent = `${gameData.playerX.name}'s TURN`   
            gameboardCellHandler.cells.forEach(cell => {
                cell.classList.remove('disabled-cell')
                cell.innerHTML = ''
                if (!cell.classList.contains('disabled-cell')) {
                    cell.classList.remove('x-hover');
                    cell.classList.add('o-hover');
                }            
                gameboardCellHandler.turn = 'X'
            })
        }
        btnModalClose.click()
    })
})()

const restartGame = (() => {
    const scoreXDisplay = document.getElementById('scoreX')
    const scoreODisplay = document.getElementById('scoreO')
    const btnRestart = document.getElementById('btnRestart')
    btnRestart.addEventListener('click', () => {
        gameboardCellHandler.turn = 'X'
        gameboardCellHandler.gameboardArray = [0, 0, 0, 0, 0 , 0, 0, 0, 0]
        gameboardCellHandler.winner = '';
        gameboardCellHandler.cells.forEach(cell => {
            cell.classList.remove('disabled-cell')
            cell.innerHTML = ''
            gameboardCellHandler.scoreX = 0
            gameboardCellHandler.scoreO = 0
            scoreXDisplay.textContent = 0
            scoreODisplay.textContent = 0
        })
    })
})()

const modalHandler = (() => {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal === null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal === null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
})();

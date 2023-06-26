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
    const cells = document.querySelectorAll('.gameboard-cell');
    let gameboardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let turn = 'X';
    let winner = '';

    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('disabled-cell')) {
                return;
            }

            if (turn === 'X') {
                cell.innerHTML = '<i class="fa-solid fa-xmark fa-2xl red-mark unclickable"></i>';
                target.classList.add('disabled-cell');
                target.classList.remove('cell-hover');
                gameboardArray[index] = 'X';
                turn = 'O';
                cells.forEach(cell => {
                    if (!cell.classList.contains('disabled-cell')) {
                        cell.classList.remove('x-hover');
                        cell.classList.add('o-hover');
                    }
                });
            } else {
                cell.innerHTML = '<i class="fa-solid fa-o fa-2xl blue-mark unclickable"></i>';
                target.classList.add('disabled-cell');
                target.classList.remove('cell-hover');
                gameboardArray[index] = 'O';
                turn = 'X';
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
      
        const gameboardArray = gameboardCellHandler.gameboardArray;
      
        const hasWinner = winningCombinations.some(combination => {
          const [a, b, c] = combination;
          const firstValue = gameboardArray[a];
          return (
            firstValue !== 0 &&
            gameboardArray[b] === firstValue &&
            gameboardArray[c] === firstValue
          );
        });
      
        if (hasWinner) {
          winner = turn === 'X' ? 'O' : 'X';
          const openWinnerModal = document.getElementById('winnerBtn');
          openWinnerModal.click();
          const winnerDisplay = document.getElementById('winnerDisplay');
          const markWinnerDisplay = document.getElementById('markWinnerDisplay');

          if(winner === 'X'){
            winnerDisplay.textContent = `${gameData.playerX.name}`
            winnerDisplay.classList.add('x-winner')
          }
          else{
            winnerDisplay.textContent = `${gameData.playerO.name}` 
            winnerDisplay.classList.add('o-winner')
          }
        }
      };

    return { winner, turn, gameboardArray, cells };
})();

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

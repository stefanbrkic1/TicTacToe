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

    return { mode, playerX, playerO, player }
})()


const setScoreTableNames = (() => {
    const playerXScoreName = document.getElementById('playerXScoreName')
    const playerOScoreName = document.getElementById('playerOScoreName')
    if (gameData.mode === 'pvp') {
        playerXScoreName.textContent = gameData.playerX.name;
        playerOScoreName.textContent = gameData.playerO.name;
    }
    else {
        if (gameData.player.mark === 'O') {
            playerXScoreName.textContent = 'Computer';
            playerOScoreName.textContent = gameData.player.name;
        }
        else {
            playerXScoreName.textContent = gameData.player.name;
            playerOScoreName.textContent = 'Computer';
        }
    }
})()


const gameboardCellHandler = (() => {
    const cells = document.querySelectorAll('.gameboard-cell')
    let turn = 'X'

    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('disabled-cell')) {


            }
            else if (turn === 'X') {
                cell.innerHTML = '<i class="fa-solid fa-xmark fa-2xl red-mark unclickable"></i>'
                target.classList.add('disabled-cell')
                target.classList.remove('cell-hover')
                turn = 'O'

                cells.forEach(cell => {
                    if (cell.classList.contains('disabled-cell')) {

                    }
                    else {
                        cell.classList.remove('x-hover')
                        cell.classList.add('o-hover')
                    }
                })

            }
            else {
                cell.innerHTML = '<i class="fa-solid fa-o fa-2xl blue-mark unclickable"></i>'
                target.classList.add('disabled-cell')
                target.classList.remove('cell-hover')
                turn = 'X'

                cells.forEach(cell => {
                    if (cell.classList.contains('disabled-cell')) {

                    }
                    else {
                        cell.classList.remove('o-hover')
                        cell.classList.add('x-hover')
                    }
                })
            }
        })
    })

    return { turn, cells }
})()



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
    if(gameData.mode === 'pvp'){
        playerXScoreName.textContent = gameData.playerX.name;
        playerOScoreName.textContent = gameData.playerO.name;
    }
    else{
        if(gameData.player.mark === 'O'){
            playerXScoreName.textContent = 'Computer';
            playerOScoreName.textContent = gameData.player.name;
        }
        else{
            playerXScoreName.textContent = gameData.player.name;
            playerOScoreName.textContent = 'Computer';
        }
    }
})()
const modalHandler = (() => {
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(button.dataset.modalTarget)
            _openModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            _closeModal(modal)
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            _closeModalcloseModal(modal)
        })
    })

    function _openModal(modal) {
        if (modal === null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function _closeModal(modal) {
        if (modal === null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }


    return {
       
    }
})()


const markButtonsBehavior = (() => {
    const xMarkButton = document.getElementById('xBtn')
    const oMarkButton = document.getElementById('oBtn')

    xMarkButton.addEventListener('click', () => {
        if (xMarkButton.classList.contains('selectedMark')) {

        }
        else {
            xMarkButton.classList.add('selectedMark')
            oMarkButton.classList.remove('selectedMark')
        }
    })

    oMarkButton.addEventListener('click', () => {
        if (oMarkButton.classList.contains('selectedMark')) {

        }
        else {
            oMarkButton.classList.add('selectedMark')
            xMarkButton.classList.remove('selectedMark')
        }
    })
})()


const gameMode = (() => {
    const formPvp = document.getElementById('formPvp')
    const formComputer = document.getElementById('formComputer')

    let mode

    //Player Vs Player MODE
    formPvp.addEventListener('submit', (e) => {
        e.preventDefault()
        mode = 'PVP'
    })

    //VS Computer MODE
    formComputer.addEventListener('submit', (e) => {
        e.preventDefault()
        mode = 'VSComputer'
    })

    const currentMode = () => { return mode; }

    return { currentMode }

})()


const gamePlayers = (() => {
    let playerX, playerO, player;

    const Player = function (name, mark) {
        return { name, mark };
    };

    // Player Vs Player MODE
    const formPvp = document.getElementById('formPvp');
    formPvp.addEventListener('submit', (e) => {
        e.preventDefault();
        const xPlayerName = document.getElementById('xInput').value;
        const oPlayerName = document.getElementById('oInput').value;
        playerX = Player(xPlayerName, 'X');
        playerO = Player(oPlayerName, 'O');

        const url = `gameboard.html?mode=pvp&playerX=${encodeURIComponent(JSON.stringify(playerX))}&playerO=${encodeURIComponent(JSON.stringify(playerO))}`;
        window.location.href = url;
    });

    // VS Computer MODE
    const formComputer = document.getElementById('formComputer');
    formComputer.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = document.getElementById('playerNameInput').value;
    
        let playerMark;
    
        const getPlayerMark = () => {
            const xMarkButton = document.getElementById('xBtn');
            if (xMarkButton.classList.contains('selectedMark')) {
                playerMark = 'X';
            } else {
                playerMark = 'O';
            }
        };
    
        getPlayerMark();
    
        const player = { name: playerName, mark: playerMark };
        const url = `gameboard.html?mode=vsComputer&player=${encodeURIComponent(JSON.stringify(player))}`;
        window.location.href = url;
    });
    

    return { playerX, playerO, player };
})();




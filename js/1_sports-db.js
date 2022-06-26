// Go to top
function scrollToTop() {
    window.scrollTo(0, 0);
}

// Error message
document.getElementById('error-message').style.display = 'none';
// load Players by Search button
const loadPlayers = async () => {
    document.getElementById('players-container').textContent = '';
    document.getElementById('single-player').textContent = '';
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';
    if (inputValue == '') {
        // empty field blank request
        document.getElementById('empty-input').innerText = 'Please write the player name';
    }
    else {
        document.getElementById('empty-input').innerText = '';

        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            displayPlayers(data.player);
        }
        catch (error) {
            document.getElementById('error-message').style.display = 'block';
        }
    }
};
// display all player 
const displayPlayers = players => {
    players.forEach(player => {
        const playersContainer = document.getElementById('players-container');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPlayer(${player.idPlayer})" class="card">
            <div onclick="scrollToTop()">
                <img src="${player.strThumb}" class="card-img-top" alt="Image">
                <div class="card-body">
                    <h5 class="card-title">${player.strPlayer}</h5>
                    <p class="card-text" style="height: 100px; overflow: hidden">${player.strDescriptionEN}</p>
                    <a href="${player.strRender}" class="btn btn-primary">Render</a>
                </div>
            </div>
        </div>
        `;
        playersContainer.appendChild(div);
    });
};

// load single player div
const loadPlayer = async playerId => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPlayer(data.players[0]);
    }
    catch (error) {
        document.getElementById('error-message').style.display = 'block';
    }
};
// display single player
const displayPlayer = player => {
    // console.log(player);
    const singlePlayer = document.getElementById('single-player');
    singlePlayer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
        <img src="${player.strThumb}" class="card-img-top" alt="Image">
        <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p>Date Born: ${player.dateBorn}</p>
            <p>Birth Location: ${player.strBirthLocation}</p>
            <p>Gender: ${player.strGender}</p>
            <p>Height: ${player.strHeight}</p>
            <p>Nationality: ${player.strNationality}</p>
            <p>Sport: ${player.strSport}</p>
            <p>Team: ${player.strTeam}</p>
            <p class="card-text" style="height: 100px; overflow: hidden">${player.strDescriptionEN}</p>
            <a href="${player.strRender}" class="btn btn-primary">Render</a>
        </div>
    </div>
    `;
    singlePlayer.appendChild(div);

};
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
        // document.getElementById('empty-input').innerText = 'Please write the player name';
    }
    else {
        // Input field empty message
        document.getElementById('empty-input').innerText = '';

        const url = `https://www.thesportsdb.com/api/v1/json/2/all_sports.php/`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            displayPlayers(data.sports);
        }
        catch (error) {
            document.getElementById('error-message').style.display = 'block';
        }
    }
};
// display all player 
const displayPlayers = sports => {
    sports.forEach(sport => {
        // console.log(player);
        const playersContainer = document.getElementById('players-container');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPlayer('${sport}')" class="card">
            <div onclick="scrollToTop()">
                <img src="${sport.strSportThumb}" class="card-img-top" alt="Image">
                <div class="card-body">
                    <h5 class="card-title">${sport.strSport}</h5>
                    <p>Format: ${sport.strFormat}</p>
                    <p>ID: <span class="text-info">${sport.idSport}</span></p>
                    <p class="card-text" >${sport.strSportDescription.slice(0, 100)}</p>
                    <a href="${sport.strSportIconGreen}" class="btn btn-primary">Sport Icon</a>
                </div>
            </div>
        </div>
        `;
        playersContainer.appendChild(div);
    });
};

// load single player div
const loadPlayer = sport => {
    console.log(sport.strSport);
    // const url = `https://www.thesportsdb.com/api/v1/json/2/all_sports.php/`;
    // try {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     displayPlayer(data.sports);
    // }
    // catch (error) {
    //     document.getElementById('error-message').style.display = 'block';
    // }
};

// // display single player
// const displayPlayer = sports => {
//     console.log(sports.strSportThumb);
//     const singlePlayer = document.getElementById('single-player');
//     singlePlayer.textContent = '';
//     const div = document.createElement('div');
//     div.classList.add('col');
//     div.innerHTML = `
//     <div class="card">
//         <img src="${sport.strSportThumb}" class="card-img-top" alt="Image">
//         <div class="card-body">
//             <h5 class="card-title">${sport.strSport}</h5>
//             <p>Format: ${sport.strFormat}</p>
//             <p>ID: <span class="text-info">${sport.idSport}</span></p>
//             <p class="card-text" >${sport.strSportDescription}</p>
//             <a href="${sport.strSportIconGreen}" class="btn btn-primary">Sport Icon</a>
//         </div>
//     </div>
//     `;
//     singlePlayer.appendChild(div);

// };
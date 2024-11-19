const baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'eee25a8a6bmsh34ce2fa70663715p1dcd64jsn9aebe6edf685',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

function navigatePage(id) {
    // Store the game ID in localStorage and navigate to the game page
    localStorage.setItem('id', id);
    window.location.href = "gamePage.html";
}

function showAll(className){
    localStorage.setItem('game', className);
    window.location.href = "gamesList.html"
}

async function libraryLoad(platform, containerId, sortBy) {
    const url = `${baseUrl}?platform=${platform}${sortBy ? '&sort-by=' + sortBy : ''}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();  // Change to .json() because the API returns JSON
        const limitedData = data.slice(0, 5); // Limit to top 5 games
        limitedData.forEach(game => {
            displayElement(game, containerId);
        });
    } catch (error) {
        console.error('Error loading the game data:', error);
    }
}

async function libraryLoad2(category, containerId, sortBy = 'popularity') {
    const url = `${baseUrl}?category=${category}&sort-by=${sortBy}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const limitedData = data.slice(0, 5);
        limitedData.forEach(game => {
            displayElement(game, containerId);
        });
    } catch (error) {
        console.error('Error loading the game data:', error);
    }
}


function displayElement(data, containerId) {
    let game = document.createElement("div");
    game.className = "game";
    game.id = data.id;

    let img = document.createElement("img");
    img.src = data.thumbnail;

    let name = document.createElement("h3");
    name.innerText = data.title;

    game.append(img, name);
    document.getElementById(containerId).append(game);
    game.addEventListener("click", () => navigatePage(data.id));
}

// Load games into different containers
libraryLoad('pc', 'top-pc-games-container', 'popularity');  // Example with 'pc' platform
libraryLoad('browser', 'top-browser-games-container', 'popularity'); // Example with 'browser' platform
libraryLoad2('action', 'top-action-games'); // Example with 'action' category
libraryLoad2('racing', 'top-racing-games'); // Example with 'racing' category
libraryLoad2('shooter', 'top-shooter-games'); // Example with 'shooter' category
libraryLoad2('zombie', 'top-zombie-games'); // Example with 'zombie' category

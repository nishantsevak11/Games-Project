let currentPage = 1; // Track current page for loading more games
let isLoading = false; // Prevent multiple simultaneous loads

// Retrieve the game type from localStorage (e.g., platform or category)
const whichGame = localStorage.getItem('game'); // Default to 'all' if not set

// List of known platforms to differentiate between platform and category
if (whichGame == 'pc' || whichGame == 'browser') {
    fetch1(whichGame);
}else {
    fetch2(whichGame);
}

// Event listener for sorting dropdown
document.getElementById('sort-options').addEventListener('change', (event) => {
    const sortOption = event.target.value;
    if (whichGame == 'pc' || whichGame == 'browser') {
        fetch1(whichGame, sortOption);
    } else {
        fetch2(whichGame, sortOption);
    }
});

async function fetch1(platform, sortOption = '') {
    let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`;
    if (sortOption) {
        url += `&sort-by=${sortOption}`;
    }

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'eee25a8a6bmsh34ce2fa70663715p1dcd64jsn9aebe6edf685',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        display(result); // Pass the fetched data to the display function
    } catch (error) {
        console.error(error);
    }
}

async function fetch2(cat, sortOption = '') {
    let url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
    if (sortOption) {
        url += `&sort-by=${sortOption}`;
    }

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'eee25a8a6bmsh34ce2fa70663715p1dcd64jsn9aebe6edf685',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        display(result); // Pass the fetched data to the display function
    } catch (error) {
        console.error(error);
    }
}

// Function to display the fetched game data
// Function to display the fetched game data
function display(data) {
    const gameContainer = document.querySelector('.pc-games-container'); // Get the container where the games will be displayed

    // Loop through each game and create HTML elements
    data.forEach(game => {
        // Create the game card structure
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-item');
        gameCard.setAttribute('data-id', game.id); // Store the game ID in a data attribute for easy access

        // Create the game image
        const gameImage = document.createElement('img');
        gameImage.src = game.thumbnail; // Assuming the API provides the image URL under "thumbnail"
        gameImage.alt = game.title; // Set the alt text for accessibility

        // Create the game title
        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.title;

        // Create the game description
        const gameDescription = document.createElement('p');
        gameDescription.textContent = game.short_description;

        // Append the image, title, and description to the game card
        gameCard.appendChild(gameImage);
        gameCard.appendChild(gameTitle);
        gameCard.appendChild(gameDescription);

        // Add click event listener to the game card to navigate to the game page
        gameCard.addEventListener('click', function() {
            navigatePage(game.id); // Call the function to store the ID and navigate
        });

        // Append the game card to the container
        gameContainer.appendChild(gameCard);
    });
}

// Function to navigate to the game page with the game ID
function navigatePage(id) {
    // Store the game ID in localStorage
    localStorage.setItem('id', id);
    // Navigate to the gamePage.html
    window.location.href = 'gamePage.html';
}


// Set the heading dynamically based on the game type
document.getElementById('heading').innerText = `Top ${whichGame} Games`;

const gameDetailUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/game?id=';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'eee25a8a6bmsh34ce2fa70663715p1dcd64jsn9aebe6edf685', // Use your API key here
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

// Retrieve the game ID from local storage
let id = localStorage.getItem('id');

// Global variable to track the current screenshot index
let currentScreenshotIndex = 0;

// Fetch and display game details
getGameDetails(id);

// Function to fetch game details by ID
async function getGameDetails(id) {
  try {
    const response = await fetch(`${gameDetailUrl}${id}`, options);

    if (!response.ok) {
      throw new Error(`Error fetching game details: ${response.statusText}`);
    }

    const details = await response.json();
    displayElement(details);
  } catch (error) {
    console.error('Error loading game details:', error);
  }
}

// Function to display game details in the UI
function displayElement(gameData) {
  // Display basic game details
  document.getElementById('title').textContent = gameData.title;
  document.getElementById('image').src = gameData.thumbnail;
  document.getElementById('short_desc').textContent = gameData.short_description;
  document.getElementById('desc').textContent = gameData.description;
  document.getElementById('genre').textContent = `Genre: ${gameData.genre}`;
  document.getElementById('platform').textContent = `Platform: ${gameData.platform}`;
  document.getElementById('publisher').textContent = `Publisher: ${gameData.publisher}`;
  document.getElementById('developer').textContent = `Developer: ${gameData.developer}`;
  document.getElementById('release_date').textContent = `Release Date: ${gameData.release_date}`;

  // Display system requirements
  const requirementsList = document.getElementById('requirements-list');
  const requirements = gameData.minimum_system_requirements;
  requirementsList.innerHTML = '';  // Clear existing requirements

  for (const [key, value] of Object.entries(requirements)) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${capitalizeFirstLetter(key.replace(/_/g, ' '))}:</strong> ${value}`;
    requirementsList.appendChild(listItem);
  }

  // Handle screenshots
  const screenshots = gameData.screenshots;
  if (screenshots && screenshots.length > 0) {
    // Initialize the screenshot carousel
    showScreenshot(screenshots, currentScreenshotIndex);

    // Save the screenshots array for later use
    window.screenshots = screenshots;
  }
}

// Function to display a screenshot
function showScreenshot(screenshots, index) {
  const screenshotElement = document.querySelector('.ss-image img');  // Select the <img> inside the .ss-image div
  screenshotElement.src = screenshots[index].image;  // Set image source
}

// Function to change the current screenshot
function changeScreenshot(direction) {
  const screenshots = window.screenshots;
  if (screenshots) {
    currentScreenshotIndex += direction;

    // Loop around the screenshots if we reach the end
    if (currentScreenshotIndex < 0) {
      currentScreenshotIndex = screenshots.length - 1;
    } else if (currentScreenshotIndex >= screenshots.length) {
      currentScreenshotIndex = 0;
    }

    // Update the screenshot
    showScreenshot(screenshots, currentScreenshotIndex);
  }
}

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Button event listeners for changing screenshots
document.getElementById('prevBtn').addEventListener('click', function() {
  changeScreenshot(-1);  // Previous screenshot
});

document.getElementById('nextBtn').addEventListener('click', function() {
  changeScreenshot(1);  // Next screenshot
});

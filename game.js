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
  // Update page title
  document.title = gameData.title;
  
  // Display basic game details
  document.getElementById('title').textContent = gameData.title;
  document.getElementById('image').src = gameData.thumbnail;
  document.getElementById('short_desc').textContent = gameData.short_description;
  document.getElementById('desc').textContent = gameData.description;
   document.getElementById('playnow').href = gameData.freetogame_profile_url;
  
  // Update details with spans
  document.querySelector('#genre span').textContent = gameData.genre;
  document.querySelector('#platform span').textContent = gameData.platform;
  document.querySelector('#publisher span').textContent = gameData.publisher;
  document.querySelector('#developer span').textContent = gameData.developer;
  document.querySelector('#release_date span').textContent = gameData.release_date;

  // Display system requirements
  const requirementsList = document.getElementById('requirements-list');
  const requirements = gameData.minimum_system_requirements;
  
  if (requirements) {
    requirementsList.innerHTML = '';  // Clear existing requirements
    for (const [key, value] of Object.entries(requirements)) {
      if (value) {  // Only add if value exists
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${capitalizeFirstLetter(key.replace(/_/g, ' '))}:</strong> ${value}`;
        requirementsList.appendChild(listItem);
      }
    }
  } else {
    requirementsList.innerHTML = '<li><strong>Note:</strong> System requirements not available</li>';
  }

  // Handle screenshots
  const screenshots = gameData.screenshots;
  if (screenshots && screenshots.length > 0) {
    // Initialize with first screenshot
    const screenshotImg = document.getElementById('currentScreenshot');
    screenshotImg.src = screenshots[0].image;
    
    // Store screenshots array in a data attribute
    screenshotImg.dataset.screenshots = JSON.stringify(screenshots);
    screenshotImg.dataset.currentIndex = '0';
    
    // Show navigation buttons if there are multiple screenshots
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (screenshots.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  } else {
    // Hide screenshot section if no screenshots available
    document.querySelector('.screenshots').style.display = 'none';
  }
}

// Function to change screenshots
function changeScreenshot(direction) {
  const screenshotImg = document.getElementById('currentScreenshot');
  const screenshots = JSON.parse(screenshotImg.dataset.screenshots || '[]');
  let currentIndex = parseInt(screenshotImg.dataset.currentIndex || '0');

  if (screenshots.length > 0) {
    // Calculate new index
    currentIndex = (currentIndex + direction + screenshots.length) % screenshots.length;
    
    // Update image and store new index
    screenshotImg.src = screenshots[currentIndex].image;
    screenshotImg.dataset.currentIndex = currentIndex.toString();

    // Add loading state
    screenshotImg.style.opacity = '0.5';
    screenshotImg.onload = () => {
      screenshotImg.style.opacity = '1';
    };
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

const userIcon = document.querySelector('.user-icon');
const userName = document.querySelector('.user-name'); // Assuming you have an element with this ID

fetch('/api/user-info') // Replace with your API endpoint
    .then(response => response.json())
    .then(data => {
        userName.textContent = data.name; // Set the user's name
    });
/*let countdownDuration = 5;
let countdownInterval;

function showInstructions() {
    const modal = document.getElementById('instructionsModal');
    modal.style.display = 'block';
    setTimeout(function() {
        modal.classList.remove('modal-hidden');
    }, 10);
}

function hideInstructions() {
    const modal = document.getElementById('instructionsModal');
    modal.classList.add('modal-hidden');
    setTimeout(function() {
        modal.style.display = 'none';
    }, 250);
}*/

function loadThemeState() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const moonIcon = document.querySelector('.fa-moon');
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
    }
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.control-btn i');

    if (isDarkMode) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    localStorage.setItem('darkMode', isDarkMode);
}

function updateDurationValue() {
    const slider = document.getElementById('durationSlider');
    const durationValue = document.getElementById('durationValue');
    countdownDuration = parseInt(slider.value);
    durationValue.textContent = formatDuration(countdownDuration);
    localStorage.setItem('duration', countdownDuration);
    resetCountdown();
}

window.onload = function() {
    loadThemeState();
};

window.onclick = function(event) {
    const modal = document.getElementById('instructionsModal');
    if (event.target === modal) {
        hideInstructions();
    }
};

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideInstructions();
    }
});

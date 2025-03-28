let countdownDuration = 5;
let countdownInterval;
let countdownElement = document.getElementById('countdown');

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    let result = '';

    if (minutes > 0) {
        if (minutes === 1) {
            result += 'دقيقة واحدة';
        } else if (minutes === 2) {
            result += 'دقيقتان';
        } else if (minutes >= 3 && minutes <= 10) {
            result += minutes + ' دقائق';
        } else {
            result += minutes + ' دقيقة';
        }
    }

    if (remainingSeconds > 0) {
        if (minutes > 0) result += ' و';

        if (remainingSeconds === 1) {
            result += 'ثانية واحدة';
        } else if (remainingSeconds === 2) {
            result += 'ثانيتان';
        } else if (remainingSeconds >= 3 && remainingSeconds <= 10) {
            result += remainingSeconds + ' ثوانٍ';
        } else {
            result += remainingSeconds + ' ثانية';
        }
    }

    return result;
}

function showInstructions() {
    const modal = document.getElementById('instructionsModal');
    modal.style.display = 'block';
    setTimeout(function() {
        modal.classList.remove('modal-hidden');
    }, 10);
    localStorage.setItem('showInstructions', "view");
}

function hideInstructions() {
    localStorage.setItem('showInstructions', "hide");
    const modal = document.getElementById('instructionsModal');
    modal.classList.add('modal-hidden');
    setTimeout(function() {
        modal.style.display = 'none';
    }, 250);
}

function loadThemeState() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const moonIcon = document.querySelector('.fa-moon');
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
    }
}

function loadInstructionsView() {
    const showInstructionsValue = localStorage.getItem('showInstructions');
    if (showInstructionsValue === 'view') {
        showInstructions();
    } else if (showInstructionsValue === 'hide') {
        hideInstructions();
    }
}

function toggleHome() {
    window.location.href = '/';
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

function toggleDurationControls() {
    const container = document.getElementById('durationSliderContainer');
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
    if (container.style.display === 'block') {
        localStorage.setItem('durationSliderContainer', 'view');
    } else {
        localStorage.setItem('durationSliderContainer', 'hide');
    }

}

function loadtoggleDurationControls() {
    const container = document.getElementById('durationSliderContainer');
    const showInstructionsValue = localStorage.getItem('durationSliderContainer');
    if (showInstructionsValue === 'view') {
        container.style.display = 'block';
    } else if (showInstructionsValue === 'hide') {
        container.style.display = 'none';
    }
}

function updateDurationValue() {
    const slider = document.getElementById('durationSlider');
    const durationValue = document.getElementById('durationValue');
    countdownDuration = parseInt(slider.value);
    durationValue.textContent = formatDuration(countdownDuration);
    localStorage.setItem('duration', countdownDuration);
    resetCountdown();
}

function startCountdown(seconds) {
    let secondsLeft = seconds;
    countdownElement.textContent = secondsLeft;

    countdownInterval = setInterval(() => {
        secondsLeft--;
        countdownElement.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            location.reload();
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    startCountdown(countdownDuration);
}

const servers = [
    "speedtest02.vodafone.com.qa:8080",
    "speedtest03.vodafone.com.qa:8080"
];

let connectedServers = 0;
const totalServers = servers.length;

function updateConnectionStatus() {
    //document.getElementById('connectionStatus').innerHTML = `<i class="fas fa-wifi"></i> تم الاتصال بـ ${connectedServers} خوادم`;
    //test
    console.log(`تم الاتصال بـ ${connectedServers} خوادم`);
}
setInterval(() => {
    updateConnectionStatus();
}, 500);

servers.forEach(serverUrl => {
    const url = `https://${serverUrl}/`;

    fetch(url, {
        method: "GET",
        mode: 'no-cors'
    })
    .then(response => {
        if (response.ok) {
            connectedServers++;
        }
        updateConnectionStatus();
    })
    .catch(error => {
        console.error(`خطأ في الاتصال بالخادم ${serverUrl}:`, error);
    });
});

window.onload = function() {
    loadThemeState();
    loadInstructionsView();
    loadtoggleDurationControls();

    const savedDuration = localStorage.getItem('duration') || '5';
    countdownDuration = parseInt(savedDuration);
    document.getElementById('durationSlider').value = countdownDuration;
    document.getElementById('durationValue').textContent = formatDuration(countdownDuration);

    startCountdown(countdownDuration);
};

window.onclick = function(event) {
    const modal = document.getElementById('instructionsModal');
    if (event.target === modal) {
        hideInstructions();
        localStorage.setItem('showInstructions', "hide");
    }
};

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideInstructions();
        localStorage.setItem('showInstructions', "hide");
    }
});

const messages = [
    "Are you sure? 🥺",
    "Really sure?? 😢",
    "Are you positive? 💔",
    "Pookie please... 🥹",
    "Just think about it! 💭",
    "Justin will be really sad... 😞",
    "Very very sad... 😭",
    "Ok fine, I'll stop... 😔",
    "Just kidding! Say YES! ❤️",
    "Pretty please? 🙏💕"
];

let messageIndex = 0;
let musicPlaying = false;

// Initialize floating hearts
function createHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '❤️', '💖', '💗', '💓', '💘', '💝', '🌹', '✨'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(container, hearts);
        }, i * 300);
    }

    // Keep creating hearts
    setInterval(() => {
        createHeart(container, hearts);
    }, 500);
}

function createHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Countdown Timer
function updateCountdown() {
    const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = valentinesDay - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '💕';
        document.getElementById('hours').textContent = '💕';
        document.getElementById('minutes').textContent = '💕';
        document.getElementById('seconds').textContent = '💕';
        document.querySelector('.countdown-label').textContent = "It's Valentine's Day! 💕";
    }
}

// Handle No button click
function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    // Play click sound
    playClickSound();

    // Update message
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Grow Yes button
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.3}px`;

    // Add shake animation to Yes button
    yesButton.style.animation = 'none';
    setTimeout(() => {
        yesButton.style.animation = 'shake 0.5s ease';
    }, 10);
}

// Handle Yes button click
function handleYesClick() {
    playClickSound();

    // Add celebration before redirect
    document.body.style.animation = 'celebration 0.5s ease';

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 300);
}

// Play click sound
function playClickSound() {
    const sound = document.getElementById('clickSound');
    if (sound) {
        sound.currentTime = 0;
        sound.volume = 0.3;
        sound.play().catch(() => { });
    }
}

// Toggle background music
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');

    if (musicPlaying) {
        music.pause();
        btn.textContent = '🎵';
        btn.classList.remove('playing');
    } else {
        music.volume = 0.2;
        music.play().catch(() => {
            console.log('Autoplay prevented');
        });
        btn.textContent = '🔊';
        btn.classList.add('playing');
    }
    musicPlaying = !musicPlaying;
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }
    @keyframes celebration {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Auto-start music
function autoStartMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');

    music.volume = 0.2;
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay started successfully
            musicPlaying = true;
            btn.textContent = '🔊';
            btn.classList.add('playing');
        }).catch(() => {
            // Autoplay blocked - start on first user interaction
            document.addEventListener('click', startMusicOnInteraction, { once: true });
            document.addEventListener('touchstart', startMusicOnInteraction, { once: true });
        });
    }
}

function startMusicOnInteraction() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');

    if (!musicPlaying) {
        music.volume = 0.2;
        music.play().then(() => {
            musicPlaying = true;
            btn.textContent = '🔊';
            btn.classList.add('playing');
        }).catch(() => { });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    autoStartMusic();
});
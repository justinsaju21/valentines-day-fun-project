// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#ff6b6b', '#ff8e53', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b95', '#c44dff'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;

        if (this.shape === 'rect') {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// Create confetti pieces
for (let i = 0; i < 150; i++) {
    confettiPieces.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });

    requestAnimationFrame(animateConfetti);
}

// Floating Hearts
function createHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '❤️', '💖', '💗', '💓', '💘', '💝', '🌹', '✨', '💐'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart(container, hearts);
        }, i * 200);
    }

    setInterval(() => {
        createHeart(container, hearts);
    }, 400);
}

function createHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Play celebration sound
function playCelebration() {
    const sound = document.getElementById('celebrationSound');
    if (sound) {
        sound.volume = 0.4;
        sound.play().catch(() => {
            console.log('Autoplay prevented');
        });
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateConfetti();
    createHearts();
    playCelebration();
});

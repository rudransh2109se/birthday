// --- 1. CONFIGURATION ---
const targetDate = new Date("February 6, 2026 11:41:00").getTime();
const correctPassword = "17 december";

// --- 2. DYNAMIC BACKGROUND (STARFIELD) ---
const starCanvas = document.getElementById('star-canvas');
const starCtx = starCanvas.getContext('2d');
let stars = [];

function initStarfield() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            size: Math.random() * 1.5,
            blink: Math.random() * 0.05
        });
    }
}

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = 'white';
    stars.forEach(s => {
        s.blink += 0.02;
        const opacity = Math.abs(Math.sin(s.blink));
        starCtx.globalAlpha = opacity;
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        starCtx.fill();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStarfield);
initStarfield();
animateStars();

// --- 3. 3D TILT EFFECT ---
function applyTilt(id) {
    const box = document.getElementById(id);
    if (!box) return;

    let ticking = false;

    box.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = box.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                const rx = (y - 0.5) * -15; // Max 15 degree
                const ry = (x - 0.5) * 15;

                box.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'rotateX(0) rotateY(0)';
    });

    // Mobile orientation disabled for now as it can be unstable across devices
    // will replace with a smoother implementation if needed later.
}

applyTilt('countdown-tilt');
applyTilt('password-tilt');
applyTilt('celebration-tilt');

// --- 4. COUNTDOWN LOGIC ---
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const unlockContainer = document.getElementById('unlock-container');
const countdownTimer = document.getElementById('countdown-timer');

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timerInterval);
        triggerBirthdayReveal();
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = d.toString().padStart(2, '0');
    hoursEl.innerText = h.toString().padStart(2, '0');
    minutesEl.innerText = m.toString().padStart(2, '0');
    secondsEl.innerText = s.toString().padStart(2, '0');
}, 1000);

// --- 5. NAVIGATION & PASSWORD ---
const heartLock = document.getElementById('heart-lock');
const countdownSection = document.getElementById('countdown-section');
const passwordSection = document.getElementById('password-section');
const celebrationSection = document.getElementById('celebration-section');

const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');

heartLock.addEventListener('click', () => {
    transition(countdownSection, passwordSection);
});

passwordSubmit.addEventListener('click', checkPass);
passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPass(); });

function checkPass() {
    if (passwordInput.value.trim().toLowerCase() === correctPassword) {
        transition(passwordSection, celebrationSection);
        startFinale();
    } else {
        passwordError.innerText = "Wrong date! Try again... 😢";
        passwordSection.querySelector('.glass-container').classList.add('shake');
        setTimeout(() => {
            passwordError.innerText = "";
            passwordSection.querySelector('.glass-container').classList.remove('shake');
        }, 1000);
    }
}

function transition(from, to) {
    from.classList.remove('active');
    setTimeout(() => {
        from.classList.add('hidden');
        to.classList.remove('hidden');
        setTimeout(() => to.classList.add('active'), 50);
    }, 1000);
}

// --- 6. FINALE CELEBRATION ---
const confettiCanvas = document.getElementById('confetti-canvas');
const confCtx = confettiCanvas.getContext('2d');
let pieces = [];

function startFinale() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    // Clear existing pieces if any
    pieces = [];

    // Reduced particle count from 250 to 120 for performance
    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            speed: Math.random() * 2 + 1,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }

    // Add resize listener to keep canvas full-screen
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });

    updateConfetti();
    renderLetter();
}

function updateConfetti() {
    confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
        p.y += p.speed;
        p.rot += p.rotSpeed;
        if (p.y > confettiCanvas.height) p.y = -20;
        confCtx.save();
        confCtx.translate(p.x, p.y);
        confCtx.rotate(p.rot * Math.PI / 180);
        confCtx.fillStyle = p.color;
        confCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        confCtx.restore();
    });
    requestAnimationFrame(updateConfetti);
}

function renderLetter() {
    const letters = document.querySelectorAll('.letter-inner p');
    const letterCard = document.querySelector('.letter-card');

    // Ensure card is visible
    if (letterCard) {
        letterCard.style.opacity = '1';
        letterCard.style.display = 'block';
    }

    letters.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = `all 1s ease ${index * 0.3}s`;
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Additional Global Styles for Shake and Transitions
const globalStyle = document.createElement('style');
globalStyle.innerText = `
@keyframes shake {
    0%, 100% { transform: translateZ(50px) translateX(0); }
    25% { transform: translateZ(50px) translateX(-10px); }
    75% { transform: translateZ(50px) translateX(10px); }
}
.shake { animation: shake 0.4s ease-in-out; }
`;
document.head.appendChild(globalStyle);

// --- 7. DYNAMIC MESSAGES ---
const dynamicText = document.getElementById('dynamic-text');
let messages = [
    "Counting every second until your smile ❤️",
    "Prachi, you are my universe... ✨",
    "Waiting for the most special day! 💖",
    "Almost 11 Feb... The magic begins! 🦄"
];
let msgIdx = 0;

function updateDynamicText() {
    dynamicText.style.opacity = '0';
    setTimeout(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        dynamicText.innerText = messages[msgIdx];
        dynamicText.style.opacity = '1';
    }, 500);
}

let messageInterval = setInterval(updateDynamicText, 4000);

// --- 8. BIRTHDAY STATE TRANSITION ---
function spawnKissBurst() {
    const burstCanvas = document.createElement('canvas');
    burstCanvas.style.position = 'fixed';
    burstCanvas.style.top = '0';
    burstCanvas.style.left = '0';
    burstCanvas.style.width = '100%';
    burstCanvas.style.height = '100%';
    burstCanvas.style.pointerEvents = 'none';
    burstCanvas.style.zIndex = '9999';
    document.body.appendChild(burstCanvas);

    const bCtx = burstCanvas.getContext('2d');
    burstCanvas.width = window.innerWidth;
    burstCanvas.height = window.innerHeight;

    const kisses = [];
    const emojis = ['💋', '💖', '❤️', '😘', '✨'];

    // Reduced particles from 40 to 25
    for (let i = 0; i < 25; i++) {
        kisses.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15 - 5,
            size: Math.random() * 20 + 20,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            alpha: 1,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }

    function animateBurst() {
        bCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
        let active = false;

        kisses.forEach(k => {
            if (k.alpha > 0) {
                active = true;
                k.x += k.vx;
                k.y += k.vy;
                k.vy += 0.2; // Gravity
                k.alpha -= 0.01;
                k.rot += k.rotSpeed;

                bCtx.save();
                bCtx.globalAlpha = k.alpha;
                bCtx.translate(k.x, k.y);
                bCtx.rotate(k.rot * Math.PI / 180);
                bCtx.font = `${k.size}px serif`;
                bCtx.textAlign = 'center';
                bCtx.textBaseline = 'middle';
                bCtx.fillText(k.emoji, 0, 0);
                bCtx.restore();
            }
        });

        if (active) {
            requestAnimationFrame(animateBurst);
        } else {
            burstCanvas.remove();
        }
    }
    animateBurst();
}

function triggerBirthdayReveal() {
    // 0. Trigger romantic Kiss Burst!
    spawnKissBurst();

    // 1. Hide timer and show unlock
    countdownTimer.style.opacity = '0';
    countdownTimer.style.transform = 'scale(0.8) translateZ(-50px)';

    setTimeout(() => {
        countdownTimer.classList.add('hidden');
        unlockContainer.classList.remove('hidden');
        // Slight bounce in for unlock button
        unlockContainer.style.animation = 'pulseEntrance 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, 500);

    // 2. Change dynamic messages to celebratory ones
    clearInterval(messageInterval);
    messages = [
        "YAYYY! IT'S FINALLY YOUR DAY! 🥳",
        "Prachi, something special is waiting... 🎁",
        "Happy Birthday my Love! ❤️",
        "Unlocking a year of magic for you! ✨"
    ];
    msgIdx = 0;
    dynamicText.innerText = messages[0];
    messageInterval = setInterval(updateDynamicText, 4000);

    // 3. Update the badge and text
    const badge = document.querySelector('.luxury-badge');
    if (badge) {
        badge.innerText = "IT'S CELEBRATION TIME! 💖";
        badge.style.background = "linear-gradient(45deg, #ffcc33, #ff3c83)";
    }

    // 4. Dramatic Flash Effect
    const flash = document.createElement('div');
    flash.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:9999; opacity:0; pointer-events:none; transition: opacity 0.5s ease;";
    document.body.appendChild(flash);
    setTimeout(() => flash.style.opacity = '0.7', 50);
    setTimeout(() => flash.style.opacity = '0', 600);
    setTimeout(() => flash.remove(), 1200);
}

document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    fadeInElements.forEach((el) => observer.observe(el));
});

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".toggle");

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;
            content.classList.toggle("visible");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const roles = [
        "3D Modeler",
        "Video Editor",
        "Game Developer",
        "Programmer",
        "Digital Artist",
        "Animator",
        "Film Maker",
        "Tech Enthusiast",
        "Storyteller",
    ];
    let current = 0;
    const roleSpan = document.getElementById("iam-role");
    const prevBtn = document.getElementById("iam-prev");
    const nextBtn = document.getElementById("iam-next");

    if (roleSpan && prevBtn && nextBtn) {
        function updateRole(index) {
            roleSpan.style.opacity = 0;
            setTimeout(() => {
                roleSpan.textContent = roles[index];
                roleSpan.style.opacity = 1;
            }, 200);
        }

        prevBtn.addEventListener("click", () => {
            current = (current - 1 + roles.length) % roles.length;
            updateRole(current);
        });

        nextBtn.addEventListener("click", () => {
            current = (current + 1) % roles.length;
            updateRole(current);
        });
    }
});

// Hobby Card Background Cycling
const hobbyImages = {
    models: [
        "Images/model1.jpg",
        "Images/model2.jpg",
        "Images/model3.jpg"
    ],
    films: [
        "Images/film1.jpg",
        "Images/film2.jpg",
        "Images/film3.jpg"
    ],
    games: [
        "Images/game1.jpg",
        "Images/game2.jpg",
        "Images/game3.jpg"
    ]
};

function setupHobbyCard(cardId, bgCurrentId, bgNextId, images, link) {
    const card = document.getElementById(cardId);
    const bgCurrent = document.getElementById(bgCurrentId);
    const bgNext = document.getElementById(bgNextId);
    if (!card || !bgCurrent || !bgNext) return; // <-- Add this line
    let idx = 0;
    let interval = null;
    let isHovering = false;

    // Set initial image and reset scale
    bgCurrent.style.backgroundImage = `url('${images[0]}')`;
    bgCurrent.style.transform = "scale(1)";
    bgCurrent.style.transition = "transform 2.2s linear";
    bgNext.style.opacity = 0;
    bgNext.style.transform = "scale(1.08)";
    bgNext.style.transition = "opacity 0.7s linear, transform 2.2s linear";

    function startZoom(element) {
        element.style.transition = "transform 2.2s linear";
        element.style.transform = "scale(1.08)";
    }

    function resetZoom(element) {
        element.style.transition = "transform 0.4s linear";
        element.style.transform = "scale(1)";
    }

    function crossfadeToNext() {
        const nextIdx = (idx + 1) % images.length;
        bgNext.style.transition = "none";
        bgNext.style.transform = "scale(1)";
        bgNext.style.backgroundImage = `url('${images[nextIdx]}')`;

        setTimeout(() => {
            bgNext.style.transition = "opacity 0.7s linear, transform 2.2s linear";
            bgNext.style.opacity = 1;
            bgNext.style.transform = "scale(1.08)";
        }, 10);

        setTimeout(() => {
            // Swap images and reset zoom
            bgCurrent.style.transition = "none";
            bgCurrent.style.backgroundImage = `url('${images[nextIdx]}')`;
            bgCurrent.style.transform = "scale(1)";
            bgNext.style.opacity = 0;
            idx = nextIdx;
            if (isHovering) {
                // Wait for fade out to finish, then trigger zoom
                void bgCurrent.offsetWidth;
                setTimeout(() => {
                    bgCurrent.style.transition = "transform 2.2s linear";
                    bgCurrent.style.transform = "scale(1.08)";
                }, 10);
                interval = setTimeout(crossfadeToNext, 2200);
            }
        }, 700);
    }

    card.addEventListener("mouseenter", () => {
        isHovering = true;
        resetZoom(bgCurrent);
        setTimeout(() => startZoom(bgCurrent), 10);
        interval = setTimeout(crossfadeToNext, 2200);
    });

    card.addEventListener("mouseleave", () => {
        isHovering = false;
        clearTimeout(interval);
        resetZoom(bgCurrent);
        bgNext.style.opacity = 0;
        bgNext.style.transform = "scale(1.08)";
    });

    card.addEventListener("click", () => {
        window.location.href = link;
    });
}

// Replace with your actual images and target pages
setupHobbyCard("models-card", "models-bg-current", "models-bg-next", hobbyImages.models, "models.html");
setupHobbyCard("films-card", "films-bg-current", "films-bg-next", hobbyImages.films, "films.html");
setupHobbyCard("games-card", "games-bg-current", "games-bg-next", hobbyImages.games, "games.html");

document.addEventListener("DOMContentLoaded", () => {
    const software = [
        { name: "Blender", img: "Images/blender-logo.png" },
        { name: "Photoshop", img: "Images/photoshop-logo.png" },
        { name: "Premiere", img: "Images/premiere-logo.png" },
        { name: "After Effects", img: "Images/aftereffects-logo.png" },
        { name: "Unity", img: "Images/unity-logo.png" },
        { name: "VS Code", img: "Images/vscode-logo.png" }
    ];
    let current = 0;
    const logoImg = document.querySelector('.iknow-logo img');
    const prevBtn = document.getElementById("iknow-prev");
    const nextBtn = document.getElementById("iknow-next");

    function updateLogo(index) {
        logoImg.style.opacity = 0;
        setTimeout(() => {
            logoImg.src = software[index].img;
            logoImg.alt = software[index].name;
            logoImg.style.opacity = 1;
        }, 300); // match the CSS transition duration
    }

    prevBtn.addEventListener("click", () => {
        current = (current - 1 + software.length) % software.length;
        updateLogo(current);
    });

    nextBtn.addEventListener("click", () => {
        current = (current + 1) % software.length;
        updateLogo(current);
    });
});

function switchIknowIcon(newSrc) {
    const logo = document.querySelector('.iknow-logo img');
    const logoContainer = document.querySelector('.iknow-logo');
    logoContainer.classList.add('iknow-fade-out');
    setTimeout(() => {
        logo.src = newSrc;
        logoContainer.classList.remove('iknow-fade-out');
        logoContainer.classList.add('iknow-fade-in');
        setTimeout(() => {
            logoContainer.classList.remove('iknow-fade-in');
        }, 400);
    }, 400);
}

// Parallax effect for hobbies row
window.addEventListener("scroll", () => {
    const hobbiesRow = document.querySelector('.hobbies-row');
    if (hobbiesRow) {
        const offset = window.scrollY * 0.05;
        hobbiesRow.style.transform = `translateY(${offset}px)`;
    }
});

// Staggered fade-in for main sections
document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );
    fadeInElements.forEach((el, i) => {
        setTimeout(() => observer.observe(el), i * 120);
    });
});

(function goldenTrails() {
    const canvas = document.getElementById('golden-trails-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth, height = window.innerHeight;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Trail parameters
    const TRAIL_COLOR = 'rgba(255, 215, 64, 0.55)';      // More golden, slightly more opaque
    const GLOW_COLOR = 'rgba(255, 200, 40, 0.85)';       // Stronger, warmer gold, more opaque
    const TRAIL_WIDTH = 5.5;
    const GLOW_BLUR = 20;                               // Much blurrier
    const TRAIL_LIFETIME = 10000;
    const TRAIL_INTERVAL = 7000;

    let trails = [];

    function randomBorderPoint() {
        const side = Math.floor(Math.random() * 4);
        switch (side) {
            case 0: return { x: 0, y: Math.random() * height };
            case 1: return { x: width, y: Math.random() * height };
            case 2: return { x: Math.random() * width, y: 0 };
            case 3: return { x: Math.random() * width, y: height };
        }
    }
    function isOnBorder(pt) {
        const pad = 2;
        return (
            pt.x <= pad ||
            pt.x >= width - pad ||
            pt.y <= pad ||
            pt.y >= height - pad
        );
    }
    function randomTrail() {
        const points = [];
        let last = randomBorderPoint();
        points.push(last);
        let hitBorder = false;
        let steps = 0;
        const maxSteps = 32;
        // Direct the line across the screen
        let target;
        if (last.x === 0) target = { x: width, y: Math.random() * height };
        else if (last.x === width) target = { x: 0, y: Math.random() * height };
        else if (last.y === 0) target = { x: Math.random() * width, y: height };
        else target = { x: Math.random() * width, y: 0 };

        while (!hitBorder && steps < maxSteps) {
            steps++;
            let dx = target.x - last.x;
            let dy = target.y - last.y;
            let distToTarget = Math.sqrt(dx * dx + dy * dy);
            dx /= distToTarget;
            dy /= distToTarget;

            // Occasionally allow a big deviation for a loop
            let deviation;
            if (Math.random() < 0.18 && steps > 2 && steps < maxSteps - 2) {
                deviation = (Math.random() - 0.5) * Math.PI * 1.2;
            } else {
                deviation = (Math.random() - 0.5) * Math.PI / 6;
            }
            const angle = Math.atan2(dy, dx) + deviation;
            const segLen = Math.min(60 + Math.random() * 70, distToTarget);
            let nx = last.x + Math.cos(angle) * segLen;
            let ny = last.y + Math.sin(angle) * segLen;
            nx = Math.max(0, Math.min(width, nx));
            ny = Math.max(0, Math.min(height, ny));
            const next = { x: nx, y: ny };
            points.push(next);
            if (isOnBorder(next)) hitBorder = true;
            last = next;
        }
        return {
            points,
            created: performance.now(),
            erased: false,
            eraseStart: null
        };
    }

    // Catmull-Rom spline interpolation for smooth trails
    function getSplinePoints(pts, numSegments = 120) {
        const spline = [];
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i === 0 ? 0 : i - 1];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = pts[i + 2 < pts.length ? i + 2 : pts.length - 1];
            for (let t = 0; t < 1; t += 1 / numSegments) {
                const tt = t;
                const x = 0.5 * (
                    (2 * p1.x) +
                    (-p0.x + p2.x) * tt +
                    (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt * tt +
                    (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tt * tt * tt
                );
                const y = 0.5 * (
                    (2 * p1.y) +
                    (-p0.y + p2.y) * tt +
                    (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt * tt +
                    (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tt * tt * tt
                );
                spline.push({ x, y });
            }
        }
        spline.push(pts[pts.length - 1]);
        return spline;
    }

    function drawSmoothTrail(trail, now) {
        const age = now - trail.created;
        let progress = Math.min(1, age / (TRAIL_LIFETIME * 0.6));
        if (age > TRAIL_LIFETIME * 0.6 && !trail.erased) {
            trail.eraseStart = now;
            trail.erased = true;
        }
        let eraseProgress = 0;
        if (trail.erased && trail.eraseStart) {
            eraseProgress = Math.min(1, (now - trail.eraseStart) / (TRAIL_LIFETIME * 0.4));
        }

        const spline = getSplinePoints(trail.points, 120);
        const total = spline.length - 1;
        const visibleStart = Math.floor(total * eraseProgress);
        const visibleEnd = Math.floor(total * progress);

        if (visibleEnd <= visibleStart) return;

        // Feathered outer glow layer (extra soft)
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = GLOW_COLOR;
        ctx.shadowBlur = GLOW_BLUR * 2.5;
        ctx.strokeStyle = 'rgba(255, 200, 40, 0.02)'; // less opaque
        ctx.lineWidth = TRAIL_WIDTH * 5.5;
        ctx.beginPath();
        ctx.moveTo(spline[visibleStart].x, spline[visibleStart].y);
        for (let i = visibleStart + 1; i <= visibleEnd; i++) {
            ctx.lineTo(spline[i].x, spline[i].y);
        }
        ctx.stroke();
        ctx.restore();

        // Main glow layer
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = GLOW_COLOR;
        ctx.shadowBlur = GLOW_BLUR;
        ctx.strokeStyle = 'rgba(255, 200, 40, 0.05)'; // less opaque
        ctx.lineWidth = TRAIL_WIDTH * 3.2;
        ctx.beginPath();
        ctx.moveTo(spline[visibleStart].x, spline[visibleStart].y);
        for (let i = visibleStart + 1; i <= visibleEnd; i++) {
            ctx.lineTo(spline[i].x, spline[i].y);
        }
        ctx.stroke();
        ctx.restore();

        // Core layer
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(255, 200, 40, 0.15)';
        ctx.shadowBlur = 18;
        ctx.strokeStyle = 'rgba(255, 215, 64, 0.15)'; // less opaque
        ctx.lineWidth = TRAIL_WIDTH;
        ctx.beginPath();
        ctx.moveTo(spline[visibleStart].x, spline[visibleStart].y);
        for (let i = visibleStart + 1; i <= visibleEnd; i++) {
            ctx.lineTo(spline[i].x, spline[i].y);
        }
        ctx.stroke();
        ctx.restore();

        // Highlight layer
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(255, 255, 200, 0.10)';
        ctx.shadowBlur = 6;
        ctx.strokeStyle = 'rgba(255, 255, 220, 0.20)'; // less opaque
        ctx.lineWidth = TRAIL_WIDTH * 0.35;
        ctx.beginPath();
        ctx.moveTo(spline[visibleStart].x, spline[visibleStart].y);
        for (let i = visibleStart + 1; i <= visibleEnd; i++) {
            ctx.lineTo(spline[i].x, spline[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }

    let lastTrailTime = 0;
    function animate(now) {
        ctx.clearRect(0, 0, width, height);
        for (let i = trails.length - 1; i >= 0; i--) {
            drawSmoothTrail(trails[i], now);
            if (now - trails[i].created > TRAIL_LIFETIME) {
                trails.splice(i, 1);
            }
        }
        if (now - lastTrailTime > TRAIL_INTERVAL && trails.length < 3) {
            trails.push(randomTrail());
            lastTrailTime = now;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
})();

(function floatingDust() {
    const canvas = document.getElementById('dust-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth, height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate particles
    const PARTICLE_COUNT = 48;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 0.7 + Math.random() * 1.8,
            a: 0.08 + Math.random() * 0.12,
            speed: 0.08 + Math.random() * 0.12,
            drift: (Math.random() - 0.5) * 0.06
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
            ctx.save();
            ctx.globalAlpha = p.a;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 235, 180, 1)';
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();

            p.y -= p.speed;
            p.x += p.drift;
            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10 || p.x > width + 10) {
                p.x = Math.random() * width;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
})();

document.addEventListener("DOMContentLoaded", () => {
    // Fullscreen for model-viewer
    document.querySelectorAll('.fullscreen-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modelId = btn.getAttribute('data-model');
            const model = document.getElementById(modelId);
            if (model && typeof model.enterFullscreen === "function") {
                model.enterFullscreen();
            } else {
                alert("Fullscreen is not supported in this browser or model-viewer version.");
            }
        });
    });
});

// Fade between about images
document.addEventListener("DOMContentLoaded", () => {
    const imgs = document.querySelectorAll('.about-fade-img');
    if (imgs.length === 0) return; // No images found

    let idx = 0;
    setInterval(() => {
        imgs.forEach((img, i) => img.classList.toggle('visible', i === idx));
        idx = (idx + 1) % imgs.length;
    }, 3200);
});

// Quiz Data Example
const quizQuestions = [
    {
        question: "What is my major at Georgia Tech?",
        choices: ["Computer Science", "Computational Media", "Mechanical Engineering", "Business"],
        answer: 1,
        insight: "I'm a Computational Media major, which combines computing with design and media studies."
    },
    {
        question: "How many colleges have I attended?",
        choices: ["1", "2", "3", "20"],
        answer: 2,
        insight: "Initially I was at Georgia State University, then transferred to Georgia Tech. I also dual enrolled at GTC during high school!"
    },
    {
        question: "Which software did I learn first",
        choices: ["Blender", "Cinema4D", "3ds Max", "Maya"],
        answer: 2,
        insight: "Although I have experience with all four, I first learned 3ds Max during my Junior year of high school. This was my first computational media class, and where I fell in love with the whole field."
    },
    {
        question: "Which game engine am I most comfortable with?",
        choices: ["Unity", "Godot", "Unreal", "O3DE"],
        answer: 0,
        insight: "I have roughly 4 years of Unity experience, with Unreal and Godot being my second and third most comfortable engines. I will be learning O3DE this semester, so I can add it to the list soon!"
    },
    {
        question: "Which of the genres of projects have I made the most of?",
        choices: ["Models", "Games", "Drawings", "Films"],
        answer: 3,
        insight: "While I've done lots of projects with models and games, film has been one of my major interests for the past 6 years. I've participated in numerous film festivals and film clubs, and hope that this will be a major part of my career in the future."
    },
    {
        question: "What is my favorite programming language?",
        choices: ["C", "C#", "Python", "Java"],
        answer: 1,
        insight: "Given my experience with Unity, C# has become my most dominant programming language. I also have experience with Python, C, and Java, but C# is my favorite due to its versatility and ease of use in game development."
    },
    {
        question: "What is my favorite movie of all time?",
        choices: ["Shaun of the Dead", "The Night House", "Scream", "Nope"],
        answer: 2,
        insight: "\"What's your favorite scary movie?\""
    },
    {
        question: "What is my favorite video game of all time?",
        choices: ["Psychonauts", "Before Your Eyes", "Clair Obscur: Expedition 33", "Yakuza Kiwami 2"],
        answer: 2,
        insight: "Not only is this game phenomenal, but it sets the standard for how games should be made and what they can achieve. Games like this should be put in a museum. Play it!!!!"
    },
    {
        question: "What is my dream job?",
        choices: ["Creative team head", "3D Modeler", "Part of the movie industry", "All of the above"],
        answer: 3,
        insight: "Any opportunity that allows me to combine my skills in 3D modeling, game development, and film making is my dream job. I want to be part of a creative team that pushes the boundaries of storytelling through interactive media."
    },
    {
        question: "Can you call \"shotgun\" on a horse?",
        choices: ["Absolutely yes", "No that makes no sense", "If the horse is wide enough to seat two people at the front, yes", "If there is a miniature horse beside it, yes"],
        answer: 1,
        insight: "This is a debate I hold with many of my friends. I'm obligated to say that there is no right answer, but there is. Absolutely no, you cannot call shotgun on a horse. It is not a car, and it does not have a front seat. If you want to ride shotgun, get a car."
    }
];

let quizState = {
    current: 0,
    score: 0,
    timer: null,
    timeLeft: 10,
    answered: false
};

function showQuizIntro() {
    document.getElementById('quiz-content').innerHTML = `
        <div class="quiz-intro">
            <h2>Get to Know Me Quiz!</h2>
            <p>Test your knowledge about me. Ready?</p>
            <button id="quiz-begin-btn">Begin Quiz</button>
        </div>
    `;
    document.getElementById('quiz-timer').style.display = 'none';
    document.getElementById('quiz-begin-btn').onclick = startQuiz;
}

function startQuiz() {
    quizState.current = 0;
    quizState.score = 0;
    showQuestion();
}

function fadeOutIn(element, nextHtml, callback) {
    element.classList.add('fade-out');
    setTimeout(() => {
        element.classList.remove('fade-out');
        element.innerHTML = nextHtml;
        if (callback) callback();
    }, 500); // Match fadeOutDown duration
}

// Example usage in showQuestion:
function showQuestion() {
    const q = quizQuestions[quizState.current];
    quizState.answered = false;
    quizState.timeLeft = 10;
    const quizContent = document.getElementById('quiz-content');
    const nextHtml = `
        <div class="quiz-question">
            <h3>Question ${quizState.current + 1} of ${quizQuestions.length}</h3>
            <p>${q.question}</p>
            <div class="quiz-choices">
                ${q.choices.map((c, i) => `<button class="quiz-choice" data-idx="${i}">${c}</button>`).join('')}
            </div>
            <button id="quiz-confirm-btn" disabled>Confirm</button>
        </div>
    `;
    fadeOutIn(quizContent, nextHtml, () => {
        document.getElementById('quiz-timer').style.display = 'flex';
        document.getElementById('timer-seconds').textContent = quizState.timeLeft;
        setTimer(10);

        let selected = null;
        document.querySelectorAll('.quiz-choice').forEach(btn => {
            btn.onclick = () => {
                if (quizState.answered) return;
                document.querySelectorAll('.quiz-choice').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selected = parseInt(btn.dataset.idx);
                document.getElementById('quiz-confirm-btn').disabled = false;
            };
        });

        document.getElementById('quiz-confirm-btn').onclick = () => {
            if (selected !== null && !quizState.answered) {
                quizState.answered = true;
                clearInterval(quizState.timer);
                showAnswer(selected);
            }
        };
    });
}

// Use fadeOutIn in showAnswer and showResults as well, in the same way.

function showAnswer(selected) {
    const q = quizQuestions[quizState.current];
    const correct = selected === q.answer;
    if (correct) quizState.score++;
    document.getElementById('quiz-content').innerHTML = `
        <div class="quiz-answer">
            <h3>${correct ? "Correct!" : "Incorrect."}</h3>
            <p>${q.insight}</p>
            <button id="quiz-next-btn">${quizState.current < quizQuestions.length - 1 ? "Next Question" : "See Results"}</button>
        </div>
    `;
    document.getElementById('quiz-timer').style.display = 'none';
    document.getElementById('quiz-next-btn').onclick = () => {
        quizState.current++;
        if (quizState.current < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    };
}

function showResults() {
    document.getElementById('quiz-content').innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <p>You got ${quizState.score} out of ${quizQuestions.length} correct.</p>
            <button id="quiz-retry-btn">Try Again</button>
        </div>
    `;
    document.getElementById('quiz-timer').style.display = 'none';
    document.getElementById('quiz-retry-btn').onclick = showQuizIntro;
}

function setTimer(seconds) {
    const circle = document.getElementById('timer-circle');
    const total = 2 * Math.PI * 26; // Circumference for r=26
    quizState.timeLeft = seconds;
    let start = null;
    let lastSeconds = seconds;

    function animate(now) {
        if (!start) start = now;
        const elapsed = (now - start) / 1000;
        const remaining = Math.max(0, seconds - elapsed);
        quizState.timeLeft = Math.ceil(remaining);
        document.getElementById('timer-seconds').textContent = quizState.timeLeft;

        // Animate the circle smoothly
        circle.style.strokeDashoffset = total * (1 - remaining / seconds);

        if (remaining > 0 && !quizState.answered) {
            requestAnimationFrame(animate);
        } else {
            if (!quizState.answered) {
                quizState.answered = true;
                showAnswer(null);
            }
        }
    }

    // Reset circle and timer text
    circle.style.strokeDasharray = total;
    circle.style.strokeDashoffset = 0;
    document.getElementById('timer-seconds').textContent = seconds;

    // Cancel any previous timer
    if (quizState.timer) cancelAnimationFrame(quizState.timer);
    quizState.timer = requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", showQuizIntro);
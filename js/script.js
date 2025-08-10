const character = document.getElementById('character');
const panels = {
    bio: document.getElementById('bio-panel'),
    skills: document.getElementById('skills-panel'),
    projects: document.getElementById('projects-panel'),
    contact: document.getElementById('contact-panel'),
    resume: document.getElementById('resume-panel')
};

// Character position
let positionX = window.innerWidth / 2;
let positionY = 10;

// Movement settings
const moveSpeed = 20;
const cornerThreshold = 100;

// Character dimensions (from CSS: width: 120px, height: 120px)
const characterWidth = 120;
const characterHeight = 120;

// Boundary constraints
const gameContainer = document.querySelector('.game-container');
let containerBounds = {
    left: 20, // Border width from CSS
    right: window.innerWidth - 20 - characterWidth,
    top: 20, // Border width from CSS
    bottom: window.innerHeight - 20 - characterHeight
};

function updateBoundaries() {
    containerBounds = {
        left: 20,
        right: window.innerWidth - 20 - characterWidth,
        top: 20,
        bottom: window.innerHeight - 20 - characterHeight
    };
}

function constrainPosition(x, y) {
    return {
        x: Math.max(containerBounds.left, Math.min(containerBounds.right, x)),
        y: Math.max(containerBounds.top, Math.min(containerBounds.bottom, y))
    };
}

function updateCharacterPosition() {
    // Constrain position to boundaries
    const constrained = constrainPosition(positionX, positionY);
    positionX = constrained.x;
    positionY = constrained.y;
    
    character.style.top = positionY + 'px';
    character.style.left = positionX + 'px';
    character.style.transform = 'translate(0, 0)';
    checkCornerProximity();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
         case 'ArrowUp':
        case 'w':
        case 'W':
            positionY -= moveSpeed;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            positionY += moveSpeed;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            positionX -= moveSpeed;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            positionX += moveSpeed;
            break;
        }
        updateCharacterPosition();
});

// Update boundaries on window resize
window.addEventListener('resize', () => {
    updateBoundaries();
    // Re-constrain current position after resize
    const constrained = constrainPosition(positionX, positionY);
    positionX = constrained.x;
    positionY = constrained.y;
    updateCharacterPosition();
});

// Initialize boundaries and position when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateBoundaries();
    updateCharacterPosition();
    initPetAnimation();
});

// Pet floating animation using GSAP MotionPath
function initPetAnimation() {
    const pet = document.getElementById('pet');
    const gameContainer = document.querySelector('.game-container');
    
    // Get container dimensions
    const containerRect = gameContainer.getBoundingClientRect();
    const petWidth = 80;
    const petHeight = 80;
    
    // Create a floating path - horizontal movement with slight vertical variation
    const path = [
        { x: containerRect.width * 0.2, y: containerRect.height * 0.3 },
        { x: containerRect.width * 0.8, y: containerRect.height * 0.4 },
        { x: containerRect.width * 0.2, y: containerRect.height * 0.5 },
        { x: containerRect.width * 0.8, y: containerRect.height * 0.6 },
        { x: containerRect.width * 0.2, y: containerRect.height * 0.3 }
    ];
    
    // Create the floating animation
    gsap.to(pet, {
        motionPath: {
            path: path,
            autoRotate: false,
            alignOrigin: [0.5, 0.5]
        },
        duration: 8,
        ease: "none",
        repeat: -1,
        yoyo: false
    });
    
    // Add a gentle floating effect with yoyo
    gsap.to(pet, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
    });
}


function checkCornerProximity() {
    // Hide all panels
    Object.values(panels).forEach(panel => {
        if (panel) panel.classList.remove('active');
    });

    // Get character bounding box
    const charRect = character.getBoundingClientRect();

    // Mapping objects to their panels
    const objectMap = [
        { el: document.querySelector('.bio'), panel: panels.bio },
        { el: document.querySelector('.projects'), panel: panels.projects },
        { el: document.querySelector('.skills'), panel: panels.skills },
        { el: document.querySelector('.contact'), panel: panels.contact }
    ];

    // Loop through each object and check for collision
    objectMap.forEach(({ el, panel }) => {
        if (!el || !panel) return;

        const objRect = el.getBoundingClientRect();

        const isOverlapping = !(
            charRect.right < objRect.left ||
            charRect.left > objRect.right ||
            charRect.bottom < objRect.top ||
            charRect.top > objRect.bottom
        );

        if (isOverlapping) {
            panel.classList.add('active');
        }
    });
}

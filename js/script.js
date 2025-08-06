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

document.addEventListener('keydown', (event) => {
    switch (event.key) {
         case 'ArrowUp':
            positionY -= moveSpeed;
            break;
        case 'ArrowDown':
            positionY += moveSpeed;
            break;
        case 'ArrowLeft':
            positionX -= moveSpeed;
            break;
        case 'ArrowRight':
            positionX += moveSpeed;
            break;
        }
        updateCharacterPosition();
});

function updateCharacterPosition() {
    character.style.top = positionY + 'px';
    character.style.left = positionX + 'px';
}
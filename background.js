function isMobileView() {
    return window.innerWidth <= 768; // Adjust as necessary for your design's breakpoint
}

const images = [
    { path: '/assets/tiles/Abstract_pattern_22.svg', size: 600 },
    // { path: '/assets/tiles/13_06_jxxxj.svg', size: '450px' },
    { path: '/assets/tiles/5_SlVOXzEwLTEz.svg', size: 400 },
    { path: '/assets/tiles/10_1.svg', size: 400 },
];

let backgroundImageHeight = 0;
let scrollPosition = 0;
const speed = 0.5; 

function scrollBackground() {
    if (backgroundImageHeight > 0) { 
        scrollPosition -= speed;

        if (Math.abs(scrollPosition) >= backgroundImageHeight) {
            scrollPosition += backgroundImageHeight;
        }
        const parallaxBackground = document.getElementById('parallaxBackground');
        parallaxBackground.style.transform = `translateY(${scrollPosition}px)`;
    }

    requestAnimationFrame(scrollBackground);
}

function set_loader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.backgroundColor = '#000';
    loader.innerHTML = '<div class="dot-spin">Loading...</div>';
    document.body.appendChild(loader);    
}

function setRandomBackgroundImage(isMobileView) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageObject = images[randomIndex];

    const tempImage = new Image();
    tempImage.src = imageObject.path;
    tempImage.onload = function() {
        backgroundImageHeight = imageObject.size
        document.getElementById('parallaxBackground').style.display = 'block';
        document.body.style.background = 'none'; // Remove black background
        loader = document.getElementById('loader');
        document.body.removeChild(loader);
        showText("#jobtitle", "software engineer & tech generalist", "#desc", "site still under construction!", 0, 100);
    };

    var scalar = isMobileView ? 0.5 : 1;

    const parallaxBackground = document.getElementById('parallaxBackground');
    parallaxBackground.style.backgroundImage = `url('${imageObject.path}')`;
    parallaxBackground.style.backgroundSize = `${imageObject.size*scalar}px ${imageObject.size*scalar}px`;
    parallaxBackground.style.backgroundRepeat = 'repeat';
    parallaxBackground.style.backgroundPosition = 'center';
    if (isMobileView) {
        parallaxBackground.style.height = '200%';
    }
}

let lastX = 0;
let lastY = 0;
let targetX = 0;
let targetY = 0;
let isMoving = false;
const applyParallaxEffect = () => {
    // Calculate the current offset based on last and target positions
    const currentX = lastX + (targetX - lastX) * 0.1; // Smooth transition factor
    const currentY = lastY + (targetY - lastY) * 0.1;

    // Apply the calculated translation to the background
    const parallaxBackground = document.getElementById('parallaxBackground');
    parallaxBackground.style.transform = `translate(${currentX}px, ${currentY}px)`;

    // Update last positions for the next frame
    lastX = currentX;
    lastY = currentY;

    // Continue the animation if still moving
    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        requestAnimationFrame(applyParallaxEffect);
    } else {
        isMoving = false; // Stop the animation when the target is reached
    }
};


window.onload = function() {
    set_loader();
    setRandomBackgroundImage(isMobileView());

    if (!isMobileView()) {
        document.addEventListener('mousemove', function(e) {
            // Update target positions based on mouse location
            targetX = (e.clientX - window.innerWidth / 2) / 15;
            targetY = (e.clientY - window.innerHeight / 2) / 15;

            // Only start a new animation if not already in progress
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(applyParallaxEffect);
            }
        });
    }
    else {
        scrollBackground();
    }
};

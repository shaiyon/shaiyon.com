function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const images = [
    { path: '/assets/tiles/Abstract_pattern_22.svg', size: '600px' },
    // { path: '/assets/tiles/13_06_jxxxj.svg', size: '450px' },
    { path: '/assets/tiles/5_SlVOXzEwLTEz.svg', size: '400px' },
    { path: '/assets/tiles/10_1.svg', size: '350px' },
];

var selectedBackgroundImage = null;
function setRandomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageObject = images[randomIndex];
    selectedBackgroundImage = imageObject;

    const tempImage = new Image();
    tempImage.src = imageObject.path;
    tempImage.onload = function() {
        // Once the background image is loaded, display the content and remove the loading indicator
        document.getElementById('parallaxBackground').style.display = 'block';
        document.body.style.background = 'none'; // Remove black background
    };

    const parallaxBackground = document.getElementById('parallaxBackground');
    parallaxBackground.style.backgroundImage = `url('${imageObject.path}')`;
    parallaxBackground.style.backgroundSize = `${imageObject.size} ${imageObject.size}`;
    parallaxBackground.style.backgroundRepeat = 'repeat';
    parallaxBackground.style.backgroundPosition = 'center'; // Center the background image
}

function throttle(callback, limit) {
    var waiting = false;
    return function () {
        if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(function () {
            waiting = false;
        }, limit);
        }
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
    setRandomBackgroundImage();

    if (!isMobileDevice()) {
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
};

const cursorElem = document.querySelector('.cursor');

const mouse = { x: 0, y: 0 };
const prevMouse = { x: 0, y: 0 };
const cursor = { x: 0, y: 0 };
let currentScale = 0;
let currentAngle = 0;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Handle mouse enter and leave to scale and change opacity
window.addEventListener('mouseleave', () => {
    cursorElem.style.opacity = '0';
});

window.addEventListener('mouseenter', () => {
    cursorElem.style.opacity = '1';
});

const speed = 0.17;

const tick = () => {
    cursor.x += (mouse.x - cursor.x) * speed;
    cursor.y += (mouse.y - cursor.y) * speed;

    const posTransform = `translate(${cursor.x}px, ${cursor.y}px)`;

    // Squeeze
    const dX = mouse.x - prevMouse.x;
    const dY = mouse.y - prevMouse.y;

    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;

    // Calculate distance using Pythagoras theorem, using distance as mouse velocity
    const dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

    // Math.min is used to limit the distance to get velocity to a range between 0 to 150
    const mouseVelocity = Math.min(dist, 150);

    // Scale of both dimensions, max is 0.5x to 1.5x, convert the velocity from range [0, 150] to [0, 0.5]
    const scaleFactor = (mouseVelocity / 150) * 0.5;

    // To make the animation smooth, like for mouse position, set the scale for each frame, divide by speed
    currentScale += (scaleFactor - currentScale) * speed * 3;

    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // Calculate angle
    const angle = Math.atan2(dY, dX) * 180 / Math.PI;

    if (mouseVelocity > 20) {
        currentAngle = angle;
    }
    
    currentAngle += (angle - currentAngle) * speed * 8;
    
    const rotTransform = `rotate(${currentAngle}deg)`;

    cursorElem.style.transform = `${posTransform} ${rotTransform} ${scaleTransform}`;

    window.requestAnimationFrame(tick);
};

tick();

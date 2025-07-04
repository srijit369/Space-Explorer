let scene, camera, renderer, earthMesh, cloudMesh, starMesh;
let isMouseDown = false;
let previousMouseX = 0, previousMouseY = 0;
let currentRotationX = 0, currentRotationY = 0;
const rotationSpeed = 0.005;
const autoRotateSpeed = 0.0015; // Adjust this to make auto-rotation faster/slower

function main() {
    const canvas = document.querySelector('#c');

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: new THREE.TextureLoader().load('texture/earthmap1k.jpg'),
        bumpMap: new THREE.TextureLoader().load('texture/earthbump.jpg'),
        bumpScale: 0.3,
    });
    earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Point Light
    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Cloud
    const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('texture/earthCloud.png'),
        transparent: true
    });
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // Star (Galaxy)
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('texture/galaxy.png'),
        side: THREE.BackSide
    });
    starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);

    // Mouse Events
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    // Animation Loop
    animate();
}

function onMouseDown(event) {
    if (event.button === 0) { // Left mouse button
        isMouseDown = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
}

function onMouseUp(event) {
    if (event.button === 0) {
        isMouseDown = false;
    }
}

function onMouseMove(event) {
    if (isMouseDown) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;
        currentRotationY += deltaX * rotationSpeed;
        currentRotationX += deltaY * rotationSpeed;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Auto-rotate if not dragging
    if (!isMouseDown) {
        currentRotationY -= autoRotateSpeed;
    }

    earthMesh.rotation.set(currentRotationX, currentRotationY, 0);
    // Optional: Auto-rotate clouds and stars as well
    // cloudMesh.rotation.y += autoRotateSpeed * 0.5;
    // starMesh.rotation.y += autoRotateSpeed * 0.2;

    render();
}

function render() {
    renderer.render(scene, camera);
}

window.onload = main;

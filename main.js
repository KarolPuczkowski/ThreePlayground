import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a wooden door geometry
const doorGeometry = new THREE.BoxGeometry(2, 4, 0.2); // Adjust dimensions as needed (original size: 1x2x0.1)
let doorTexture = 'concrete-face.jpeg'; // Initial texture
const doorMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(doorTexture) });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
scene.add(door);

// Create a plane (floor)
const planeGeometry = new THREE.CircleGeometry(5, 200); // Radius of 5, 200 segments
const grassTexture = new THREE.TextureLoader().load('https://img.freepik.com/free-photo/old-concrete-wall-texture_1149-1290.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(5, 5); // Adjust the repeat values to control the number of repetitions

const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    side: THREE.DoubleSide,
    map: grassTexture,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
plane.position.y = -2.01;
scene.add(plane);

// Set camera position
camera.position.z = 5;

// Set renderer clear color
renderer.setClearColor(0xffffff);

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Add hemisphere light for ambient lighting
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.8);
scene.add(hemisphereLight);

// Add directional light to create shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(5, 2, 2);
scene.add(directionalLight);

// Function to change door texture
function changeDoorTexture(textureURL) {
    doorMaterial.map = new THREE.TextureLoader().load(textureURL);
    doorMaterial.needsUpdate = true;
}

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the door in the animation loop
    door.rotation.y += 0.01;

    // Update controls
    controls.update();

    renderer.render(scene, camera);
};

animate();

document.getElementById('colorBox1').addEventListener('click', function () {
    changeDoorTexture('concrete-face.jpeg');
});

document.getElementById('colorBox2').addEventListener('click', function () {
    changeDoorTexture('dark-face.jpeg');
});

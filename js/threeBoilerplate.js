/*
    This file sets up everything ThreeJS related that is needed for it to run
    A lot of this code can be copied into other ThreeJS projects with minor adjustments
*/

/* So that we can move the camera around */
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

/* Configuration */
const config = {
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    backgroundColor: "#888888",
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000
    },
    light: {
        color: 0xFFFFFF,
        intensity: 1.2,
        distance: 1000
    },
    hemisphereLight: {
        skyColor: 0x0000cc,
        groundColor: 0x003300,
        intensity: 0.6
    }
}

/* Create the Three.js Scene */
const scene = new THREE.Scene();

/* Create a new Perspective Camera */
const camera = new THREE.PerspectiveCamera(config.camera.fov, config.canvasWidth / config.canvasHeight, config.camera.near, config.camera.far)

/* Create a Full Screen WebGL Renderer */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(config.backgroundColor);
renderer.setSize(config.canvasWidth, config.canvasHeight);

/* Append the renderer to the DOM */
document.body.appendChild(renderer.domElement);

/* Make sure the project is responsive based on window resizing */
window.addEventListener('resize', () => {
    renderer.setSize(config.canvasWidth, config.canvasHeight);
    camera.aspect = config.canvasWidth / config.canvasHeight;

    camera.updateProjectionMatrix();
})

/* Add a point light */
const light = new THREE.PointLight(config.light.color, config.light.intensity, config.light.distance)
light.position.set(15, 5, 10);
scene.add(light);

/* Add a HemisphereLight for more realism */
const hemiLight = new THREE.HemisphereLight( config.hemisphereLight.skyColor, config.hemisphereLight.groundColor, config.hemisphereLight.intensity );
hemiLight.position.set(-15, 15, 15);
scene.add(hemiLight);

/* Add the orbit controls to be able to move the camera around with the mouse */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

/* Render function will perform an operation callback and call the renderer */
const render = function (operation) {
    requestAnimationFrame(render.bind(this, operation));

    operation && operation()

    scene.rotation.y -= .01

    renderer.render(scene, camera);
}

export {
    scene,
    camera,
    render
}
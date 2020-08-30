/* This file defines the particles coming out of the fountain */

import { scene, camera, render } from "./threeBoilerplate.js"

const rainCount = 400
const rainGeo = new THREE.Geometry();

/* Initial setup of each particle */
for (let i = 0; i < rainCount; i++) {
    const originX = Math.random() * 0.5 - 0.25
    const originY = -.20
    const originZ = Math.random() * 0.5 - 0.25

    const originVX = Math.random() * (1/100) - (1/200)
    const originVY = (2 + Math.random()) * (1/90)
    const originVZ = Math.random() * (1/100) - (1/200)

    const rainDrop = new THREE.Vector3(
        originX,
        originY,
        originZ,
    );

    rainDrop.originX = originX
    rainDrop.originY = originY
    rainDrop.originZ = originZ
    rainDrop.originVX = originVX
    rainDrop.originVY = originVY
    rainDrop.originVZ = originVZ

    rainDrop.vx = originVX
    rainDrop.vy = originVY
    rainDrop.vz = originVZ

    rainGeo.vertices.push(rainDrop);
}

/* Create the particle shared material */
const rainMaterial = new THREE.ParticleBasicMaterial({
    color: 0x0000FF,
    size: .2,
    map: THREE.ImageUtils.loadTexture(
        "media/particle.png"
    ),
    opacity: .8,
    blending: THREE.AdditiveBlending,
    transparent: true,
});

/* Add the particles all together */
const rain = new THREE.Points(rainGeo, rainMaterial);
scene.add(rain);

/* On each frame, update the physics */
const updateOnEachFrame = function() {
    rainGeo.vertices.forEach(p => {
        /* Gravity acceleration */
        p.vy -= Math.random() / 1000;

        /* Move the particle in the direction of the velocity */
        p.x += p.vx;
        p.y += p.vy - (Math.abs(p.x) + Math.abs(p.z)) / 50; // So that the particles further away from the fountain get less acceleration towards the sky. This simulates the pipes of water pushing water away from them
        p.z += p.vz;

        /* Once the drop reaches the top or bottom "floors", reload it to the initial position and velocities */
        const inTopSection = p.x < .35 && p.z < .35 && p.x > -.35 && p.z > -.35
        if (p.y < -.20 && inTopSection || (p.y < -1 && !inTopSection)) {
            p.x = p.originX
            p.y = p.originY
            p.z = p.originZ

            p.vx = p.originVX
            p.vy = p.originVY
            p.vz = p.originVZ
        }

        /* Decrease X and Z velocities as they go further away from the center */
        if (p.vy < 0 && p.vx > 0) {
            p.vx -= Math.random() / 20000;
        } else if (p.vy < 0 && p.vx < 0) {
            p.vx += Math.random() / 20000;
        }
        if (p.vy < 0 && p.vz > 0) {
            p.vz -= Math.random() / 20000;
        } else if (p.vy < 0 && p.vz < 0) {
            p.vz += Math.random() / 20000;
        }
    });
    rainGeo.verticesNeedUpdate = true;
    rain && (rain.rotation.y += 0.003); // A little rotation so that it seems more natural
}

export { updateOnEachFrame }
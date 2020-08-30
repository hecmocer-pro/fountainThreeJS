/* This file imports the fountain obj */
import { scene, camera, render } from "./threeBoilerplate.js"


let fountain;

/* Create a material */
const mtlLoader = new THREE.MTLLoader();
mtlLoader.load('../models/Fountain.mtl', function (materials) {

    materials.preload();

    /* Load the object */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('../models/Fountain.obj', function (object) {
        scene.add(object);
        fountain = object;
        fountain.position.y = -1

    });
});

export default {}